import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from '../styles/Analysis.module.css';
interface StockPERData {
  date: string;
  dividendYield: number;
}

async function fetchLastFiveYearsMonthlyDY(stockCode: string) {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs(endDate).subtract(5, 'years').format('YYYY-MM-DD');
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;

  try {
    const response = await axios.get(`https://api.finmindtrade.com/api/v4/data`, {
      params: {
        dataset: 'TaiwanStockPER',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: token,
      },
    });
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const monthlyData = response.data.data.reduce((acc: StockPERData[], curr: any) => {
        const currDate = dayjs(curr.date);
        const lastItem = acc[acc.length - 1];
        if (!lastItem || !currDate.isSame(dayjs(lastItem.date), 'month')) {
          acc.push({ date: curr.date, dividendYield: curr.dividend_yield });
        } else if (currDate.isSame(dayjs(lastItem.date), 'month') && currDate.isAfter(dayjs(lastItem.date))) {
          acc[acc.length - 1] = { date: curr.date, dividendYield: curr.dividend_yield };
        }
        return acc;
      }, []);
      return monthlyData;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

const StockPER_DY: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [dataPoints, setDataPoints] = useState<StockPERData[]>([]);

  useEffect(() => {
    async function loadData() {
      const rawData = await fetchLastFiveYearsMonthlyDY(stockCode);
      setDataPoints(rawData);
    }
    loadData();
  }, [stockCode]);

  const dates = dataPoints.map(item => item.date);
  const dividendYields = dataPoints.map(item => item.dividendYield);

  return (
    <div className={styles.plot}>

      {/* <h1>{stockCode} - 過去五年每月最後一日的殖利率走勢</h1> */}
      <Plot
        data={[
          {
            x: dates,
            y: dividendYields,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            name: '殖利率'
          }
        ]}
        layout={{
          xaxis: { title: '時間 (月)', type: 'date',
            showgrid: false,
            showline: true,
            linewidth: 1,
            linecolor: 'black',
            mirror: true,
          },
          yaxis: { title: '殖利率 (%)', autorange: true,
            showgrid: false,
            showline: true,
            linewidth: 1,
            linecolor: 'black',
            mirror: true,
           },
          title: `${stockCode} 每月殖利率走勢圖`,

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

export default StockPER_DY;
