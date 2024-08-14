// pages/api/stockPrice.js

import { getStockPrice } from '../../lib/stockService'; 

export default async function handler(req, res) {
    const { stockCode } = req.query;

    if (!stockCode) {
        res.status(400).json({ error: 'Stock code is required' });
        return;
    }

    try {
        const price = await getStockPrice(stockCode);
        res.status(200).json({ stockCode, price });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock price' });
    }
}
