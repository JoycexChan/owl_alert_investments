import React from 'react';
import StockSummary from './StockSummary';
import EnhancedKLineChart from './MonthlyKLineChart';
import RevenueChart from './RevenueChart';
import TaiwanStockNews from './TaiwanStockNews';
import styles from '../styles/ContentArea.module.css';

interface ContentAreaProps {
  selectedSection: string;
  code: string | null;
}

const ContentArea: React.FC<ContentAreaProps> = ({ selectedSection, code }) => {
  return (
    <div className={styles.contentArea}>
      {selectedSection === 'latest' && code && (
        <>
          <div className={styles.stockSummary}>
            <StockSummary stockCode={code as string} />
          </div>
          <div className={styles.taiwanStockIndicesChart}>
            <EnhancedKLineChart stockCode={code as string} />
          </div>
        </>
      )}

      {selectedSection === 'financial' && code && (
        <>
          <div className={styles.stockSummary}>
            <StockSummary stockCode={code as string} />
          </div>
          <div className={styles.revenueChart}>
            <RevenueChart stockCode={code as string} />
          </div>
        </>
      )}

      {selectedSection === 'news' && code && (
        <>
          <div className={styles.stockSummary}>
            <StockSummary stockCode={code as string} />
          </div>
          <div className={styles.taiwanStockNews}>
            <TaiwanStockNews stockCode={code as string} />
          </div>
        </>
      )}
    </div>
  );
};

export default ContentArea;
