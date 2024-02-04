"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import {
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export const StatusBar = ({
  resetStory,
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  // console.log("uid", uid);
  // if (!user && !userSession) {
  //   router.push("/sign-up");
  // }

  const handleUser = () => {
    if (!user && !userSession) {
      router.push("/sign-in");
    } else {
      router.push("/sign-up");
    }
  };

  const currTime = new Date().toLocaleTimeString();
  return (
    <div className="text-white px-4 py-2 flex justify-between text-xs bg-sky-950">
      <button onClick={resetStory} className="px-2  hover:text-gray-500">
        <HomeIcon className="h-6 w-6 mx-2 hover:text-gray-500" />
        Home
      </button>
      {user ? (
        <div>
          <button className="hover:text-gray-500 mx-6">
            {" "}
            <CurrencyDollarIcon className="h-6 w-6 mx-2 " />
            Credits
          </button>
          <button
            className="hover:text-gray-500"
            onClick={() => {
              signOut(auth);
              sessionStorage.removeItem("user");
            }}
          >
            <UserCircleIcon className="h-6 w-6 mx-2 " />
            Log out
          </button>
        </div>
      ) : (
        <button onClick={handleUser}>
          <UserCircleIcon className="h-6 w-6 mx-2 " />
          Login
        </button>
      )}
    </div>
  );
};
