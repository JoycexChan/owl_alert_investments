import React from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ onSelect }: { onSelect: (section: string) => void }) => {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li onClick={() => onSelect('latest')}>最新動態</li>
                {/* <li onClick={() => onSelect('diagnosis')}>股票健診</li> */}
                <li onClick={() => onSelect('financial')}>財務報表</li>
                {/* <li onClick={() => onSelect('profitability')}>獲利能力</li>
                <li onClick={() => onSelect('safety')}>安全性分析</li>
                <li onClick={() => onSelect('growth')}>成長力分析</li>
                <li onClick={() => onSelect('valuation')}>價值評估</li> */}
                <li onClick={() => onSelect('news')}>相關新聞</li>
            </ul>
        </div>
    );
};

export default Sidebar;
