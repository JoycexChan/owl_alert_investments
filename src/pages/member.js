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
  deleteDoc,
  doc,
} from "firebase/firestore";
import StockPriceChecker from "../components/01StockPriceChecker"; // 組件獲取即時股價

export default function MemberPage() {
  const { user } = useAuth(); // 使用 AuthContext 來獲取當前用戶
  const [stockCode, setStockCode] = useState("");
  const [stocks, setStocks] = useState([]);
  const [alertPrice, setAlertPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // 當用戶登入時加載追蹤股票
  useEffect(() => {
    if (user) {
      const fetchStocks = async () => {
        try {
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
          setLoading(false);
        } catch (error) {
          console.error("Error fetching stocks:", error);
          setLoading(false);
        }
      };

      fetchStocks();
    }
  }, [user]);

  // 添加新的追蹤股票
  const handleAddStock = async () => {
    if (stockCode && alertPrice && user) {
      try {
        await addDoc(collection(db, "stocks"), {
          userId: user.uid,
          stockCode,
          alertPrice: parseFloat(alertPrice),
          currentPrice: 0,
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
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    }
  };

  // 刪除追蹤股票
  const handleDeleteStock = async (id) => {
    try {
      await deleteDoc(doc(db, "stocks", id));
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <div>
              股票代碼: {stock.stockCode}, 提醒價格: {stock.alertPrice}
              <StockPriceChecker symbol={stock.stockCode} />
              <button onClick={() => handleDeleteStock(stock.id)}>刪除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
