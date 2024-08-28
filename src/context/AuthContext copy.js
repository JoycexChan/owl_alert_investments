// /src/context/AuthContext.js
// Firebase 初始化：程式碼首先初始化 Firebase 應用，並配置身份驗證和 Firestore 資料庫。
// Context API：通過 Context API，程式碼創建了一個全局的身份驗證上下文，讓應用中的其他組件可以方便地訪問和管理用戶的身份狀態。
// 用戶狀態管理：通過 useEffect 監聽用戶的身份變化，並在用戶登入時執行相關的操作，如獲取 FCM token 並將其儲存到 Firestore 中。
// 身份驗證功能：提供了註冊、登入和登出功能，並將這些功能通過 Context API 提供給應用中的其他組件。
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getToken } from 'firebase/messaging';
import { doc, setDoc } from 'firebase/firestore';
import { app, db, messaging } from '../firebase'; // 從 firebase.ts 導入已初始化的 app, db, messaging


// 創建一個 Context 對象
export const AuthContext = createContext();

// Hook 用於在組件中訪問 Context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app); // 使用已初始化的 app 獲取 auth
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // 確保這段代碼只在客戶端執行
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {

          // 當用戶登入時取得 FCM Token 並儲存到 Firestore
          try {
            const fcmToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
            if (fcmToken) {
              await setDoc(doc(db, 'users', user.uid), { fcmToken }, { merge: true });
              console.log('FCM Token stored successfully:', fcmToken);
            } else {
              console.log('No FCM Token retrieved');
            }
          } catch (error) {
            console.error('Error retrieving FCM Token:', error);
          }
        }
      } else {
        setUser(null);
      }
    });
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
    setUser,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
