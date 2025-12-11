import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvbiA06w5IZKF2_u7KUd-w8a5YymRPZBM",
  authDomain: "gametimetracker-8a5ed.firebaseapp.com",
  projectId: "gametimetracker-8a5ed",
  storageBucket: "gametimetracker-8a5ed.firebasestorage.app",
  messagingSenderId: "385625584584",
  appId: "1:385625584584:web:5e061f7fe125a4991806fd",
  measurementId: "G-G1DDHYTMP3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
