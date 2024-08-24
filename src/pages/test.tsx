import { useEffect, useState } from 'react';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { app } from '../firebase';

export default function TestPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const messaging = getMessaging(app);

    // 註冊前景消息處理器
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

      // 顯示通知
      const notificationTitle = payload.notification?.title || 'No title';
      const notificationOptions = {
        body: payload.notification?.body || 'No body',
        icon: '/firebase-logo.png'
      };

      if (Notification.permission === 'granted') {
        new Notification(notificationTitle, notificationOptions);
      } else {
        alert('Notification received: ' + notificationTitle);
      }
    });

    // 取得 FCM token
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY as string })
      .then((currentToken: string | null) => {
        if (currentToken) {
          setToken(currentToken);
          console.log("FCM token:", currentToken);
        } else {
          console.log('No registration token available.');
        }
      })
      .catch((err: Error) => {
        console.error('An error occurred while retrieving token: ', err);
      });
  }, []);

  return (
    <div>
      <h1>Firebase Cloud Messaging Test</h1>
      <p>Your FCM Token: {token}</p>
      <p>Open your browser console to see received messages.</p>
    </div>
  );
}
