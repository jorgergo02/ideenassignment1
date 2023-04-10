// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVfV7Sh6NF1Tc3nE9EMYbL23CmZCFUCP0",
  authDomain: "ideen-assignment.firebaseapp.com",
  projectId: "ideen-assignment",
  storageBucket: "ideen-assignment.appspot.com",
  messagingSenderId: "447491657035",
  appId: "1:447491657035:web:0cfcf39df7dc5d69b4ecce",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);
export const storage = getStorage(FirebaseApp);
