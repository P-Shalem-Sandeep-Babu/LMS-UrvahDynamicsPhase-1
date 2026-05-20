import React from "react";
import { AppNotification } from "../../types/notification";
import { Megaphone, FileCode2, Clock, Terminal, Users, BookOpen, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationCardProps {
  notification: AppNotification;
  onMarkRead?: (id: string) => void;
  compact?: boolean;
}

export const NotificationCard = ({ notification, onMarkRead, compact = false }: NotificationCardProps) => {
  const getIcon = (category: string) => {
    switch (category) {
      case "Assignments": return <BookOpen className="w-4 h-4 text-purple-500" />;
      case "Coding": return <FileCode2 className="w-4 h-4 text-blue-500" />;
      case "Deadlines": return <Clock className="w-4 h-4 text-red-500" />;
      case "Contests": return <Terminal className="w-4 h-4 text-green-500" />;
      case "Announcements": return <Megaphone className="w-4 h-4 text-primary" />;
      case "BatchUpdates": return <Users className="w-4 h-4 text-emerald-500" />;
      default: return <Megaphone className="w-4 h-4 text-foreground" />;
    }
  };

  const timeAgo = (dateString: string) => {
    const minDiff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 60000);
    if (minDiff < 60) return `${minDiff}m ago`;
    const hrDiff = Math.floor(minDiff / 60);
    if (hrDiff < 24) return `${hrDiff}h ago`;
    return `${Math.floor(hrDiff / 24)}d ago`;
  };

  const content = (
    <div className={`p-4 border border-border/50 flex gap-4 transition-colors relative group ${notification.isRead ? 'bg-background opacity-70 hover:opacity-100' : 'bg-white/[0.02] hover:bg-white/[0.04]'}`}>
      {!notification.isRead && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />
      )}
      
      <div className={`mt-0.5 shrink-0 ${!notification.isRead && !compact ? 'animate-pulse' : ''} bg-foreground/5 p-2 rounded-xl border border-border`}>
        {getIcon(notification.category)}
      </div>
      
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-start">
          <h4 className={`text-sm font-bold tracking-tight ${!notification.isRead ? 'text-foreground' : 'text-foreground/80'}`}>
            {notification.title}
          </h4>
          <span className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest whitespace-nowrap ml-2">
            {timeAgo(notification.createdAt)}
          </span>
        </div>
        
        <p className={`font-mono leading-relaxed truncate ${compact ? 'text-[10px]' : 'text-xs'} ${!notification.isRead ? 'text-foreground/80' : 'text-muted-foreground'}`}>
          {notification.message}
        </p>
        
        {!compact && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 bg-foreground/5 border border-border text-muted-foreground">
              {notification.category}
            </span>
            
            {!notification.isRead && onMarkRead && (
              <button 
                onClick={(e) => { e.preventDefault(); onMarkRead(notification.id); }}
                className="text-[10px] uppercase font-bold text-primary hover:text-foreground transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
              >
                <Check className="w-3 h-3" /> Mark Read
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return notification.link ? (
    <Link to={notification.link} className="block cursor-pointer">
      {content}
    </Link>
  ) : content;
};
