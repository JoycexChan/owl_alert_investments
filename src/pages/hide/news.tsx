import { useEffect, useState } from 'react';
import axios from 'axios';

const TaiwanStockNews = () => {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/taiwan-stock-news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching Taiwan stock news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h1>台股相關新聞</h1>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <p><em>{item.date}</em></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaiwanStockNews;
