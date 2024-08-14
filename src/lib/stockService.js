// src/lib/stockService.js

const fetch = require('node-fetch');  // 使用 node-fetch 來處理 HTTP 請求

/**
 * 獲取特定股票的當前價格。
 * @param {string} stockSymbol 股票代碼，如 'AAPL'、'2330.TW' 等。
 * @returns {Promise<number>} 返回股票的當前價格。
 */
async function getCurrentStockPrice(stockSymbol) {
    const url = `https://api.finance.com/quote/${stockSymbol}`;  // 修改為實際的 API 端點
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.currentPrice;  // 根據 API 的響應結構調整這行
    } catch (error) {
        console.error('Error fetching stock price:', error);
        throw error;
    }
}

module.exports = {
    getCurrentStockPrice
};
