import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// YAHAN APNA FIREBASE CONFIG PASTE KAREIN JO CONSOLE SE MILA THA
const firebaseConfig = {
  apiKey: "AIzaSyDKHVEmbah1fKOt6uHLLaMZ8isa23LlboE",
  authDomain: "gaming-pro-ff123.firebaseapp.com",
  projectId: "gaming-pro-ff123",
  storageBucket: "gaming-pro-ff123.firebasestorage.app",
  messagingSenderId: "285801800056",
  appId: "1:285801800056:web:a67a54728bf1f90371e88d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth aur Database ko export kar rahe hain taaki pure app me use kar sakein
export const auth = getAuth(app);
export const db = getFirestore(app);