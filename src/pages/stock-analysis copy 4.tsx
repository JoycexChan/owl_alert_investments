// pages/stock-analysis.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';
import MonthlyKLineChart from '../components/MonthlyKLineChart';

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
          {/* 這裡每一個區塊都顯示 StockSummary */}
          {code && <StockSummary stockCode={code as string} />}
          
          {/* 當選擇最新動態時顯示 MonthlyKLineChart */}
          {selectedSection === 'latest' && code && (
            <>
              <MonthlyKLineChart stockCode={code as string} />
            </>
          )}

          {/* 這裡可以為其他部分添加內容 */}
          {/* {selectedSection === 'diagnosis' && code && <SomeOtherComponent stockCode={code as string} />} */}
          {/* {selectedSection === 'financial' && code && <AnotherComponent stockCode={code as string} />} */}
          {/* 根據需要添加更多條件渲染的內容 */}
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
