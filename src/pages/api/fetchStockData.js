// pages/api/fetchStockData.js
//測試 
//http://localhost:3000/api/fetchStockData?stockNo=100
//回傳{"error":"Stock not found"}
//http://localhost:3000/api/fetchStockData?stockNo=2330
//{"Code":"2330","Name":"台積電","PEratio":"27.22","DividendYield":"1.34","PBratio":"6.63"}

import axios from 'axios';

export default async function handler(req, res) {
  const { stockNo } = req.query;

  console.log(`Fetching data for stockNo: ${stockNo}`);

  try {
    const response = await axios.get(`https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL?stockNo=${stockNo}`);
    const stockList = response.data;

    // 過濾並找到正確的股票代碼
    const stockData = stockList.find(stock => stock.Code === stockNo);

    if (stockData) {
      res.status(200).json({
        Code: stockData.Code,
        Name: stockData.Name,
        PEratio: stockData.PEratio,
        DividendYield: stockData.DividendYield,
        PBratio: stockData.PBratio
      });
    } else {
      res.status(404).json({ error: 'Stock not found' });
    }
  } catch (error) {
    console.error(`Failed to fetch stock data: `, error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
}
