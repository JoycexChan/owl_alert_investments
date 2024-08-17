import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router';
import styles from '../styles/Carousel2.module.css';

const Carousel = () => {
  const sliderRef = useRef(null);
  const [stockCode, setStockCode] = useState(''); // State to store the stock code
  const router = useRouter();

  const slides = [
    {
      img: '/images/web3.jpg',
      title: '加入我們',
      description: '立即註冊，開始你的投資旅程。',
      link: '/01register',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },
    {
      img: '/images/web1.jpg',
      title: '金訊鴞',
      description: '尋找你的最佳投資，發掘你的生活，高效的股票搜索工具，最佳的選股助手',
      link: '/stock-analysis',
      hasSearch: true // 只有這個 slide 需要搜尋框，且不需要按鈕
    },
    {
      img: '/images/web2.jpg',
      title: '精選清單',
      description: '發現潛力無限的轉機股，及早參與進取。',
      link: '/stock-picking',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },
    {
      img: '/images/web3.jpg',
      title: '加入我們',
      description: '立即註冊，開始你的投資旅程。',
      link: '/01register',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },
    {
      img: '/images/web1.jpg',
      title: '尋找你的最佳投資，發掘你的生活',
      description: '高效的股票搜索工具，最佳的選股助手',
      link: '/stock-analysis',
      hasSearch: true // 只有這個 slide 需要搜尋框，且不需要按鈕
    },

    {
      img: '/images/web2.jpg',
      title: '精選清單',
      description: '發現潛力無限的轉機股，及早參與進取。',
      link: '/stock-picking',
      buttonname: 'Read More',
      hasSearch: false // 其他 slide 不需要搜尋框
    },

  ];

  useEffect(() => {
    const slider = sliderRef.current;
    const items = slider.querySelectorAll('.item');

    function activate(e) {
      if (e.target.matches('.next') && slider) {
        slider.append(items[0]);
      } else if (e.target.matches('.prev') && slider) {
        slider.prepend(items[items.length - 1]);
      }
    }

    slider.addEventListener('click', activate);
    return () => slider.removeEventListener('click', activate);
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
          <svg viewBox="0 0 512 512" width="32" height="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M328 112L184 256l144 144M200 256H392"></path>
          </svg>
        </button>
        <button className="next" onClick={() => { const slider = sliderRef.current; slider.append(slider.firstChild); }}>
          <svg viewBox="0 0 512 512" width="32" height="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M184 112l144 144-144 144M328 256H136"></path>
          </svg>
        </button>
      </div>
    </main>
  );
};

export default Carousel;
