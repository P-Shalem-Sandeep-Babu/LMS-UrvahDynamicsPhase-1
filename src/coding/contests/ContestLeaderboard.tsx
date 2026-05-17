import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Trophy, ChevronLeft, Zap } from "lucide-react";

export const ContestLeaderboard = () => {
  const leaderboard = [
    { rank: 1, user: "Alex Mercer", score: 400, time: "1:02:45", p1: "15:20", p2: "22:15", p3: "35:10", p4: "1:02:45" },
    { rank: 2, user: "Sarah Chen", score: 400, time: "1:15:30", p1: "18:05", p2: "28:40", p3: "42:15", p4: "1:15:30" },
    { rank: 3, user: "David Kim", score: 300, time: "0:45:20", p1: "10:15", p2: "20:50", p3: "45:20", p4: "-" },
    { rank: 4, user: "Emily Wong", score: 300, time: "0:52:10", p1: "12:30", p2: "25:10", p3: "52:10", p4: "-" },
    { rank: 5, user: "Marcus Johnson", score: 200, time: "0:30:15", p1: "14:20", p2: "30:15", p3: "-", p4: "-" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <Link to="/coding/contests" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-1 mb-4">
             <ChevronLeft className="w-3 h-3" /> Back to Tournaments
          </Link>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Global Ranks
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Weekly Backend Hackerrank #42
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2"
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="text-[10px] font-mono text-red-500 font-bold tracking-widest uppercase">
             Live Update: 45s ago
          </div>
        </motion.div>
      </div>

      <div className="border border-white/10 bg-[#080808] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/[0.02]">
              <th className="py-4 px-6 font-medium text-center w-16">Rank</th>
              <th className="py-4 px-6 font-medium">Operative</th>
              <th className="py-4 px-6 font-medium text-center">Score</th>
              <th className="py-4 px-6 font-medium text-center">Total Time</th>
              <th className="py-4 px-6 font-medium text-center">P1 (100)</th>
              <th className="py-4 px-6 font-medium text-center">P2 (100)</th>
              <th className="py-4 px-6 font-medium text-center">P3 (100)</th>
              <th className="py-4 px-6 font-medium text-center border-r-0">P4 (100)</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono">
            {leaderboard.map((user, i) => (
              <tr key={i} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i < 3 ? 'bg-primary/5' : ''}`}>
                <td className="py-4 px-6 text-center">
                   <span className={`text-[12px] font-bold ${
                     i === 0 ? 'text-yellow-500' : 
                     i === 1 ? 'text-gray-300' : 
                     i === 2 ? 'text-orange-500' : 'text-white/50'
                   }`}>
                     #{user.rank}
                   </span>
                </td>
                <td className="py-4 px-6">
                  <div className={`font-bold font-sans ${i < 3 ? 'text-primary' : 'text-white'}`}>{user.user}</div>
                </td>
                <td className="py-4 px-6 text-center font-bold text-white">{user.score}</td>
                <td className="py-4 px-6 text-center text-white/50">{user.time}</td>
                
                {/* Problems */}
                <td className="py-4 px-6 text-center">
                   {user.p1 !== "-" ? <span className="text-green-500">{user.p1}</span> : <span className="text-white/20">-</span>}
                </td>
                <td className="py-4 px-6 text-center">
                   {user.p2 !== "-" ? <span className="text-green-500">{user.p2}</span> : <span className="text-white/20">-</span>}
                </td>
                <td className="py-4 px-6 text-center">
                   {user.p3 !== "-" ? <span className="text-green-500">{user.p3}</span> : <span className="text-white/20">-</span>}
                </td>
                <td className="py-4 px-6 text-center">
                   {user.p4 !== "-" ? <span className="text-green-500">{user.p4}</span> : <span className="text-white/20">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
