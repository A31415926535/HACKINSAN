// If the user click the button, send the message to the ai
document.getElementById('sendBtn').addEventListener('click', function() {
    sendMessage();
});

// If the user press enter, send the message to ai
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

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

    // Send user input to API
    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display AI response
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.classList.add('message', 'ai');
        aiMessageDiv.textContent = data.output;
        chatDiv.appendChild(aiMessageDiv);
        chatDiv.scrollTop = chatDiv.scrollHeight;

        // Clear input field
        document.getElementById('userInput').value = '';
    })
    .catch(error => console.error('Error:', error));
}
