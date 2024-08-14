// pages/api/checkStockAlerts.js
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  const stocksCollection = collection(db, "stocks");
  const snapshot = await getDocs(stocksCollection);
  snapshot.forEach(async (doc) => {
    const { stockCode, alertPrice, userId } = doc.data();
    // 調用現有的股價 API
    const response = await fetch(`https://owl-alert-investments.vercel.app/api/01stockPrice?symbol=${stockCode}`);
    const data = await response.json();
    if (data.price < alertPrice) {
      // 提醒用戶的邏輯
      console.log(`警報！${stockCode} 的價格跌破 ${alertPrice}`);
      // 可以在這裡添加發送郵件或其他通知的代碼
    }
  });
  res.status(200).json({ message: '檢查完成' });
}
