import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhyJSZJErkiePpCXwtuQaltdcJPWnUPKA",
  authDomain: "kiningo-8df4e.firebaseapp.com",
  databaseURL: "https://kiningo-8df4e-default-rtdb.firebaseio.com",
  projectId: "kiningo-8df4e",
  storageBucket: "kiningo-8df4e.appspot.com",
  messagingSenderId: "984454687422",
  appId: "1:984454687422:web:b81e879925bd6ed67e8cef",
  measurementId: "G-EBRKCVK065"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCYRc1eYInK2COMvfzuTmKqd9P-oQEF97Q",
//   authDomain: "care-481f4.firebaseapp.com",
//   projectId: "care-481f4",
//   storageBucket: "care-481f4.appspot.com",
//   messagingSenderId: "110159354719",
//   appId: "1:110159354719:web:fdab4d4a7111e4a5a1f4ea"
// };

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = firebase.auth();
export const storage = getStorage();