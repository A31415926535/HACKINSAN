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
let pastConversations = [{role: "user", parts: "I had learned Chapter 1,1.1 Functions,1.2 Composite Functions,1.3 Inverse Functions,,Chapter 2,2.1 Quadratic Equations & Inequalities,2.2 Type of Roots of Quadratic Equations,2.3 Quadratic Functions,,Chapter 3,3.1 System of Linear Equations in Three Variables,,Chapter 4,4.1 Law of Indices,4.2 Law of Surds,4.3 Law of Logarithms,,Chapter 5,5.1 Arithmetic Progressions,5.2 Geometric Progressions,Chapter 6,6.1 Linear & Non-Linear Relations,6.2 Linear Law & Non-Linear Relations,6.3 Application of Linear Law,Chapter 7,7.1 Divisor of a Line Segment,7.2 Parallel Lines & Perpendicular Lines,7.3 Area of Polygons,7.4 Equations of Loci,,Chapter 8,8.1 Vectors,8.2 Addition & Subtraction of Vectors,8.3 Vectors in a Cartesian Plane,,Chapter 9,9.1 Sine Rule,9.2 Cosine Rule, 9.3 Area of Triangle, Chapter 10,10.1 Index Number, 10.2 Composite Index before. Later my question will be in one or multiple of these topics"}];
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

