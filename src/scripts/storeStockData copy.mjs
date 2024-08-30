import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';
// import { db } from '../firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { generateAccessToken } from '../utils/generateAccessToken.mjs';
// import fetch from 'node-fetch';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// JavaScript 不支持 interface，用對象描述類型即可
async function fetchAndStoreStockData(date) {
  const token = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;
  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockPriceTick',
        start_date: date,
        end_date: date,
        token: token,
      },
    });

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const stocks = response.data.data;

      for (const stock of stocks) {
        await addDoc(collection(db, 'TaiwanStockPriceTick'), stock);
      }
      console.log('Data stored successfully in Firebase');
    } else {
      console.error('No data found:', response.data);
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
}

// 使用指定日期來獲取數據並存儲到 Firebase
fetchAndStoreStockData('2024-08-29');
