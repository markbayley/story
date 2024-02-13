"use client";
import { useEffect, useRef, useState } from "react";
import { fetchStory } from "./api/openai/fetchStory";
import { fetchImages } from "./api/stability/fetchImages";
import { StatusBar } from "../components/StatusBar";
import { StoryForm } from "../components/StoryForm";
import { StoryDisplay } from "../components/StoryDisplay";
import { StorySelector } from "../components/StorySelector";
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
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

export default function StoryPage() {
  const [userId, setUserId] = useState();

  const [prompt, setPrompt] = useState("");
  const [storyUnsaved, setStoryUnsaved] = useState("");
  const [imagesUnsaved, setImagesUnsaved] = useState([]);
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState({ text: `Welcome`, type: "like" });

  const [page, setPage] = useState(0);
  const audioRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const [unsaved, setUnsaved] = useState(false);

  const [myBooks, setMyBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  // const [unsavedBook, setUnsavedBook] = useState([]);
  const [myStoriesSelected, setMyStoriesSelected] = useState(false);
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0);

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
      setMessage({text: "No Prompt Entered!", type: "info"});
      return;
    }
    if (prompt.length < 10) {
      setMessage({text: "Prompt Too Short!", type: "info"});
      return;
    }
    resetStory();
    setPrompt(prompt);
    try {
      setMessage({text: "Writing Story...", type: "create"});

      setLoading(true);
      const storyData = await fetchStory(prompt);
      setMessage({text: "Story Created!", type: "create"});
      setStoryUnsaved(storyData.story);
      //console.log("storyData", storyData, "story", story);
      const storyTitle = extractTitleFromStory(storyData.story);
      console.log("storyTitle", storyTitle);
      setOpen(true);

      setMessage({text: "Creating Images...", type: "create"});
      const imageData = await fetchImages(storyData.story);
      setImagesUnsaved(imageData.images);
      //console.log("imageData.images", imageData.images);
      setMessage({text: "Images Finished!", type: "create"});

      // Uncomment if you want to fetch audio
      // const audioUrl = await fetchAudio(storyData.story);
      // setAudio(audioUrl);
      //setUnsavedBook([storyData.story, imageData.images, storyTitle]);
      //console.log("UnsavedBook", unsavedBook);
      setMessage({text: "Save Your Story", type: "save"});
      setLoading(false);
      setUnsaved(true);
    } catch (error) {
      console.error("Error:", error);
      setMessage({text: "No Credits!", type: "error"});
      setLoading(false);
    }
   
  };

  const extractTitleFromStory = (storyText) => {
    const titleEndIndex = storyText.indexOf("Once upon a time");
    if (titleEndIndex === -1) {
      // Handle the case where the phrase is not found
      return "Untitled_" + new Date().getTime();
    }
    // Extract the first three words as the title
    return storyText
      .substring(4, titleEndIndex)
      .trim()
      .split(" ")
      .slice(0, 3)
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
  const uploadImages = async (imagesUnsaved, userId) => {
    const storage = getStorage();
    const bookId = generateBookId();
    let imageUrls = [];

    for (const image of imagesUnsaved) {
      const uniqueImageId = `${bookId}_${Date.now()}`; // Ensure unique ID for each image
      const imageRef = ref(
        storage,
        `images/${userId}/${bookId}/${uniqueImageId}`
      );
      setMessage({text: "Saving Images...", type: "save"});
      await uploadBytes(imageRef, image); // Ensure the image is awaited
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    return { bookId, imageUrls };
  };

  const handleSaveBook = async () => {
    if (myBooks.length >= 12) {
      setMessage({text: "Maximum Books Saved!", type: "save"});
      return;
    }
    setProcessing(true);
    setDismiss(true)
    setMessage({text: "Saving Storybook...", type: "save"});
    try {
      const validImages = imagesUnsaved.filter((image) => image != null); // Filter out undefined or null images
      const convertedImages = validImages.map((base64Image) =>
        base64ToBlob(base64Image, "image/jpeg")
      );
      //console.log("Converted images for upload:", convertedImages);
      const { bookId, imageUrls } = await uploadImages(convertedImages, userId);

      // Now use bookId and imageUrls to save the book's data to Firestore
      await saveBookToFirestore(userId, storyUnsaved, imageUrls, bookId);
      // After saving the book, refetch the books list
      fetchUserBooks();
    } catch (error) {
      setMessage({text: "Error Saving Book!", type: "save"});
      setProcessing(false);
    }
    setProcessing(false);
    setMessage({text: "Storybook Saved!", type: "create"});
    setUnsaved(false);
  };

  const saveBookToFirestore = async (userId, storyUnsaved, imageUrls) => {
    const db = getFirestore();
    const creatorName = user.displayName;
    const creatorPhotoURL = user.photoURL;
    const story = storyUnsaved;
    const likedBy = [];
    const likes = 0;
    const book = {
      userId,
      likes,
      likedBy,
      story,
      imageUrls,
      creatorName,
      creatorPhotoURL,
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
      setMyBooks(fetchedBooks);
      //setMessage({text: "My Books Fetched!", type: "success"});
    }
  };

  const getBooksForUser = async (userId) => {
    const db = getFirestore();
    const q = query(collection(db, "books"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let myBooks = [];
    querySnapshot.forEach((doc) => {
      myBooks.push({ id: doc.id, ...doc.data() });
    });
    return myBooks;
  };

  const fetchAllBooks = async () => {
    const fetchedBooks = await getAllBooks(userId);
    setAllBooks(fetchedBooks);
    //setMessage({text: "All Books Fetched", type: "success"});
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
  //|| myBooks[0]?.userId
  const handleLikeBook = async (bookId, userId) => {
    if (userId === selectedBook?.userId) {
      setMessage({text: "Can't Like Own Book!", type: "like"});
      return;
    }

    try {
      await fetchBookById(bookId, userId); // Now passing userId
      // Assuming likes are directly updated in the UI without refetching from Firestore

      // UI logic as previously described
    } catch (error) {
      setMessage( setMessage({text: "Can't Like Book Twice!", type: "like"}));
      console.error("Error liking book: ", error);
    }
    fetchAllBooks();
  };

  const fetchBookById = async (bookId, userId) => {
    const db = getFirestore();
    const bookRef = doc(db, "books", bookId);

    const docSnap = await getDoc(bookRef);
    if (docSnap.exists()) {
      const bookData = docSnap.data();

      // Check if the user has already liked the book
      if (bookData.likedBy && !bookData.likedBy.includes(userId)) {
        // Update the document to add the user to the likedBy array and increment likes
        setSelectedBook({
          ...selectedBook,
          likes: (selectedBook.likes || 0) + 1,
          likedBy: [...(selectedBook.likedBy || []), userId], // Also optimistically update the likedBy array
        });
        await updateDoc(bookRef, {
          likedBy: arrayUnion(userId),
          likes: increment(1),
        });
        setMessage({text: "Book Liked!", type: "like"});
       
      } else {
        setMessage({text: "Already Liked!", type: "like"});
        // Optionally handle this case in the UI, e.g., by showing a message
      }
    } else {
      console.log("No such document!");
    }
  };

  //////////////// REMOVE BOOK ///////////////

  const handleDeleteBook = async (bookId) => {
    setMessage({text: "Deleting Book...", type: "delete"});
    try {
      await deleteBookFromFirestore(bookId);

      // Remove the book from the local state to update the UI
      const updatedBooks = myBooks.filter((book) => book.id !== bookId);
      setMyBooks(updatedBooks);
    } catch (error) {
      setMessage({text: "Failed To Delete Book", type: "delete"});
      // Optionally handle the error, e.g., show an error message to the user
    }
    setMessage({text: "Book Deleted", type: "delete"});
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

  const handlePreviewMine = (bookId) => {
    const book = myBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setMessage("");
    setOpen(true);
    setPage(0);
  };

  const handlePreviewAll = (bookId) => {
    const book = allBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setMessage("");
    setOpen(true);
    setPage(0);
  };

  const handleOpen = () => {
    setSelectedBook(storyUnsaved, imagesUnsaved);
    setOpen(true);
    setDismiss(false);
  };

  const resetStory = () => {
    setStoryUnsaved("");
    setImagesUnsaved([]);
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

 console.log("userId:", userId, "selectedBook?.likedBy:", selectedBook?.likedBy);

  return (
    <>
      <div className="bg-[url('../../public/background5.png')] bg-cover bg-fixed min-h-screen overflow-hidden no-scroll ">
        <StatusBar
          message={message}
          resetStory={resetStory}
          setMyBooks={setMyBooks}
          setUserId={setUserId}
          setMyStoriesSelected={setMyStoriesSelected}
          setMessage={setMessage}
        />

        <div className="mx-0 lg:mx-[10%] no-scroll pt-16">
          {!open ? (
            <>
              <StoryForm
                loading={loading}
                prompt={prompt}
                setPrompt={setPrompt}
                handleSubmit={handleSubmit}
                handleOpen={handleOpen}
                setMessage={setMessage}
                storyUnsaved={storyUnsaved}
              />

              <StorySelector
                myBooks={myBooks}
                allBooks={allBooks}
                extractTitleFromStory={extractTitleFromStory}
                handlePreviewMine={handlePreviewMine}
                handlePreviewAll={handlePreviewAll}
                myStoriesSelected={myStoriesSelected}
                setMyStoriesSelected={setMyStoriesSelected}
                handleLikeBook={handleLikeBook}
                userId={userId}
                handleDeleteBook={handleDeleteBook}
                setMessage={setMessage}
                currentSliceIndex={currentSliceIndex}
                setCurrentSliceIndex={setCurrentSliceIndex}
                selectedBook={selectedBook}
              />
            </>
          ) : (
            <StoryDisplay
              storyUnsaved={storyUnsaved}
              imagesUnsaved={imagesUnsaved}
              storySelected={selectedBook?.story}
              imagesSelected={selectedBook?.imageUrls}
              page={page}
              setPage={setPage}
              audio={audio}
              audioRef={audioRef}
              setOpen={setOpen}
              handleSaveBook={handleSaveBook}
              processing={processing}
              myBooks={myBooks}
              dismiss={dismiss}
              setDismiss={setDismiss}
              handleLikeBook={handleLikeBook}
              selectedBook={selectedBook}
              userId={userId}
              setMessage={setMessage}
              extractTitleFromStory={extractTitleFromStory}
              loading={loading}
              handleDeleteBook={handleDeleteBook}
              message={message}
              unsaved={unsaved}
            />
          )}
        </div>
      </div>
    </>
  );
}
