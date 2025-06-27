// /src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until auth is known

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log("Auth state changed:", currentUser); // 🔍 debug line
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const logout = () => signOut(auth);
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

const value = { user,  login, signup, logout, googleLogin, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

