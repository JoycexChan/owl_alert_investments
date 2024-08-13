const yahooFinance = require('yahoo-finance2').default;

async function fetchFinancialMetrics() {
    const symbol = '2330.TW'; // 你可以更換為任何其他股票代碼

    try {
        // 獲取財務數據，包括淨資產收益率（ROE）
        const financialData = await yahooFinance.quoteSummary(symbol, {
            modules: ['financialData']
        });
        const roe = financialData.financialData.returnOnEquity;

        console.log('ROE:', roe);
    } catch (error) {
        console.error('Failed to fetch financial data:', error);
    }
}

fetchFinancialMetrics();
