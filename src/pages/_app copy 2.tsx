import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import '../app/globals.css';
import { getMessaging, getToken } from 'firebase/messaging';
import { app } from '../firebase'; // 確保你正確引入初始化過的 Firebase 應用

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);

                // 確保 Service Worker 已經激活
                if (registration.active) {
                    // 傳遞 Firebase 配置給 Service Worker
                    registration.active.postMessage({
                        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
                    });

                    // 請求通知權限並獲取 FCM Token
                    Notification.requestPermission().then(permission => {
                        if (permission === "granted") {
                            console.log("Notification permission granted.");

                            const messaging = getMessaging(app);
                            getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY as string })
                                .then((currentToken) => {
                                    if (currentToken) {
                                        console.log("FCM token:", currentToken);
                                        // 這裡可以將 token 送到後端或保存起來
                                    } else {
                                        console.log('No registration token available. Request permission to generate one.');
                                    }
                                })
                                .catch((err) => {
                                    console.error('An error occurred while retrieving token: ', err);
                                });
                        } else {
                            console.log('Unable to get permission to notify.');
                        }
                    });
                }
            }).catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
        }
    }, []);

    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
