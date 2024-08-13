const axios = require('axios');

async function fetchCompanyData() {
    try {
        const response = await axios.get('https://openapi.twse.com.tw/v1/opendata/t187ap03_P', {
            headers: {
                'accept': 'application/json',
                'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        // 打印出所有公司的公司代號
        const companyIds = response.data.map(company => company.公司代號);
        console.log('All Company IDs:', companyIds);

        // 嘗試過濾出 2330 的公司資料
        const companyData = response.data.filter(company => company.公司代號 === '2330');

        if (companyData.length > 0) {
            console.log('Company Data for 2330:', companyData[0]);
        } else {
            console.log('No data found for company 2330.');
        }
        
        return companyData; // 返回過濾後的公司資料
    } catch (error) {
        console.error('Error fetching data from TWSE:', error);
        return null;
    }
}

fetchCompanyData();
