// src/firebase.ts
// src 資料夾：用來放置應用的主要邏輯和功能模組，涵蓋應用的配置、核心功能、API 調用等。
// 前端的 Firebase 初始化檔案

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

// 初始化 FCM
const messaging = getMessaging(app);

// 請求使用者同意接收通知
getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY as string })
  .then((currentToken) => {
    if (currentToken) {
      console.log("FCM token:", currentToken);
      // 這裡可以將 token 送到後端或保存起來
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });

// 監聽前景消息
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // 自行處理前景通知顯示邏輯
});

