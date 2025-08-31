// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBBn-dkLQ8UwFEjPA8XVsoWJv1ju2Uy9UI",
  authDomain: "starttiers.firebaseapp.com",
  projectId: "starttiers",
  storageBucket: "starttiers.firebasestorage.app",
  messagingSenderId: "305411517307",
  appId: "1:305411517307:web:fff2b36f0fa450be786bde",
  measurementId: "G-0LLEMSLMGV"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Services exportieren
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;