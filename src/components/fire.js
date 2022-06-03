import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import  {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import  {getFirestore} from "firebase/firestore";
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  apiKey: "AIzaSyDOdCjtIHsRu9gYoEBPz0E2N72nLUWzPa8",
  authDomain:   "reacttodolist-6c3a7.firebaseapp.com",
  projectId: "reacttodolist-6c3a7", //不能用env
  storageBucket: "reacttodolist-6c3a7.appspot.com",
  messagingSenderId: "855620430698",
  appId: "1:855620430698:web:dc2d32b57abd2fb7c09313", //不能用en
  measurementId: "G-K22RCEESST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);


const auth = getAuth(app);

export {auth,storage}

// export function signup(email, password) {
//   return createUserWithEmailAndPassword(auth, email, password);
// }

// export function login(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

// export function logout() {
//   return signOut(auth);
// }

// // Custom Hook
// export function useAuth() {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
//     return unsub;
//   }, [])

//   return currentUser;
// }

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid );

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
  
}


export default (firebase, getFirestore())

