import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from '../styles/Analysis.module.css';
function getLastHalfYearRange() {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(6, 'month').format('YYYY-MM-DD');
  return { startDate, endDate };
}

async function fetchWeeklyData(stockCode: string) {
  const { startDate, endDate } = getLastHalfYearRange();
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;
  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockWeekPrice',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: token,
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
  if (data.length < period) return []; // 如果數據長度小於移動平均期，返回空數組
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

  // 確保 MA 數據存在，且對應的日期數據也正確
  const validFiveDayMADates = dates.slice(4, 4 + fiveDayMA.length);
  const validTwoWeekMADates = dates.slice(9, 9 + twoWeekMA.length);
  const validMonthMADates = dates.slice(19, 19 + monthMA.length);

  return (

    <div className={styles.plot}>
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
        {
          x: validFiveDayMADates,
          y: fiveDayMA,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'blue' },
          name: '5日線',
          yaxis: 'y',
        },
        {
          x: validTwoWeekMADates,
          y: twoWeekMA,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'purple' },
          name: '雙周線',
          yaxis: 'y',
        },
        {
          x: validMonthMADates,
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
        xaxis: { 
          title: '時間 (日)',
          type: 'category',
          showgrid: false,
          showline: true,
          linewidth: 1,
          linecolor: 'black',
          mirror: true,
        
        },
        yaxis: { 
          title: '股價 (元)',
          autorange: true,
          showgrid: false,
          showline: true,
          linewidth: 1,
          linecolor: 'black',
          mirror: true,

        },
        showlegend: true,
        legend: {
          x: 0.5,         // Legend position on x-axis (left side of the graph area)
          y: -1.35,         // Legend position on y-axis (top of the graph area)
          xanchor: 'center',
          yanchor: 'bottom',
          orientation: 'h', // 圖例項目水平排列
        },
        plot_bgcolor: 'transparent', // Set plot background color
        paper_bgcolor: 'transparent', // Set paper background color
        margin: { t: 40, r: 10, b: 40, l: 50 }, // Adjust the margin to prevent clipping
        grid: { rows: 1, columns: 1 },
        autosize: true,

      }}
      useResizeHandler={true} /* 這一行確保圖表根據窗口大小自動調整 */
      style={{ width: '100%', height: '100%', minWidth:'600px' }} /* 設置圖表寬高 */
      config={{
        displayModeBar: false,
      }}
    />
    </div>
  );
  
};

export default EnhancedKLineChart;
