import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from '../styles/MarketOverview.module.css';
interface StockIndexData {
  date: string;
  price: number;
}

const fetchIndexData = async (stockCode: string) => {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(5, 'years').format('YYYY-MM-DD');
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;

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
    <div className={styles.plot}>
      {/* <h1>Taiwan Stock Indices - 5 Year Performance</h1> */}
      <Plot
        data={[
          {
            x: taiexDates,
            y: taiexPrices,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'TAIEX',
            marker: { color: 'blue' },
            yaxis: 'y',
          },
          {
            x: tpexDates,
            y: tpexPrices,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'TPEx',
            marker: { color: 'red' },
            yaxis: 'y2',
          },
        ]}
        layout={{
          xaxis: { title: 'Date', type: 'date',
            showgrid: false,
            showline: true,
            linewidth: 1,
            linecolor: 'black',
            mirror: true,
          },
          yaxis: {
            title: 'TAIEX Index Value',
            autorange: true,
            side: 'left',
            showgrid: false,
            showline: true,
            linewidth: 1,
            linecolor: 'black',
            mirror: true,
          },
          yaxis2: {
            title: 'TPEx Index Value',
            autorange: true,
            side: 'right',
            overlaying: 'y',
            showgrid: false, // Optional to hide gridlines on right axis
          },
          showlegend: true,
          legend: {
            x: 0,         // Legend position on x-axis (left side of the graph area)
            y: 1,         // Legend position on y-axis (top of the graph area)
            xanchor: 'left',
            yanchor: 'top',
          },
          title: 'Comparison of TAIEX and TPEx Indices',
          plot_bgcolor: 'transparent', // Set plot background color
          paper_bgcolor: 'transparent', // Set paper background color
          margin: { t: 40, r: 40, b: 40, l: 40 }, // Adjust the margin to prevent clipping
          grid: { rows: 1, columns: 1 },
          autosize: true,
  
        }}
        useResizeHandler={true} /* 這一行確保圖表根據窗口大小自動調整 */
        style={{ width: '100%', height: '100%', minHeight: '300px', minWidth: '300px'}} /* 設置圖表寬高 */
        config={{
          displayModeBar: false,
        }}
      />
      </div>
  
  );
};

export default TaiwanStockIndicesChart;
