// src/components/StockPriceChecker.js
import { useState, useEffect } from "react";
import yahooFinance from "yahoo-finance2"; // 確保你已經安裝了這個包：npm install yahoo-finance2

export default function StockPriceChecker({ symbol }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const quote = await yahooFinance.quote(symbol);
        setPrice(quote.regularMarketPrice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock price:", error);
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, [symbol]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return <span>Current Price: {price}</span>;
}
