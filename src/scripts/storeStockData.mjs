import { collection as firestoreCollection, addDoc } from 'firebase/firestore';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

async function fetchAndStoreStockData() {
  console.log('Starting to fetch and store stock data...');
  try {
    const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
      params: {
        dataset: 'TaiwanStockPriceAdj',
        start_date: '2024-08-29',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOSAxNzo0OToxMiIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42NS42MiJ9.CvulTxRSoFF8mU_58HtHucb3O_107uEFEgD6AhZttm8', // Ensure your token is correct
      },
    });


    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const stocks = response.data.data;
      console.log('Fetched data:', stocks);

      for (const stock of stocks) {
        await addDoc(firestoreCollection(db, 'TaiwanStockPriceTick'), stock);
      }
      console.log('Data stored successfully in Firebase');
    } else {
      console.error('No data found:', response.data);
    }
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
  } finally {
    console.log('Finished processing.');
  }
}

// 使用指定日期來獲取數據並存儲到 Firebase
fetchAndStoreStockData();