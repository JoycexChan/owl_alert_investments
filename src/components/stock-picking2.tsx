// src/pages/stock-picking.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StockData {
  stock_id: string;
  f_score: number;
  pb_ratio: number;
}

const StockPicking = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('/api/fetchTopTurnaroundStocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h1>轉機股排行</h1>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            股票代碼: {stock.stock_id}, 皮氏 F 分數: {stock.f_score}, 股價淨值比: {stock.pb_ratio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPicking;
