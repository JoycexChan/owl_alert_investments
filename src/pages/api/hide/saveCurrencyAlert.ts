// src/api/saveCurrencyAlert.ts
import firebaseAdmin from '../../firebaseAdmin';  // 已配置好的firebaseAdmin
const db = firebaseAdmin.firestore();

export const saveAlert = async (userId: string, targetRate: number) => {
  await db.collection('CurrencyAlerts').doc(userId).set({
    targetRate,
    createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
  });
};
