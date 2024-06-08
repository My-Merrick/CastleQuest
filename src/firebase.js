// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCuUfBE7VL77_GPPnrHeMN9Kek1fXkmjxE",
  authDomain: "real-estate-21f54.firebaseapp.com",
  projectId: "real-estate-21f54",
  storageBucket: "real-estate-21f54.appspot.com",
  messagingSenderId: "831748444336",
  appId: "1:831748444336:web:d3e9260d28767d27adeb75",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
