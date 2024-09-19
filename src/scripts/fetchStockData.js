const yahooFinance = require('yahoo-finance2').default;
const dayjs = require('dayjs');

async function fetchFiveYearsData() {
  const period2 = dayjs().format('YYYY-MM-DD');  // 今天的日期
  const period1 = dayjs().subtract(5, 'year').format('YYYY-MM-DD');  // 5年之前的日期

  try {
    // 使用 yahoo-finance2 獲取過去5年的歷史數據
    const result = await yahooFinance.historical('2330.TW', {
      period1,  // 起始日期
      period2,  // 結束日期
      interval: '1mo',  // 每月的數據
    });

    // 選取每年的第一筆數據
    const yearlyData = [];
    let lastYear = null;

    result.forEach((data) => {
      const year = new Date(data.date).getFullYear();
      if (year !== lastYear) {
        yearlyData.push(data);  // 如果是新的一年，存入yearlyData
        lastYear = year;
      }
    });

    // 輸出每年的第一筆數據
    console.log(yearlyData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchFiveYearsData();
