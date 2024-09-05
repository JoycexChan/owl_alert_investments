import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import dayjs from 'dayjs'; 
import styles from '../styles/StockSummary.module.css';

interface StockSummaryProps {
  stockCode: string;
}

interface StockData {
  stockCode: string;
  stockName: string;
  closePrice: number;
  changeAmount: number;
  changePercent: number;
  date: string;
}

const StockSummary: React.FC<StockSummaryProps> = ({ stockCode }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isTracked, setIsTracked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); 
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;
  const today = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);  // 開始加載時設置為 true
      try {
        setError(null); // 清除之前的錯誤狀態

        // 獲取股票名稱
        const q = query(collection(db, "StocksDirectory"), where("stock_id", "==", stockCode));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('Stock name not found in database');
        }

        // 取得第一個匹配項目
        const docData = querySnapshot.docs[0].data();
        const stockName = docData.stock_name;

        // 獲取股價及其他資訊
        const response = await axios.get(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockCode}&start_date=${startDate}&end_date=${today}&token=${token}`);
        
        if (response.data.data.length === 0) {
          throw new Error('Stock not found');
        }
        
        const latestData = response.data.data[response.data.data.length - 1];


        setStockData({
          stockCode: latestData.stock_id,
          stockName: stockName,
          closePrice: latestData.close,
          changeAmount: latestData.change,
          changePercent: (latestData.change / latestData.open) * 100,
          date: latestData.date,
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Stock not found');
        setStockData(null); // 清空现有数据
      } finally {
        setLoading(false); // 完成加載，無論成功或失敗
      }
    };

    fetchStockData();
  }, [stockCode]);

  const handleTrack = async () => {
    if (!user || !stockData) return;

    try {
      await addDoc(collection(db, "stocks"), {
        userId: user.uid,
        stockCode: `${stockData.stockCode}.TW`, // 添加股票代码
        stockName: stockData.stockName, // 添加股票名称
      });
      setIsTracked(true);
    } catch (error) {
      console.error("Error tracking stock:", error);
    }
  };

  const handleSuggestionClick = (code: string) => {
    window.location.href = `/stock-analysis?code=${code}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingAnimation}>
        <div className={styles.spinner}></div> {/* 加載旋轉圖標 */}
      </div>
    );
  }
  


  if (error) {
    return (
      <div>
        <p>目前尚未有相關資料，請嘗試其他連結：</p>
        <ul>
          <li>
            <button onClick={() => handleSuggestionClick('2330')}>
              台積電 (2330)
            </button>
          </li>
          <li>
            <button onClick={() => handleSuggestionClick('2317')}>
              鴻海 (2317)
            </button>
          </li>
          <li>
            <button onClick={() => handleSuggestionClick('2002')}>
              中鋼 (2002)
            </button>
          </li>
        </ul>
      </div>
    );
  }

  if (!stockData) {
    return <div>Loading...</div>;
  } 

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.stockInfo}>
        <span className={styles.stockName}>{stockData.stockName} ({stockData.stockCode})</span>
        <span className={styles.stockPrice}>{stockData.closePrice} 元</span>
        <span className={styles.stockDate}>{stockData.date} 收盤價</span>
      </div>
      <button
        className={styles.trackButton}
        onClick={handleTrack}
        disabled={isTracked}
      >
        {isTracked ? '已追踪' : '追踪'}
      </button>
    </div>
  );
};

export default StockSummary;
