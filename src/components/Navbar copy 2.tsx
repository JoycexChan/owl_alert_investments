import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleRegister = () => {
        router.push('/01register');
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav>
            <ul className="flex space-x-4">
                <li><Link href="/">首頁</Link></li>
                <li><Link href="/stock-analysis">個股</Link></li>
                <li><Link href="/stock-picking">精選清單</Link></li>
                <li><Link href="/compare">比較</Link></li>


            
                {user ? (
                    <>
                        <li><Link href="/01member">收藏匣</Link></li>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded">
                            登出系統
                        </button>
                    </>
                ) : (
                    <>
                        {/* <li><Link href="/01register">登入</Link></li> */}
                        <button
                            onClick={handleRegister}
                            className="bg-blue-500 text-white px-4 py-2 rounded">
                            免費註冊
                        </button>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
