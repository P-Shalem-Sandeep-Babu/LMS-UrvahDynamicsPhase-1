import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Trophy, ChevronLeft, Zap, Users, ShieldAlert, Cpu } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const initialLeaderboard = [
  { id: 1, rank: 1, user: "Alex Mercer", score: 400, time: "1:02:45", p1: "15:20", p2: "22:15", p3: "35:10", p4: "1:02:45" },
  { id: 2, rank: 2, user: "Sarah Chen", score: 400, time: "1:15:30", p1: "18:05", p2: "28:40", p3: "42:15", p4: "1:15:30" },
  { id: 3, rank: 3, user: "David Kim", score: 300, time: "0:45:20", p1: "10:15", p2: "20:50", p3: "45:20", p4: "-" },
  { id: 4, rank: 4, user: "Emily Wong", score: 300, time: "0:52:10", p1: "12:30", p2: "25:10", p3: "52:10", p4: "-" },
  { id: 5, rank: 5, user: "Marcus Johnson", score: 200, time: "0:30:15", p1: "14:20", p2: "30:15", p3: "-", p4: "-" },
];

const mockStatsData = [
  { scoreRange: "0-100", count: 120 },
  { scoreRange: "101-200", count: 350 },
  { scoreRange: "201-300", count: 420 },
  { scoreRange: "301-400", count: 85 },
];

export const ContestLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [lastUpdate, setLastUpdate] = useState("Just now");

  useEffect(() => {
    // Simulate real-time rank updates
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const newLeaderboard = [...prev];
        // Randomly swap a rank
        if (Math.random() > 0.5) {
          const idx1 = Math.floor(Math.random() * (newLeaderboard.length - 1)) + 1; // avoid touching rank 1 often
          const idx2 = Math.max(1, idx1 - 1);
          
          const temp = newLeaderboard[idx1];
          newLeaderboard[idx1] = newLeaderboard[idx2];
          newLeaderboard[idx2] = temp;
          
          // Fix ranks
          newLeaderboard.forEach((user, i) => {
            user.rank = i + 1;
          });
          
          setLastUpdate("Just now");
          setTimeout(() => setLastUpdate("5s ago"), 5000);
        }
        return newLeaderboard;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <Link to="/coding/contests" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors flex items-center gap-1 mb-4">
             <ChevronLeft className="w-3 h-3" /> Back to Tournaments
          </Link>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Global Ranks
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
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
             Live Update: {lastUpdate}
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-background border border-border p-5 flex flex-col gap-2 relative overflow-hidden group">
            <Users className="w-8 h-8 text-white/5 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80 z-10">Active Participants</span>
            <span className="text-3xl font-black font-mono text-foreground z-10">1,250</span>
         </div>
         <div className="bg-background border border-border p-5 flex flex-col gap-2 relative overflow-hidden group">
            <Trophy className="w-8 h-8 text-primary/10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80 z-10">Highest Score</span>
            <span className="text-3xl font-black font-mono text-primary z-10">400</span>
         </div>
         <div className="bg-background border border-border p-5 flex flex-col gap-2 relative overflow-hidden group">
            <ShieldAlert className="w-8 h-8 text-red-500/10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80 z-10">Average Completion</span>
            <span className="text-3xl font-black font-mono text-red-400 z-10">42%</span>
         </div>
         <div className="bg-background border border-border p-5 flex flex-col gap-2 relative overflow-hidden group">
            <Cpu className="w-8 h-8 text-blue-500/10 absolute -right-2 -top-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80 z-10">P1 Solve Time</span>
            <span className="text-3xl font-black font-mono text-blue-400 z-10">14m</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 border border-border bg-card overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px] whitespace-nowrap">
            <thead>
              <tr className="border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 bg-white/[0.02]">
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
            <tbody className="text-sm font-mono overflow-hidden relative">
              <AnimatePresence>
                {leaderboard.map((user, i) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={user.id} 
                    className={`border-b border-border/50 hover:bg-white/[0.02] transition-colors relative z-10 ${i < 3 ? 'bg-primary/5' : 'bg-card'}`}
                  >
                    <td className="py-4 px-6 text-center">
                       <span className={`text-[12px] font-bold ${
                         i === 0 ? 'text-yellow-500' : 
                         i === 1 ? 'text-gray-300' : 
                         i === 2 ? 'text-green-500' : 'text-muted-foreground'
                       }`}>
                         #{user.rank}
                       </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`font-bold font-sans ${i < 3 ? 'text-primary' : 'text-foreground'}`}>{user.user}</div>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-foreground">{user.score}</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">{user.time}</td>
                    
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
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Score Distribution Chart */}
        <div className="bg-background border border-border flex flex-col pt-6">
           <h3 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80 px-6 mb-6">Score Distribution</h3>
           <div className="flex-1 min-h-[300px] w-full px-2">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mockStatsData}>
                 <XAxis dataKey="scoreRange" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} width={30} />
                 <Tooltip 
                   cursor={{fill: '#ffffff05'}}
                   contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px' }}
                   labelStyle={{ display: 'none' }}
                 />
                 <Bar dataKey="count" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};
