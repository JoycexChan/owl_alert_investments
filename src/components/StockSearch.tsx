import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';

interface Stock {
  stock_id: string;
  stock_name: string;
}

const StockSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchStocks = async () => {
      if (searchInput.length > 1) {
        const q = query(collection(db, "StocksDirectory"), where("stock_id", ">=", searchInput), where("stock_id", "<=", searchInput + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const stocksArray: Stock[] = [];
        querySnapshot.forEach((doc) => {
          stocksArray.push(doc.data() as Stock);
        });
        setStocks(stocksArray);
      } else {
        setStocks([]);
      }
    };

    fetchStocks();
  }, [searchInput, db]);

  return (
    <div>
      <Navbar />
      <input
        type="text"
        placeholder="Enter stock code"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div>
        {stocks.map((stock) => (
          <div key={stock.stock_id}>
            {stock.stock_id} {stock.stock_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSearch;
