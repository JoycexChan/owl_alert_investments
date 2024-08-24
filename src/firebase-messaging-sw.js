// /src/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// 初始化 Firebase
firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});


// firebase.initializeApp({
//   apiKey: "AIzaSyC3AFIJqvxIChApgZoLFT8Qg8fI59mUiAA",
//   authDomain: "owl-alert-investments.firebaseapp.com",
//   databaseURL: "https://owl-alert-investments-default-rtdb.firebaseio.com",
//   projectId: "owl-alert-investments",
//   storageBucket: "owl-alert-investments.appspot.com",
//   messagingSenderId: "754544126727",
//   appId: "1:754544126727:web:a8b07a286edf1059c1f3a2",
//   measurementId: "G-CH2H7DBDPW"
// });

// 獲取 Firebase Messaging 實例
const messaging = firebase.messaging();

// 創建 Webpack 配置文件
//在項目的根目錄下創建一個 webpack.config.js
//在src放置firebase-messaging-sw.js
// 修改 package.json
  // 在 package.json 中添加一個構建腳本，用於運行 Webpack：
  // "scripts": {
  //   "build-sw": "webpack"
  // }

//使用 DefinePlugin 插件來注入環境變數
//yarn add --dev webpack webpack-cli
//yarn add clean-webpack-plugin --dev
//yarn add dotenv --dev
//yarn build-sw
