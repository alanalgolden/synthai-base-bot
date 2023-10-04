import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,

  authDomain: "base-db-76ad9.firebaseapp.com",

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    process.env.FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,

  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { db, auth, googleAuthProvider };
