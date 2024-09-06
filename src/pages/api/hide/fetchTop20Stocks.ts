// src/pages/api/fetchTop20Stocks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../firebaseAdmin.mjs';

const db = firebaseAdmin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const top20Ref = db.collection('Top20');
      const querySnapshot = await top20Ref
        .orderBy('pb_ratio', 'asc')
        .orderBy('f_score', 'desc')
        .limit(20)
        .get();
      const stocks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      res.status(200).json(stocks);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      // 使用類型斷言來處理錯誤
      if (error instanceof Error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error', details: 'Unknown error' });
      }
    }
  };
  