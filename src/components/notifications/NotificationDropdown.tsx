import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, CheckCheck } from "lucide-react";
import { NotificationBadge } from "./NotificationBadge";
import { NotificationCard } from "./NotificationCard";
import { useNotifications } from "../../context/NotificationContext";
import { Link } from "react-router-dom";

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show only up to 5 in dropdown
  const displayNotifs = notifications.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center border border-border hover:bg-foreground/5 transition-colors relative rounded-none"
      >
        <Bell className="w-4 h-4 text-foreground" />
        <NotificationBadge count={unreadCount} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-[340px] bg-card border border-border shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-border bg-white/[0.02]">
               <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Notifications</h3>
               {unreadCount > 0 && (
                 <button onClick={markAllAsRead} className="text-[10px] font-mono font-bold uppercase text-primary hover:text-foreground transition-colors">
                   Mark all read
                 </button>
               )}
            </div>

            <div className="max-h-[360px] overflow-y-auto flex flex-col custom-scrollbar">
              {displayNotifs.map((n) => (
                <NotificationCard 
                  key={n.id} 
                  notification={n} 
                  onMarkRead={markAsRead}
                  compact={true}
                />
              ))}
              {displayNotifs.length === 0 && (
                <div className="p-6 text-center text-xs font-mono text-muted-foreground/80 uppercase tracking-widest">
                  No notifications.
                </div>
              )}
            </div>
            
            <div className="border-t border-border p-3 bg-background">
              <Link 
                to="/notifications" 
                onClick={() => setIsOpen(false)}
                className="block text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-1"
              >
                View All Notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
