// 在 /src/context/NotificationContext.tsx 中
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadNotifications, Notification } from '../services/notificationService';


// 創建一個適合的上下文類型
interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

// 創建帶有初始值的上下文
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {}
});

// 使用通用類型來定義提供者組件的 props
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const loadedNotifications = await loadNotifications();
      setNotifications(loadedNotifications);
    };
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
// 显式导出 NotificationContext
export { NotificationContext };
