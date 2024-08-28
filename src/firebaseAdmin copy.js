// src/firebaseAdmin.js
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });  // 使用 process.cwd() 來取得專案根目錄


const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),  // 需要處理換行符號
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://owl-alert-investments-default-rtdb.firebaseio.com"
  });
}

module.exports = admin;

