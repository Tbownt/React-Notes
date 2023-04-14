// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKLAijHkhV9ieSY7phu_0VRjvfrxS4Npc",
  authDomain: "react-notes-35b72.firebaseapp.com",
  projectId: "react-notes-35b72",
  storageBucket: "react-notes-35b72.appspot.com",
  messagingSenderId: "549899526613",
  appId: "1:549899526613:web:4c992e19a31e8aa4491d5c",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
