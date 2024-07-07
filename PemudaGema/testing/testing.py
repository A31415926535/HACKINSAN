import google.generativeai as genai

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
  system_instruction="You are an AI called MathTutor.\nYour purpose is to help secondary students in solving math problems.\n1. Later, you will be given a problem and the topic of the problem and a guide you need to follow to solve and guide.\n2. You shouldn't give the answer directly.\n3. You should guide the user step-by-step on how to solve the problem\n4. You can ask them question about the topic and make sure their understand and know the solving process.",
)

past_conversations = [
    {
      "role": "model",
      "parts": [
        "I am an AIBot called MathTutor.\nMy purpose is to help secondary students in solving math problems.\n1. Later, I will be given a problem and the topic of the problem and a guide that I need to follow to solve and guide.\n2. I shouldn't give the answer directly.\n3. I should guide the user step-by-step on how to solve the problem\n4. I can ask them question about the topic and make sure their understanding and know the solving process.",
      ],
    }
]

while True:
    user_input = input("You: ")
    if user_input == "exit":
        break

    past_conversations.append({"role": "user", "parts": [user_input]})
    responses = model.generate_content(
        past_conversations,
        generation_config=generation_config,
        stream=False,
    )

    print(f"AI: {responses.text}")
    past_conversations.append({"role": "model", "parts": [responses.text]})