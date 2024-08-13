// pages/member.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function MemberPage() {
  const { user } = useAuth(); // 使用 AuthContext 來獲取當前用戶
  const [stockCode, setStockCode] = useState("");
  const [stocks, setStocks] = useState([]);
  const [alertPrice, setAlertPrice] = useState("");

  // 當用戶登入時加載追蹤股票
  useEffect(() => {
    if (user) {
      const fetchStocks = async () => {
        const q = query(
          collection(db, "stocks"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const stockList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStocks(stockList);
      };

      fetchStocks();
    }
  }, [user]);

  // 添加新的追蹤股票
  const handleAddStock = async () => {
    if (stockCode && alertPrice && user) {
      await addDoc(collection(db, "stocks"), {
        userId: user.uid, // 使用當前用戶的 UID 作為 userId
        stockCode,
        alertPrice: parseFloat(alertPrice),
        currentPrice: 0, // 這裡可以稍後更新為實時股價
      });

      // 清空輸入框
      setStockCode("");
      setAlertPrice("");

      // 重新加載股票列表
      const q = query(
        collection(db, "stocks"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const stockList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStocks(stockList);
    }
  };

  return (
    <div>
      <h1>會員股票追蹤</h1>
      <div>
        <input
          type="text"
          placeholder="輸入股票代碼"
          value={stockCode}
          onChange={(e) => setStockCode(e.target.value)}
          disabled={!user} // 當未登入時禁用輸入框
        />
        <input
          type="number"
          placeholder="提醒價格"
          value={alertPrice}
          onChange={(e) => setAlertPrice(e.target.value)}
          disabled={!user} // 當未登入時禁用輸入框
        />
        <button onClick={handleAddStock} disabled={!user}>
          新增股票
        </button>
      </div>

      <h2>已追蹤股票</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            股票代碼: {stock.stockCode}, 提醒價格: {stock.alertPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}
