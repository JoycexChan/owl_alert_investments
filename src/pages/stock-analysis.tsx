// pages/stock-analysis.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Sidebar from '../components/Sidebar';
import StockSummary from '../components/StockSummary';
import dynamic from 'next/dynamic';
import TaiwanStockNews from '../components/TaiwanStockNews';
import styles from '../styles/Analysis.module.css'; // 導入 CSS 模組
// 使用 dynamic 延迟加载 MonthlyKLineChart
const MonthlyKLineChart = dynamic(() => import('../components/MonthlyKLineChart'), { ssr: false });
// const StockDecadeChart = dynamic(() => import('../components/TaiwanStock10Year'), { ssr: false });
const StockPER_DY = dynamic(() => import('../components/TaiwanStockPER_DY'), { ssr: false });
// const StockPER_PER = dynamic(() => import('../components/TaiwanStockPER_PER'), { ssr: false });
// const StockPER_PBR = dynamic(() => import('../components/TaiwanStockPER_PBR'), { ssr: false });
// const StockPER = dynamic(() => import('../components/TaiwanStockPER'), { ssr: false });
// const TaiwanStockIndicesChart = dynamic(() => import('../components/TaiwanStockTotalReturnIndex'), { ssr: false });

// const EnhancedKLineChart = dynamic(() => import('../components/TaiwanStockPriceAdj'), { ssr: false });
const RevenueChart = dynamic(() => import('../components/RevenueChart'), { ssr: false });

const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = useState('latest');
  const router = useRouter();
  const { code } = router.query; // 從URL获取股票代碼
  

  return (
    <div className={styles.wrapperout}>
    <div className={styles.wrapper}>  
        <div className={styles.flexContainer} >
        
          <div className={styles.sidebar}>
            <Sidebar onSelect={setSelectedSection} />
          </div>
          <div className={styles.mainContent}>
            {selectedSection === 'latest' && code && (
              <>
              <div className={styles.StockSummary}>
                <StockSummary stockCode={code as string} />
                </div>
                <div className={styles.plotContainer}>
                <MonthlyKLineChart stockCode={code as string}/>
                </div>
                <div className={styles.textContent}>
                  <h3>圖表說明</h3>
                  <p>股票的週線圖，包含蠟燭圖和5日、10日、20日移動平均線。蠟燭圖顯示每週的開盤、收盤、最高和最低價，幫助投資者識別市場趨勢和價格波動。移動平均線顯示短期到長期的價格趨勢，是判斷買賣時機的重要工具</p>
                
                </div>
              </>
            )}


          {selectedSection === 'valuation' && code && (
              <>
              <div className={styles.StockSummary}>
                <StockSummary stockCode={code as string} />
              </div>
              <div className={styles.plotContainer}>
                <StockPER_DY stockCode={code as string} />
              </div>
              <div className={styles.textContent}>
              <h3>圖表說明</h3>
                  <p>提供了股票過去五年每月最後一天的殖利率走勢圖。通過這個圖表，投資者可以觀察股票殖利率的長期趨勢，了解股票在不同時間的表現，進而評估股票的吸引力。</p>
                
                </div>
              </>
            )}


            {selectedSection === 'financial' && code && (
              <>
              <div className={styles.StockSummary}>
                <StockSummary stockCode={code as string} />
              </div>
              <div className={styles.plotContainer}>
                <RevenueChart stockCode={code as string} />
              </div>
              <div className={styles.textContent} >
              <h3>圖表說明</h3>
                  <p>展示了特定股票過去五年每月收入的走勢圖，並且計算了月度平均收入。透過這張圖表，投資者可以追蹤企業的營收表現，識別收入增長或下降的趨勢，從而分析企業的經營狀況和財務健康。</p>
                
                </div>
              </>
            )}

            {selectedSection === 'news' && code && (
              <>
              <div className={styles.StockSummary}>
                <StockSummary stockCode={code as string} />
              </div>
              <div className={styles.news}>
                <TaiwanStockNews stockCode={code as string} />
              </div>

              </>
            )}
          </div>
        </div>

        </div>

        </div>
 
  );
};

export default StockAnalysis;