import React, { createContext, useContext, useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Add sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        title: 'Appointment Reminder',
        message: 'You have an appointment with Dr. Smith tomorrow at 2:00 PM',
        type: 'info' as const
      },
      {
        title: 'Test Results Available',
        message: 'Your blood test results are now available in your dashboard',
        type: 'success' as const
      }
    ];

    sampleNotifications.forEach(notification => {
      setTimeout(() => addNotification(notification), Math.random() * 2000);
    });
  }, []);

  const value = {
    notifications,
    addNotification,
    markAsRead,
    clearAll,
    unreadCount
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};