import os
import requests
import json
from atlasserver.settings import GOOGLE_SE_API_KEY, GOOGLE_SE_CSE_ID
from django.conf import settings
import subprocess
from pdf2image import convert_from_path
from PIL import Image
import openai
from langchain.chains import ConversationalRetrievalChain, RetrievalQA
from rest_framework.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from langchain.chains import ConversationalRetrievalChain
from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import (
    DirectoryLoader,
    TextLoader,
    WebBaseLoader,
)
from langchain_community.document_loaders import PyPDFLoader

from langchain_community.embeddings import OpenAIEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain_community.llms import OpenAI
from langchain_community.vectorstores import Chroma

from . import constants

import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)

os.environ["OPENAI_API_KEY"] = constants.APIKEY

PERSIST = True


def is_directory_empty(persist_path):
    # Check if the directory exists
    if not os.path.exists(persist_path):
        return True  # The directory doesn't exist, so it's 'empty'

    # List all files and directories in the given path
    if not os.listdir(persist_path):
        return True  # The directory is empty

    return False  # The directory contains files or directories


def initialize_chat_chain(
    opportunity_id,
    fileName="",
    url=""
):

    path = "media/"
    # Load persistent embeddings from chroma if directory exists
    if (
        PERSIST
        and os.path.exists(path + "opportunity_" + str(opportunity_id) + "/")
        and fileName == "" and url == ""):
        vectorstore = Chroma(
            persist_directory=path + "opportunity_" + str(opportunity_id) + "/",
            embedding_function=OpenAIEmbeddings(),
        )
        index = VectorStoreIndexWrapper(vectorstore=vectorstore)

    else:
        # Create directory loader
        if fileName:
            loader = DirectoryLoader(path + "opportunity_" + str(opportunity_id))
            # Creating index / embeddings from loaders
            index = VectorstoreIndexCreator(
                vectorstore_kwargs={
                    "persist_directory": path + "opportunity_" + str(opportunity_id)
                }
            ).from_loaders([loader])
            # Embeddings from text/url
        elif url:
            loader = WebBaseLoader([url])
            # Creating index / embeddings from loaders
            index = VectorstoreIndexCreator(
                vectorstore_kwargs={
                    "persist_directory": path + "opportunity_" + str(opportunity_id)
                }
            ).from_loaders([loader])
        

    chain = ConversationalRetrievalChain.from_llm(
        llm=ChatOpenAI(model="gpt-3.5-turbo", max_tokens=1000),
        retriever=index.vectorstore.as_retriever(search_kwargs={"k": 9}),
    )

    return chain


def get_answer(chain, query, chat_history):
    result = chain({"question": query, "chat_history": chat_history})
    return result["answer"]




def google_search(query, **kwargs):
    """
    Perform a search using Google's Custom Search JSON API.

    Parameters:
    - query: The search terms for the query.
    - api_key: Your API key for accessing Google's API.
    - cse_id: The ID of your custom search engine.
    - kwargs: Additional arguments to pass to the API.

    Returns:
    - A list of search result URLs or titles.
    """
    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        'q': query,
        'key': GOOGLE_SE_API_KEY,
        'cx': GOOGLE_SE_CSE_ID,
    }
    params.update(kwargs)
    response = requests.get(search_url, params=params)
    result_data = response.json()

    search_results = []
    for item in result_data.get("items", []):
        # return URLs:
        url = item.get("link")
        title = item.get("title")
        search_results.append({"url": url, "title": title})

    return search_results


def convert_doc_to_pdf(doc_path):
    """Converts .doc or .docx file to PDF using LibreOffice."""
    output_path = os.path.splitext(doc_path)[0] + ".pdf"
    subprocess.run(['libreoffice', '--convert-to', 'pdf', doc_path, '--outdir', os.path.dirname(doc_path)], timeout=30)
    return output_path

def generate_thumbnail(file_path):
    # Define the size for the thumbnail
    size = (512, 512)
    directory, filename = os.path.split(file_path)
    base, ext = os.path.splitext(filename)
    thumbnail_filename = f"thumbnail_{base}.png"
    thumbnail_path = os.path.join('thumbnails', thumbnail_filename)
    thumbnail_full_path = os.path.join(settings.MEDIA_ROOT, thumbnail_path)

    # Ensure the thumbnails directory exists
    os.makedirs(os.path.dirname(thumbnail_full_path), exist_ok=True)

    if ext.lower() in ['.jpg', '.jpeg', '.png']:
        # Handle image files
        image = Image.open(file_path)
        image.thumbnail(size)
        image.save(thumbnail_full_path)
    elif ext.lower() == '.pdf':
        # Handle PDF files
        images = convert_from_path(file_path, first_page=1, last_page=1)
        if images:
            images[0].thumbnail(size)
            images[0].save(thumbnail_full_path, 'PNG')
    elif ext.lower() in ['.doc', '.docx']:
        # Convert DOC/DOCX to PDF first
        pdf_path = convert_doc_to_pdf(file_path)
        # Now generate thumbnail from the first page of the PDF
        images = convert_from_path(pdf_path, first_page=1, last_page=1)
        if images:
            images[0].thumbnail(size)
            images[0].save(thumbnail_full_path, 'PNG')
        # Optionally, remove the converted PDF file after generating the thumbnail
        os.remove(pdf_path)

    return thumbnail_path



def ErrorHandler(exception):
    if isinstance(exception, ValidationError):
        # Handling Validation Errors
        custom_errors = {
            field: " ".join(errors) for field, errors in exception.detail.items()
        }
        for field in custom_errors.keys():
            if "does not exist" in custom_errors[field].lower():
                custom_errors[field] = f"{field.capitalize()} doesn't exist"
        return custom_errors
    elif isinstance(exception, ObjectDoesNotExist):
        # Handling Django's ObjectDoesNotExist exceptions
        return str(exception).capitalize().replace("_", " ") + " doesn't exist"
    else:
        # Generic error handling
        return "An unexpected error occurred: " + str(exception)