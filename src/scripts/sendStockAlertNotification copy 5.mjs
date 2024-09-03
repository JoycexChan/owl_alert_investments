// /src/scripts/sendStockAlertNotification.mjs
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
}

async function sendStockAlertNotification(userId) {
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
            title: `Stock Alert`,
            body: `One or more of your stock alerts have been triggered.`
        }
    };

    try {
        const response = await admin.messaging().send(message);
        console.log(`Notification sent successfully to user ${userId}:`, response);
    } catch (error) {
        console.error(`Error sending stock alert notification to user ${userId}:`, error);
    }
}

export { sendStockAlertNotification };


// 假設已有一個有效的用戶ID和股票代碼，以及一個觸發通知的價格
sendStockAlertNotification('GiKCudHVBeMq94Ejw1xV96YZZ6T2')
    .then(() => console.log("Notification test completed"))
    .catch((error) => console.error("Notification test failed", error));
