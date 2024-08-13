const yahooFinance = require('yahoo-finance2').default;

export default async function handler(req, res) {
  const { stockId } = req.query;
  try {
    const summary = await yahooFinance.summary(stockId);
    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching company summary:", error);
    res.status(500).json({ error: "Error fetching company summary" });
  }
}
