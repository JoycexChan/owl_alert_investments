import React, { useRef, useEffect } from 'react';
import Link from 'next/link'; 
import styles from '../styles/Carousel2.module.css';

const Carousel = () => {
  const sliderRef = useRef(null);

  const slides = [
    { img: '/images/web3.jpg', title: 'Title 3', description: 'Description for Image 3 Again...', link: '/' },
    { img: '/images/web1.jpg', title: 'Title 1', description: 'Description for Image 1...', link: '/stock-analysis' },
    { img: '/images/web2.jpg', title: 'Title 2', description: 'Description for Image 2...', link: '/' },
    { img: '/images/web3.jpg', title: 'Title 3', description: 'Description for Image 3...', link: '/' },
    { img: '/images/web1.jpg', title: 'Title 1', description: 'Description for Image 1 Again...', link: '/' },
    { img: '/images/web2.jpg', title: 'Title 2', description: 'Description for Image 2 Again...', link: '/' },

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

  return (
    <main>
      <ul className={styles.slider} ref={sliderRef}>
        {slides.map((slide, index) => (
          <li key={index} className={`${styles.slide} item`} style={{ backgroundImage: `url('${slide.img}')` }}>
            <div className={styles.visual}></div>
            <div className={styles.content}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.description}>{slide.description}</p>
              <Link href={slide.link}>
                <button className={styles.button}>Go to {slide.title}</button> 
              </Link>
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
