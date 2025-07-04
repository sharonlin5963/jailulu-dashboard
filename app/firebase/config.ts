import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKUrSG2JF9fR04MRbev_qzRHVq40J55go",
  authDomain: "jailulu-store-769a0.firebaseapp.com",
  projectId: "jailulu-store-769a0",
  storageBucket: "jailulu-store-769a0.firebasestorage.app",
  messagingSenderId: "448350652423",
  appId: "1:448350652423:web:d3ca622a4e00e95bfcc2a2",
  measurementId: "G-K8W0HBV8SC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
