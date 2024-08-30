import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // 用於自定義日期格式
dayjs.extend(customParseFormat);

interface StockData {
  date: string;
  close: number;
}

async function fetchLastFiveYearsMonthlyData(stockCode: string) {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(5, 'years').format('YYYY-MM-DD');
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;

  try {
    const response = await axios.get(`https://api.finmindtrade.com/api/v4/data`, {
      params: {
        dataset: 'TaiwanStockPrice',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: token,
      },
    });
    console.log('API Response:', response.data);
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const sortedData = response.data.data.sort((a: any, b: any) => dayjs(a.date).diff(dayjs(b.date)));
      const monthlyData = sortedData.reduce((acc: StockData[], curr: any) => {
        const currDate = dayjs(curr.date);
        const lastItem = acc[acc.length - 1];
        if (!lastItem || !currDate.isSame(dayjs(lastItem.date), 'month')) {
          acc.push({ date: curr.date, close: curr.close });
        } else if (currDate.isSame(dayjs(lastItem.date), 'month') && currDate.isAfter(dayjs(lastItem.date))) {
          acc[acc.length - 1] = { date: curr.date, close: curr.close };
        }
        return acc;
      }, []);
      console.log('Processed Monthly Data:', monthlyData); // Log the processed data
      return monthlyData;
    } else {
      console.error('Expected data not found:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

const StockFiveYearChart: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [dataPoints, setDataPoints] = useState<StockData[]>([]);

  useEffect(() => {
    async function loadData() {
      const rawData = await fetchLastFiveYearsMonthlyData(stockCode);
      setDataPoints(rawData);
    }
    loadData();
  }, [stockCode]);

  const dates = dataPoints.map(item => item.date);
  const closes = dataPoints.map(item => item.close);

  return (
    <div>
      <h1>{stockCode} - 過去五年每月最後一日的收盤價格走勢</h1>
      <Plot
        data={[
          {
            x: dates,
            y: closes,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          xaxis: { title: '日期', type: 'date' },
          yaxis: { title: '收盤價', autorange: true },
          title: '每月最後一日收盤價走勢圖',
          showlegend: false,
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default StockFiveYearChart;
