// pages/member.js
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
import StockPriceChecker from "../components/StockPriceChecker";

import styles from '../styles/MemberPage.module.css';  // 確保導入對應的 CSS 模組

export default function MemberPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [stockCode, setStockCode] = useState("");
  const [stocks, setStocks] = useState([]);
  const [alertPrice, setAlertPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // 新增一個狀態來處理錯誤訊息

  const fetchStocks = useCallback(async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "stocks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const stocksWithNames = [];
  
      for (const doc of querySnapshot.docs) {
        const stockData = doc.data();
        const stockId = stockData.stockCode.slice(0, 4); // 取得股票代碼前四碼
  
        // 查詢 StocksDirectory 中的股票名稱
        const stockQuery = query(collection(db, "StocksDirectory"), where("stock_id", "==", stockId));
        const stockNameSnapshot = await getDocs(stockQuery);
        const stockName = stockNameSnapshot.docs.length > 0 ? stockNameSnapshot.docs[0].data().stock_name : "未知股票名稱";
  
        stocksWithNames.push({
          id: doc.id,
          stockCode: stockData.stockCode,
          stockName: stockName, // 添加股票名稱
          alertPrice: stockData.alertPrice
        });
      }
  
      setStocks(stocksWithNames);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setErrorMessage("Failed to fetch stocks."); // 設置錯誤訊息
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
    if (!stockCode || !alertPrice || !user) {
      setErrorMessage("Please fill all fields.");  // 確保輸入字段完整性的錯誤訊息
      return;
    }
    
    try {
      const q = query(
          collection(db, "stocks"),
          where("userId", "==", user.uid),
          where("stockCode", "==", `${stockCode}.TW`)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.size > 0) {
          const existingStockDoc = querySnapshot.docs[0];
          await deleteDoc(doc(db, "stocks", existingStockDoc.id));
      }
      
      await addDoc(collection(db, "stocks"), {
          userId: user.uid,
          stockCode: `${stockCode}.TW`, 
          alertPrice: parseFloat(alertPrice),
          currentPrice: 0,  // 假設 currentPrice 也是需要的信息
      });
      
      setStockCode("");
      setAlertPrice("");
      fetchStocks();
    } catch (error) {
      console.error("Error adding stock:", error);
      setErrorMessage("Failed to add stock.");  // 處理新增股票時的錯誤訊息
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await deleteDoc(doc(db, "stocks", id));
      setStocks(stocks => stocks.filter(stock => stock.id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error);
      setErrorMessage("Failed to delete stock.");  // 處理刪除股票時的錯誤訊息
    }
  };


  
  if (loading) return <div>Loading...</div>;

  return (
    <main>
    <div className={styles.wrapperout}>
    <div className={styles.wrappero}>
    <div className={styles.pageContainer}>

      <div className={styles.titleContainer}>會員股票追蹤</div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      <div className={styles.stockListout}>
      <div className={styles.stockListHeader}>
        <span>名稱</span>
        <span>代碼</span>
        <span>股價</span>
        <span>提醒</span>
        <span>操作</span>
      </div>
      {stocks.length > 0 ? (
        <div className={styles.stockList}>
          {stocks.map((stock) => (
            <div key={stock.id} className={styles.stockItem}>
              <span>{stock.stockName}</span>
              <span>{stock.stockCode.slice(0, 4)}</span> {/* 只顯示前四個字符 */}
              <StockPriceChecker symbol={stock.stockCode} alertPrice={stock.alertPrice} />
              <span>{stock.alertPrice}</span>
              <button onClick={() => handleDeleteStock(stock.id)}>刪除</button>
            </div>
          ))}


        </div>
      ) : (
        <div className={styles.noStocksMessage}>No stocks added yet.</div>
      )}
      </div>
        <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="輸入股票代碼"
          value={stockCode}
          onChange={(e) => setStockCode(e.target.value)}
          disabled={!user}
        />
        <input
          className={styles.inputField}
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

    </div>
    </div>
    </div>
    </main>
  );
}
