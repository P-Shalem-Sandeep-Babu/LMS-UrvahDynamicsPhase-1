import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Terminal, Trophy, AlertTriangle, MessageSquare } from "lucide-react";

interface Notification {
  id: string;
  type: "contest" | "system" | "discussion" | "achievement";
  message: string;
  time: string;
  read: boolean;
}

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "system", message: "System routine maintenance scheduled in 4 hours.", time: "2m ago", read: false },
    { id: "2", type: "contest", message: "Weekly Backend Hackerrank #42 begins in 10 minutes.", time: "10m ago", read: false },
    { id: "3", type: "achievement", message: "Rank up! You are now Platinum Rank.", time: "1h ago", read: true },
    { id: "4", type: "discussion", message: "@schen replied to your forum thread.", time: "2h ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case "contest": return <Terminal className="w-3 h-3 text-red-500" />;
      case "system": return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
      case "achievement": return <Trophy className="w-3 h-3 text-primary" />;
      case "discussion": return <MessageSquare className="w-3 h-3 text-blue-500" />;
      default: return <Bell className="w-3 h-3 text-white" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-border/50 hover:bg-muted transition-colors relative"
      >
        <Bell className="w-4 h-4 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 bg-[#0a0a0a] border border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-3 border-b border-white/10 bg-white/[0.02]">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50">Live Comms</h3>
               {unreadCount > 0 && (
                 <button onClick={markAllRead} className="text-[9px] font-mono text-primary hover:text-white transition-colors">
                   Acknowledge All
                 </button>
               )}
            </div>

            <div className="max-h-80 overflow-y-auto custom-scrollbar flex flex-col">
              {notifications.map((n) => (
                <div key={n.id} className={`p-4 border-b border-white/5 flex gap-3 hover:bg-white/[0.02] transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                  <div className={`mt-0.5 shrink-0 ${!n.read ? 'animate-bounce' : ''}`}>
                    {getIcon(n.type)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className={`text-xs font-mono leading-relaxed ${!n.read ? 'text-white' : 'text-white/60'}`}>
                      {n.message}
                    </p>
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{n.time}</span>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="p-4 text-center text-xs font-mono text-white/40 uppercase tracking-widest">
                  No active signals.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
