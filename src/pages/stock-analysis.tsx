import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement, OhlcController, OhlcElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns'; // 引入日期適配器
import Navbar from '../components/Navbar';
Chart.register(
  ...registerables,
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement
);

interface StockData {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

const StockKline = () => {
  const [data, setData] = useState<StockData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

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
        const formattedData = response.data.map((item: any) => ({
          x: new Date(item.date).getTime(),
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'candlestick',
        data: {
          datasets: [{
            label: 'Stock Price',
            data: data
          }]
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
                    <Navbar />
      <canvas ref={chartRef} />
    </div>
  );
};

export default StockKline;
