"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const SignIn = ({ setUserStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
    
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-6 pb-16 rounded-lg shadow-xl w-80 md:w-96">
      <h1 className="text-white text-2xl mb-5">Sign In</h1>
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
        onClick={handleSignIn}
        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
      >
        Sign In
      </button>
      <p className="text-sm pt-4">
        Don't have an account? Create account
        <a
          onClick={() => setUserStatus(true)}
          className="text-indigo-500 hover:text-indigo-400 cursor-pointer"
        >
          {" "}
          here
        </a>
      </p>
    </div>
  );
};

export default SignIn;
