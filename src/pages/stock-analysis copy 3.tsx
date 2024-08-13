import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const StockKline = () => {
  const [chartData, setChartData] = useState(null);

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
        const data = response.data.map((item) => ({
          x: new Date(item.date), // 使用 x 軸標記時間
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close
        }));

        setChartData({
          datasets: [{
            label: 'K 線圖',
            data: data,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {chartData ? (
        <Chart type='candlestick' data={chartData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StockKline;
