import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Firebase 配置，這裡假設你已經把金鑰直接放入代碼，稍後再使用環境變數
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

// 初始化 FCM
const messaging = getMessaging(app);

// 請求使用者同意接收通知
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');

    // 獲取 FCM Token
    getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" }).then((currentToken) => {
      if (currentToken) {
        console.log('FCM token:', currentToken);
        // 這裡你可以將 token 發送到後端服務器保存起來
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });
  } else {
    console.log('Unable to get permission to notify.');
  }
});
