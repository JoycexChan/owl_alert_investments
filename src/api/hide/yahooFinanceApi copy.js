const yahooFinance = require('yahoo-finance2').default;

async function getCompanySummary(stockId) {
  try {
    const summary = await yahooFinance.summary(stockId);
    console.log(summary);  // 打印返回的數據
    return summary;
  } catch (error) {
    console.error("Error fetching company summary:", error);
    return null;
  }
}

module.exports = { getCompanySummary };
