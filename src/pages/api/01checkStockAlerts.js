// pages/api/checkStockAlerts.js
import { db } from "../../firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  const stocksCollection = collection(db, "stocks");
  const snapshot = await getDocs(stocksCollection);

  snapshot.forEach(async (doc) => {
    const stockDoc = doc.data();
    const { stockCode, alertPrice, userId } = stockDoc;
    // 調用現有的股價 API
    const response = await fetch(`https://owl-alert-investments.vercel.app/api/01stockPrice?symbol=${stockCode}`);
    const data = await response.json();
    if (data.price < alertPrice) {
      // 更新現有文檔以包含當前價格和警報觸發狀態
      await updateDoc(doc(db, "stocks", doc.id), {
        currentPrice: data.price,
        alertTriggered: true,
        lastChecked: new Date().toISOString()  // 添加一個時間戳記錄最後檢查時間
      });
      console.log(`警報！${stockCode} 的價格跌破 ${alertPrice}`);
    } else {
      // 確保警報狀態是最新的，即使沒有觸發
      await updateDoc(doc(db, "stocks", doc.id), {
        currentPrice: data.price,
        alertTriggered: false,
        lastChecked: new Date().toISOString()  // 更新最後檢查時間
      });
    }
  });
  res.status(200).json({ message: '檢查完成' });
}
