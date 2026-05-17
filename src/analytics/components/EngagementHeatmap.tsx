import { motion } from "motion/react";
import { Activity } from "lucide-react";

export const EngagementHeatmap = () => {
  // Generate random heatmap data for 52 weeks * 7 days
  const weeks = Array.from({ length: 26 }, () => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );

  const getIntensityClass = (val: number) => {
    switch(val) {
       case 4: return "bg-primary border-primary";
       case 3: return "bg-primary/80 border-primary/50";
       case 2: return "bg-primary/50 border-primary/30";
       case 1: return "bg-primary/20 border-primary/10";
       default: return "bg-white/5 border-white/5";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
           <Activity className="w-3 h-3 text-yellow-500" /> Platform Engagement Frequency
        </h2>
      </div>

      <div className="overflow-x-auto w-full custom-scrollbar pb-2">
         <div className="flex gap-1">
            {weeks.map((week, i) => (
               <div key={i} className="flex flex-col gap-1">
                  {week.map((day, j) => (
                     <div key={`${i}-${j}`} className={`w-3 h-3 rounded-sm border ${getIntensityClass(day)} hover:border-white transition-colors cursor-pointer`} title={`Activity level: ${day}`} />
                  ))}
               </div>
            ))}
         </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 text-[9px] font-mono uppercase tracking-widest text-white/40 justify-end">
         <span>Less</span>
         <div className="flex gap-1">
            <div className={`w-3 h-3 rounded-sm border ${getIntensityClass(0)}`} />
            <div className={`w-3 h-3 rounded-sm border ${getIntensityClass(1)}`} />
            <div className={`w-3 h-3 rounded-sm border ${getIntensityClass(2)}`} />
            <div className={`w-3 h-3 rounded-sm border ${getIntensityClass(3)}`} />
            <div className={`w-3 h-3 rounded-sm border ${getIntensityClass(4)}`} />
         </div>
         <span>More</span>
      </div>
    </motion.div>
  );
};
