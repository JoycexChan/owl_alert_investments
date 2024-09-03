// pages/api/checkStockAlerts.js
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { sendStockAlertNotification } from '../../scripts/sendStockAlertNotification.mjs'; // 導入發送通知的函數

export default async function handler(req, res) {
  try {
    const stocksCollection = collection(db, "stocks");
    const snapshot = await getDocs(stocksCollection);
    const stocks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const stock of stocks) {
      const { stockCode, alertPrice, userId } = stock;
      try {
        const response = await fetch(`https://owl-alert-investments.vercel.app/api/stockPrice?symbol=${encodeURIComponent(stockCode)}`);
        const data = await response.json();

        if (data.price > alertPrice) {
          await updateDoc(doc(db, "stocks", stock.id), {
            currentPrice: data.price,
            alertTriggered: true,
            lastChecked: new Date().toISOString()
          });
          try {
            await sendStockAlertNotification(userId, stockCode, data.price);
          } catch (error) {
            console.error(`Error sending notification for stock ${stockCode}:`, error);
          }
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

    res.status(200).json({ message: 'Stock checks completed successfully.' });
  } catch (error) {
    console.error("Error fetching stocks from Firestore:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
