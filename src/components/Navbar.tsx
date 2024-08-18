import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [stockCode, setStockCode] = useState(''); // 用來儲存輸入的台股代碼

    const handleRegister = () => {
        router.push('/01register');
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleSearch = () => {
        if (stockCode) {
            router.push(`/stock-analysis?code=${stockCode}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li><Link href="/">首頁</Link></li>
                <li><Link href="/stock-analysis?code=2330">個股</Link></li>
                <li><Link href="/stock-picking">精選清單</Link></li>
                {/* <li><Link href="/compare">比較</Link></li> */}
                {user && <li><Link href="/01member">收藏匣</Link></li>}
            </ul>
            
            <div className={styles.actions}>
                {/* 搜尋框 */}
                <div className={styles.searchBox}>
                    <input 
                        type="text" 
                        placeholder="輸入台股代碼" 
                        value={stockCode} 
                        onChange={(e) => setStockCode(e.target.value)} 
                        className={styles.searchInput}
                    />
                    <button 
                        onClick={handleSearch} 
                        className={styles.searchButton}
                    >
                        搜尋
                    </button>
                </div>
                
                {user ? (
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}>
                        登出系統
                    </button>
                ) : (
                    <button
                        onClick={handleRegister}
                        className={styles.registerButton}>
                        免費註冊
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
