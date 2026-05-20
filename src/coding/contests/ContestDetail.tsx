import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Trophy, Clock, Users, Zap, Terminal } from "lucide-react";

export const ContestDetail = () => {
  const contests = [
    { title: "Weekly Backend Hackerrank #42", type: "Official", participants: 1250, problems: 4, startsIn: "Live Now", duration: "2 Hours" },
    { title: "Data Structures Weekly", type: "Training", participants: 840, problems: 6, startsIn: "2 Days", duration: "1.5 Hours" },
    { title: "Advanced Algorithms Qualifier", type: "Official", participants: 3200, problems: 5, startsIn: "4 Days", duration: "3 Hours" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Combat Tournaments
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Live Competitive Programming Arena
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest, i) => (
          <div key={i} className="border border-border bg-card p-6 relative overflow-hidden group hover:border-border/80 transition-all flex flex-col">
             {contest.startsIn === "Live Now" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
             )}
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-border bg-foreground/5">
                   {contest.startsIn === "Live Now" ? <Zap className="w-5 h-5 text-red-500" /> : <Trophy className="w-5 h-5 text-muted-foreground" />}
                </div>
                <span className={`px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold border ${
                   contest.type === 'Official' ? 'border-primary/50 text-primary bg-primary/10' : 'border-border/80 text-muted-foreground bg-foreground/5'
                }`}>
                   {contest.type}
                </span>
             </div>
             
             <h3 className="text-lg font-bold uppercase tracking-tight text-foreground mb-2">{contest.title}</h3>
             
             <div className="flex-1 space-y-2 mt-4 mb-6">
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                   <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</span>
                   <span className="text-foreground">{contest.duration}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                   <span className="flex items-center gap-2"><Users className="w-3 h-3" /> Registered</span>
                   <span className="text-foreground">{contest.participants}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                   <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> Problems</span>
                   <span className="text-foreground">{contest.problems}</span>
                </div>
             </div>
             
             <div className="mt-auto">
                {contest.startsIn === "Live Now" ? (
                   <div className="flex gap-2">
                     <Link to={`/coding/contests/lobby/${i}`} className="flex-1 text-center py-2 bg-red-500 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors">
                        Enter Lobby
                     </Link>
                     <Link to="/coding/contests/leaderboard" className="px-4 flex items-center justify-center py-2 border border-border/80 hover:bg-foreground/5 transition-colors">
                        <Trophy className="w-4 h-4 text-foreground/70" />
                     </Link>
                   </div>
                ) : (
                   <Link to={`/coding/contests/lobby/${i}`} className="w-full flex items-center justify-center py-2 bg-foreground/5 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-foreground/10 transition-colors border border-border">
                      Register ({contest.startsIn})
                   </Link>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
