// src/firebaseAdmin.ts
import * as admin from 'firebase-admin';
import serviceAccount from './owl-alert-investments-firebase-adminsdk-di51a-0363347783.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin;
