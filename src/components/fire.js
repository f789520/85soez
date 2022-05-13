// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AU,
  projectId: "reacttodolist-6c3a7", //不能用env
  storageBucket: process.env.REACT_APP_ST,
  messagingSenderId: process.env.REACT_APP_ME,
  appId: "1:855620430698:web:dc2d32b57abd2fb7c09313", //不能用en
  measurementId: process.env.REACT_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

export default (firebase, getFirestore())

