
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnBkOTpQhoWPvRmkYu3um20oq3Dz5lmUU",
  authDomain: "cute-wedding-card.firebaseapp.com",
  projectId: "cute-wedding-card",
  storageBucket: "cute-wedding-card.firebasestorage.app",
  messagingSenderId: "492302424654",
  appId: "1:492302424654:web:e03f8fd2b9c07a5a61411f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);