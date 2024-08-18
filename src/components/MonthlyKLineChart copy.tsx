import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';

// 获取最近一年的日期范围
function getLastYearRange() {
  const endDate = dayjs().format('YYYY-MM-DD'); // 当前日期
  const startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'); // 一年前的日期
  return { startDate, endDate };
}

async function fetchMonthlyKData(stockCode: string) {
  const { startDate, endDate } = getLastYearRange();
  
  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockMonthPrice',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwNjoxNjoyNiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.3F57WTmvMUcd6oFQoiQVmk3oON-6T5148wjObwBpOqQ',
      },
    });
    return response.data.data; // 返回数据
  } catch (error) {
    console.error('Error fetching monthly K data:', error);
    return [];
  }
}

const MonthlyKLineChart: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [kData, setKData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchMonthlyKData(stockCode);
      setKData(data);
    }

    loadData();
  }, [stockCode]);

  const dates = kData.map(item => item.date);
  const openPrices = kData.map(item => item.open);
  const highPrices = kData.map(item => item.max);
  const lowPrices = kData.map(item => item.min);
  const closePrices = kData.map(item => item.close);

  return (
    <Plot
      data={[
        {
          x: dates,
          close: closePrices,
          decreasing: { line: { color: 'red' } },
          high: highPrices,
          increasing: { line: { color: 'green' } },
          low: lowPrices,
          open: openPrices,
          type: 'candlestick',
          xaxis: 'x',
          yaxis: 'y',
        },
      ]}
      layout={{
        title: `${stockCode} 月K线图`,
        xaxis: { type: 'category' },
        yaxis: { autorange: true },
      }}
    />
  );
};

export default MonthlyKLineChart;
