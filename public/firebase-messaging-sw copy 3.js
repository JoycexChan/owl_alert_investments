importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

self.addEventListener('message', (event) => {
    const config = event.data;

    // 檢查 Firebase 是否已經初始化
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
    });
});
