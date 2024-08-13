// src/api/checkExchangeRate.ts
import axios from 'axios';
import firebaseAdmin from '../../firebaseAdmin';  // 已配置好的firebaseAdmin
import { triggerGoogleCalendarAlert } from '../src/pages/api/triggerGoogleCalendarAlert';  // 後面提到的文件

const db = firebaseAdmin.firestore();

export const checkExchangeRate = async () => {
  const response = await axios.get('https://tw.rter.info/capi.php');
  const exchangeRate = response.data['USDTWD'].Exrate;

  const alertsSnapshot = await db.collection('CurrencyAlerts').get();
  alertsSnapshot.forEach((doc) => {
    const data = doc.data();
    if (exchangeRate <= data.targetRate) {
      triggerGoogleCalendarAlert(doc.id, exchangeRate);
    }
  });
};
