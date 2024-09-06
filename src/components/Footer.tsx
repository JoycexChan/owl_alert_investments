import React from 'react';
import styles from '../styles/Navbar.module.css';
const Footer: React.FC = () => {
    return (
        <footer className={styles.footout}>
            <div className={styles.footin}>
                <p>&copy; 資料來源說明：本站資訊來源包括公開資訊觀測站、台灣證券交易所及櫃檯買賣中心。提供的分析工具和數據僅供參考使用，並不構成任何交易建議。使用本站資訊所產生的任何損失需由使用者自行承擔，本站不對資料的準確性或傳輸過程中的任何問題負責。使用前請自行評估相關風險。(金訊鴞免責聲明)</p>
            </div>
        </footer>
    );
}

export default Footer;
