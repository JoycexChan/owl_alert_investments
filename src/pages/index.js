// src/pages/index.js

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router';
import styles from '../styles/Carousel2.module.css';
// 導入 Firebase 初始化和 FCM 設定
import '../firebase'; // 假設 firebase 設定檔案是 firebase.ts
const Carousel = () => {
  const sliderRef = useRef(null);
  const [stockCode, setStockCode] = useState(''); // State to store the stock code
  const router = useRouter();

  const slides = [
    {
      img: '/images/red.jpg',
      title: '加入我們',
      description: '立即註冊，開始你的投資旅程。',
      link: '/01register',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },
    {
      img: '/images/orange.jpg',
      title: '金訊鴞',
      description: '尋找你的最佳投資，發掘你的生活，高效的股票搜索工具，最佳的選股助手',
      link: '/stock-analysis',
      hasSearch: true // 只有這個 slide 需要搜尋框，且不需要按鈕
    },
    {
      img: '/images/yellow.jpg',
      title: '精選清單',
      description: '發現潛力無限的轉機股，及早參與進取。',
      link: '/stock-picking',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },
    {
      img: '/images/purple.jpg',
      title: '加入我們',
      description: '立即註冊，開始你的投資旅程。',
      link: '/01register',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },
    {
      img: '/images/blue.jpg',
      title: '尋找你的最佳投資，發掘你的生活',
      description: '高效的股票搜索工具，最佳的選股助手',
      link: '/stock-analysis',
      hasSearch: true // 只有這個 slide 需要搜尋框，且不需要按鈕
    },

    {
      img: '/images/indigo.jpg',
      title: '精選清單',
      description: '發現潛力無限的轉機股，及早參與進取。',
      link: '/stock-picking',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },

  ];

  useEffect(() => {
          // 在組件載入時請求通知權限
          if (typeof window !== "undefined" && typeof Notification !== "undefined") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                console.log("Notification permission granted.");
              } else {
                console.log("Notification permission denied.");
              }
            });
          }
    const slider = sliderRef.current;
    const items = slider.querySelectorAll('.item');

    function activate(e) {
      console.log("Event triggered:", e.type);  // 檢查事件是否觸發
      if (e.target.matches('.next') && slider) {
        slider.append(items[0]);
      } else if (e.target.matches('.prev') && slider) {
        slider.prepend(items[items.length - 1]);
      }
    }


  slider.addEventListener('click', activate);
  slider.addEventListener('touchend', activate);  // 增加觸摸事件

  return () => {
    slider.removeEventListener('click', activate);
    slider.removeEventListener('touchend', activate);
  };
}, []);


  const handleSearch = () => {
    if (stockCode) {
      // Navigate to the stock-analysis page with the stock code as a query parameter
      router.push(`/stock-analysis?code=${stockCode}`);
    }
  };

  return (
    <main>
      <ul className={styles.slider} ref={sliderRef}>
        {slides.map((slide, index) => (
          <li key={index} className={`${styles.slide} item`} style={{ backgroundImage: `url('${slide.img}')` }}>
            <div className={styles.visual}></div>
            <div className={styles.content}>
            <div className={styles.contentin}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.description}>{slide.description}</p>

              {slide.hasSearch ? (
                <div className={styles.searchBox}>
                  <input 
                    type="text" 
                    placeholder="輸入台股代碼" 
                    value={stockCode} 
                    onChange={(e) => setStockCode(e.target.value)} 
                  />
                  <button onClick={handleSearch}>搜尋</button>
                </div>
              ) : (
                <Link href={slide.link}>
                  <button className={styles.button}>{slide.buttonname}</button> 
                </Link>
              )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <button className="prev" onClick={() => { const slider = sliderRef.current; slider.prepend(slider.lastChild); }}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512" style={{ transform: "scaleX(-1)" }}>
          <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5.629,12.896l-4.629,4.236v-4.132H6v-2h7V7l4.629,4.236c.494,.443,.494,1.217,0,1.66Z" fill="black" fillOpacity="0.5"/>
          </svg>
        </button>
        <button className="next" onClick={() => { const slider = sliderRef.current; slider.append(slider.firstChild); }}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5.629,12.896l-4.629,4.236v-4.132H6v-2h7V7l4.629,4.236c.494,.443,.494,1.217,0,1.66Z" fill="black" fillOpacity="0.5"/>
          </svg>
        </button>
      </div>

    </main>
  );
};

export default Carousel;
