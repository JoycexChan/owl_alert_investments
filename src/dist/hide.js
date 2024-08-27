// src/firebase.js
// src 資料夾：用來放置應用的主要邏輯和功能模組，涵蓋應用的配置、核心功能、API 調用等。
// 前端的 Firebase 初始化檔案
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage, Messaging} from "firebase/messaging";

//  Firebase 配置
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 初始化 Firebase 应用，只在第一次调用时进行初始化
export function initializeFirebaseApp() {
    return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  }

// 导出 app 变量(允许访问 Firebase 的服务，不需重复初始化)
const app = initializeFirebaseApp(); 

// 获取 Firestore 数据库(读写数据库数据)
const db = getFirestore(app);

// 客户端初始化 Firebase Messaging(FCM)
// 初始化 Firebase Messaging 并导出
let messaging = null;


if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  messaging = getMessaging(app);

  // 確保 messaging 不為 null
  if (messaging) {
    // 請求使用者同意接收通知
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // 获取 FCM Token
        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM token:", currentToken);
              // FCM token在AuthContext.js送到後端儲存
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

    // 監聽前景消息(如果正在使用應用就不會出現FCM通知，避免干擾使用者體驗，需要額外處理訊息)
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
}

// 導出 app, db 和 messaging 變數
export { app, db, messaging };
