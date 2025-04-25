import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuSuALKGklwny4G4C8ULt4wteeRPyEgx8",
  authDomain: "loggin-app-e6e16.firebaseapp.com",
  projectId: "loggin-app-e6e16",
  storageBucket: "loggin-app-e6e16.firebasestorage.app",
  messagingSenderId: "581547549833",
  appId: "1:581547549833:web:790dc718b4b8ef78345258",
  measurementId: "G-23JFJME4EM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);      
export const db = getFirestore(app);   