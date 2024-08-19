// src/firebaseAdmin.ts
import * as admin from 'firebase-admin';

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

export default admin;

