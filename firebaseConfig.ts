import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA09tBAzBvAlqbnxWQIutkKnCl7NRrRFwg",
  authDomain: "whatsapp-clone-6f50b.firebaseapp.com",
  projectId: "whatsapp-clone-6f50b",
  storageBucket: "whatsapp-clone-6f50b.appspot.com",
  messagingSenderId: "270608043349",
  appId: "1:270608043349:web:30b9b65cf2f39f844833dc",
  measurementId: "G-TTJZ8SRS41"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
