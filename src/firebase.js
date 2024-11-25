import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzoBeAmJcinemKvbS5QbkTe0z7eY4d6g8",
  authDomain: "care-exchange.firebaseapp.com",
  projectId: "care-exchange",
  storageBucket: "care-exchange.appspot.com",
  messagingSenderId: "421355965445",
  appId: "1:421355965445:web:fdc83793e480c0d9e3206c",
  measurementId: "G-P1K83S8NYP"
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