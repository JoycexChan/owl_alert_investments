import React from 'react';
import styles from '../styles/Carousel2.module.css';

const Carousel = () => {
  return (
    <>
      {/*用於撥放動畫 但改成圖片後沒有動畫 <svg style={{ display: "none" }}>
        <path id="play" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z" />
        <path id="pause" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 96h16v320h-16zM320 96h16v320h-16z" />
      </svg> */}

    <main>


      <ul className={styles.slider}>
        <li className={styles.slide} style={{ backgroundImage: `url('/images/web1.jpg')` }}>
          <div className={styles.visual} ></div>
          <div className={styles.content}>
            <h2 className={styles.title}>Sophie</h2>
            <p className={styles.description}>Frequency: 2π seconds. An enigmatic creature that creates fascinating patterns, honoring Sophie Germain's elegant mathematics. Her movements tell an eternal story.</p>
            {/* <button className={`${styles.more} ${styles.ripple}`}>
            <div className="icon" role="button">
                  <svg viewBox="0 0 512 512">
                    <use xlinkHref="#play" />
                  </svg>
                </div>
              </button> */}
            </div>
          </li>

        <li className={styles.slide} style={{ backgroundImage: `url('/images/web2.jpg')` }}>
          <div className={styles.visual} ></div>
          <div className={styles.content}>
            <h2 className={styles.title}>René</h2>
            <p className={styles.description}>Frequency: 2π seconds. A smoky creature moving swiftly along the path laid down by the pioneering work of René Descartes embodies the guiding principle of the stage, where equations take on a timeless beauty.</p>
            <nav className='nav'>
        <div className="btn ripple prev">
        <div className="icon" role="button">
        <svg viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"></path>
              </svg>

          </div>
        </div>
        <div className='btn ripple next'>
        <div className="icon" role="button">
        <svg viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100"></path>
              </svg>

          </div>
              </div>
      </nav>
            </div>
          </li>

        <li className={styles.slide} style={{ backgroundImage: `url('/images/web3.jpg')` }}>
          <div className={styles.visual} ></div>
          <div className={styles.content}>
            <h2 className={styles.title}>Ada</h2>
            <p className={styles.description}>Frequency: 4π seconds. A vibrant organism, weaves intricate patterns celebrating the analytical dance of Ada Lovelace's mind. Her movements reflect the elegance and precision found in the world of algorithms.</p>
            {/* <button className={`${styles.more} ${styles.ripple}`}>
            <div className="icon" role="button">
                  <svg viewBox="0 0 512 512">
                    <use xlinkHref="#play" />
                  </svg>
                </div>
              </button> */}
            </div>
          </li>


          <li className={styles.slide} style={{ backgroundImage: `url('/images/web1.jpg')` }}>
          <div className={styles.visual} ></div>
          <div className={styles.content}>
            <h2 className={styles.title}>Sophie</h2>
            <p className={styles.description}>Frequency: 2π seconds. An enigmatic creature that creates fascinating patterns, honoring Sophie Germain's elegant mathematics. Her movements tell an eternal story.</p>
            {/* <button className={`${styles.more} ${styles.ripple}`}>
            <div className="icon" role="button">
                  <svg viewBox="0 0 512 512">
                    <use xlinkHref="#play" />
                  </svg>
                </div>
              </button> */}
            </div>
          </li>

          <li className={styles.slide} style={{ backgroundImage: `url('/images/web1.jpg')` }}>
          <div className={styles.visual} ></div>
          <div className={styles.content}>
            <h2 className={styles.title}>Sophie</h2>
            <p className={styles.description}>Frequency: 2π seconds. An enigmatic creature that creates fascinating patterns, honoring Sophie Germain's elegant mathematics. Her movements tell an eternal story.</p>
            {/* <button className={`${styles.more} ${styles.ripple}`}>
            <div className="icon" role="button">
                  <svg viewBox="0 0 512 512">
                    <use xlinkHref="#play" />
                  </svg>
                </div>
              </button> */}
            </div>
          </li>

      </ul>

      <nav className='nav'>
        <div className="btn ripple prev">
        <div className="icon" role="button">
        <svg viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"></path>
              </svg>

          </div>
        </div>
        <div className='btn ripple next'>
        <div className="icon" role="button">
        <svg viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100"></path>
              </svg>

          </div>
              </div>
      </nav>

    </main>
    </>
  );
};

export default Carousel;
