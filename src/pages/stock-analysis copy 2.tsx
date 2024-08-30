// pages/stock-analysis.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';
import dynamic from 'next/dynamic';
import TaiwanStockNews from '../components/TaiwanStockNews';
import styles from '../styles/RegisterPage.module.css'; // 導入 CSS 模組

// 使用 dynamic 延迟加载 MonthlyKLineChart
const MonthlyKLineChart = dynamic(() => import('../components/MonthlyKLineChart'), { ssr: false });
const RevenueChart = dynamic(() => import('../components/RevenueChart'), { ssr: false });

const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = useState('latest');
  const router = useRouter();
  const { code } = router.query; // 從URL获取股票代碼

  return (
<div className="analysis">
  <div className="analysis-app">
    <div className="menu-frame">
      <ul>
        <li className="menu-item" onClick={() => setSelectedSection('overview')}>台股總覽</li>
        <li className="menu-item" onClick={() => setSelectedSection('technical')}>技術面</li>
        <li className="menu-item" onClick={() => setSelectedSection('chips')}>籌碼面</li>
        <li className="menu-item" onClick={() => setSelectedSection('fundamental')}>基本面</li>
        <li className="menu-item" onClick={() => setSelectedSection('others')}>其他</li>
      </ul>
    </div>
    <div className="content-area">
      {selectedSection === 'overview' && <TaiwanStockNews stockCode={code as string}  />}
      {selectedSection === 'technical' && <TaiwanStockNews stockCode={code as string} />}
      {selectedSection === 'chips' && <TaiwanStockNews stockCode={code as string} />}
      {selectedSection === 'fundamental' && <TaiwanStockNews stockCode={code as string} />}
      {selectedSection === 'others' && <TaiwanStockNews stockCode={code as string} />}
    </div>
  </div>
</div>

  );
};

export default StockAnalysis;
