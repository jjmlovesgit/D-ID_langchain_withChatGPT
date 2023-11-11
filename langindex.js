// langindex.js
document.addEventListener('DOMContentLoaded', () => {
    const userInputField = document.getElementById('user-input-field');
    const startButton = document.getElementById('talk-button');
    const responseContainer = document.getElementById('response-container'); // Ensure you have a container with this ID in your HTML
  
    startButton.addEventListener('click', async () => {
      const userInput = userInputField.value;
      try {
        const response = await fetch('http://localhost:3001/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
          });
          const responseData = await response.json();
          console.log(responseData);
          
          // Extract the 'text' property from the response
          const chatText = responseData.text.trim(); // This removes any leading/trailing whitespace
          console.log(chatText);
          
          // Update the response container with the chatText
          responseContainer.textContent = chatText; // Display the chatText in the response container
          
          // Dispatch a custom event with the chatText
          const chatResponseEvent = new CustomEvent('chatResponse', { detail: chatText });
          document.dispatchEvent(chatResponseEvent);
        
      } catch (error) {
        console.error('Error sending query to the server:', error);
        responseContainer.textContent = 'Error: Could not get a response.'; // Display error message
      }
    });
  });
  