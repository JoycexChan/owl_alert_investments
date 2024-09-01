// /src/scripts/sendStockAlertNotification.mjs
// 利用訪問令牌向FCM發送推送通知

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateAccessToken } from '../utils/generateAccessToken.mjs';
import fetch from 'node-fetch';



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