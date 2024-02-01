"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";



import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const StatusBar = ({
  message,
  resetStory,
  loading,
  setLoading,
  open,
  setOpen,
  handleSaveBook,
  getBooksForUser,
  userId
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  // console.log({ user });



  // if (user) {
  //   const uid = user.uid;
  //   console.log("uid", uid)
  // }



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
      {/* Reset Button */}
      {/* <HomeIcon className="h-6 w-6 mx-2 hover:text-gray-500" /> */}








      <button
        onClick={resetStory}
        className="px-2  text-white hover:text-gray-500"
      >
        <ArrowPathIcon className="h-6 w-6 mx-2 " />
        Clear
      </button>
  
      <button>
        {" "}
        <CurrencyDollarIcon className="h-6 w-6 mx-2 hover:text-gray-500" />
        Credits
      </button>
      {/* Reset Button */}


      <button
        onClick={handleSaveBook}
        className="text-white px-2 hover:text-gray-500"
      >
         <ArrowUpTrayIcon className="h-6 w-6 mx-2 " />
        Save
      </button>

      <button
        onClick={() => getBooksForUser(userId)}
        className="text-white px-2  hover:text-gray-500"
      >
         <HomeIcon className="h-6 w-6 mx-2 hover:text-gray-500" />
        Fetch
      </button>




      {open ? (
        <button
          onClick={() => setOpen(false)}
          className="px-2  text-white hover:text-gray-500"
        >
          <XMarkIcon className="h-6 w-6 " />
          Close
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-2 text-white hover:text-gray-500"
        >
          <BookOpenIcon className="h-6 w-6 mx-2" />
          Open
        </button>
      )}

      {user ? (
        <button
          onClick={() => {
            signOut(auth);
            sessionStorage.removeItem("user");
          }}
        >
          <UserCircleIcon className="h-6 w-6 mx-2 hover:text-gray-500" />
          Log out
        </button>
      ) : (
        <button onClick={handleUser}><UserCircleIcon className="h-6 w-6 mx-2 hover:text-gray-500" />Login</button>
      )}
    </div>
  );
};
