import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TaiwanStockNewsProps {
  stockCode: string;
}

interface NewsItem {
  title: string;
  link: string;
  date: string;
  summary: string;
}

const TaiwanStockNews: React.FC<TaiwanStockNewsProps> = ({ stockCode }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  
  // 設置為當天日期
  const today = new Date().toISOString().split('T')[0];
  
  // 設置為一個月前的日期
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.finmindtrade.com/api/v4/data', {
          params: {
            dataset: 'TaiwanStockNews',
            data_id: 2330,
            start_date: today,
            end_date: today,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0xOCAxMDo0NTozNSIsInVzZXJfaWQiOiJqb3ljZTc3MDEwOSIsImlwIjoiMTEyLjEwNS42Ni4xMSJ9.v0UaV5fhQccPEQmBv2DBS07bg5Pi3V29QCHNRy5aJ6E', // 請使用您的實際 token
          },
        });

        const newsData = response.data.data.map((item: any) => ({
          title: item.title,
          link: item.url,
          date: item.date,
          summary: item.summary
        }));

        setNews(newsData);
      } catch (error) {
        console.error('Error fetching stock news:', error);
      }
    };

    if (stockCode) {
      fetchNews();
    }
  }, [stockCode, oneMonthAgo, today]);

  return (
    <div>
      <h2>Related News for Stock {stockCode}</h2>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title} - {item.date}
            </a>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaiwanStockNews;
