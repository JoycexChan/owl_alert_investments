// src/components/MarketOverview.tsx
import dynamic from 'next/dynamic';
import React from 'react';
import styles from '../styles/MarketOverview.module.css'; // 導入 CSS 模組
const TaiwanStockIndicesChart = dynamic(() => import('../components/TaiwanStockTotalReturnIndex'), { ssr: false });





const MarketOverview: React.FC = () => {
    return (
      <main>
      <div className={styles.wrapperout}>
        <div className={styles.wrapper}>  
        <div className={styles.background} >  
        </div>
        <div className={styles.backgroundtext}>
          <h1>台股大盤與類股表現</h1>
          <p>統計台股加權指數與產業類股最新表現。</p>
          <p>最後更新：2024/09/06</p>
          </div>
        <div className={styles.textcontainer}>  
        <div className={styles.statisticscontainer}>  
        <div className={`${styles.statbox} ${styles.firstrow}`}>
            <h2>上市指數收盤</h2>
            <h3>21435.19</h3>
            <p>+247.48 (+1.14%)</p>
          </div>
          <div className={`${styles.statbox} ${styles.secondrow}`}>
            <h2>櫃買指數收盤</h2>
            <h3>261.8</h3>
            <p>+0.59 (+0.22%)</p>
          </div>
          <div className={`${styles.statbox} ${styles.secondrow}`}>
            <h2>台股成交金額</h2>
            <h3>2723.98 億</h3>
            <p>昨日 3275.77 億</p>
          </div>
          <div className={`${styles.statbox} ${styles.thirdrow}`}>
            <h2>台股股價淨值比</h2>
            <h3>2.38 倍</h3>
            <p>昨日 2.35 倍</p>
          </div>
          <div className={`${styles.statbox} ${styles.thirdrow}`}>
            <h2>台股本益比</h2>
            <h3>20.9 倍</h3>
            <p>昨日 20.66 倍</p>
          </div>
        </div>
        <div className={styles.chartcontainerout}>
        <div className={styles.chartcontainer}>
          <TaiwanStockIndicesChart />
        </div>
        <div className={styles.descriptionbox}>
          <h3>什麼是大盤指數</h3>
          <p>台灣大盤指數（加權股價指數、TAIEX）是證交所編製的股價指數，用所有上市股票的市值加權計算，市值高的股票加權比較高，其股價變化就會對大盤指數有比較大的影響。
          </p>
          <h3>怎麼判斷大盤指數高低</h3>
          <p>大盤會隨通貨膨脹和 GDP 成長不斷墊高，所以沒辦法藉由絕對數字判斷高低點。想要判斷大盤指數高低，股價淨值比（P/B）是一個很好的指標。以過去 8 年來看，大盤股價淨值比接近或超過 1.8，股市下跌機率大，我們可以適當減碼；大盤股價淨值比接近或低於 1.4，股市上漲機率高，我們可以較有信心加碼
          </p>

        </div>
        </div>
      </div>
      </div>
      </div>
      </main>
    );
  };
  
  export default MarketOverview;