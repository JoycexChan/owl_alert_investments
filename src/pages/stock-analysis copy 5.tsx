import React from 'react';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import styles from '../styles/Analysis.module.css';

const StockAnalysis = () => {
  const [selectedSection, setSelectedSection] = React.useState('latest');
  const code = "some-stock-code"; // 根據實際情況設置

  return (
    <div className={styles.wrapper}>
      <Sidebar onSelect={setSelectedSection} />
      <ContentArea selectedSection={selectedSection} code={code} />
    </div>
  );
};

export default StockAnalysis;
