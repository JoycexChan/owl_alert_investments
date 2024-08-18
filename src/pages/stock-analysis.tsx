// pages/stock-analysis.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';
import dynamic from 'next/dynamic';

// 使用 dynamic 延迟加载 MonthlyKLineChart
const MonthlyKLineChart = dynamic(() => import('../components/MonthlyKLineChart'), { ssr: false });
const RevenueChart = dynamic(() => import('../components/RevenueChart'), { ssr: false });

const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = useState('latest');
  const router = useRouter();
  const { code } = router.query; // 從URL获取股票代碼

  // <li onClick={() => onSelect('latest')}>最新動態</li>
  // <li onClick={() => onSelect('diagnosis')}>股票健診</li>
  // <li onClick={() => onSelect('financial')}>財務報表</li>
  // <li onClick={() => onSelect('profitability')}>獲利能力</li>
  // <li onClick={() => onSelect('safety')}>安全性分析</li>
  // <li onClick={() => onSelect('growth')}>成長力分析</li>
  // <li onClick={() => onSelect('valuation')}>價值評估</li>
  
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar onSelect={setSelectedSection} />
        <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
          {/* 右側畫面根據選擇的部分顯示相應的內容 */}
          {selectedSection === 'latest' && code && (
            <>
              <StockSummary stockCode={code as string} />
              <MonthlyKLineChart stockCode={code as string} />
            </>
          )}


{selectedSection === 'diagnosis' && code && (
            <RevenueChart stockCode={code as string} />

          )}

{selectedSection === 'financial' && code && (
            <StockSummary stockCode={code as string} />
          )}

{selectedSection === 'profitability' && code && (
            <StockSummary stockCode={code as string} />
          )}

{selectedSection === 'safety' && code && (
            <StockSummary stockCode={code as string} />
          )}

{selectedSection === 'growth' && code && (
            <StockSummary stockCode={code as string} />
          )}

{selectedSection === 'valuation' && code && (
            <StockSummary stockCode={code as string} />
          )} 
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
