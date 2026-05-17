import { motion } from "motion/react";
import { 
  MessageSquare, Users, Code, HelpCircle, AlertCircle, TrendingUp, Trophy, ChevronRight 
} from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", name: "All Discussions", icon: MessageSquare, count: 1245 },
  { id: "coding", name: "Algorithm & Coding", icon: Code, count: 482 },
  { id: "qna", name: "Questions & Help", icon: HelpCircle, count: 328 },
  { id: "announcements", name: "System Announcements", icon: AlertCircle, count: 15 },
  { id: "general", name: "General Chat", icon: Users, count: 420 },
];

const trending = [
  { id: "t1", title: "Optimizing Dijkstra's in Python?", replies: 124 },
  { id: "t2", title: "Weekly Contest #42 Strategy", replies: 89 },
  { id: "t3", title: "Understanding React Server Components", replies: 56 },
];

export const DiscussionSidebar = ({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (c: string) => void }) => {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-72 shrink-0">
      <div className="border border-white/10 bg-[#080808] p-4 flex flex-col gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 px-2">
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
                    : "text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-white/40'}`} />
                  <span>{cat.name}</span>
                </div>
                <span className={`text-[10px] ${isActive ? 'text-primary' : 'text-white/30'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-white/10 bg-[#080808] p-4 flex flex-col gap-3">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 px-2 flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-red-500" /> Trending Topics
        </h3>
        <div className="flex flex-col gap-2">
          {trending.map((t) => (
            <button 
              key={t.id}
              className="flex flex-col items-start px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-left group"
            >
              <h4 className="text-xs font-mono text-white/80 group-hover:text-white line-clamp-2 leading-relaxed">
                {t.title}
              </h4>
              <span className="text-[10px] text-white/40 mt-2 flex items-center gap-1 uppercase tracking-widest">
                <MessageSquare className="w-3 h-3" /> {t.replies} Replies
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border border-white/10 bg-primary/5 p-4 flex flex-col gap-3 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-10 -mt-10 rounded-full" />
         <Trophy className="w-6 h-6 text-primary mb-1 relative z-10" />
         <h3 className="text-sm font-bold text-white relative z-10">Top Contributors</h3>
         <p className="text-xs font-mono text-white/60 relative z-10">
           Earn badges by helping your peers solve complex algorithms.
         </p>
         <button className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1 mt-2 hover:text-white transition-colors relative z-10 w-fit">
           View Leaderboard <ChevronRight className="w-3 h-3" />
         </button>
      </div>
    </div>
  );
};
