// /src/scripts/sendNotification.mjs
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

async function sendNotificationToUsers() {
    console.log("DB instance type: ", db.constructor.name);  // 打印 db 实例的类型

    const url = `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`;
    const accessToken = await generateAccessToken();

    try {
        const usersCollection = collection(db, 'users'); // 使用刚创建的 db 实例
        const userDocs = await getDocs(usersCollection);

        const headers = {
            'Authorization': `Bearer ${accessToken.token}`,
            'Content-Type': 'application/json',
        };

        userDocs.forEach(doc => {
            const fcmToken = doc.data().fcmToken;

            const body = JSON.stringify({
                message: {
                    token: fcmToken,
                    notification: {
                        title: 'Hello User',
                        body: 'This is a personalized notification'
                    },
                    webpush: {
                        headers: {
                            Urgency: 'high'
                        },
                        fcm_options: {
                            link: 'http://localhost:3002/'
                        }
                    }
                }
            });

            fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(data => {
                console.log(`Notification sent to ${doc.id}:`, data);
            })
            .catch(error => {
                console.error(`Error sending notification to ${doc.id}:`, error);
            });
        });
    } catch (error) {
        console.error("Error interacting with Firestore:", error);
    }
}

sendNotificationToUsers();
