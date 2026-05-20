import { motion } from "motion/react";
import { Map, CheckCircle2, Circle, Lock, Zap, Target } from "lucide-react";

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
      className="border border-border bg-card p-6 relative overflow-hidden flex-1"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           <Map className="w-3 h-3" /> Projected Pathway
        </h2>
      </div>

      <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[21px] before:w-px before:bg-foreground/10">
        {roadmap.map((step, i) => (
          <div key={i} className="relative flex items-center gap-4 group">
             <div className="absolute -left-[20px] bg-card py-1">
                {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-primary" /> :
                 step.status === 'current' ? <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /></div> :
                 <Lock className="w-4 h-4 text-white/20" />}
             </div>
             
             <div className={`p-3 border flex-1 flex justify-between items-center ${
                step.status === 'completed' ? 'border-primary/20 bg-primary/5' :
                step.status === 'current' ? 'border-primary/50 bg-primary/10 pl-4 border-l-4' :
                'border-border/50 bg-white/[0.02] opacity-50'
             }`}>
                <div className={`text-xs font-bold uppercase tracking-tight ${step.status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}>
                   {step.title}
                </div>
                <div className={`text-[10px] font-mono font-bold ${
                   step.status === 'completed' ? 'text-primary' : 
                   step.status === 'current' ? 'text-foreground' : 'text-muted-foreground/60'
                }`}>
                   {step.score}
                </div>
             </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 border border-border text-[10px] font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors mb-8">
         Recalculate Trajectory
      </button>

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
           <Zap className="w-3 h-3" /> Contest Prep Strategy
        </h2>
      </div>

      <div className="p-4 border border-primary/20 bg-primary/5 space-y-3">
         <div className="flex items-start gap-3">
            <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-1">Upcoming: Weekly CodeSprint</h3>
               <p className="text-[10px] font-mono text-muted-foreground">Based on historic patterns, expect 1 Graph problem and 2 Array manipulation problems. Focus your practice on Disjoint Set Union (DSU) and Sliding Window techniques.</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
