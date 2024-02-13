// import { db } from "@/app/firebase/config";
import { collection, addDoc,  getFirestore } from "firebase/firestore";

import { useState } from "react";

const Contact = ({ setMessage }) => {
  const [displayName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const db = getFirestore();
    // Ensure all fields are filled
    if (!displayName.trim() || !email.trim() || !content.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Reference to the "messages" collection in Firestore
      const docRef = await addDoc(collection(db, "messages"), {
        name: displayName,
        email: email,
        content: content,
        createdAt: new Date(), // Optional: add a timestamp
      });

      // Reset form fields after successful submission
      setName("");
      setEmail("");
      setContent("");

      // Optionally set a success message
      setMessage("Your message has been sent successfully!");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Error sending your message. Please try again.");
    }
  };

  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-2 pb-6 rounded-lg shadow-xl w-80 md:w-96 ">
      <h6 className="text-white text-[16px] mb-5">Your Message</h6>
      <input
        type="text"
        placeholder="Name"
        value={displayName}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
        onKeyDown={(e) => e.stopPropagation()}
      />
      <textarea
        type="text"
        rows={3}
        placeholder="Say Something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
        onKeyDown={(e) => e.stopPropagation()}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4  rounded outline-none text-black placeholder-gray-500 bg-white text-[15px]"
        onKeyDown={(e) => e.stopPropagation()}
      />

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 text-[15px]"
      >
        Send Message
      </button>
    </div>
  );
};

export default Contact;
