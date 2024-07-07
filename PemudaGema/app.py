from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure the AI model
genai.configure(api_key="AIzaSyDUkSEJbel5BrOJuQCLPKChvEQwVR1Pdow")

generation_config = {
    "temperature": 0,
    "top_p": 1,
    "top_k": 128,
    "max_output_tokens": 256,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    # safety_settings = Adjust safety settings
    # See https://ai.google.dev/gemini-api/docs/safety-settings
    system_instruction="You are an AI called AITutor.\nYour purpose is to help secondary students in solving problems.\n1. Later, you will be given a problem and the topic of the problem and the user will tell you the chapter of the problems.\n2. You shouldn't give the answer directly and you should guide the user step-by-step on how to solve the problem\n3. You must ask them question about the topic and make sure their understand and know the solving process. Hence, don't skip any solving process. \n 4. Mention the chapter if the user had told you, otherwise don't. \n 5. Make your response as short and simple as possible and don't use markdown code. Just conversation.",
)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    past_conversations = data['past_conversations']

    responses = model.generate_content(
        past_conversations,
        stream=False,
    )

    ai_response = responses.text.strip()
    return jsonify({'output': ai_response})

if __name__ == '__main__':
    app.run(debug=True)
