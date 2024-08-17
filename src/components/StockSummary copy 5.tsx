import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';
import {
  collection,
  addDoc,
} from "firebase/firestore";
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

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // 清除以前的错误
        setError(null);
        
        // 股价及其他数据
        const response = await axios.get(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockCode}&start_date=2024-08-01&end_date=2024-08-18&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwNjoxNjoyNiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.3F57WTmvMUcd6oFQoiQVmk3oON-6T5148wjObwBpOqQ`);
        if (response.data.data.length === 0) {
          throw new Error('Stock not found');
        }
        const latestData = response.data.data[response.data.data.length - 1];

        // 股票名称
        const nameResponse = await axios.get(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&data_id=${stockCode}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwNjoxNjoyNiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.3F57WTmvMUcd6oFQoiQVmk3oON-6T5148wjObwBpOqQ`);
        if (nameResponse.data.data.length === 0) {
          throw new Error('Stock name not found');
        }
        const stockName = nameResponse.data.data[0].stock_name;

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
        setStockData(null);
        setError('Stock not found');
      }
    };

    fetchStockData();
  }, [stockCode]);

  const handleTrack = async () => {
    if (!user || !stockData) return;
    try {
      await addDoc(collection(db, "stocks"), {
        userId: user.uid,
        stockCode: `${stockData.stockCode}.TW`,
        stockName: stockData.stockName,
        alertPrice: stockData.closePrice,
        currentPrice: stockData.closePrice,
      });
      setIsTracked(true);
    } catch (error) {
      console.error("Error tracking stock:", error);
    }
  };

  const handleSuggestionClick = (code: string) => {
    window.location.href = `/stock-analysis?code=${code}`;
  };

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
        <span className={styles.stockDate}>{stockData.date} 收盤</span>
        <span className={styles.stockPrice}>{stockData.closePrice} 元</span>
      </div>
      <button
        className={styles.trackButton}
        onClick={handleTrack}
        disabled={isTracked || !user}
      >
        {isTracked ? '已追踪' : '追踪'}
      </button>
    </div>
  );
};

export default StockSummary;