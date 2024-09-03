// /src/scripts/sendStockAlertNotification.mjs
// 利用 Firebase Admin SDK 來發送股票價格警報的通知給用戶
// 查詢 Firebase Firestore 數據庫(users)以userId獲取用戶的 FCM 通知令牌。
//如果找到令牌，則構建通知內容並通過 Firebase Cloud Messaging 發送。
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// 初始化Firebase Admin(認證與數據庫URL)
if (!admin.apps.length) {
    console.log("Attempting to initialize Firebase Admin...");
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    console.log("Firebase Admin initialized successfully.");
} else {
    console.log("Firebase Admin already initialized.");
}

// 定義發送通知的函數
// 查詢 Firebase Firestore 數據庫獲取用戶的 FCM 通知令牌
// 如果找到令牌，則構建通知內容並通過 Firebase Cloud Messaging 發送
async function sendStockAlertNotification(userId, stockCode, price) {
    console.log(`Preparing to send notification for stock ${stockCode} to user ${userId}...`);
    const firestore = admin.firestore();
    const userDocRef = firestore.doc(`users/${userId}`);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
        console.log(`No user found with ID: ${userId}`);
        return;
    }

    const fcmToken = userDoc.data().fcmToken;
    if (!fcmToken) {
        console.log(`No FCM token found for user: ${userId}`);
        return;
    }

    const message = {
        token: fcmToken,
        notification: {
            title: `Stock Alert for ${stockCode}`,
            body: `Current price: ${price} has triggered your alert.`
        }
    };

    try {
        console.log("Sending notification...");
        const response = await admin.messaging().send(message);
        console.log(`Notification sent successfully for stock ${stockCode}:`, response);
    } catch (error) {
        console.error(`Error sending stock alert notification for ${stockCode}:`, error);
    }
}

export { sendStockAlertNotification };


// 假設已有一個有效的用戶ID和股票代碼，以及一個觸發通知的價格
sendStockAlertNotification('GiKCudHVBeMq94Ejw1xV96YZZ6T2', '1101.TW', 100)
    .then(() => console.log("Notification test completed"))
    .catch((error) => console.error("Notification test failed", error));
