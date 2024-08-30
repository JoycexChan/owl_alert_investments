// src/pages/api/fetchTopTurnaroundStocks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../firebaseAdmin';

const db = firebaseAdmin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const stocksRef = db.collection('TurnaroundStocks');
    const top20Ref = db.collection('Top20'); // 指向新的集合

    const filteredStocksQuery = stocksRef
      .where('f_score', '>=', 8)
      .where('pb_ratio', '<=', 3)
      .orderBy('f_score', 'desc')
      .orderBy('pb_ratio', 'asc')
      .limit(20);

    const querySnapshot = await filteredStocksQuery.get();
    const stocks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 將數據存儲到 Top20 集合
    const batch = db.batch();
    stocks.forEach(stock => {
      const stockRef = top20Ref.doc(stock.id); // 使用股票代碼作為文檔 ID
      batch.set(stockRef, stock);
    });
    await batch.commit(); // 執行批處理寫操作

    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching and saving data from Firestore:", error);
    res.status(500).json({ error: 'Error fetching and saving data' });
  }
};
