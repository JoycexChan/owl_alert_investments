// src/firebase.ts
// src 資料夾：用來放置應用的主要邏輯和功能模組，涵蓋應用的配置、核心功能、API 調用等。
// 前端的 Firebase 初始化檔案
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage, Messaging} from "firebase/messaging";
import { storeNotification } from './services/notificationService';  // 導入 storeNotification 函數

//  Firebase 配置
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
// 如果應用尚未初始化 (!getApps().length)，就會呼叫 initializeApp(firebaseConfig) 進行初始化，否則直接返回已初始化的應用 (getApps()[0])
export function initializeFirebaseApp(): FirebaseApp {
  return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
}

// 導出 app 變數(允許訪問firebase的服務，不需重複初始化)
const app: FirebaseApp = initializeFirebaseApp(); 

// 獲取 Firestore 資料庫(讀寫資料庫資料)
const db: Firestore = getFirestore(app);

// 客戶端初始化 Firebase Messaging(FCM)
// 初始化 Firebase Messaging 並導出
let messaging: Messaging | null = null;

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  messaging = getMessaging(app);

  // 確保 messaging 不為 null
  if (messaging) {
    // 請求使用者同意接收通知
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // 獲取 FCM Token，使用非空斷言操作符
        getToken(messaging!, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY as string })
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

      // 儲存通知到 Firestore
      if (payload.notification && payload.notification.title && payload.notification.body) {
        storeNotification({
          title: payload.notification.title,
          body: payload.notification.body
        });
      }

      // 使用瀏覽器內建的通知 API
      if (Notification.permission === 'granted') {
        new Notification(notificationTitle, notificationOptions);
      }
    });
  }
}

// 導出 app, db 和 messaging 變數
export { app, db, messaging };

//messaging 是與 Firebase Cloud Messaging (FCM) 互動的工具，允許管理通知、請求權限和獲取 Token 的實例。這些功能是實現 Web 推送通知的核心部分。
