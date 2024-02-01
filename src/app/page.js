"use client";
// Import necessary libraries
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { fetchStory } from "./api/openai/fetchStory";
import { fetchImages } from "./api/stability/fetchImages";
import { StatusBar } from "../components/StatusBar";
import { StoryForm } from "../components/StoryForm";
import { StoryDisplay } from "../components/StoryDisplay";
import { BottomNavigation } from "../components/BottomNavigation";


import { myBooks } from "./data.js"

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

// Main Component
export default function StoryPage() {
  const [userId, setUserId] = useState();
  const [bookId, setBookId] = useState();

  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const audioRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (audio) {
      audioRef.current.play();
    }
  }, [audio]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setMessage("Creating Story...");
      setLoading(true);
      const storyData = await fetchStory(prompt);
      setStory(storyData.story);
      console.log("storyData", storyData, "story", story);

      setMessage("Creating Image...");
      const imageData = await fetchImages(storyData.story);
      setImages(imageData.images);
      console.log("imageData.images", imageData.images);

      // Extract title and save to local storage
      const storyTitle = extractTitleFromStory(storyData.story);
      console.log("storyTitle", storyTitle);

      // Uncomment if you want to fetch audio
      // const audioUrl = await fetchAudio(storyData.story);
      // setAudio(audioUrl);
    } catch (error) {
      console.error("Error:", error);
      setMessage("No Credits");
      setLoading(false);
    }
    setMessage("Story Created");
    setLoading(false);
  };

  const resetStory = () => {
    setStory("");
    setImages([]);
    setAudio("");
    setPrompt("");
    setMessage("");
  };

  const extractTitleFromStory = (story) => {
    const titleEndIndex = story.indexOf("Once upon a time");
    if (titleEndIndex === -1) {
      // Handle the case where the phrase is not found
      return "Untitled_" + new Date().getTime();
    }

    // Extract the first three words as the title
    return story
      .substring(0, titleEndIndex)
      .trim()
      .split(" ")
      .slice(0, 3)
      .join(" ");
  };

  /////////////////////////////////////////////////////

  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  // Function to generate a unique book ID
  const generateBookId = () => {
    return `book_${new Date().getTime()}`;
  };

  // Function to upload images
  const uploadImages = async (images) => {
    const storage = getStorage();
    const bookId = generateBookId();

    let imageUrls = [];

    for (const image of images) {
      const imageRef = ref(storage, `images/${userId}/${bookId}/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    return { userId, bookId, imageUrls };
  };

  console.log("images", images);

  const handleSaveBook = async () => {
    try {
      const validImages = images.filter((image) => image != null); // Filter out undefined or null images
      const convertedImages = validImages.map((base64Image) =>
        base64ToBlob(base64Image, "image/jpeg")
      );

      const { bookId, imageUrls } = await uploadImages(convertedImages);
      // Now use bookId and imageUrls to save the book's data to Firestore
      await saveBookToFirestore(userId, story, imageUrls, bookId);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const saveBookToFirestore = async (userId, story, imageUrls, bookId) => {
    const db = getFirestore();
    const book = {
      userId,
      bookId,
      story,
      imageUrls,
      createdAt: new Date(),
    };
    await addDoc(collection(db, "books"), book);
  };

  const base64ToBlob = (base64, mimeType = "image/jpeg") => {
    if (!base64) {
      console.error(
        "base64ToBlob was called with an undefined or null argument."
      );
      return null; // Or handle this case as appropriate for your application
    }

    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  ////

  const getBooksForUser = async (userId) => {
    const db = getFirestore();
    const q = query(collection(db, "books"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    console.log("books", books)
    setBooks(books)
    return books
     
  };






  return (
    <>
    

      <div className="bg-[url('../../public/background.png')] bg-cover min-h-screen">
        {/* Status Bar */}
        <StatusBar
          message={message}
          resetStory={resetStory}
          loading={loading}
          setLoading={setLoading}
          open={open}
          setOpen={setOpen}
          handleSaveBook={handleSaveBook}
          getBooksForUser={getBooksForUser}
          userId={userId}
        />

        {/* Main */}
        <div>
          {!open ? (
            <>
              <StoryForm
                setLoading={setLoading}
                setOpen={setOpen}
                prompt={prompt}
                setPrompt={setPrompt}
                handleSubmit={handleSubmit}
                message={message}
                story={story}
              />
               

      {/* Bottom Navigation */}
        <BottomNavigation myBooks={myBooks} books={books} extractTitleFromStory={extractTitleFromStory} />
            </>
          ) : (
            <StoryDisplay
              story={story}
              images={images}
              page={page}
              setPage={setPage}
              resetStory={resetStory}
              audio={audio}
              audioRef={audioRef}
              loading={loading}
            />
          )}
        </div>

      
      </div>
    </>
  );
}
