/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzLudwMfREssLJfgWtbF7be7W3mvJqW_Q",
  authDomain: "dentiste-ebaa6.firebaseapp.com",
  projectId: "dentiste-ebaa6",
  storageBucket: "dentiste-ebaa6.firebasestorage.app",
  messagingSenderId: "105184438866",
  appId: "1:105184438866:web:1df1cf904515851fb44d8b",
  measurementId: "G-4C89Y02J0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();

export const db = getFirestore(app);

export default app;