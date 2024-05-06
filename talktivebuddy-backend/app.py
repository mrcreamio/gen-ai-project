from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import subprocess
import json
import base64
import openai
from datetime import datetime
import pocketsphinx
import bs4
from langchain import hub
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
import getpass
from io import BytesIO
from PIL import Image
import traceback
from langchain_community.vectorstores import FAISS


from ai_apis import ai

# Load environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "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"
# llm = ChatOpenAI(model="gpt-3.5-turbo-0125")



app = Flask(__name__)
app.register_blueprint(ai)
CORS(app)


# Convert splits to Document objects
def exec_command(command):
    """Executes a system command and returns the output."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Error executing {command}: {result.stderr}")
    return result.stdout

def lip_sync_message(message_index):
    """Converts an audio message to OGG format and generates lip sync data using Rhubarb."""
    exec_command(f'ffmpeg -y -i audios/message_{message_index}.mp3 audios/message_{message_index}.wav')
    current_date = datetime.now().date()
    date_str = current_date.strftime('%Y-%m-%d')
    print(f'conversion Done:  {date_str}.')
    print(os.path.dirname(pocketsphinx.__file__))
    exec_command(f'rhubarb -f json -o audios/message_{message_index}.json audios/message_{message_index}.wav -r phonetic')

def audio_file_to_base64(file_path):
    """Encodes an audio file to base64."""
    with open(file_path, 'rb') as audio_file:
        return base64.b64encode(audio_file.read()).decode()

def read_json_transcript(file_path):
    """Reads a JSON file and returns its content."""
    with open(file_path, 'r') as file:      
        return json.load(file)

@app.route("/")
def hello_world():
    return "Hello, World!"

# Extract text from a PDF file


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"messages": "No message provided", "status": 400}), 400

    try:
        messages = [
      {
        "role": "system",
        "content": "You are a helpful assistant. Each message has a text, facialExpression, and animation property. The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default. The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry."
      },]
        messages.append({
            "role": "user",
            "content": user_message,
        })
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
        )
        response_texts = completion.choices[0].message.content.strip().split('\n')  # Assuming multiple lines as multiple messages
        # print(response_texts['text'] , "response_text")

        responses = []
        for i, response_text in enumerate(response_texts):
            response_text = response_text.strip()  # Trim whitespace
            if not response_text:  # Skip empty responses
                print(f"Skipping empty response at index {i}.")
                continue
            # Generate audio from the response text
            try:
                audio_response = openai.audio.speech.create(
                    model="tts-1",
                    voice="alloy",
                    input=response_text,
                )
                print(audio_response,"audio response")
            except Exception as e:
                print(f"Failed to generate audio for response: {response_text}. Error: {e}")
                return jsonify({"error": str(e)}), 500
            print(dir(audio_response))
            audio_file_path = f"audios/message_{i}.mp3"
            with open(audio_file_path, "wb") as audio_file:
                audio_file.write(audio_response.content)


            # Process for lip sync
            lip_sync_message(i)

            responses.append({
                "text": response_text,  
                "audio": audio_file_to_base64(audio_file_path),
                "lipsync": read_json_transcript(f"audios/message_{i}.json"),
                # "facialExpression": "smile",
                # "animation": "Talking_0",
            })
            print(response_text , "Responces")  
        return jsonify({"messages": responses, "status": 200})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    # uoload files

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit file size to 16MB

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            # Process and create embeddings
            loader = PyPDFLoader(file_path ,extract_images=True)
            pages = loader.load_and_split()
            faiss_index = FAISS.from_documents(pages, OpenAIEmbeddings())
            docs = faiss_index.similarity_search("Write a horror story in 2 lines ", k=2)
            for doc in docs:
                print(str(doc.metadata["page"]) + ":", doc.page_content[:200])
            return jsonify({
                'message': 'Successfully uploaded and processed',
                'filename': filename,
                # 'embedded_chunks': len(splits),
                # 'vectorstore_info': vectorstore_info
            }), 200
        except Exception as e:
              print("Exception occurred:", str(e))
              traceback.print_exc()     
              return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'File type not permitted'}), 400
    

if __name__ == "__main__":

    app.run(port=3000, debug=True, threaded=True)



# ------------------priority tasks----------
#  after ile upload  extract data from Pdf file 
#  when file upload its create "unique " directory 
#  cromma dp   create embedded   and chating 
# -------------------low priority------------
# clean files of audio after use 
#   You will always reply with a JSON array of messages. With a maximum of 3 messages.
#         Each message has a text, facialExpression, and animation property.
#         The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
#         The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry