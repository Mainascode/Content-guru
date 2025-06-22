import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber
} from 'firebase/auth';


// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDtzaXrHSRpmz1G_g8bQBGzJHVEr5CvXzw",
  projectId: "content-guru-de5b9",
  storageBucket: "content-guru-de5b9.firebasestorage.app",
  messagingSenderId: "144329190439",
  appId: "1:144329190439:web:c155cdb4f622b3a316f202",
  measurementId: "G-L0KJGMCNJD",
  authDomain: process.env.NODE_ENV === 'development'
    ? 'localhost'
    : 'content-guru-de5b9.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPhoneNumber, createUserWithEmailAndPassword };