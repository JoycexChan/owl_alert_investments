// /public/firebase-messaging-sw.js
// Firebase Cloud Messaging (FCM) 的 Service Worker負責處理來自 Firebase 的推送通知。
// 這個檔案在前端應用中扮演了接收和處理背景消息的角色
// firebase-messaging-sw.js 放在 public 目錄下確保它可以在全局範圍內被訪問和註冊，允許它接收和處理來自 Firebase 的通知，不論用戶在應用中的哪個部分。
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');
    //heartbeats undefined是在 10.13.0 中引入的，因此如果有人想要擺脫它，他們可以降級到 10.12.5，直到console.log新的發布刪除。



// 監聽來自主應用_app.tsx的消息，用於初始化或配置 Firebase(讀取環境參數)
// 主要因為public 目錄下無法讀取環境參數，直接輸入金鑰又會外洩金鑰
self.addEventListener('message', (event) => {
    const { type, config } = event.data;
    console.log('[firebase-messaging-sw.js] Received message:', event.data);

    // 檢查消息類型是否為初始化 Firebase
    if (type === 'INIT_FIREBASE') {
        console.log('[firebase-messaging-sw.js] Initializing Firebase with config:', config);

        // 檢查是否提供了必要的 projectId
        if (!config.projectId) {
            console.error('[firebase-messaging-sw.js] Missing projectId in config:', config);
            return; // 如果缺少 projectId，則不初始化 Firebase
        }

        // 檢查 Firebase 應用是否已初始化
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            console.log('[firebase-messaging-sw.js] Firebase initialized with config:', config);
        } else {
            console.log('[firebase-messaging-sw.js] Firebase already initialized');
        }
        // 設置消息處理
        setupMessaging();
    }
});

// 設置 Firebase Messaging 並監聽後台消息
function setupMessaging() {
    const messaging = firebase.messaging();

    // 監聽後台消息
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message:', payload);

        // 配置並顯示通知
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon || '/default-icon.png'
        };

        // 在設備上顯示通知
        self.registration.showNotification(notificationTitle, notificationOptions)
            .then(() => {
                console.log('[firebase-messaging-sw.js] Notification is shown:', notificationTitle);
            })
            .catch(error => {
                console.error('[firebase-messaging-sw.js] Error showing notification:', error);
            });
    });
}
