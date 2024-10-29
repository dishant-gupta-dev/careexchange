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


// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = firebase.auth();
export const storage = getStorage();