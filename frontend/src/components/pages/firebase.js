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
  authDomain: "content-guru-de5b9.firebaseapp.com",
  projectId: "content-guru-de5b9",
  storageBucket: "content-guru-de5b9.firebasestorage.app",
  messagingSenderId: "144329190439",
  appId: "1:144329190439:web:c155cdb4f622b3a316f202",
  measurementId: "G-L0KJGMCNJD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPhoneNumber, createUserWithEmailAndPassword };