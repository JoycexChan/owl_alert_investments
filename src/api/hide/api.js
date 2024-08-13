import axios from 'axios';

const API_URL = 'https://api.finmindtrade.com/api/v4/data';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0wNCAwOTozMzo1NCIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42NS4xNjAifQ.c4LT-l1aQhrFaIJkZBAMdTnak1dZRWNYGXRiJ4OCkWk';  // 請替換成你的 token

export const fetchFinancialData = async (stock_id, dataset, start_date, end_date) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                dataset: dataset,
                stock_id: stock_id,
                start_date: start_date,
                end_date: end_date,
                token: API_TOKEN,
            }
        });
        console.log('API response:', response.data); // 添加這行
        return response.data.data; // 確保這裡返回數據部分
    } catch (error) {
        console.error('Error fetching financial data:', error);
        return null;
    }
};
