import React from "react";
import { Announcement } from "../../types/announcement";
import { Megaphone, Calendar, Pin, Code, BookOpen, AlertCircle, Clock, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit?: (a: Announcement) => void;
  onDelete?: (a: Announcement) => void;
  showActions?: boolean;
}

export const AnnouncementCard = ({ announcement, onEdit, onDelete, showActions = false }: AnnouncementCardProps) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Assignments": return <BookOpen className="w-3 h-3" />;
      case "Coding": return <Code className="w-3 h-3" />;
      case "Contests": return <Megaphone className="w-3 h-3" />;
      case "Deadlines": return <Clock className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Assignments": return "text-purple-500 border-purple-500/20 bg-purple-500/10";
      case "Coding": return "text-primary border-primary/20 bg-primary/10";
      case "Contests": return "text-blue-500 border-blue-500/20 bg-blue-500/10";
      case "Deadlines": return "text-red-500 border-red-500/20 bg-red-500/10";
      default: return "text-muted-foreground border-border bg-foreground/5";
    }
  };

  return (
    <div className={`p-5 border bg-card flex flex-col gap-3 transition-all ${announcement.pinned ? 'border-primary/30 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.1)]' : 'border-border hover:border-border/80'}`}>
      <div className="flex justify-between items-start mb-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={`text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 ${getCategoryColor(announcement.category)}`}>
            {getCategoryIcon(announcement.category)} {announcement.category}
          </Badge>
          {announcement.pinned && (
            <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-widest text-primary border-primary/20 bg-primary/10 flex items-center gap-1">
              <Pin className="w-3 h-3" /> Pinned
            </Badge>
          )}
        </div>
        
        {showActions && (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground/80 hover:text-foreground" onClick={() => onEdit?.(announcement)}>
              <Edit className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500/40 hover:text-red-500" onClick={() => onDelete?.(announcement)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
      
      <div>
        <h4 className="font-bold text-foreground text-base tracking-tight mb-2">{announcement.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed font-mono line-clamp-2">{announcement.content}</p>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">
          <Calendar className="w-3 h-3" />
          {new Date(announcement.createdAt).toLocaleDateString()}
        </div>
        
        <div className="text-[10px] uppercase font-mono text-muted-foreground/60 tracking-widest">
          By {announcement.createdBy}
        </div>
      </div>
    </div>
  );
};
