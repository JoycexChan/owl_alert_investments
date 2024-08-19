const axios = require('axios');

async function fetchFinMindData() {
    const baseURL = 'https://api.finmindtrade.com/api/v4/data';
    
    // 獲取當前日期
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0]; // 轉換為 YYYY-MM-DD 格式
    const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;
    const params = {
        dataset: 'TaiwanStockNews', // 你想查詢的資料集
        data_id: '2330',             // 例如台積電的股票代碼
        start_date: todayDateString, // 使用當天日期作為開始日期
        end_date: todayDateString,   // 使用當天日期作為結束日期
        token: token,
    };

    try {
        const response = await axios.get(baseURL, { params });
        console.log('API Response:', response.data);
        return response.data; // 返回 API 響應的數據部分
    } catch (error) {
        console.error('Error fetching data from FinMind:', error);
        return null;
    }
}

fetchFinMindData();
