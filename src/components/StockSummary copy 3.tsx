import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // 股價及其他數據
        const response = await axios.get(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockCode}&start_date=2024-08-01&end_date=2024-08-18&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwNjoxNjoyNiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.3F57WTmvMUcd6oFQoiQVmk3oON-6T5148wjObwBpOqQ`);
        const latestData = response.data.data[response.data.data.length - 1];

        // 股票名稱
        const nameResponse = await axios.get(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&data_id=${stockCode}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwNjoxNjoyNiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.3F57WTmvMUcd6oFQoiQVmk3oON-6T5148wjObwBpOqQ`);
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
      }
    };

    fetchStockData();
  }, [stockCode]);

  const handleTrack = () => {
    // 處理追蹤邏輯
    setIsTracked(true);
  };

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.stockInfo}>
        <span className={styles.stockName}>{stockData.stockName} ({stockData.stockCode})</span>
        <span className={styles.stockDate}>{stockData.date} 收盤價</span>
        <span className={styles.stockPrice}>{stockData.closePrice} 元</span>

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
