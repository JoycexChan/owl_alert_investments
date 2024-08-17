import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface StockData {
  Code: string;
  Name: string;
  PEratio: string;
  DividendYield: string;
  PBratio: string;
}

const StockAnalysis = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [stockCode, setStockCode] = useState('2330'); // 預設顯示台積電
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (code: string) => {
    try {
      const response = await axios.get(`/api/fetchStockData?stockNo=${code}`);
      if (response.data && response.data.Code) {
        setStockData(response.data);
        setError(null); // 清除錯誤消息
      } else {
        setStockData(null);
        setError('無該筆資料');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setStockData(null);
      setError('無該筆資料');
    }
  };

  useEffect(() => {
    fetchStockData(stockCode); // 初次載入時使用預設的股票代號 2330
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = (e.currentTarget.elements.namedItem('stockCode') as HTMLInputElement).value.trim();
    if (code) {
      setStockCode(code); // 更新股票代號
      fetchStockData(code); // 發送請求獲取該代號的資料
    }
  };

  const handleSuggestionClick = (code: string) => {
    setStockCode(code);
    fetchStockData(code); // 點擊建議股票時發送請求
  };

  return (
    <div>
      <Navbar />
      <h1>{stockData ? `${stockData.Name} (${stockCode}) 分析` : '股票分析'}</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="stockCode" placeholder="輸入股票代碼" />
        <button type="submit">搜索</button>
      </form>
      {error ? (
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
      ) : stockData ? (
        <div>
          <p>股票代碼: {stockData.Code}</p>
          <p>本益比: {stockData.PEratio}</p>
          <p>殖利率: {stockData.DividendYield}</p>
          <p>股價淨值比: {stockData.PBratio}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockAnalysis;
