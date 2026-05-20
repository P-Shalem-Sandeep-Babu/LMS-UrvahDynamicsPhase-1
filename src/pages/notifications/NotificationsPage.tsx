import React, { useState } from "react";
import { AppNotification, NotificationCategory } from "../../types/notification";
import { NotificationCard } from "../../components/notifications/NotificationCard";
import { NotificationTabs } from "../../components/notifications/NotificationTabs";
import { Bell, CheckCheck, Filter, Zap } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNotifications } from "../../context/NotificationContext";

const CATEGORIES: { label: string; value: NotificationCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Assignments", value: "Assignments" },
  { label: "Coding", value: "Coding" },
  { label: "Deadlines", value: "Deadlines" },
  { label: "Contests", value: "Contests" },
  { label: "Announcements", value: "Announcements" },
  { label: "Updates", value: "BatchUpdates" },
];

export const NotificationsPage = () => {
  const { notifications, markAllAsRead, markAsRead, filter, setFilter, mockReceiveNotification } = useNotifications();
  const [filterUnread, setFilterUnread] = useState(false);

  const filtered = notifications.filter(n => {
    const matchCat = filter === "All" || n.category === filter;
    const matchUnread = filterUnread ? !n.isRead : true;
    return matchCat && matchUnread;
  });

  const unreadCounts = CATEGORIES.reduce((acc, cat) => {
    if (cat.value === "All") {
      acc[cat.value] = notifications.filter(n => !n.isRead).length;
    } else {
      acc[cat.value] = notifications.filter(n => !n.isRead && n.category === cat.value).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-8 pb-12 animate-in fade-in pt-6">
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
             <Bell className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Notifications
           </h1>
           <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
             Stay updated with your activities and alerts
           </p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={mockReceiveNotification} variant="outline" className="border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-[10px] rounded-none flex items-center gap-2">
            <Zap className="w-3 h-3" /> Simulate Event
          </Button>
          {unreadCounts["All"] > 0 && (
            <Button onClick={markAllAsRead} variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 font-bold uppercase tracking-widest text-[10px] rounded-none">
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <NotificationTabs 
          categories={CATEGORIES} 
          activeCategory={filter} 
          onSelect={(c) => setFilter(c as any)}
          unreadCounts={unreadCounts}
        />
        
        <button 
          onClick={() => setFilterUnread(!filterUnread)}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-none border flex items-center gap-2 mb-6 ${
            filterUnread ? 'bg-primary/20 text-primary border-primary/30' : 'bg-card text-muted-foreground border-border hover:border-border hover:text-foreground'
          }`}
        >
          <Filter className="w-3 h-3" /> Unread Only
        </button>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map(n => (
            <NotificationCard key={n.id} notification={n} onMarkRead={markAsRead} />
          ))
        ) : (
          <div className="p-12 text-center border border-border border-dashed bg-background rounded-xl flex flex-col items-center justify-center gap-4">
             <Bell className="w-8 h-8 text-white/20" />
             <p className="text-xs font-mono text-muted-foreground/80 uppercase tracking-widest">
               No notifications to display.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
