"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";


const [user] = useAuthState(auth);
const router = useRouter();
const userSession = sessionStorage.getItem("user");

console.log({ user });



if (user) {
  const uid = user.uid;
  console.log("uid", uid)
}