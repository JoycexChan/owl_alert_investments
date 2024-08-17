import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // 引入 useRouter
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // 使用 useRouter 来获取 URL 参数
  const { code } = router.query; // 从 URL 中获取股票代码

  const fetchStockData = async (code: string) => {
    try {
      const response = await axios.get(`/api/fetchStockData?stockNo=${code}`);
      if (response.data && response.data.Code) {
        setStockData(response.data);
        setError(null); // 清除错误消息
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
    if (code) {
      fetchStockData(code as string); // 当 code 存在时请求数据
    } else {
      fetchStockData('2330'); // 如果没有输入代码，默认显示 2330 的数据
    }
  }, [code]); // 监听 URL 中 code 的变化

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCode = (e.currentTarget.elements.namedItem('stockCode') as HTMLInputElement).value.trim();
    if (newCode) {
      router.push(`/stock-analysis?code=${newCode}`); // 更新 URL 中的 code 参数
    }
  };

  const handleSuggestionClick = (suggestedCode: string) => {
    router.push(`/stock-analysis?code=${suggestedCode}`); // 通过点击建议的股票更新 URL
  };

  return (
    <div>
      <Navbar />
      <h1>{stockData ? `${stockData.Name} (${code}) 分析` : '股票分析'}</h1>
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
