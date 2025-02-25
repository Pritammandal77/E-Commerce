// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "metamart-store.firebaseapp.com",
  projectId: "metamart-store",
  storageBucket: "metamart-store.firebasestorage.app",
  messagingSenderId: "348471729987",
  appId: "1:348471729987:web:f83193e1a8dc753584d9f6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider();

