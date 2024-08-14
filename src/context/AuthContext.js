// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
  