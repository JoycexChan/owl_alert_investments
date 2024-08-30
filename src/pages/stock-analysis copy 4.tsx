// pages/stock-analysis.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';
import dynamic from 'next/dynamic';
import TaiwanStockNews from '../components/TaiwanStockNews';
import styles from '../styles/RegisterPage.module.css'; // 導入 CSS 模組
// 使用 dynamic 延迟加载 MonthlyKLineChart
// const MonthlyKLineChart = dynamic(() => import('../components/MonthlyKLineChart'), { ssr: false });
// const StockDecadeChart = dynamic(() => import('../components/TaiwanStock10Year'), { ssr: false });
// const StockPER_DY = dynamic(() => import('../components/TaiwanStockPER_DY'), { ssr: false });
// const StockPER_PER = dynamic(() => import('../components/TaiwanStockPER_PER'), { ssr: false });
// const StockPER_PBR = dynamic(() => import('../components/TaiwanStockPER_PBR'), { ssr: false });
// const StockPER = dynamic(() => import('../components/TaiwanStockPER'), { ssr: false });
const TaiwanStockIndicesChart = dynamic(() => import('../components/TaiwanStockTotalReturnIndex'), { ssr: false });

// const EnhancedKLineChart = dynamic(() => import('../components/TaiwanStockPriceAdj'), { ssr: false });
const RevenueChart = dynamic(() => import('../components/RevenueChart'), { ssr: false });

const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = useState('latest');
  const router = useRouter();
  const { code } = router.query; // 從URL获取股票代碼


  return (
    <div className="wrapperout">
    <div className="wrapper">  

        <div style={{ display: 'flex'}}>
          <div className="sidebar">
            <Sidebar onSelect={setSelectedSection} />
          </div>
          <div className="content-area">
            {selectedSection === 'latest' && code && (
              <>
              <div className="StockSummary">
                <StockSummary stockCode={code as string} />
                </div>
                <div className="TaiwanStockIndicesChart">
                <TaiwanStockIndicesChart />
                </div>
              </>
            )}

            {selectedSection === 'financial' && code && (
              <>
                <StockSummary stockCode={code as string} />
                <RevenueChart stockCode={code as string} />
              </>
            )}

            {selectedSection === 'news' && code && (
              <>
                <StockSummary stockCode={code as string} />
                <TaiwanStockNews stockCode={code as string} />
              </>
            )}
          </div>
        </div>

        </div>

        </div>
 
  );
};

export default StockAnalysis;