// pages/stock-analysis.tsx

import React, { useState } from 'react'; // 确保 useState 已经导入
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';


const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = useState('latest');
  const stockCode = '2330'; 

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar onSelect={setSelectedSection} />
        <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
          {selectedSection === 'latest' && <StockSummary stockCode={stockCode} />}
          {/* 其他内容 */}
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
