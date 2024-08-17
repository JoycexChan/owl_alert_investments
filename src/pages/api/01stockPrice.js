// pages/api/01stockPrice.js
import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
  const { symbol } = req.query;
  try {
    const quote = await yahooFinance.quote(symbol);
    res.status(200).json({ price: quote.regularMarketPrice });
  } catch (error) {
    console.error("Error fetching stock price:", error);
    res.status(500).json({ error: 'Failed to fetch stock price' });
  }
}
