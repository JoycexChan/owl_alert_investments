import styles from '../styles/StockSummary.module.css';

const LoadingIcon = () => (
  <div className={styles.loadingAnimation}>
    <div className={styles.spinner}></div> {/* 加載旋轉圖標 */}
  </div>
);

export default LoadingIcon;
