// src/pages/api/fetchTopTurnaroundStocks.ts
// src/pages/api/fetchTopTurnaroundStocks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../firebaseAdmin';

const db = firebaseAdmin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const stocksRef = db.collection('TurnaroundStocks');
    const filteredStocksQuery = stocksRef
      .where('f_score', '>=', 8)
      .where('pb_ratio', '<=', 3)
      .orderBy('f_score', 'desc')
      .orderBy('pb_ratio', 'asc')
      .limit(20);

    const querySnapshot = await filteredStocksQuery.get();
    const stocks = querySnapshot.docs.map(doc => doc.data());

    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};

