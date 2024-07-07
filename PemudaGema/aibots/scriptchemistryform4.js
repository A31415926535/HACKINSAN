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
let pastConversations = [{role: "user", parts: "I am a student who recently study about Chapter 2,2.1 Basic Concept of Matter,2.2 The Development of the Atomic Model2.3 Structure of the Atom,2.4 Isotopes & Uses,,Chapter 3,3.1 Relative Atomic Mass & Relative Molecula Mass,3.2 Mole Concept,3.3 Chemical Formulae,3.4 Chemical Equations,,Chapter 4,4.1 Development if Periodic Table of Elements,4.2 The Arrangement of Elements in Modern Periodic Table of Elements,4.3 Elements in Group 18,4.4 Elements in Group 1,4.5 Elements in Group 17,4.6 Elements in Period 3,4.7 Transition Elements,,Chapter 5,5.1 Basic Formation of Compounds,5.2 Ionic Bond,5.3 Covalent Bond,5.4 Hydrogen Bond,5.5 Dative Bond ,5.6 Metallic Bond ,5.7 Ionic & Covalent Compounds only."}];
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

