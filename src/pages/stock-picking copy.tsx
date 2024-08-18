import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 資料假設
const data = {
  labels: ["2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      label: "策略 A 績效",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const StrategyInfo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
            <Navbar />
      <h1>精選清單</h1>
      <button onClick={() => setShowModal(true)}>查看策略原理</button>
      {showModal && (
        <div>
          <h2>策略 A 原理說明</h2>
          <p>這裡是策略 A 的詳細說明文本。</p>
          <button onClick={() => setShowModal(false)}>關閉</button>
        </div>
      )}
      <h2>策略歷史績效</h2>
      <Line data={data} options={options} />

      <h2>歷史選股列表</h2>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>股票名稱</th>
            <th>選股價格</th>
            <th>最新價格</th>
            <th>漲跌幅</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>2024-01-01</td>
            <td>XYZ 股份</td>
            <td>$100</td>
            <td>$150</td>
            <td>+50%</td>
          </tr> */}
          {/* 更多行數據 */}
        </tbody>
      </table>

      <Footer />
    </div>
  );
};

export default StrategyInfo;
