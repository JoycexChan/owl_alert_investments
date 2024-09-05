// components/TaiwanStockNews.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Analysis.module.css';
interface TaiwanStockNewsProps {
    stockCode: string;
}

const TaiwanStockNews = ({ stockCode }: TaiwanStockNewsProps) => {
    const [news, setNews] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [message, setMessage] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 12;

    useEffect(() => {
        const fetchNews = async () => {
            if (!stockCode || !selectedDate) return;
            const formattedDate = selectedDate.toISOString().split('T')[0];
            try {
                const response = await axios.get('/api/TaiwanStockNews', {
                    params: {
                        stock_id: stockCode,
                        start_date: formattedDate,
                        end_date: formattedDate,
                    },
                });
                if (response.data.message) {
                    setMessage(response.data.message);
                    setNews([]);
                } else {
                    setNews(response.data);
                    setMessage('');
                }
            } catch (error) {
                console.error('Error fetching Taiwan stock news:', error);
            }
        };

        fetchNews();
    }, [stockCode, selectedDate]);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className={styles.newsplot}>
            <h1>台股相關新聞</h1>
            <div>
                <label>選擇日期: </label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            {message ? <p>{message}</p> : (
                <ul>
                    {currentNews.map((item, index) => (
                        <li key={index}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                                <h2>{item.title}</h2>
                            </a>
                            <p>{item.content}</p>
                            <p><em>{item.date}</em></p>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.newsbutton}>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaiwanStockNews;