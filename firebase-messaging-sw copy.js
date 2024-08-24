// firebase-messaging-sw.js

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Firebase 設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Firebase Cloud Messaging
const messaging = getMessaging(app);

// 處理接收到的背景通知
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // 自定義通知顯示邏輯
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // 你可以使用你自己的圖標
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
