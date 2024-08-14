import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // 確保正確導入 useAuth

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth(); // 從 useAuth 中獲取 user 和 logout

    const handleRegister = () => {
        router.push('/01register');
    };

    const handleLogout = () => {
        logout(); // 呼叫 logout 函數
        router.push('/'); // 登出後跳轉到首頁
    };

    return (
        <nav>
            <ul className="flex space-x-4">
                <li><Link href="/">首頁</Link></li>
                <li><Link href="/stock-analysis">個股</Link></li>
                <li><Link href="/stock-picking">精選清單</Link></li>
                {/* <li><Link href="/market-overview">大盤產業</Link></li> */}
                {/* <li><Link href="/market-focus">市場焦點</Link></li> */}
                {/* <li><Link href="/insights">洞見</Link></li> */}
                <li><Link href="/compare">比較</Link></li>
                <li><Link href="/notifications">通知</Link></li>
                <div>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded">
                            登出系統
                        </button>
                    ) : (
                        <button
                            onClick={handleRegister}
                            className="bg-blue-500 text-white px-4 py-2 rounded">
                            免費註冊
                        </button>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
