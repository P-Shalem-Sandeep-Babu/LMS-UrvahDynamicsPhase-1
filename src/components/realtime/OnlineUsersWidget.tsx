import { motion } from "motion/react";
import { Users, Activity } from "lucide-react";

export const OnlineUsersWidget = () => {
  const users = [
    { handle: "amercer", status: "coding", location: "Two Sum" },
    { handle: "schen", status: "idle", location: "Dashboard" },
    { handle: "dkim", status: "contest", location: "Weekly #42" },
    { handle: "ewong", status: "coding", location: "LRU Cache" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-white/10 bg-[#080808] p-4 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
         <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
            <Users className="w-3 h-3 text-primary" /> Active Operatives
         </h3>
         <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[9px] font-mono font-bold text-green-500">4 Online</span>
         </div>
      </div>

      <div className="flex flex-col gap-3">
        {users.map((user, i) => (
          <div key={i} className="flex justify-between items-center group">
             <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'coding' ? 'bg-primary animate-pulse' : user.status === 'contest' ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
                <span className="text-xs font-mono text-white/80 group-hover:text-white transition-colors">@{user.handle}</span>
             </div>
             <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest bg-white/5 px-1.5 py-0.5 border border-white/5">
               {user.location}
             </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
