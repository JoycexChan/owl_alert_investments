// src/firebaseAdmin.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载 .env.local 文件
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });


console.log("Loaded Environment Variables:");
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("FIREBASE_PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY ? "Loaded" : "Not Loaded");


try {
  if (!admin.apps.length) {
    console.log("Initializing Firebase Admin with the following credentials:");
    console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
    console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: "https://owl-alert-investments-default-rtdb.firebaseio.com"
    });

    console.log("Firebase Admin initialized successfully.");
  }
} catch (error) {
  console.error("Failed to initialize Firebase Admin:", error);
}

export default admin;
