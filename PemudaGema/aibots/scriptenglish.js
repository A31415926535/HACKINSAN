// If the user clicks the button, send the message to the AI
document.getElementById('sendBtn').addEventListener('click', function() {
    sendMessage();
});

// If the user presses Enter, send the message to AI
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();

        // Clear input field
        document.getElementById('userInput').value = '';
    }
});

// Initialize past conversations
let pastConversations = [{role: "user", parts: "I am going to write an essay around 250 words (5 paragraph). You need to guide me one-by-one on each paragraph on what to write and check my grammar after writing too. If my essay is too simple, tell me some better vocabulary to use and explain the meaning too"}];
let aitext = [];

function speak(word) {
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(word);
  
    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice
  
    // Speak the text
    speechSynthesis.speak(utterance);
}

// Message sending function
function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    // Display user message
    const chatDiv = document.getElementById('chat');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user');
    userMessageDiv.textContent = userInput;
    chatDiv.appendChild(userMessageDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight;

    // Add user input to past conversations
    pastConversations.push({role: "user", parts: [userInput]});

    // Send user input and past conversations to API
    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ past_conversations: pastConversations })
    })
    .then(response => response.json())
    .then(data => {
        // Display AI response
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.classList.add('message', 'ai');
        aiMessageDiv.textContent = data.output;
        chatDiv.appendChild(aiMessageDiv);
        chatDiv.scrollTop = chatDiv.scrollHeight;


        // Add AI response to past conversations
        pastConversations.push({role: "model", parts: [data.output]});
        aitext.push(data.output);
        speak(data.output);

        // Clear input field
        document.getElementById('userInput').value = '';
    })
    .catch(error => console.error('Error:', error));
}

