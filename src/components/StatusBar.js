"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import Profile from "@/app/profile/page";
import pic7 from "/public/pic7.jpg";
import { AuthDisplay } from "./AuthDisplay";
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

  return (
    <div className="text-white px-4 py-2 flex justify-between text-xs fixed top-0 w-full z-20 md:bg-transparent bg-gray-900">
      <div onClick={resetStory} className="flex cursor-pointer">
        <Image
          src={pic7}
          alt="logo"
          className="rounded-full h-10 w-10 xs:ml-2 ml-0"
        />
      </div>
    { message != "" &&  <div onClick={() => setMessage("")} className="animate-pulse pr-7 flex relative items-center lg:ml-20 text-[16px] cursor-pointer  hover:text-gray-500 hover:border-gray-500 text-amber-500 rounded-full rounded-bl-lg  bg-gray-800 shadow-lg  ">
<InformationCircleIcon className="h-6 w-6 mx-2"/> {message}<XMarkIcon  className="h-4 w-4 absolute top-1 right-1  "/></div> }
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
