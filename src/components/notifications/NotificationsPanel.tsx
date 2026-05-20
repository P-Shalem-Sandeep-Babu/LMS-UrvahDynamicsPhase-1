import React from "react";
import { Bell, ArrowRight } from "lucide-react";
import { NotificationCard } from "./NotificationCard";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

export const NotificationsPanel = () => {
  const { notifications, markAsRead } = useNotifications();
  const displayNotifs = notifications.slice(0, 4);

  return (
    <div className="border border-border bg-card p-6 relative flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" /> Notifications
        </h2>
        <Link to="/notifications" className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-foreground transition-colors flex items-center gap-1 group">
          View All
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {displayNotifs.length > 0 ? (
          displayNotifs.map(n => (
            <NotificationCard key={n.id} notification={n} compact={true} onMarkRead={markAsRead} />
          ))
        ) : (
          <div className="text-center py-4 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">
            No recent notifications.
          </div>
        )}
      </div>
    </div>
  );
};
