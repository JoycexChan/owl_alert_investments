// src/firebase.ts
// src 資料夾：用來放置應用的主要邏輯和功能模組，涵蓋應用的配置、核心功能、API 調用等。
// 前端的 Firebase 初始化檔案

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// 你的 Firebase 配置
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
};

// 初始化 Firebase 應用，檢查是否已經初始化過
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 獲取 Firestore 資料庫
export const db: Firestore = getFirestore(app);




// src/firebase.js
// src 資料夾：用來放置應用的主要邏輯和功能模組，涵蓋應用的配置、核心功能、API 調用等。
// 後端的 Firebase 初始化檔案

// import { initializeApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// 你的 Firebase 配置
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };

// 初始化 Firebase 應用，檢查是否已經初始化過
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 獲取 Firestore 資料庫
// export const db = getFirestore(app);
