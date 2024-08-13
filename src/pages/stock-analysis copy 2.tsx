import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockKline = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/kline', {
          params: {
            symbol: '2330.TW',
            period1: '2020-01-01',
            period2: '2021-01-01',
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default StockKline;
