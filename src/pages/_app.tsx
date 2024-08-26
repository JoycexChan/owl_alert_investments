import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import '../app/globals.css';
import { getMessaging, getToken } from 'firebase/messaging';
import { app } from '../firebase';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        async function setupFCM() {  // 確保 setupFCM 是一個 async 函數
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                    console.log('Service Worker registered with scope:', registration.scope);

                    if (registration.active) {
                        registration.active.postMessage({
                            type: 'INIT_FIREBASE', 
                            config: {
                                apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                                authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                                messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                                appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                                measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
                            }
                        });
                    }

                    const permission = await Notification.requestPermission();
                    if (permission === "granted") {
                        console.log("Notification permission granted.");
                        const messaging = getMessaging(app);
                        const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
                        if (currentToken) {
                            console.log("FCM token:", currentToken);
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    } else {
                        console.log('Unable to get permission to notify.');
                    }
                } catch (error) {
                    console.error('Error setting up FCM:', error);
                }
            }
        }

        setupFCM();  // 調用 setupFCM 函數
    }, []);

    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
