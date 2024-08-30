import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';

interface StockPERData {
  date: string;
  per: number;
}

async function fetchLastFiveYearsMonthlyPER(stockCode: string) {
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
          acc.push({ date: curr.date, per: curr.PER });
        } else if (currDate.isSame(dayjs(lastItem.date), 'month') && currDate.isAfter(dayjs(lastItem.date))) {
          acc[acc.length - 1] = { date: curr.date, per: curr.PER };
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

const StockPER_PER: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [dataPoints, setDataPoints] = useState<StockPERData[]>([]);

  useEffect(() => {
    async function loadData() {
      const rawData = await fetchLastFiveYearsMonthlyPER(stockCode);
      setDataPoints(rawData);
    }
    loadData();
  }, [stockCode]);

  const dates = dataPoints.map(item => item.date);
  const perValues = dataPoints.map(item => item.per);

  return (
    <div>
      <h1>{stockCode} - 過去五年每月最後一日的價益比走勢</h1>
      <Plot
        data={[
          {
            x: dates,
            y: perValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'green' },
            name: '價益比'
          }
        ]}
        layout={{
          xaxis: { title: '日期', type: 'date' },
          yaxis: { title: '價益比 (PER)', autorange: true },
          title: '每月最後一日價益比走勢圖',
          showlegend: false
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default StockPER_PER;
