import { motion } from "motion/react";
import { 
  MessageSquare, Users, Code, HelpCircle, AlertCircle, TrendingUp, Trophy, ChevronRight, Video, Radio
} from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", name: "All Discussions", icon: MessageSquare, count: 1245 },
  { id: "coding", name: "Algorithm & Coding", icon: Code, count: 482 },
  { id: "qna", name: "Questions & Help", icon: HelpCircle, count: 328 },
  { id: "announcements", name: "System Announcements", icon: AlertCircle, count: 15 },
  { id: "resources", name: "Resource Sharing", icon: Users, count: 420 },
  { id: "batch", name: "Batch Discussions", icon: Users, count: 12 },
];

const trending = [
  { id: "t1", title: "Optimizing Dijkstra's in Python?", replies: 124 },
  { id: "t2", title: "Weekly Contest #42 Strategy", replies: 89 },
  { id: "t3", title: "Understanding React Server Components", replies: 56 },
];

const rooms = [
  { id: "r1", name: "Competitive Prog", active: 24 },
  { id: "r2", name: "Web Dev Help", active: 15 },
  { id: "r3", name: "Batch 42 Sync", active: 8 },
];

export const DiscussionSidebar = ({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (c: string) => void }) => {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-72 shrink-0">
      <div className="border border-border bg-card p-4 flex flex-col gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-2">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-between px-3 py-2 text-sm font-mono transition-colors rounded-sm border border-transparent ${
                  isActive 
                    ? "bg-primary/10 text-primary border-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground/80'}`} />
                  <span>{cat.name}</span>
                </div>
                <span className={`text-[10px] ${isActive ? 'text-primary' : 'text-muted-foreground/60'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-border bg-card p-4 flex flex-col gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-2 flex items-center gap-2">
          <Radio className="w-3 h-3 text-green-500" /> Live Voice/Video Rooms
        </h3>
        <div className="flex flex-col gap-1">
          {rooms.map((room) => (
            <button 
              key={room.id}
              className="flex items-center justify-between px-3 py-2 hover:bg-foreground/5 border border-transparent hover:border-border transition-colors text-left group"
            >
              <div className="flex items-center gap-2 text-sm font-mono text-foreground/70 group-hover:text-foreground">
                <Video className="w-3.5 h-3.5 text-muted-foreground/80" /> 
                <span className="truncate">{room.name}</span>
              </div>
              <span className="text-[10px] font-mono flex items-center gap-1 text-green-500/80">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {room.active}
              </span>
            </button>
          ))}
          <button className="mt-2 mx-2 border border-border px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border-dashed">
            + Create Room
          </button>
        </div>
      </div>

      <div className="border border-border bg-card p-4 flex flex-col gap-3">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-red-500" /> Trending Topics
        </h3>
        <div className="flex flex-col gap-2">
          {trending.map((t) => (
            <button 
              key={t.id}
              className="flex flex-col items-start px-3 py-2 hover:bg-foreground/5 border border-transparent hover:border-border transition-colors text-left group"
            >
              <h4 className="text-xs font-mono text-foreground/80 group-hover:text-foreground line-clamp-2 leading-relaxed">
                {t.title}
              </h4>
              <span className="text-[10px] text-muted-foreground/80 mt-2 flex items-center gap-1 uppercase tracking-widest">
                <MessageSquare className="w-3 h-3" /> {t.replies} Replies
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border border-border bg-primary/5 p-4 flex flex-col gap-3 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-10 -mt-10 rounded-full" />
         <Trophy className="w-6 h-6 text-primary mb-1 relative z-10" />
         <h3 className="text-sm font-bold text-foreground relative z-10">Top Contributors</h3>
         <p className="text-xs font-mono text-muted-foreground relative z-10">
           Earn badges by helping your peers solve complex algorithms.
         </p>
         <button className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1 mt-2 hover:text-foreground transition-colors relative z-10 w-fit">
           View Leaderboard <ChevronRight className="w-3 h-3" />
         </button>
      </div>
    </div>
  );
};
