// pages/_app.tsx
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/firebase-messaging-sw.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);

                    // 傳遞 Firebase 配置到 Service Worker
                    if (registration.active) {
                        registration.active.postMessage({
                            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
                        });
                    }
                })
                .catch((error) => {
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
