"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const SignUp = ({ setUserStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [photoURL, setPhotoURL] = useState('');
  // const [updateProfile, updating, error] = useUpdateProfile(auth);

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      // const update = await useUpdateProfile(displayName);
      // console.log({ update });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-6 pb-16 rounded-lg shadow-xl w-80 md:w-96 ">
      <h1 className="text-white text-2xl mb-5">Sign Up</h1>
      {/* <input
        type="text"
        placeholder="Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      /> */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <button
        onClick={handleSignUp}
        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
      >
        Sign Up
      </button>
      <p className="text-sm pt-4">
        Already have an account? Sign in
        <a
          onClick={() => setUserStatus(false)}
          className="text-indigo-500 hover:text-indigo-400 cursor-pointer"
        >
          {" "}
          here
        </a>
      </p>
    </div>
  );
};

export default SignUp;
