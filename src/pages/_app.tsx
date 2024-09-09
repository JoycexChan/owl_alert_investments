// /src/pages/_app.tsx
// 全局樣式：引入全局的 CSS 樣式。
// 用戶身份管理：通過 AuthProvider 為應用提供身份驗證上下文，使整個應用可以輕鬆訪問與用戶身份相關的資訊和功能。
// FCM 初始化與配置：當應用加載時，註冊服務工作者 (Service Worker)，並設置 Firebase Cloud Messaging，使應用能夠接收推送通知。
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomHead from '../components/CustomHead';
import '../app/globals.css';
import styles from '../styles/Carousel.module.css';
//MyApp 是整個應用的根組件，每次頁面加載時都會渲染它。它接收 Component 和 pageProps 作為參數，Component 代表當前加載的頁面，pageProps 是該頁面的初始屬性。
function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        async function setupFCM() {  // 確保 setupFCM 是一個 async 異步函數
            //firebase-messaging-sw.js註冊serviceWorker，並傳送環境參數來初始化FCM，正確處理推播
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
                    
                    //請求通知權限
                    const permission = await Notification.requestPermission();
                    if (permission === "granted") {
                        console.log("Notification permission granted.");
                        // 獲取 FCM token，使用從 firebase.ts 導入的 messaging
                        const currentToken = await getToken(messaging!, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
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

        setupFCM();  // 調用 setupFCM 函數，確保在應用啟動時完成所有的 FCM 初始化步驟
    }, []);


// AuthProvider 組件包裹整個應用，確保所有頁面都能訪問身份驗證上下文。
// Component {...pageProps}：這一行確保當前頁面組件 (Component) 能夠正確接收和渲染其對應的 pageProps。
    return (

        <AuthProvider>
        
            <CustomHead/>
             <Navbar />
            <Component {...pageProps} />
             <Footer />

        </AuthProvider>
    );
}

//導出 MyApp 組件，這是 Next.js 應用的入口點。
export default MyApp;
