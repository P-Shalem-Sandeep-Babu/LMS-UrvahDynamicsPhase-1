import { motion } from "motion/react";
import { Lightbulb, Target, AlertCircle, TrendingDown, Activity, FastForward, Brain } from "lucide-react";

export const AIInsights = () => {
  const insights = [
    { type: "warning", icon: AlertCircle, title: "Pattern Detected", text: "You spend 30% more time on graph traversal problems than the cohort average. Applying BFS/DFS templates could optimize your speed." },
    { type: "opportunity", icon: Target, title: "Skill Synergy", text: "Your strong foundation in Recursion makes you an ideal candidate to master Dynamic Programming. Attempt 'House Robber' next." },
    { type: "insight", icon: Lightbulb, title: "Coding Habit", text: "You tend to submit solutions before testing edge cases. Incorporating a 2-minute self-review could improve your first-try acceptance rate." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4 mt-8">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
           <Activity className="w-3 h-3" /> AI Performance Analysis
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="p-4 border border-border bg-white/[0.02]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Coding Pace</h4>
            <div className="text-xl font-black text-foreground">Top 15%</div>
            <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">Faster than cohort avg</p>
         </div>
         <div className="p-4 border border-border bg-white/[0.02]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Bug Rate</h4>
            <div className="text-xl font-black text-foreground">-12%</div>
            <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">Reduction this week</p>
         </div>
      </div>

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
           <TrendingDown className="w-3 h-3" /> Weak-Topic Detected
        </h2>
      </div>

      <div className="p-4 border border-red-500/30 bg-red-500/5 mb-8">
         <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-400">Dynamic Programming (2D)</h3>
            <span className="text-[10px] font-mono text-red-400 border border-red-500/30 px-2 py-0.5">Focus Required</span>
         </div>
         <p className="text-xs font-mono text-muted-foreground leading-relaxed mb-4">
            Analysis shows a 60% failure rate on 2D DP problems in recent contests due to incorrect state definitions.
         </p>
         <button className="w-full py-2 bg-red-500/10 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-colors">
            Generate Practice Sheet
         </button>
      </div>

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
           <Lightbulb className="w-3 h-3" /> Cognitive Insights
        </h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className={`p-4 border bg-white/[0.02] flex items-start gap-4 ${
            insight.type === 'warning' ? 'border-yellow-500/30' : 
            insight.type === 'opportunity' ? 'border-green-500/30' : 'border-primary/30'
          }`}>
             <div className="mt-0.5">
               <insight.icon className={`w-4 h-4 ${
                  insight.type === 'warning' ? 'text-yellow-500' : 
                  insight.type === 'opportunity' ? 'text-green-500' : 'text-primary'
               }`} />
             </div>
             <div>
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-1.5">{insight.title}</h3>
               <p className="text-xs font-mono text-muted-foreground leading-relaxed">{insight.text}</p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
