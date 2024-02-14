"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import Profile from "@/app/profile/page";
import pic7 from "/public/pic7.jpg";
import { AuthDisplay } from "../app/auth/page";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";



export const FooterNav = ({
  resetStory,
  message,
  setMyBooks,
  setUserId,
  setMyStoriesSelected,
  setMessage
}) => {
  const [user] = useAuthState(auth);
  const [userStatus, setUserStatus] = useState(false);

  const messageColor = (type) => {
    switch (type) {
      case "save":
        return "text-rose-500";
      case "like":
        return "text-teal-500";
      case "delete":
        return "text-rose-600";
        case "error":
          return "text-red-600";
        case "info":
          return "text-indigo-500";
          case "create":
            return "text-amber-500";
      default:
        return "text-amber-500"; // Default color
    }
  };
  

  return (
    <div className="text-gray-300 px-2 py-2 flex justify-around text-xs fixed bottom-0 w-full z-20  bg-gray-900">
   
 <div>Contact</div>
 <div>Terms & Conditions</div>
 <div>About Us</div>
    </div>
  );
};