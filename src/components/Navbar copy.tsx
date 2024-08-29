import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
// import { NotificationProvider } from '../context/NotificationContext';
// import NotificationList from '../components/NotificationList';

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [stockCode, setStockCode] = useState(''); // 用來儲存輸入的台股代碼
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleRegister = () => {
        router.push('/sign_in');
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeModal = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // 確認 event.target 是 Element 的實例
            if (event.target instanceof Element && isMenuOpen && !event.target.closest(`.${styles.navModal}`)) {
                closeModal();
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isMenuOpen]);
    
    

    return (
        <nav className={styles.navbar}>
            <div className={styles.menuButton}>
                <Image
                    src="/images/oai-icon.png" 
                    alt="Menu"
                    width={44} // 設定圖片寬度
                    height={44} // 設定圖片高度
                    onClick={toggleMenu}
                    style={{ cursor: 'pointer' }} // 添加指針手型指標以指示可以點擊
                    className={styles.homeIcon}
                />
            </div>
            <div className={`${styles.navModal} ${isMenuOpen ? styles.active : ''}`}>
                
            <ul>
                    <li onClick={toggleMenu}><Link href="/">首頁</Link></li>
                    <li onClick={toggleMenu}><Link href="/stock-analysis?code=2330">個股</Link></li>
                    <li onClick={toggleMenu}><Link href="/stock-picking">精選清單</Link></li>
                    {user && <li onClick={toggleMenu}><Link href="/member">收藏匣</Link></li>}
                </ul>
            </div>


            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.hide : ''}`}>
                <li>
                    <Link href="/" passHref>
                        <Image src="/images/oai-icon.png" alt="首頁" width={44} height={44} className={styles.homeIcon} />
                    </Link>
                </li>
                <li><Link href="/stock-analysis?code=2330">個股</Link></li>
                <li><Link href="/stock-picking">精選清單</Link></li>
                {user && <li><Link href="/member">收藏匣</Link></li>}
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
                        登入
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
