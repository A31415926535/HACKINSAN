document.getElementById('sendBtn').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

let pastConversations = [];
let aitext = [];

function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    const chatDiv = document.getElementById('chat');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user');
    userMessageDiv.textContent = userInput;
    chatDiv.appendChild(userMessageDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight;

    // Clear input field immediately after sending message
    document.getElementById('userInput').value = '';

    pastConversations.push({role: "user", parts: [userInput]});

    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ past_conversations: pastConversations })
    })
    .then(response => response.json())
    .then(data => {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.classList.add('message', 'ai');
        aiMessageDiv.textContent = data.output;
        chatDiv.appendChild(aiMessageDiv);
        chatDiv.scrollTop = chatDiv.scrollHeight;

        pastConversations.push({role: "model", parts: [data.output]});
        aitext.push(data.output);
        speak(data.output);
    })
    .catch(error => console.error('Error:', error));
}