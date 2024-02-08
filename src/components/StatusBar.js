"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import pic7 from "/public/pic7.jpg";

import {
  Cog6ToothIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
 function Profile() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ">
    
            <UserCircleIcon className="h-6 w-6 text-white hover:text-gray-400 " />
      
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-white hover:text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'flex items-center bg-gray-100 text-gray-900' : 'flex items-center text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                   <Cog6ToothIcon className="h-6 w-6 mr-2" /> Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'flex items-center bg-gray-100 text-gray-900' : 'flex items-center text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <EnvelopeIcon className="h-6 w-6 mr-2 " /> Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'flex items-center bg-gray-100 text-gray-900' : 'flex items-center text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <CurrencyDollarIcon className="h-6 w-6 mr-2" />  Credits
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={() => {
                      signOut(auth);
                      sessionStorage.removeItem("user");
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}


export const StatusBar = ({
  resetStory,
  message
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  //const userSession = sessionStorage.getItem("user");

  // console.log("uid", uid);
  // if (!user && !userSession) {
  //   router.push("/sign-up");
  // }

  const handleUser = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/sign-up");
    }
  };

  const currTime = new Date().toLocaleTimeString();
  return (
    <div className="text-white px-4 py-2 flex justify-between text-xs">
      <div onClick={resetStory} className="flex">
       <Image src={pic7} alt="logo" className="rounded-full h-10 w-10 xs:ml-2 ml-0" />
      {/* <button onClick={resetStory} className="hover:text-gray-500 ml-1">
        <HomeIcon className="h-6 w-6 mx-6 hover:text-gray-500" />
        Home
      </button> */}
      </div>
      <div className="mt-3 text-base animate-pulse">{message}</div>
      {user ? (
        <div>
          {/* <button className="hover:text-gray-500 mx-6">
            {" "}
            <CurrencyDollarIcon className="h-6 w-6 mx-2 " />
            Credits
          </button> */}
          {/* <button
            className="hover:text-gray-500 mr-2"
            onClick={() => {
              signOut(auth);
              sessionStorage.removeItem("user");
            }}
          >
            <UserCircleIcon className="h-6 w-6 mx-2" />
            Profile
          </button> */}

          <Profile />
        </div>
      ) : (
        <button onClick={handleUser} className="hover:text-gray-500 mr-2">
          <UserCircleIcon className="h-6 w-6 mx-2 " />
          Login
        </button>
      )}
    </div>
  );
};
