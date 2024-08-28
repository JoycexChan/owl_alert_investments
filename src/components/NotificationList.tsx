import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { markAsRead, deleteNotification } from '../services/notificationService';
import { onSnapshot, collection } from "firebase/firestore";
import { db } from '../firebase';
import { Notification } from '../services/notificationService';  // 確認 Notification 定義包括 Timestamp

const NotificationList = () => {
    const { notifications, setNotifications } = useNotifications();

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
            const changes = snapshot.docChanges();
            const newNotifications = changes.map(change => {
                const data = change.doc.data() as Notification;
                // 無需轉換 timestamp，因為它已經是 Date 類型
                const notification = {
                    id: change.doc.id,
                    title: data.title,
                    body: data.body,
                    timestamp: data.timestamp,  // 直接使用 Date 對象
                    read: data.read
                };
            
                return change.type === 'removed' ? null : notification;
            }).filter(n => n !== null);  // 過濾掉 null (被移除的通知)
            

            setNotifications(prevNotifications => [
                ...prevNotifications.filter(n => !newNotifications.some(newN => newN.id === n.id)),
                ...newNotifications
            ]);
        });

        return () => unsubscribe();
    }, [setNotifications]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id} style={{ background: notification.read ? '#f0f0f0' : '#fff' }}>
                        <p>{notification.title}</p>
                        <p>{notification.body}</p>
                        <p>Received at: {notification.timestamp.toLocaleString()}</p>  // 確認 timestamp 是 Date 類型
                        <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                        <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
