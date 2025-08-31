// src/firebase.ts
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // ❌ raus
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBn-dkLQ8UwFEjPA8XVsoWJv1ju2Uy9UI",
  authDomain: "starttiers.firebaseapp.com",
  projectId: "starttiers",
  storageBucket: "starttiers.firebasestorage.app",
  messagingSenderId: "305411517307",
  appId: "1:305411517307:web:fff2b36f0fa450be786bde",
  measurementId: "G-0LLEMSLMGV"
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app); // ❌ raus

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;