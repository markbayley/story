"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SignIn from "@/app/sign-in/page";
import SignUp from "@/app/sign-up/page";
import Profile from "@/app/profile/page";
import pic7 from "/public/pic7.jpg";
import { UserIcon } from "@heroicons/react/24/outline";


const OnBoarding = ({ userStatus, setUserStatus }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 ">
          <UserIcon className="h-6 w-6  " />
          Login
          <ChevronDownIcon className="-mr-1 h-5 w-5 " aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-24 md:right-40 z-10 mt-2 w-56 origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {!userStatus ? (
              <SignIn userStatus={userStatus} setUserStatus={setUserStatus} />
            ) : (
              <SignUp userStatus={userStatus} setUserStatus={setUserStatus} />
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const StatusBar = ({
  resetStory,
  message,
  setMyBooks,
  setUserId,
  setMyStoriesSelected,
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
      <div className="mt-3 text-base animate-pulse">{message}</div>
      {user ? (
        <div>
          <Profile
            user={user}
            setMyBooks={setMyBooks}
            setUserId={setUserId}
            setMyStoriesSelected={setMyStoriesSelected}
          />
       
        </div>
      ) : (
        <OnBoarding userStatus={userStatus} setUserStatus={setUserStatus} />
      )}
    </div>
  );
};
