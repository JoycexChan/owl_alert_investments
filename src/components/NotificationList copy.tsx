// /src/components/NotificationList.tsx

import React, { useContext, useEffect } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { loadNotifications, Notification, markAsRead, deleteNotification  } from '../services/notificationService'; // 确保这里是正确的路径



const NotificationList = () => {
    const { notifications, setNotifications } = useContext(NotificationContext);

    useEffect(() => {
        // 假设 loadNotifications 是一个异步函数，从后端或 Firebase 加载通知
        async function fetchNotifications() {
            const loadedNotifications = await loadNotifications(); // 这个函数应该在你的 service 文件中定义
            setNotifications(loadedNotifications);
        }
        fetchNotifications();
    }, [setNotifications]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        <p>{notification.title}</p>
                        <p>{notification.body}</p>
                        <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                        <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
