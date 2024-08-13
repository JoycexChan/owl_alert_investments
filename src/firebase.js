// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 你的 Firebase 配置
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

// 獲取 Firestore 資料庫
export const db = getFirestore(app);
