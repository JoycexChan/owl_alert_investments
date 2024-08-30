import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';

interface StockIndexData {
  date: string;
  price: number;
}

const fetchIndexData = async (stockCode: string) => {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(5, 'years').format('YYYY-MM-DD');
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;  // 直接使用环境变量

  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockTotalReturnIndex',
        data_id: stockCode,
        start_date: startDate,
        end_date: endDate,
        token: token,
      },
    });
    return response.data.data.map((item: any) => ({
      date: item.date,
      price: item.price,
    }));
  } catch (error) {
    console.error(`Error fetching data for ${stockCode}:`, error);
    return [];
  }
};

const TaiwanStockIndicesChart: React.FC = () => {
  const [taiexData, setTaiexData] = useState<StockIndexData[]>([]);
  const [tpexData, setTpexData] = useState<StockIndexData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const taiex = await fetchIndexData('TAIEX');
      const tpex = await fetchIndexData('TPEx');
      setTaiexData(taiex);
      setTpexData(tpex);
    };
    loadData();
  }, []);

  const taiexDates = taiexData.map(item => item.date);
  const taiexPrices = taiexData.map(item => item.price);
  const tpexDates = tpexData.map(item => item.date);
  const tpexPrices = tpexData.map(item => item.price);

  return (
    <div>
      <h1>Taiwan Stock Indices - 5 Year Performance</h1>
      <Plot
        data={[
          {
            x: taiexDates,
            y: taiexPrices,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'TAIEX',
            marker: { color: 'blue' },
          },
          {
            x: tpexDates,
            y: tpexPrices,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'TPEx',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          xaxis: { title: 'Date', type: 'date' },
          yaxis: { title: 'Index Value', autorange: true },
          title: 'Comparison of TAIEX and TPEx Indices',
          showlegend: true
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default TaiwanStockIndicesChart;
