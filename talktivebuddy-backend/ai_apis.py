import os
# from utils import create_dir
from flask import Blueprint, request, jsonify
from utils import initialize_chat_chain, get_answer, create_dir, allowed_file
from werkzeug.utils import secure_filename


ai = Blueprint('ai', __name__)


@ai.route('/api/ai', methods=['POST'])
def create_embeddings():
    """Converts an audio file to text."""
    file = request.files['file']
    title = request.form.get('title')
    url = request.form.get('url')
    
    if not title or not file:
        return jsonify({"error": "Invalid data"}), 400
    create_dir(title)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = create_dir(title)  # Ensure the directory exists
        file.save(os.path.join(file_path, filename))
        initialize_chat_chain(title, fileName=filename)
        # check if directory exists and is not empty
         


    
    return jsonify({"message": "Chat chain initialized successfully"})


@ai.route('/api/ai', methods=['GET'])
def get_answers():
    title = request.form.get('title')
    if not title:
        return jsonify({"error": "Invalid data"}), 400
    print('Title: ', title)
    db_instance = initialize_chat_chain(title )
    answer = get_answer(db_instance, "Write a horror story in 2 lines.",)
    return jsonify({"message": "Chat chain initialized successfully", "query": "Return the title", answer: answer})