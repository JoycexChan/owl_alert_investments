// pages/01member.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import StockPriceChecker from "../components/01StockPriceChecker"; // 這個組件來獲取即時股價
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MemberPage() {
  const { user } = useAuth(); // 使用 AuthContext 來獲取當前用戶
  const router = useRouter(); // 使用 useRouter 來進行路由重定向
  const [stockCode, setStockCode] = useState("");
  const [stocks, setStocks] = useState([]);
  const [alertPrice, setAlertPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // 如果用戶未登入，重定向到首頁
      router.push("/");
    } else {
      // 用戶已登入，則繼續加載收藏的股票
      fetchStocks();
    }
  }, [user]);

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

  const handleAddStock = async () => {
    if (stockCode && alertPrice && user) {
      const formattedStockCode = `${stockCode}.TW`; // 格式化股票代碼
      try {
        await addDoc(collection(db, "stocks"), {
          userId: user.uid,
          stockCode: formattedStockCode, // 保存格式化後的股票代碼
          alertPrice: parseFloat(alertPrice),
          currentPrice: 0,
        });
        setStockCode("");
        setAlertPrice("");
        fetchStocks(); // 重新加載股票列表
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    }
  };

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
      <Navbar />
      <h1>會員股票追蹤</h1>
      <div>
        <input
          type="text"
          placeholder="輸入股票代碼"
          value={stockCode}
          onChange={(e) => setStockCode(e.target.value)}
          disabled={!user}
        />
        <input
          type="number"
          placeholder="提醒價格"
          value={alertPrice}
          onChange={(e) => setAlertPrice(e.target.value)}
          disabled={!user}
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
      <Footer />
    </div>
  );
}
