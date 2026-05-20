import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AppNotification, NotificationCategory } from "../types/notification";
import { mockNotifications } from "../data/mockNotifications";

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<AppNotification, "id" | "createdAt" | "isRead">) => void;
  deleteNotification: (id: string) => void;
  filter: NotificationCategory | "All";
  setFilter: (category: NotificationCategory | "All") => void;
  mockReceiveNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [filter, setFilter] = useState<NotificationCategory | "All">("All");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addNotification = useCallback((data: Omit<AppNotification, "id" | "createdAt" | "isRead">) => {
    const newNotif: AppNotification = {
      ...data,
      id: `notif_${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
    // Dispatch custom event for toasts
    const event = new CustomEvent('new-notification', { detail: newNotif });
    window.dispatchEvent(event);
  }, []);

  const mockReceiveNotification = useCallback(() => {
    const randomTypes = [
      {
        title: "New Contest Started!",
        message: "The Weekly Coding Challenge #45 just started. Join now!",
        category: "Contests" as NotificationCategory,
      },
      {
        title: "Assignment Graded",
        message: "Your submission for 'Advanced Data Structures' has been graded.",
        category: "Assignments" as NotificationCategory,
      },
      {
        title: "System Maintenance",
        message: "The platform will be down for 30 minutes tomorrow.",
        category: "Announcements" as NotificationCategory,
      },
      {
        title: "Upcoming Deadline",
        message: "Your React JS Final Project is due in 12 hours.",
        category: "Deadlines" as NotificationCategory,
      }
    ];

    const random = randomTypes[Math.floor(Math.random() * randomTypes.length)];
    addNotification({
      ...random,
      userId: "currentUser",
    });
  }, [addNotification]);

  // Mock websocket connection
  useEffect(() => {
    console.log("Connecting to Mock Notification WebSocket...");
    
    // Simulate incoming notifications randomly
    const interval = setInterval(() => {
      // 10% chance every 10 seconds to receive a notification
      if (Math.random() > 0.9) {
        mockReceiveNotification();
      }
    }, 10000);
    
    return () => {
      console.log("Disconnecting from Mock Notification WebSocket...");
      clearInterval(interval);
    };
  }, [mockReceiveNotification]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      deleteNotification,
      filter,
      setFilter,
      mockReceiveNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
