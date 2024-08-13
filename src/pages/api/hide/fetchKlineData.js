// pages/api/fetchKlineData.js
import axios from 'axios';

export default async function handler(req, res) {
  const { stockNo, startDate, endDate } = req.query;
  const url = `https://query1.finance.yahoo.com/v7/finance/download/${stockNo}`;
  const params = {
    period1: new Date(startDate).getTime() / 1000,
    period2: new Date(endDate).getTime() / 1000,
    interval: '1d',
    events: 'history'
  };

  console.log(`Fetching K-line data for stockNo: ${stockNo} from ${startDate} to ${endDate}`);

  try {
    const response = await axios.get(url, { params });
    const data = response.data;
    // 解析 CSV 或 JSON 數據，依據 Yahoo Finance 的返回格式
    res.status(200).send(data);
  } catch (error) {
    console.error(`Failed to fetch K-line data: `, error);
    res.status(500).json({ error: 'Failed to fetch K-line data' });
  }
}
