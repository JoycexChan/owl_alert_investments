import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // 確保這裡正確導入你的Firebase實例
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

interface StockData {
  stock_id: string;
  f_score: number;
  pb_ratio: number;
  rank: number;
}

const StockPicking = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      // 使用 query 來創建查詢對象
      const q = query(collection(db, 'Top50'), orderBy('rank', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedStocks = querySnapshot.docs.map(doc => ({
        ...doc.data() as StockData
      }));
      
      setStocks(fetchedStocks);
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h1>轉機股排行</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.rank}>
            股票代碼: {stock.stock_id}, 皮氏 F 分數: {stock.f_score}, 股價淨值比: {stock.pb_ratio}, 排名: {stock.rank}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPicking;
