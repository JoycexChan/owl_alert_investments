// fetchStockData.js
const yahooFinance = require('yahoo-finance2').default;
const dayjs = require('dayjs');

async function fetchStockData() {
  const period2 = dayjs().format('YYYY-MM-DD');  // 今天的日期
  const period1 = dayjs().subtract(15, 'day').format('YYYY-MM-DD');  // 15天前的日期

  try {
    // 使用 yahoo-finance2 獲取15天的歷史數據
    const result = await yahooFinance.historical('2330.TW', {
      period1,  // 起始日期
      period2,  // 結束日期
      interval: '1d',  // 每天的數據
    });

    // 輸出結果
    console.log(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchStockData();
