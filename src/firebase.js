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

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = firebase.auth();
export const storage = getStorage();