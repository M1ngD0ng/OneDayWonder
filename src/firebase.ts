// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXzqldPgS4OGGCySq8xaRdWzvRv4D3vEs",
  authDomain: "onedaywonder-88d57.firebaseapp.com",
  projectId: "onedaywonder-88d57",
  storageBucket: "onedaywonder-88d57.appspot.com",
  messagingSenderId: "16006336517",
  appId: "1:16006336517:web:0e6979089033dc660a0c6c",
  measurementId: "G-S39JD0XNYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const auth=getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);