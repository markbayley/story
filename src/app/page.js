"use client";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { fetchStory } from "./api/openai/fetchStory";
import { fetchImages } from "./api/stability/fetchImages";
import { StatusBar } from "../components/StatusBar";
import { StoryForm } from "../components/StoryForm";
import { StoryDisplay } from "../components/StoryDisplay";
import { BottomNavigation } from "../components/BottomNavigation";
import { myBooks } from "./firebase/data.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  increment,
  doc,
  onSnapshot,
  arrayUnion,
  getDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

export default function StoryPage() {
  const [userId, setUserId] = useState();

  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const audioRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dismiss, setDismiss] = useState(false);

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [unsavedBook, setUnsavedBook] = useState([]);

  const [myStories, setMyStories] = useState(true);


  useEffect(() => {
    fetchUserBooks();
    fetchAllBooks();
  }, [userId]); // Fetch books on component mount or when userId changes

  // useEffect(() => {
  //   if (audio) {
  //     audioRef.current.play();
  //   }
  // }, [audio]);

  ////////////// CREATE BOOK ///////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prompt) {
      setMessage("No Prompt Entered!");
      return;
    }
    if (prompt.length < 10) {
      setMessage("Prompt Too Short!");
      return;
    }
    resetStory();
    setPrompt(prompt);
    try {
      setMessage("Writing Story...");

      setLoading(true);
      const storyData = await fetchStory(prompt);
      setMessage("Story Created!");
      setStory(storyData.story);
      //console.log("storyData", storyData, "story", story);
      const storyTitle = extractTitleFromStory(storyData.story);
      console.log("storyTitle", storyTitle);
      setOpen(true);

      setMessage("Creating Images...");
      const imageData = await fetchImages(storyData.story);
      setImages(imageData.images);
      //console.log("imageData.images", imageData.images);
      setMessage("Images Finished!");

      // Uncomment if you want to fetch audio
      // const audioUrl = await fetchAudio(storyData.story);
      // setAudio(audioUrl);
      setUnsavedBook([storyData.story, imageData.images]);
      //console.log("UnsavedBook", unsavedBook);
    } catch (error) {
      console.error("Error:", error);
      setMessage("No Credits");
      setLoading(false);
    }
    setMessage("Storybook Created!");
    setLoading(false);
  };

  const extractTitleFromStory = (story) => {
    const titleEndIndex = story.indexOf("Once upon a time");
    if (titleEndIndex === -1) {
      // Handle the case where the phrase is not found
      return "Untitled_" + new Date().getTime();
    }
    // Extract the first three words as the title
    return story
      .substring(4, titleEndIndex)
      .trim()
      .split(" ")
      .slice(0, 2)
      .join(" ");
  };

  ///////////////// SAVE BOOK //////////////////

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
  const uploadImages = async (images, userId) => {
    const storage = getStorage();
    const bookId = generateBookId();
    let imageUrls = [];

    for (const image of images) {
      const uniqueImageId = `${bookId}_${Date.now()}`; // Ensure unique ID for each image
      const imageRef = ref(
        storage,
        `images/${userId}/${bookId}/${uniqueImageId}`
      );
      await uploadBytes(imageRef, image); // Ensure the image is awaited
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    return { bookId, imageUrls };
  };

  const handleSaveBook = async () => {
    if (books.length >= 12) {
      setMessage("Maximum Books Saved!");
      return;
    }
    setProcessing(true);
    setMessage("Saving Storybook...");
    try {
      const validImages = images.filter((image) => image != null); // Filter out undefined or null images
      const convertedImages = validImages.map((base64Image) =>
        base64ToBlob(base64Image, "image/jpeg")
      );
      //console.log("Converted images for upload:", convertedImages);
      const { bookId, imageUrls } = await uploadImages(convertedImages, userId);

      // Now use bookId and imageUrls to save the book's data to Firestore
      await saveBookToFirestore(userId, story, imageUrls, bookId);
      // After saving the book, refetch the books list
      fetchUserBooks();
    } catch (error) {
      setMessage("Error Saving Book:", error);
      setProcessing(false);
    }
    setProcessing(false);
    setMessage("Storybook Saved!");
  };

  const saveBookToFirestore = async (userId, story, imageUrls) => {
    const db = getFirestore();
    const likedBy = []
    const likes = 0
    const book = {
      userId,
      likes,
      likedBy,
      story,
      imageUrls,
      createdAt: new Date(),
    };
    //console.log("Saving book with image URLs:", imageUrls);
    await addDoc(collection(db, "books"), book);
  };

  const base64ToBlob = (base64, mimeType = "image/jpeg") => {
    if (!base64) {
      console.error(
        "base64ToBlob was called with an undefined or null argument."
      );
      return null;
    }

    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  ///////////// RETRIEVE BOOKS /////////////////

  const fetchUserBooks = async () => {
    if (userId) {
      const fetchedBooks = await getBooksForUser(userId);
      setBooks(fetchedBooks);
    }
  };

  const getBooksForUser = async (userId) => {
    const db = getFirestore();
    const q = query(collection(db, "books"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return books;
  };

  const fetchAllBooks = async () => {
    const fetchedBooks = await getAllBooks(userId);
    setAllBooks(fetchedBooks);
  };

  const getAllBooks = async () => {
    const db = getFirestore();
    const q = query(collection(db, "books"));
    const querySnapshot = await getDocs(q);
    let allBooks = [];
    querySnapshot.forEach((doc) => {
      allBooks.push({ id: doc.id, ...doc.data() });
    });
    return allBooks;
  };


  /////////////// LIKE UPDATE BOOK


  const handleLikeBook = async (bookId, userId) => {
    if (userId === selectedBook.userId) {
      setMessage("Can't Like Own Book!");
      return;
    }
  
    try {
      await fetchBookById(bookId, userId); // Now passing userId
        // Assuming likes are directly updated in the UI without refetching from Firestore
      
      // UI logic as previously described
    } catch (error) {
      setMessage("Can't Like Book Twice!")
      console.error("Error liking book: ", error);
    }
   
  };
  


  const fetchBookById = async (bookId, userId) => {
    const db = getFirestore();
    const bookRef = doc(db, "books", bookId);
  
    const docSnap = await getDoc(bookRef);
    if (docSnap.exists()) {
      const bookData = docSnap.data();

      // if (selectedBook && selectedBook.id === bookId) {
      //   setSelectedBook({...selectedBook, likes: (selectedBook.likes || 0) + 1});
      // }
      // Check if the user has already liked the book
      if (bookData.likedBy && !bookData.likedBy.includes(userId)) {
        // Update the document to add the user to the likedBy array and increment likes
        setSelectedBook({...selectedBook, likes: (selectedBook.likes || 0) + 1});
        await updateDoc(bookRef, {
          likedBy: arrayUnion(userId),
          likes: increment(1),
        });
        setMessage("Book Liked!");
        fetchAllBooks();
      } else {
        setMessage("Already Liked!");
        // Optionally handle this case in the UI, e.g., by showing a message
      }
    } else {
      console.log("No such document!");
    }
  };





  
  

  //////////////// REMOVE BOOK ///////////////

  const handleDeleteBook = async (bookId) => {
    setMessage("Deleting Book...");
    try {
      await deleteBookFromFirestore(bookId);

      // Remove the book from the local state to update the UI
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Failed to delete book:", error);
      // Optionally handle the error, e.g., show an error message to the user
    }
    setMessage("Book Deleted!");
  };

  const deleteBookFromFirestore = async (bookId) => {
    const db = getFirestore();

    // Get a reference to the book document
    const bookRef = doc(db, "books", bookId);

    console.log("Deleting book with ID:", bookId);

    // Delete the document
    await deleteDoc(bookRef);
  };

  //////////////// VIEWING BOOKS /////////////////

  const handlePreviewClick = (bookId) => {
    console.log("bookId", bookId);

    const book = books.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setMessage("");
    setOpen(true);
    setPage(0);
  };

  const handlePreviewAll = (bookId) => {
    console.log("bookId", bookId);
    const book = allBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setMessage("");
    setOpen(true);
    setPage(0);
  };

  const handleOpen = () => {
    setSelectedBook(unsavedBook[0], unsavedBook[1]);
    // setStory(unsavedBook[0])
    // setImages(unsavedBook[1])
    setOpen(true);
    setDismiss(false);
  };

  const resetStory = () => {
    setStory("");
    setImages([]);
    setAudio("");
    setPrompt("");
    setMessage("");
    setOpen(false);
    setLoading(false);
    setProcessing(false);
    setPage(0);
    setSelectedBook(null);
    setDismiss(false);
  };

  console.log("userId", userId)

  return (
    <>
      <div className="bg-[url('../../public/background4.png')] bg-cover min-h-screen overflow-hidden">
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
          processing={processing}
          story={story}
        />

        <div>
          {!open ? (
            <>
              <StoryForm
                setLoading={setLoading}
                loading={loading}
                setOpen={setOpen}
                prompt={prompt}
                setPrompt={setPrompt}
                handleSubmit={handleSubmit}
                message={message}
                story={story}
                handleOpen={handleOpen}
                setMessage={setMessage}
              />

              <BottomNavigation
                myBooks={myBooks}
                books={books}
                allBooks={allBooks}
                extractTitleFromStory={extractTitleFromStory}
                handlePreviewClick={handlePreviewClick}
                handlePreviewAll={handlePreviewAll}
                loading={loading}
                processing={processing}
                handleDeleteBook={handleDeleteBook}
                myStories={myStories}
                setMyStories={setMyStories}
                handleLikeBook={handleLikeBook}
                userId={userId}
              />
            </>
          ) : (
            <StoryDisplay
              story={story}
              storyUnsaved={unsavedBook[0]}
              imagesUnsaved={unsavedBook[1]}
              storySelected={selectedBook?.story}
              imagesSelected={selectedBook?.imageUrls}
              handleLikeBook={handleLikeBook}
              page={page}
              setPage={setPage}
              resetStory={resetStory}
              audio={audio}
              audioRef={audioRef}
              loading={loading}
              setOpen={setOpen}
              handleSaveBook={handleSaveBook}
              processing={processing}
              message={message}
              books={books}
              dismiss={dismiss}
              setDismiss={setDismiss}
              selectedBook={selectedBook}
              userId={userId}
            
            />
          )}
        </div>
      </div>
    </>
  );
}
