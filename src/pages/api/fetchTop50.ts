// src/pages/api/fetchTopTurnaroundStocks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../firebaseAdmin.mjs';

const db = firebaseAdmin.firestore();

interface StockData {
  stock_id: string;
  f_score: number;
  pb_ratio: number;
  rank?: number;  // 新增一個選項來存放排名
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const snapshot = await db.collection('TurnaroundStocks').get();
    const stocks: StockData[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data() as StockData;
      if (data.f_score >= 8 && data.pb_ratio <= 3) {
        stocks.push(data);
      }
    });

    // 排序並只保留前五十名
    stocks.sort((a, b) => a.pb_ratio - b.pb_ratio);
    const topStocks = stocks.slice(0, 50);

    // 為每個股票增加排名
    topStocks.forEach((stock, index) => {
      stock.rank = index + 1;
    });

    // 將排名後的股票存入Firebase的Top50集合
    const batch = db.batch();
    topStocks.forEach(stock => {
      const stockRef = db.collection('Top50').doc(stock.stock_id);
      batch.set(stockRef, stock);
    });
    await batch.commit();

    res.status(200).json(topStocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};
