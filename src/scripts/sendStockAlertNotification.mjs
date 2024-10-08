// /src/scripts/sendStockAlertNotification.mjs
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV !== 'development') {
//     dotenv.config();
// } else {
//     dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
// }

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

console.log("Environment Variables:", {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? "Loaded" : "Not Loaded"
});


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
    console.log("Firebase Admin initialized successfully.");
} else {
    console.log("Firebase Admin already initialized.");
}

async function sendStockAlertNotification(userId) {
    console.log(`Preparing to send notification to user ${userId}...`);
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
        console.log("Sending notification...");
        const response = await admin.messaging().send(message);
        console.log(`Notification sent successfully to user ${userId}:`, response);
    } catch (error) {
        console.error(`Error sending stock alert notification to user ${userId}:`, error);
        if (error.errorInfo && error.errorInfo.code === 'messaging/registration-token-not-registered') {
            console.log(`The token for user ${userId} is no longer valid and needs to be updated.`);
        }
    }
}

export { sendStockAlertNotification };


// 假設已有一個有效的用戶ID和股票代碼，以及一個觸發通知的價格
sendStockAlertNotification('GiKCudHVBeMq94Ejw1xV96YZZ6T2')
    .then(() => console.log("Notification test completed"))
    .catch((error) => console.error("Notification test failed", error));
