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

// 初始化 Firebase 應用，只在第一次調用時進行初始化
export function initializeFirebaseApp(): FirebaseApp {
  return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
}

export const app: FirebaseApp = initializeFirebaseApp(); // 這裡導出 app 變數

// 獲取 Firestore 資料庫
export const db: Firestore = getFirestore(app);

// 只在客戶端初始化 Firebase Messaging
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const messaging = getMessaging(app);

  // 請求使用者同意接收通知
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      // 獲取 FCM Token
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
          console.error('An error occurred while retrieving token: ', err);
        });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });

  // 監聽前景消息
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    const notificationTitle = payload.notification?.title || 'No title';
    const notificationOptions = {
      body: payload.notification?.body || 'No body',
      icon: '/firebase-logo.png'
    };

    // 使用瀏覽器內建的通知 API
    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }
  });
}
