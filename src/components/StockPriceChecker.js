// src/components/StockPriceChecker.js
import { useState, useEffect } from "react";

export default function StockPriceChecker({ symbol, alertPrice }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockPrice = async () => {
      // Assume the API responds with the stock price
      const response = await fetch(`/api/01stockPrice?symbol=${encodeURIComponent(symbol)}`);
      const data = await response.json();
      setPrice(data.price);
      setLoading(false);
    };

    if (symbol) {
      fetchStockPrice();
    }
  }, [symbol]);

  const priceStyle = {
    color: determineColor(price, alertPrice),
  };

  function determineColor(price, alertPrice) {
    if (price < alertPrice) {
      return 'red'; 
    } else if (price > alertPrice) {
      return 'green'; 
    }
    return 'black'; 
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  return <span style={priceStyle}>{price}</span>;
}
