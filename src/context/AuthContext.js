// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC3AFIJqvxIChApgZoLFT8Qg8fI59mUiAA",
    authDomain: "owl-alert-investments.firebaseapp.com",
    projectId: "owl-alert-investments",
    storageBucket: "owl-alert-investments.appspot.com",
    messagingSenderId: "754544126727",
    appId: "1:754544126727:web:15d52b521ae1b4b6c1f3a2",
    measurementId: "G-KMHVVJ1GTX"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const register = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    return (
        <AuthContext.Provider value={{ user, register, login }}>
            {children}
        </AuthContext.Provider>
    );
};
