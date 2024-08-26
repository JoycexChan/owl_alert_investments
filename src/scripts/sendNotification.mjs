// /src/scripts/sendNotification.mjs

import fetch from 'node-fetch';
import { generateAccessToken } from '../utils/generateAccessToken.mjs';

async function sendNotification() {
    const url = `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`;
    const accessToken = await generateAccessToken();
    
    const headers = {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
    };
    
    const body = JSON.stringify({
        message: {
            topic: 'your-topic',
            notification: {
                title: 'Hello World',
                body: 'This is a test notification'
            },
            webpush: {
                headers: {
                    Urgency: 'high'
                },
                fcm_options: {
                    link: 'https://your-link.com'
                }
            }
        }
    });
    
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });

    const data = await response.json();
    console.log('Notification sent:', data);
}

sendNotification();
