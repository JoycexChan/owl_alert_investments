// pages/api/checkStockAlerts.js
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { sendStockAlertNotification } from '../../scripts/sendStockAlertNotification.mjs'; // 導入發送通知的函數

export default async function handler(req, res) {
  try {
    const stocksCollection = collection(db, "stocks");
    const snapshot = await getDocs(stocksCollection);
    const stocks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const userIdsToNotify = new Set(); // 使用 Set 來存儲需要通知的 userIds 以去除重複

    for (const stock of stocks) {
      const { stockCode, alertPrice, userId } = stock;
      try {
        const response = await fetch(`https://owl-alert-investments.vercel.app/api/stockPrice?symbol=${encodeURIComponent(stockCode)}`);
        const data = await response.json();

        if (data.price > alertPrice) { // 如果當前價格超過設定的提醒價格
          userIdsToNotify.add(userId); // 添加 userId 到通知集合
          await updateDoc(doc(db, "stocks", stock.id), {
            currentPrice: data.price,
            alertTriggered: true,
            lastChecked: new Date().toISOString()
          });
        } else {
          await updateDoc(doc(db, "stocks", stock.id), {
            currentPrice: data.price,
            alertTriggered: false,
            lastChecked: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error(`Error processing stock ${stockCode}:`, error);
      }
    }

    // 為每個需要通知的用戶發送一次通知
    userIdsToNotify.forEach(async (userId) => {
      try {
        await sendStockAlertNotification(userId); // 發送通知
      } catch (error) {
        console.error(`Error sending notification to user ${userId}:`, error);
      }
    });

    res.status(200).json({ message: 'Stock checks completed successfully.' });
  } catch (error) {
    console.error("Error fetching stocks from Firestore:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
