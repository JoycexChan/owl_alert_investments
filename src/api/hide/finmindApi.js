const axios = require('axios');

async function fetchPE(stockId, startDate, endDate, token) {
  const url = 'https://api.finmindtrade.com/api/v4/data';
  const params = {
    dataset: 'TaiwanStockPER',
    stock_id: stockId,
    start_date: startDate,
    end_date: endDate,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0wNCAwOTozMzo1NCIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42NS4xNjAifQ.c4LT-l1aQhrFaIJkZBAMdTnak1dZRWNYGXRiJ4OCkWk',
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('No data found');
    }
  } catch (error) {
    console.error('Error fetching PE data:', error);
    return null;
  }
}

module.exports = { fetchPE };
