// /src/dist/firebase.js// /src/dist/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { generateAccessToken } from '../utils/generateAccessToken.mjs';
import fetch from 'node-fetch';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function initializeFirebaseApp() {
  return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
}

const app = initializeFirebaseApp();
const db = getFirestore(app);  // 确保在 Node.js 环境中正确初始化 Firestore

module.exports = { app, db };
