import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';

interface StockPBRData {
  date: string;
  pbr: number;
}

async function fetchLastFiveYearsMonthlyPBR(stockCode: string) {
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
      const monthlyData = response.data.data.reduce((acc: StockPBRData[], curr: any) => {
        const currDate = dayjs(curr.date);
        const lastItem = acc[acc.length - 1];
        if (!lastItem || !currDate.isSame(dayjs(lastItem.date), 'month')) {
          acc.push({ date: curr.date, pbr: curr.PBR });
        } else if (currDate.isSame(dayjs(lastItem.date), 'month') && currDate.isAfter(dayjs(lastItem.date))) {
          acc[acc.length - 1] = { date: curr.date, pbr: curr.PBR };
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

const StockPER_PBR: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [dataPoints, setDataPoints] = useState<StockPBRData[]>([]);

  useEffect(() => {
    async function loadData() {
      const rawData = await fetchLastFiveYearsMonthlyPBR(stockCode);
      setDataPoints(rawData);
    }
    loadData();
  }, [stockCode]);

  const dates = dataPoints.map(item => item.date);
  const pbrValues = dataPoints.map(item => item.pbr);

  return (
    <div>
      <h1>{stockCode} - 過去五年每月最後一日的價值淨比走勢</h1>
      <Plot
        data={[
          {
            x: dates,
            y: pbrValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'purple' },
            name: '價值淨比'
          }
        ]}
        layout={{
          xaxis: { title: '日期', type: 'date' },
          yaxis: { title: '價值淨比 (PBR)', autorange: true },
          title: '每月最後一日價值淨比走勢圖',
          showlegend: true
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default StockPER_PBR;
