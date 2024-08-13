// fetchCompanyData.js
const yahooFinance = require('yahoo-finance2').default;

async function fetchCompanyData(symbol) {
    try {
        const companyData = await yahooFinance.quoteSummary(symbol, { modules: ['assetProfile', 'summaryProfile'] });
        console.log('Company Data:', companyData);
    } catch (error) {
        console.error('Error fetching company data:', error);
    }
}

fetchCompanyData('2330.TW');
