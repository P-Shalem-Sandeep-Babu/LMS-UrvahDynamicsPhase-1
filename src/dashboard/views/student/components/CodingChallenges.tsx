import { motion } from "motion/react";
import { Terminal, Crosshair, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const CodingChallenges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
          <Terminal className="w-3 h-3" /> Arena Operations
        </h2>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* Next Challenge */}
        <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 border border-primary/20">
              <Crosshair className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 border border-white/10 px-2 py-0.5 bg-black">
              Daily Kata
            </span>
          </div>
          <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2">
            Reverse Subarray to Maximize Array Value
          </h3>
          <p className="text-xs font-mono text-white/50 mb-6 flex-1 line-clamp-3">
            You are given an integer array nums. The value of this array is
            defined as the sum of |nums[i] - nums[i+1]|. Reverse exactly one
            subarray to maximize this value.
          </p>
          <div className="flex gap-4">
            <div className="text-[10px] font-mono text-yellow-500 uppercase">
              Hard
            </div>
            <div className="text-[10px] font-mono text-white/40 uppercase">
              Array, Math
            </div>
          </div>
          <Link
            to="/coding"
            className="mt-6 w-full text-center py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
          >
            Deploy Environment
          </Link>
        </div>

        {/* Global Contest */}
        <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/10 border border-white/20">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 border border-red-500/20 px-2 py-0.5 bg-red-500/10">
                Live Event
              </span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2">
              Global Algorithm Hackathon Q3
            </h3>
            <p className="text-xs font-mono text-white/50 mb-6 flex-1">
              Compete with 5,000+ engineers globally. Top 100 get fast-tracked
              for enterprise placements. Prove your optimization skills.
            </p>
            <div className="text-[10px] font-mono font-bold text-white mb-4">
              Ends in: <span className="text-red-500">12:45:30</span>
            </div>
            <Link
              to="/leaderboard"
              className="mt-auto w-full text-center py-2 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              View Intelligence Board
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
