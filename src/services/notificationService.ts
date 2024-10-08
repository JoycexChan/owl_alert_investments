// notificationService.ts
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';


export const storeNotification = async (notification: { title: string; body: string }) => {
  try {
    // 正確地捕獲 addDoc 函數的返回值到 docRef 變量
    const docRef = await addDoc(collection(db, 'notifications'), {
      title: notification.title,
      body: notification.body,
      timestamp: new Date(),
      read: false
    });
    console.log("Notification stored in Firestore with ID:", docRef.id);
  } catch (error) {
    console.error("Error storing notification:", error);
  }
};


export interface Notification {
    id: string;
    title: string;
    body: string;
    timestamp: Date;  // 將 Timestamp 改為 Date
    read: boolean;
}

// 加載通知時確保 Timestamp 轉為 Date
export const loadNotifications = async (): Promise<Notification[]> => {
    const notificationsQuery = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(notificationsQuery);
    const notifications: Notification[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data() as any; // 使用 any 無法得知確切結構，需要手動確保結構正確
        notifications.push({
            id: doc.id,
            title: data.title,
            body: data.body,
            timestamp: (data.timestamp as Timestamp).toDate(),  // 轉換 Timestamp 為 Date
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
