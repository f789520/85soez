 import  {initializeApp} from "firebase/app"; 
import  {getFirestore} from "firebase/firestore";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth,   updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  apiKey:"AIzaSyBFRknRxjE73VTK-j3F-BCBO0AZ3F2qXQ4",
  authDomain:"soez-web.firebaseapp.com",
  projectId: "soez-web", //不能用env
  storageBucket:  "soez-web.appspot.com",
  messagingSenderId: "1018811025124",
  appId: "1:1018811025124:web:cd15f60a4d37d8ad8a4ef1", //不能用en 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
firebase.initializeApp(firebaseConfig);
const storage = getStorage(app); 
const auth = getAuth(app); 
export {auth,storage} 

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

