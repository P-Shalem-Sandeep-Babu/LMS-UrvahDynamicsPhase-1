import { motion } from "motion/react";
import { Activity, Code2, Users, Trophy } from "lucide-react";

export const ActivityFeedWidget = () => {
  const activities = [
    { type: "submission", user: "amercer", action: "solved", target: "Two Sum", time: "Just now" },
    { type: "rank", user: "schen", action: "reached", target: "Platinum Rank", time: "2m ago" },
    { type: "forum", user: "dkim", action: "created discussion", target: "DP Optimization", time: "15m ago" },
    { type: "submission", user: "ewong", action: "solved", target: "LRU Cache", time: "22m ago" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "submission": return <Code2 className="w-3 h-3 text-green-500" />;
      case "rank": return <Trophy className="w-3 h-3 text-yellow-500" />;
      case "forum": return <Users className="w-3 h-3 text-blue-500" />;
      default: return <Activity className="w-3 h-3 text-white/50" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-white/10 bg-[#080808] p-4 flex flex-col gap-4 h-full"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
         <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
            <Activity className="w-3 h-3 text-primary" /> Sector Activity Log
         </h3>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar">
        {activities.map((act, i) => (
          <div key={i} className="flex gap-3 items-start group relative">
             {i !== activities.length - 1 && (
                <div className="absolute left-[7px] top-4 bottom-[-12px] w-px bg-white/10 group-hover:bg-primary/30 transition-colors" />
             )}
             <div className="relative z-10 p-1 bg-[#080808] border border-white/10 rounded-sm mt-0.5 group-hover:border-primary/50 transition-colors">
                {getIcon(act.type)}
             </div>
             <div className="flex flex-col">
                <span className="text-xs font-mono text-white/70">
                   <span className="font-bold text-white">@{act.user}</span> {act.action} <span className="text-primary">{act.target}</span>
                </span>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-0.5">{act.time}</span>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
