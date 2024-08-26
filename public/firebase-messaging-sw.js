importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// 監聽從主應用發送過來的消息
self.addEventListener('message', (event) => {
    const { type, config } = event.data;

    console.log('[firebase-messaging-sw.js] Received message:', event.data);

    if (type === 'INIT_FIREBASE') {
        console.log('[firebase-messaging-sw.js] Initializing Firebase with config:', config);

        if (!config.projectId) {
            console.error('[firebase-messaging-sw.js] Missing projectId in config:', config);
            return; // 如果缺少 projectId，則不初始化 Firebase
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            console.log('[firebase-messaging-sw.js] Firebase initialized with config:', config);
        } else {
            console.log('[firebase-messaging-sw.js] Firebase already initialized');
        }

        setupMessaging();
    }
});

// 設置 Firebase Messaging 並監聽後台消息
function setupMessaging() {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message:', payload);

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon || '/default-icon.png'
        };

        // 顯示通知
        self.registration.showNotification(notificationTitle, notificationOptions)
            .then(() => {
                console.log('[firebase-messaging-sw.js] Notification is shown:', notificationTitle);
            })
            .catch(error => {
                console.error('[firebase-messaging-sw.js] Error showing notification:', error);
            });
    });
}
