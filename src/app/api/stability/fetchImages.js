
// Modify the fetchImages function to accept a story parameter
export const fetchImages = async (storyText) => {
    try {
        const response = await fetch("/api/stability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ story: storyText }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const imageData = await response.json();
        return imageData;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};
