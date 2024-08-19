import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 你的 Firebase 配置
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// 初始化 Firebase 應用，檢查是否已經初始化過
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 獲取 Firestore 資料庫
export const db = getFirestore(app);
