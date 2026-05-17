import { motion } from "motion/react";
import { Map, CheckCircle2, Circle, Lock } from "lucide-react";

export const LearningRoadmap = () => {
  const roadmap = [
    { title: "Recursion Basics", status: "completed", score: "98%" },
    { title: "Memoization", status: "completed", score: "85%" },
    { title: "Dynamic Programming 1D", status: "current", score: "42%" },
    { title: "Dynamic Programming 2D", status: "locked", score: "-" },
    { title: "Graph Theory Intro", status: "locked", score: "-" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden flex-1"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
           <Map className="w-3 h-3" /> Projected Pathway
        </h2>
      </div>

      <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[21px] before:w-px before:bg-white/10">
        {roadmap.map((step, i) => (
          <div key={i} className="relative flex items-center gap-4 group">
             <div className="absolute -left-[20px] bg-[#080808] py-1">
                {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-primary" /> :
                 step.status === 'current' ? <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /></div> :
                 <Lock className="w-4 h-4 text-white/20" />}
             </div>
             
             <div className={`p-3 border flex-1 flex justify-between items-center ${
                step.status === 'completed' ? 'border-primary/20 bg-primary/5' :
                step.status === 'current' ? 'border-primary/50 bg-primary/10 pl-4 border-l-4' :
                'border-white/5 bg-white/[0.02] opacity-50'
             }`}>
                <div className={`text-xs font-bold uppercase tracking-tight ${step.status === 'locked' ? 'text-white/50' : 'text-white'}`}>
                   {step.title}
                </div>
                <div className={`text-[10px] font-mono font-bold ${
                   step.status === 'completed' ? 'text-primary' : 
                   step.status === 'current' ? 'text-white' : 'text-white/30'
                }`}>
                   {step.score}
                </div>
             </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-colors">
         Recalculate Trajectory
      </button>
    </motion.div>
  );
};
