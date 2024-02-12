"use client";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import {
  Cog6ToothIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  UserMinusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Settings from "./settings";
import Image from "next/image";
import Contact from "./contact";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = ({ user, setMessage }) => {
  const [settings, setSettings] = useState(false);
  const [contact, setContact] = useState(false);


  return (
    <>
      <Menu as="div" className="relative inline-block text-left z-20">
        <div className="hover:text-gray-400 text-white">
          <Menu.Button className=" inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 ">
            {user.photoURL ? (
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/story-60f4f.appspot.com/o/images%2FKtAsHWHSvmfJGHfGe61TIcNFAn83%2Fbook_1706741630951%2Fundefined?alt=media&token=1cb22fa9-a474-4a0d-b9ce-4b5a50f4348e"
                }
                width={30}
                height={30}
                alt="logo"
                className="rounded-full border-2 border-indigo-600 xs:ml-2 ml-0"
              />
            ) : (
              <UserCircleIcon className="h-6 w-6  " />
            )}
            <span className="">{user.displayName}</span>

            <ChevronDownIcon className="-mr-1 h-5 w-5  " aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-80 md:w-96 origin-top-right rounded-lg bg-sky-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
               
               
                   <div className="flex justify-between w-full">
                  <a
                    href="#"
                    className={"flex items-center bg-sky-950 text-white  px-4 py-2 text-sm"} >
                 
                    <div>
                      {" "}
                      Signed in as
                      <span className="flex  font-semibold"> {user.email}</span>
                    </div>
                  </a>
                
                    <button
                      type="submit"
                      onClick={() => {
                        signOut(auth);
                        sessionStorage.removeItem("user");
                      }}
                  
                       className= "flex items-center text-white px-4 py-2 m-4 rounded-md bg-indigo-600 hover:bg-indigo-500  justify-center border-b-2 border-stone-700"
                  
                    >
                      <UserMinusIcon className="h-6 w-6 mr-2 " /> Sign Out
                    </button>
                   </div>
              
               
              </Menu.Item>
              <hr className="h-px my-1 bg-gray-700 border-0" />
              <Menu.Item>
                {({ active }) => (
                 <>
                    <a  onClick={() => { setSettings(!settings); setContact(false) }}
                      href="#"
                      className={classNames(
                        active
                          ? "flex items-center bg-sky-900 text-white"
                          : "flex items-center bg-sky-950 text-white",
                        "block px-4 py-2 text-sm hover:text-gray-400"
                      )}
                    >
                  <Cog6ToothIcon className="h-6 w-6 mr-2" /> Settings   <ChevronDownIcon className="-mr-1 h-5 w-5  " aria-hidden="true" />
                    </a>
                  
                <div> { settings ? <Settings setMessage={setMessage} /> : ""}</div></>
                )}

              </Menu.Item>
              <Menu.Item>
              {({ active }) => (
                 <>
                    <a  onClick={() => { setContact(!contact); setSettings(false) }}
                      href="#"
                      className={classNames(
                        active
                          ? "flex items-center bg-sky-900 text-white"
                          : "flex items-center bg-sky-950 text-white",
                        "block px-4 py-2 text-sm hover:text-gray-400"
                      )}
                    >
                  <EnvelopeIcon className="h-6 w-6 mr-2" /> Contact   <ChevronDownIcon className="-mr-1 h-5 w-5  " aria-hidden="true" />
                    </a>
                  
                <div> { contact ? <Contact setMessage={setMessage} /> : ""}</div></>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "flex items-center bg-sky-900 text-white"
                        : "flex items-center bg-sky-950 text-white",
                      "block px-4 py-2 text-sm mb-2"
                    )}
                  >
                    <CurrencyDollarIcon className="h-6 w-6 mr-2" /> Credits
                  </a>
                )}
              </Menu.Item>
              {/* <hr className="h-px my-1  bg-gray-700 border-0" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={() => {
                      signOut(auth);
                      sessionStorage.removeItem("user");
                    }}
                    className={classNames(
                      active
                        ? "flex items-center bg-sky-900 text-white"
                        : "flex items-center bg-sky-950 text-white",
                      "flex w-full px-4 py-4 text-sm"
                    )}
                  >
                    <UserMinusIcon className="h-6 w-6 mr-2 " /> Sign out
                  </button>
                )}
              </Menu.Item> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Profile;
