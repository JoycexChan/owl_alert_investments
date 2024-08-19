// components/TaiwanStockNews.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TaiwanStockNewsProps {
    stockCode: string;
}

const TaiwanStockNews = ({ stockCode }: TaiwanStockNewsProps) => {
    const [news, setNews] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    useEffect(() => {
        const fetchNews = async () => {
            if (!stockCode || !selectedDate) return;

            const formattedDate = selectedDate.toISOString().split('T')[0]; // 格式化日期为 YYYY-MM-DD

            try {
                const response = await axios.get('/api/TaiwanStockNews', {
                    params: {
                        stock_id: stockCode,
                        start_date: formattedDate,
                        end_date: formattedDate,
                    },
                });
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching Taiwan stock news:', error);
            }
        };

        fetchNews();
    }, [stockCode, selectedDate]);

    return (
        <div>
            <h1>台股相關新聞</h1>
            <div>
                <label>選擇日期: </label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
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
