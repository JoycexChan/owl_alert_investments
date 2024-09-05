import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';

interface Stock {
    stock_id: string;
    stock_name: string;
}

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [stockCode, setStockCode] = useState('');
    const [stocks, setStocks] = useState<Stock[]>([]);
    const db = getFirestore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (stockCode.length > 1) {
            const fetchStocks = async () => {
                const q = query(collection(db, "StocksDirectory"), where("stock_id", ">=", stockCode), where("stock_id", "<=", stockCode + '\uf8ff'));
                const querySnapshot = await getDocs(q);
                const stocksArray: Stock[] = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data() as Stock;
                    if (!stocksArray.some(stock => stock.stock_id === data.stock_id)) {
                        stocksArray.push(data);
                    }
                });
                setStocks(stocksArray);
            };
            fetchStocks();
        } else {
            setStocks([]);
        }
    }, [stockCode, db]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (event.target instanceof Element && isMenuOpen && !event.target.closest(`.${styles.navModal}`)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isMenuOpen]);

    const handleSearch = () => {
        if (stockCode) {
            router.push(`/stock-analysis?code=${stockCode}`);
            setStocks([]); // 清除搜尋結果
        }
    };

    const handleBlur = () => {
        // 使用setTimeout延遲清空推薦結果，給點擊事件足夠時間觸發
        setTimeout(() => {
            setStocks([]);
        }, 200); // 200毫秒延遲
    };

    const handleClickStock = (stock: Stock) => {
    // 先清空推薦列表
    setStocks([]);

    // 設置一個短暫延遲再導航
    setTimeout(() => {
        setStockCode(stock.stock_id);
        router.push(`/stock-analysis?code=${stock.stock_id}`);
    }, 100);  // 100毫秒延遲
    };
    

    return (
        <nav className={styles.navbar}>
            {/* Existing navbar content */}
            <div className={styles.menuButton}>
                <Image src="/images/oai-icon.png" alt="Menu" width={44} height={44} onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.homeIcon} />
            </div>
            <div className={`${styles.navModal} ${isMenuOpen ? styles.active : ''}`}>
                <ul>
                    <li onClick={() => setIsMenuOpen(false)}><Link href="/">首頁</Link></li>
                    <li onClick={() => setIsMenuOpen(false)}><Link href="/stock-analysis?code=2330">個股</Link></li>
                    <li onClick={() => setIsMenuOpen(false)}><Link href="/stock-picking">精選清單</Link></li>
                    {user && <li onClick={() => setIsMenuOpen(false)}><Link href="/member">收藏匣</Link></li>}
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
            <div className={styles.searchBox}>
                <input 
                    type="text"
                    placeholder="輸入台股代碼"
                    value={stockCode}
                    onChange={(e) => setStockCode(e.target.value)}
                    onBlur={handleBlur} // 失焦時觸發
                    className={styles.searchInput}
                />
                <div className={styles.searchResults}>
                    {stocks.map(stock => (
                        <div key={stock.stock_id} onClick={() => handleClickStock(stock)}>
                            {stock.stock_id} {stock.stock_name}
                        </div>
                    ))}
                </div>
                <button onClick={handleSearch} className={styles.searchButton}>搜尋
                    </button>
            </div>
            
            {user ? (
                <button onClick={logout} className={styles.logoutButton}>登出系統</button>
            ) : (
                <button onClick={() => router.push('/sign_in')} className={styles.registerButton}>登入</button>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
