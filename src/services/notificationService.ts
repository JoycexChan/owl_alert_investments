// notificationService.ts
import { db } from '../firebase'; // 確保這個路徑相對於 notificationService.ts 位置正確
import { doc, updateDoc, deleteDoc, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';


export const storeNotification = async (notification: { title: string; body: string }) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      title: notification.title,
      body: notification.body,
      timestamp: new Date(),
      read: false
    });
    console.log("Notification stored in Firestore!");
  } catch (error) {
    console.error("Error storing notification:", error);
  }
};



export interface Notification {
    id: string;
    title: string;
    body: string;
    timestamp: Timestamp;  // 使用导入的 Timestamp 类型
    read: boolean;
}


// 使用明確類型的函數來加載通知
export const loadNotifications = async (): Promise<Notification[]> => {
    const notificationsQuery = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(notificationsQuery);
    const notifications: Notification[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data() as Notification; // 确保这里的类型转换正确
        notifications.push({
            id: doc.id,
            title: data.title,
            body: data.body,
            timestamp: data.timestamp,
            read: data.read
        });
    });
    return notifications;
};

//标记为已读和删除通知的功能
export const markAsRead = async (notificationId: string) => {
  const notificationRef = doc(db, 'notifications', notificationId);
  await updateDoc(notificationRef, {
      read: true
  });
};

export const deleteNotification = async (notificationId: string) => {
  const notificationRef = doc(db, 'notifications', notificationId);
  await deleteDoc(notificationRef);
};
