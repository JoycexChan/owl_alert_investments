// src/components/01StockPriceChecker.js
import { useState, useEffect } from "react";


export default function StockPriceChecker({ symbol }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        setLoading(true);
        // 調整 API 請求以適應實際可用的 API 並處理 CORS
        const response = await fetch(`/api/01stockPrice?symbol=${encodeURIComponent(symbol)}`);
        const data = await response.json();
        setPrice(data.price);  // 確保這裡與 API 響應匹配
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock price:", error);
        setLoading(false);
      }
    };

    if (symbol) {
      fetchStockPrice();
    }
  }, [symbol]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return <span>Current Price: {price}</span>;
}
