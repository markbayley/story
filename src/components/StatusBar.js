"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import Profile from "@/app/profile/page";
import pic7 from "/public/pic7.jpg";
import { AuthDisplay } from "../app/auth/page";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";



export const StatusBar = ({
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
    <div className="text-white px-4 py-2 flex justify-between text-xs fixed top-0 w-full z-20 md:bg-transparent bg-gray-900">
      <div onClick={resetStory} className="flex cursor-pointer">
        <Image
          src={pic7}
          alt="logo"
          className="rounded-full h-10 w-10 xs:ml-2 ml-0"
        />
      </div>
    { message != "" &&  <div onClick={() => setMessage({ text: "", type: "" })} className={` pr-7 flex relative items-center lg:ml-20 text-[16px] cursor-pointer  hover:text-gray-500 hover:border-gray-500 ${messageColor(message.type)} rounded-full rounded-bl-lg  bg-gray-800 shadow-lg `}>
<InformationCircleIcon className="h-6 w-6 mx-2"/> {message.text}<XMarkIcon  className="h-4 w-4 absolute top-1 right-2  "/></div> }
      {user ? (
        <div>
          <Profile
            user={user}
            setMyBooks={setMyBooks}
            setUserId={setUserId}
            setMyStoriesSelected={setMyStoriesSelected}
            setMessage={setMessage}
          />
        </div>
      ) : (
        <AuthDisplay userStatus={userStatus} setUserStatus={setUserStatus} />
      )}
    </div>
  );
};
