import { motion } from "motion/react";
import { Zap, Users, Code2 } from "lucide-react";

export const ActiveContests = () => {
  const contests = [
    {
      title: "Weekly Algorithm Sprint #42",
      participants: 1250,
      problems: 4,
      timeLeft: "02:15:30",
      status: "Live",
    },
    {
      title: "Data Structures Mastery",
      participants: 840,
      problems: 6,
      timeLeft: "14:00:00",
      status: "Live",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Zap className="w-3 h-3 text-red-500" /> Active Contest Vectors
        </h2>
      </div>

      <div className="space-y-4">
        {contests.map((contest, i) => (
          <div
            key={i}
            className="border border-border bg-white/[0.02] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-border/80 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-tight text-foreground">
                  {contest.title}
                </h3>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {contest.participants}
                </span>
                <span className="flex items-center gap-1">
                  <Code2 className="w-3 h-3" /> {contest.problems} Problems
                </span>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="text-xs font-mono font-bold text-red-500">
                {contest.timeLeft}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-border/80 text-[9px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/10 transition-colors">
                  Manage
                </button>
                <button className="px-3 py-1.5 bg-primary text-[9px] font-bold uppercase tracking-widest text-black hover:bg-foreground transition-colors">
                  Live Ranks
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
