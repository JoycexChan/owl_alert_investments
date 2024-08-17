import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/StockSummary.module.css';

interface StockSummaryProps {
  stockCode: string;
}

interface StockData {
  stockCode: string;
  price: number;
}

const StockSummary: React.FC<StockSummaryProps> = ({ stockCode }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isTracked, setIsTracked] = useState<boolean>(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockCode}&start_date=2024-08-01&end_date=2024-08-18&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwNjoxNjoyNiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.3F57WTmvMUcd6oFQoiQVmk3oON-6T5148wjObwBpOqQ`);
        const latestData = response.data.data[response.data.data.length - 1];
        setStockData({ stockCode: latestData.stock_id, price: latestData.close });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [stockCode]);

  const handleTrack = () => {
    // 处理追踪逻辑，比如保存到本地存储或发送请求到后端
    setIsTracked(true);
  };

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.stockInfo}>
        <span className={styles.stockName}>{stockData.stockCode}</span>
        <span className={styles.stockPrice}>{stockData.price} 元</span>
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
