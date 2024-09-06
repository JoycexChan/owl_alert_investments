import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from '../styles/Analysis.module.css';
interface RevenueData {
  date: string;
  revenue: number;
}

function getLastFiveYearsRange() {
  const endDate = dayjs().format('YYYY-MM-DD'); // 當前日期
  const startDate = dayjs().subtract(5, 'year').format('YYYY-MM-DD'); // 五年前的日期
  return { startDate, endDate };
}

async function fetchRevenueData(stockCode: string): Promise<RevenueData[]> {
  const { startDate, endDate } = getLastFiveYearsRange();
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;
  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockMonthRevenue',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: token,
      },
    });
    return response.data.data.map((item: any) => ({
      date: item.date,
      revenue: item.revenue / 1000, // 以千元為單位
    }));
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return [];
  }
}

function calculateMonthlyAverage(revenue: number[]): number[] {
  return revenue.map((_, index, array) => {
    const relevantData = array.slice(0, index + 1);
    const sum = relevantData.reduce((a, b) => a + b, 0);
    return sum / relevantData.length;
  });
}

const RevenueChart: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [monthlyAverage, setMonthlyAverage] = useState<number[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchRevenueData(stockCode);
      setRevenueData(data);
      setMonthlyAverage(calculateMonthlyAverage(data.map(item => item.revenue)));
    }

    loadData();
  }, [stockCode]);

  const dates = revenueData.map(item => item.date);
  const revenues = revenueData.map(item => item.revenue);

  return (
    <div className={styles.plot}>

    <Plot
      data={[
        {
          x: dates,
          y: revenues,
          type: 'scatter',
          mode: 'lines', // Removing markers, only showing lines
          line: { color: 'blue' },
          name: 'Revenue',
        },
        {
          x: dates,
          y: monthlyAverage,
          type: 'scatter',
          mode: 'lines', // Removing markers, only showing lines
          line: { color: 'orange' },
          name: 'Monthly Average',
        },
      ]}
      layout={{
        title: `${stockCode} 每月營收趨勢`,
        xaxis: {
          title: '時間 (年)',
          type: 'date',
          showgrid: false,
          showline: true,
          linewidth: 1,
          linecolor: 'black',
          mirror: true,
          
        },
        yaxis: {
          title: '營收 (千元)',
          autorange: true,
          showgrid: false,
          showline: true,
          linewidth: 1,
          linecolor: 'black',
          mirror: true,
        },
        showlegend: true,
        legend: {
          x: 0,         // Legend position on x-axis (left side of the graph area)
          y: 1,         // Legend position on y-axis (top of the graph area)
          xanchor: 'left',
          yanchor: 'top',
        },
        plot_bgcolor: 'transparent', // Set plot background color
        paper_bgcolor: 'transparent', // Set paper background color
        margin: { t: 40, r: 40, b: 40, l: 60 }, // Adjust the margin to prevent clipping
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

export default RevenueChart;
