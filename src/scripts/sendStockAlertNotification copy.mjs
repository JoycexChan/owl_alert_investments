// /src/scripts/sendStockAlertNotification.mjs
// 利用訪問令牌向FCM發送推送通知


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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 股價警報
async function sendStockAlertNotification(userId, stockCode, price) {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const fcmToken = userDoc.data().fcmToken;

    if (!fcmToken) return;

    const message = {
        message: {
            token: fcmToken,
            notification: {
                title: `Stock Alert for ${stockCode}`,
                body: `Current price: ${price} has triggered your alert.`
            }
        }
    };

    const url = `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`;
    const accessToken = await generateAccessToken();
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(message)
        });
        const responseData = await response.json();
        console.log(`Notification sent for stock ${stockCode}:`, responseData);
    } catch (error) {
        console.error(`Error sending stock alert notification:`, error);
    }
}

export { sendStockAlertNotification };