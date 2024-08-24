// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

  
  // 初始化 Firebase 應用
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  // 創建一個 Context 對象
  export const AuthContext = createContext();
  
  // Hook 用於在組件中訪問 Context
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
  
      const logout = async () => {
          try {
              await signOut(auth);
              setUser(null); // 更新應用狀態，設置用戶為 null
          } catch (error) {
              console.error('Error signing out:', error);
          }
      };
  
      // 包含登入、註冊和登出功能
      const value = {
          user,
          register,
          login,
          logout
      };
  
      return (
        <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
  