"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import Profile from "@/app/profile/page";
import pic7 from "/public/pic7.jpg";
import { AuthDisplay } from "./AuthDisplay";


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
    <div className="text-white px-4 py-2 flex justify-between text-xs">
      <div onClick={resetStory} className="flex cursor-pointer">
        <Image
          src={pic7}
          width={40}
          height={40}
          alt="logo"
          className="rounded-full  xs:ml-2 ml-0"
        />
      </div>
    { message != "" &&  <div className="border-2 animate-pulse px-4 flex items-center lg:mr-[8vw] text-[15px] font-light text-white bg-orange-400  rounded-br-lg rounded-full hover:bg-orange-400 shadow-lg  border-gray-200">{message}</div> }
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
