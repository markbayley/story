"use client"
// Import necessary libraries
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { fetchStory } from './api/openai/fetchStory'; 
import { fetchImages } from './api/stability/fetchImages'; 
import { StatusBar } from '../components/StatusBar'
import { StoryForm } from '../components/StoryForm'
import { StoryDisplay } from '../components/StoryDisplay'
import { BottomNavigation } from '../components/BottomNavigation'


// Main Component
export default function StoryPage() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState("Welcome");
  const [page, setPage] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audio) {
      audioRef.current.play();
    }
  }, [audio]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        setMessage("Creating Story");
        const storyData = await fetchStory(prompt);
        setStory(storyData.story);

        setMessage("Creating Image");
        const imageData = await fetchImages(storyData.story);
        setImages(imageData.images);
      

      // Uncomment if you want to fetch audio
      // const audioUrl = await fetchAudio(storyData.story);
      // setAudio(audioUrl);

      setMessage("Story Created");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error in creating story or fetching images");
  }
  };

  const resetStory = () => {
    setStory("");
    setImages([]);
    setAudio("");
    setPrompt("");
    setMessage("Welcome");
  };

  return (
    <>
      <div className="bg-[url('../../public/background.png')] bg-cover min-h-screen">
        {/* Status Bar */}
        <StatusBar message={message} />

        {/* Content Card */}
        <div>
          {!story ? <StoryForm prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} message={message} />
            : <StoryDisplay story={story} images={images} page={page} setPage={setPage} resetStory={resetStory} audio={audio} audioRef={audioRef} />}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </>
  );
}


