// pages/api/checkStockAlerts.js
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { sendStockAlertNotification } from '../../scripts/sendStockAlertNotification.mjs';

export default async function handler(req, res) {
    try {
        const userNotifications = new Set(); // 使用集合来避免重复
        const stocksCollection = collection(db, "stocks");
        const snapshot = await getDocs(stocksCollection);
        const stocks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        for (const stock of stocks) {
            const { stockCode, alertPrice, userId } = stock;
            const response = await fetch(`https://owl-alert-investments.vercel.app/api/stockPrice?symbol=${encodeURIComponent(stockCode)}`);
            const data = await response.json();

            const shouldAlert = data.price > alertPrice;
            await updateDoc(doc(db, "stocks", stock.id), {
                currentPrice: data.price,
                alertTriggered: shouldAlert,
                lastChecked: new Date().toISOString()
            });

            if (shouldAlert) {
                userNotifications.add(userId); // 只记录需要通知的用户ID
            }
        }

        // 为每个需要通知的用户发送一次通知
        userNotifications.forEach(async (userId) => {
            await sendStockAlertNotification(userId);
        });

        res.status(200).json({ message: 'Stock checks completed successfully.' });
    } catch (error) {
        console.error("Error fetching stocks from Firestore:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
