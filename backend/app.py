from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import the necessary functions from tripai.py
from tripai import create_llm_prompt, call_langchain

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    try:
        filters = request.json
        print("Received filters:", filters)

        llm_prompt = create_llm_prompt(filters)
        itinerary_response = call_langchain(llm_prompt)

        print("Itinerary Response:", itinerary_response)
        return jsonify(itinerary_response)
    except Exception as e:
        print("An error occurred: ", str(e))
        return jsonify({"error": str(e)}), 500


@app.route('/')
def index():
    return "Flask backend is running!"

if __name__ == '__main__':
    app.run(debug=True)
