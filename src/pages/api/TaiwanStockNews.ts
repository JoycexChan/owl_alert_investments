// pages/api/taiwan-stock-news.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { stock_id, start_date, end_date } = req.query;  // 從前端接收股票代碼和日期參數
    const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;

    try {
        const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
            params: {
                dataset: 'TaiwanStockNews',
                start_date: start_date, // 使用前端傳來的日期參數
                end_date: end_date,     // 使用前端傳來的日期參數
                data_id: stock_id,      // 使用前端傳來的股票代碼參數
                token: token,
            },
        });

        if (response.data.status !== 200) {
            throw new Error(response.data.msg);
        }

        const newsData = response.data.data;
        res.status(200).json(newsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Taiwan stock news data' });
    }
}
