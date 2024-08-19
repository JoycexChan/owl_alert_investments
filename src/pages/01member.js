// pages/01member.js
import { useState, useEffect, useCallback } from "react";
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
import StockPriceChecker from "../components/01StockPriceChecker";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MemberPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [stockCode, setStockCode] = useState("");
  const [stocks, setStocks] = useState([]);
  const [alertPrice, setAlertPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStocks = useCallback(async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "stocks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const stockList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStocks(stockList);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      fetchStocks();
    }
  }, [user, fetchStocks, router]);

  const handleAddStock = async () => {
    if (!stockCode || !alertPrice || !user) return;
    
    try {
        // 檢查是否已經存在該股票代碼
        const q = query(
            collection(db, "stocks"),
            where("userId", "==", user.uid),
            where("stockCode", "==", `${stockCode}.TW`)
        );
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.size > 0) {
            // 已存在該股票代碼，更新該記錄
            const existingStockDoc = querySnapshot.docs[0];
            await deleteDoc(doc(db, "stocks", existingStockDoc.id));
        }
        
        // 創建新記錄或更新現有記錄
        await addDoc(collection(db, "stocks"), {
            userId: user.uid,
            stockCode: `${stockCode}.TW`, // 假設需要添加 `.TW`
            alertPrice: parseFloat(alertPrice),
            currentPrice: 0,
        });
        
        setStockCode("");
        setAlertPrice("");
        fetchStocks();
    } catch (error) {
        console.error("Error adding stock:", error);
    }
};


  const handleDeleteStock = async (id) => {
    try {
      await deleteDoc(doc(db, "stocks", id));
      setStocks(stocks => stocks.filter(stock => stock.id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
        <button onClick={handleAddStock} disabled={!user || !stockCode || !alertPrice}>
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
