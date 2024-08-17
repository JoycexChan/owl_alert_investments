// pages/api/getStockSummary.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stockNo } = req.query;

  try {
    const response = await axios.get(`https://example.com/api/stockData?stockNo=${stockNo}`);
    // 将实际的 API URL 替换为你要请求的外部 API

    const data = response.data;

    // 根据返回的数据结构，调整你需要返回的内容
    const stockSummary = {
      Code: data.Code,
      Name: data.Name,
      ClosePrice: data.ClosePrice,
      ChangePercent: data.ChangePercent,
      ChangeAmount: data.ChangeAmount,
      Date: data.Date,
    };

    res.status(200).json(stockSummary);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
}
