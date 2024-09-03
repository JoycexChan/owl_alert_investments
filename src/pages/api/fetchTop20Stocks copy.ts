// src/pages/api/fetchTop20Stocks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../firebaseAdmin.mjs';

const db = firebaseAdmin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const top20Ref = db.collection('Top20');
    const querySnapshot = await top20Ref
      .orderBy('pb_ratio', 'asc') // 首先按股價淨值比由小到大排序
      .orderBy('f_score', 'desc') // 如果股價淨值比相同，則按 F 分數由高到低排序
      .limit(20)
      .get();
    const stocks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};
