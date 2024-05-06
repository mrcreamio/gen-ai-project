# Create a directory loader in the /uploads directory
import os
from langchain.document_loaders import TextLoader,DirectoryLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain


import warnings

# warnings.filterwarnings("ignore", category=DeprecationWarning)

def create_dir(dir_name):
    """Create a directory in the uploads folder if it does not already exist."""
    base_dir = os.path.abspath(os.path.dirname(__file__))  # Gets the directory of the current script
    uploads_dir = os.path.join(base_dir, 'uploads')
    target_path = os.path.join(uploads_dir, "agent_" + dir_name)
    if not os.path.exists(target_path):
        os.makedirs(target_path)
    return target_path

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


os.environ["OPENAI_API_KEY"] = "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"
embedding = OpenAIEmbeddings()
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)


def initialize_chat_chain(
    title,
    fileName="",
    url=""
):
    PERSIST = True
    print('FileName: ', fileName, title)
    
    path = "uploads/"
    complete_path = path + "agent_" + title
    # Initialize index to None at the start
    index = None

    # Load persistent embeddings from chroma if directory exists
    if (PERSIST and os.path.exists(path + "agent_" + title) and fileName == "" and url == ""):
        print('Getting Data')
        persist_directory = complete_path
        # load again the db
        vectordb = Chroma(
            persist_directory=persist_directory,
            embedding_function=embedding
        )
        return vectordb
    else:
        # Create directory loader
        if fileName:
            print('Creating PERSIST from File')
            text_splitter = CharacterTextSplitter(
                separator = "\n",
                chunk_size = 200,
                chunk_overlap = 0

            )

            loader = DirectoryLoader(complete_path)
            docs = loader.load()
            splits = text_splitter.split_documents(docs)
            
            persist_directory = complete_path


            vectordb = Chroma.from_documents(
                documents=splits,
                embedding=embedding,
                persist_directory=persist_directory
            ) 

            # save the database so we can use it later
            vectordb.persist()
            return vectordb
            template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. 
            {context}
            Question: {question}
            Helpful Answer:"""

            QA_CHAIN_PROMPT = PromptTemplate.from_template(template)


            # Run chain
            qa_chain = RetrievalQA.from_chain_type(
                llm,
                retriever=vectordb.as_retriever(),
                return_source_documents=True,
                chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
            )

            print(qa_chain["result"])
            
        # elif url:
        #     print('Creating from URL')
        #     loader = WebBaseLoader([url])
        #     # Creating index / embeddings from loaders
        #     index = VectorstoreIndexCreator(
        #         vectorstore_kwargs={
        #             "persist_directory": path + "agent_" + title
        #         }
        #     ).from_loaders([loader])


  


        # Run chain
        # chain = RetrievalQA.from_chain_type(
        #     llm,
        #     retriever=vectordb.as_retriever(),
        #     return_source_documents=True,
        #     chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        # )
        
        # return QA_CHAIN_PROMPT



def get_answer(db_instance, query):
    qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=db_instance.as_retriever()
)

    result = qa_chain({"query": query})
    
    template = """You are a helpful assistant.
        Each message has a text, facialExpression, and animation property.
        The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
        The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry. 
    {context}
    Question: {query}
    Helpful Answer:"""

    QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
    
    qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=db_instance.as_retriever(),
    return_source_documents=True,
    chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
    )


    return result['result']

# create_dir("1")
# chain = initialize_chat_chain("1", fileName="1.txt")