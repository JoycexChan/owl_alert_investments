// src/pages/api/stock.js
import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
  const { symbol } = req.query;

  try {
    const quote = await yahooFinance.quote(symbol);
    res.status(200).json({ price: quote.regularMarketPrice });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data' });
  }
}
