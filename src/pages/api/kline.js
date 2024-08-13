import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
  const { query } = req;
  const { symbol, period1, period2 } = query;

  try {
    const options = {
      period1: period1, // 開始日期
      period2: period2, // 結束日期
      interval: '1d',   // 1日K線
    };

    const result = await yahooFinance.historical(symbol, options);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
