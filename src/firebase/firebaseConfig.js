import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFg5iSQLwxZJnnispb7yGFhvsDJeMEqmU",
  authDomain: "beauty-shop-react.firebaseapp.com",
  projectId: "beauty-shop-react",
  storageBucket: "beauty-shop-react.firebasestorage.app",
  messagingSenderId: "950059981991",
  appId: "1:950059981991:web:125fee52e55831c6c38f82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);