import { motion } from "motion/react";
import { Activity, Terminal } from "lucide-react";

export const RealtimeSubmissions = () => {
  const submissions = [
    {
      student: "amercer",
      problem: "Two Sum",
      lang: "Python",
      status: "AC",
      time: "12ms",
      mem: "14.2MB",
    },
    {
      student: "schen",
      problem: "Merge K Lists",
      lang: "C++",
      status: "TLE",
      time: "2000ms",
      mem: "8.1MB",
    },
    {
      student: "mjohnson",
      problem: "Reverse List",
      lang: "Java",
      status: "WA",
      time: "N/A",
      mem: "N/A",
    },
    {
      student: "ewong",
      problem: "Two Sum",
      lang: "Typescript",
      status: "AC",
      time: "45ms",
      mem: "42MB",
    },
    {
      student: "dkim",
      problem: "LRU Cache",
      lang: "Go",
      status: "MLE",
      time: "80ms",
      mem: "256MB",
    },
    {
      student: "rsmith",
      problem: "Graph Cycle",
      lang: "Python",
      status: "AC",
      time: "115ms",
      mem: "22MB",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AC":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "WA":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "TLE":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "MLE":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      default:
        return "text-muted-foreground bg-foreground/5 border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Terminal className="w-3 h-3" /> Live Execution Stream
        </h2>
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
        {submissions.map((sub, i) => (
          <div
            key={i}
            className="p-3 border border-border/50 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex items-center justify-between group"
          >
            <div className="flex flex-col gap-1">
              <div className="text-[10px] font-bold text-foreground uppercase tracking-tight">
                {sub.problem}
              </div>
              <div className="text-[9px] font-mono text-muted-foreground/80">
                @{sub.student} &bull; {sub.lang}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${getStatusColor(sub.status)}`}
              >
                {sub.status}
              </span>
              <div className="text-[8px] font-mono text-muted-foreground/60 hidden group-hover:block transition-all">
                {sub.time} &bull; {sub.mem}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
