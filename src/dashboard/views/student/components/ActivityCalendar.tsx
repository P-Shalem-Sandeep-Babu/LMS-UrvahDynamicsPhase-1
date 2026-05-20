import { motion } from "motion/react";
import { CalendarDays, GitCommit } from "lucide-react";

export const ActivityCalendar = () => {
  // Generate random mock data for commit graph (52 weeks * 7 days)
  const weeks = Array.from({ length: 52 }).map(() => 
    Array.from({ length: 7 }).map(() => Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0)
  );
  
  const getIntensityClass = (level: number) => {
    switch(level) {
       case 1: return "bg-primary/30";
       case 2: return "bg-primary/60";
       case 3: return "bg-primary/80";
       case 4: return "bg-primary";
       default: return "bg-foreground/5";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card p-6 relative"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-green-500" /> Activity Map
        </h2>
        <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1"><GitCommit className="w-3 h-3" /> 482 Submissions in last year</div>
      </div>
      
      <div className="w-full overflow-x-auto hide-scrollbar">
         <div className="inline-flex gap-1 min-w-max pb-2">
           {weeks.map((week, i) => (
             <div key={i} className="flex flex-col gap-1">
               {week.map((level, j) => (
                 <div
                   key={j}
                   className={`w-3 h-3 rounded-sm ${getIntensityClass(level)} hover:ring-1 hover:ring-white/50 transition-all cursor-crosshair`}
                   title={`${level > 0 ? level * 3 : 'No'} submissions`}
                 />
               ))}
             </div>
           ))}
         </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4 text-[10px] font-mono text-muted-foreground/80">
         <span>Less</span>
         <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-foreground/5" />
            <div className="w-3 h-3 rounded-sm bg-primary/30" />
            <div className="w-3 h-3 rounded-sm bg-primary/60" />
            <div className="w-3 h-3 rounded-sm bg-primary/80" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
         </div>
         <span>More</span>
      </div>
    </motion.div>
  );
};
