// pages/api/checkStockAlerts.js
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { sendStockAlertNotification } from '../../scripts/sendStockAlertNotification.mjs'; // 導入發送通知的函數

export default async function handler(req, res) {
  try {
    const userNotifications = {}; // 儲存每個用戶的通知
    const stocksCollection = collection(db, "stocks");
    const snapshot = await getDocs(stocksCollection);
    const stocks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const stock of stocks) {
      const { stockCode, alertPrice, userId } = stock;
      try {
        const response = await fetch(`https://owl-alert-investments.vercel.app/api/stockPrice?symbol=${encodeURIComponent(stockCode)}`);
        const data = await response.json();

        const shouldAlert = data.price > alertPrice;
        await updateDoc(doc(db, "stocks", stock.id), {
          currentPrice: data.price,
          alertTriggered: shouldAlert,
          lastChecked: new Date().toISOString()
        });

        // 累積需要通知的資訊，而不是立即發送
        if (shouldAlert) {
          if (!userNotifications[userId]) {
            userNotifications[userId] = [];
          }
          userNotifications[userId].push(`Stock ${stockCode} price reached ${data.price}, alert set at ${alertPrice}.`);
        }

      } catch (error) {
        console.error(`Error processing stock ${stockCode}:`, error);
      }
    }

    // 一次性發送所有累積的通知
    for (const [userId, messages] of Object.entries(userNotifications)) {
      const message = messages.join("\n");
      try {
        await sendStockAlertNotification(userId, message);
      } catch (error) {
        console.error(`Error sending notification to user ${userId}:`, error);
      }
    }

    res.status(200).json({ message: 'Stock checks completed successfully.' });
  } catch (error) {
    console.error("Error fetching stocks from Firestore:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
