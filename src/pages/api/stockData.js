// pages/api/stockData.js
import axios from 'axios';

const handler = async (req, res) => {
    const { symbol = '2330.TW', period1 = '2020-01-01', period2 = '2021-01-01' } = req.query;

    try {
        const response = await axios.get('https://api.finmindtrade.com/api/v4/taiwan_stock_tick_snapshot', {
            params: {
                token: process.env.FINMIND_API_TOKEN,
                symbol,
                period1,
                period2,
                interval: '1d',
            },
        });

        const data = response.data.data.map((item) => ({
            x: new Date(item.date).getTime(),
            o: item.open,
            h: item.high,
            l: item.low,
            c: item.close
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
};

export default handler;
