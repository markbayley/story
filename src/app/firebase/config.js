// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth}from 'firebase/auth'

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app =  !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
// const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);
// export const data = async function getStories(db) {
//     const storiesCol = collection(db, 'stories');
//     const storySnapshot = await getDocs(storiesCol);
//     const storyList = storySnapshot.docs.map(doc => doc.data());
//     return storyList;
//   }

export {app, auth, storage}

