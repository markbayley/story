
// Define the fetchStory function
export const fetchStory = async (prompt) => {
  console.log("prompt-internal", prompt)
 
    try {
      // Make a POST request to your API endpoint
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }), // Send the prompt as JSON
      });
      console.log("response", response)
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log("data-Story", data)
      // Return the story data
      return data; // Assuming the response contains the story
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching story:', error);
      throw error; // Re-throw the error for further handling
    }
  }
  
