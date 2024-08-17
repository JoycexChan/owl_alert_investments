import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';

const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = useState('latest');
  const router = useRouter();
  const { code } = router.query; // 从URL获取股票代码

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar onSelect={setSelectedSection} />
        <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
          {selectedSection === 'latest' && code && <StockSummary stockCode={code as string} />}
          {/* 其他内容 */}
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
