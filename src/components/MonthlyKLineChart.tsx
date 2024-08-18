import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';

function getLastHalfYearRange() {
  const endDate = dayjs().format('YYYY-MM-DD'); // 当前日期
  const startDate = dayjs().subtract(6, 'month').format('YYYY-MM-DD'); // 半年前的日期
  return { startDate, endDate };
}

async function fetchWeeklyData(stockCode: string) {
  const { startDate, endDate } = getLastHalfYearRange();
  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockWeekPrice',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAwODoxMTo1MSIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.WWbP9VdcjVyGXDlF-gFsWWsHOFMFdj-tTB4f2dSzeEY',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    return [];
  }
}

interface StockKLineData {
  date: string;
  open: number;
  max: number;
  min: number;
  close: number;
}

function calculateMovingAverage(data: number[], period: number): number[] {
  let averages: number[] = [];
  for (let i = 0; i <= data.length - period; i++) {
    let sum = 0;
    for (let j = i; j < i + period; j++) {
      sum += data[j];
    }
    averages.push(sum / period);
  }
  return averages;
}

const EnhancedKLineChart: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [kData, setKData] = useState<StockKLineData[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchWeeklyData(stockCode);
      setKData(data);
    }

    loadData();
  }, [stockCode]);

  const dates = kData.map(item => item.date);
  const openPrices = kData.map(item => item.open);
  const highPrices = kData.map(item => item.max);
  const lowPrices = kData.map(item => item.min);
  const closePrices = kData.map(item => item.close);

  const fiveDayMA = calculateMovingAverage(closePrices, 5);
  const twoWeekMA = calculateMovingAverage(closePrices, 10);
  const monthMA = calculateMovingAverage(closePrices, 20);

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
          yaxis: 'y', // 明确指定使用第一個 Y 軸
        },
        {
          x: dates,
          y: fiveDayMA,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'blue' },
          name: '5日線',
          yaxis: 'y',
        },
        {
          x: dates,
          y: twoWeekMA,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'purple' },
          name: '雙周線',
          yaxis: 'y',
        },
        {
          x: dates,
          y: monthMA,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'orange' },
          name: '月線',
          yaxis: 'y',
        },
      ]}
      layout={{
        title: `${stockCode} 股價趨勢`,
        xaxis: { type: 'category' },
        yaxis: { autorange: true },
        showlegend: true,
        yaxis2: { showgrid: false, zeroline: false, visible: false }, // 明确隐藏第二个 Y 轴
        grid: { rows: 1, columns: 1 }, // 明確指定为单一图表
      }}


      config={{
        displayModeBar: false, // 根据需要隐藏工具栏
      }}
    />
  );
};


export default EnhancedKLineChart;