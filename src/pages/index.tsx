import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const Home = () => {
    return (
        <div>
            <Head>
                <title>首頁 - Owl Alert Investments</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <header className="text-center my-12">
                <h1 className="text-4xl font-bold">尋找你的最佳投資，發掘你的生活</h1>
                <p className="text-xl mt-4">高效的股票搜索工具，最佳的選股助手</p>
                <div className="mt-8">
                    <input type="text" placeholder="輸入股票代碼/名稱" className="p-2 text-lg" />
                    <button className="ml-2 bg-blue-500 text-white p-2 rounded">搜索</button>
                </div>
            </header>
            <main className="mx-auto my-8">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold text-center">特色功能</h2>
                    <div className="flex justify-around items-start flex-wrap">
                        <div className="w-1/4 p-4">
                            <h3 className="text-2xl font-semibold">績優股</h3>
                            <p>探索市場上表現最佳的績優股，捕捉投資機會。</p>
                        </div>
                        <div className="w-1/4 p-4">
                            <h3 className="text-2xl font-semibold">轉機股</h3>
                            <p>發現潛力無限的轉機股，及早參與進取。</p>
                        </div>
                        <div className="w-1/4 p-4">
                            <h3 className="text-2xl font-semibold">論壇</h3>
                            <p>加入討論，與同好交流股市心得和策略。</p>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <h2 className="text-3xl font-bold">加入我們</h2>
                    <p className="text-xl">立即註冊，開始你的投資旅程。</p>
                    <button className="mt-4 bg-green-500 text-white p-3 rounded">註冊</button>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
