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

        console.log('Company Data:', response.data);
        return response.data; // 返回 API 響應的數據部分
    } catch (error) {
        console.error('Error fetching data from TWSE:', error);
        return null;
    }
}

fetchCompanyData();
