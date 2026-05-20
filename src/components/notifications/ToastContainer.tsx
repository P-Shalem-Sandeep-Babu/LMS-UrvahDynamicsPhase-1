import React, { useEffect, useState } from "react";
import { AppNotification } from "../../types/notification";
import { X, ExternalLink, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<AppNotification[]>([]);
  const { markAsRead } = useNotifications();

  useEffect(() => {
    const handleNewNotification = (e: Event) => {
      const customEvent = e as CustomEvent<AppNotification>;
      const notif = customEvent.detail;
      setToasts(prev => [...prev, notif]);

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== notif.id));
      }, 5000);
    };

    window.addEventListener('new-notification', handleNewNotification);
    return () => window.removeEventListener('new-notification', handleNewNotification);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="w-80 bg-card border border-border shadow-lg shadow-black/50 p-4 pointer-events-auto flex gap-4 overflow-hidden relative"
          >
            {/* Category indicator line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            
            <div className="mt-1">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-foreground truncate">{toast.title}</h4>
                <button 
                  onClick={() => dismissToast(toast.id)}
                  className="text-muted-foreground/80 hover:text-foreground transition-colors shrink-0 p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[12px] text-muted-foreground mb-2 truncate line-clamp-2 white-space-normal">
                {toast.message}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-sm">
                  {toast.category}
                </span>
                {toast.link && (
                  <Link 
                    to={toast.link} 
                    onClick={() => { markAsRead(toast.id); dismissToast(toast.id); }}
                    className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
