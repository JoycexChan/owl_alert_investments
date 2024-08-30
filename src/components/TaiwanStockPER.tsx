import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';

interface StockData {
  date: string;
  dy: number;
  per: number;
  pbr: number;
}

async function fetchStockMetrics(stockCode: string) {
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
    const monthlyData = response.data.data.reduce((acc: StockData[], curr: any) => {
      const currDate = dayjs(curr.date).endOf('month').format('YYYY-MM-DD');
      let lastItem = acc.find(item => item.date === currDate);
      if (!lastItem) {
        lastItem = { date: currDate, dy: curr.dividend_yield, per: curr.PER, pbr: curr.PBR };
        acc.push(lastItem);
      } else {
        lastItem.dy = curr.dividend_yield;
        lastItem.per = curr.PER;
        lastItem.pbr = curr.PBR;
      }
      return acc;
    }, []).sort((a, b) => a.date.localeCompare(b.date));
    return monthlyData;
  } catch (error) {
    console.error('Error fetching stock metrics:', error);
    return [];
  }
}

const StockMetricsChart: React.FC<{ stockCode: string }> = ({ stockCode }) => {
  const [dataPoints, setDataPoints] = useState<StockData[]>([]);

  useEffect(() => {
    async function loadData() {
      const metricsData = await fetchStockMetrics(stockCode);
      setDataPoints(metricsData);
    }
    loadData();
  }, [stockCode]);

  const dates = dataPoints.map(item => item.date);
  const dyValues = dataPoints.map(item => item.dy);
  const perValues = dataPoints.map(item => item.per);
  const pbrValues = dataPoints.map(item => item.pbr);

  return (
    <div>
      <h1>{stockCode} - Financial Ratios over the Last Five Years</h1>
      <Plot
        data={[
          {
            x: dates,
            y: dyValues,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Dividend Yield',
            marker: { color: 'green' },
          },
          {
            x: dates,
            y: perValues,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'P/E Ratio',
            marker: { color: 'red' },
          },
          {
            x: dates,
            y: pbrValues,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'P/B Ratio',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          xaxis: { title: 'Date', type: 'date' },
          yaxis: { title: 'Value', autorange: true },
          title: 'Financial Metrics',
          showlegend: true
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default StockMetricsChart;
