import { motion } from "motion/react";
import { Lightbulb, Target, AlertCircle } from "lucide-react";

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
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
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
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-white mb-1.5">{insight.title}</h3>
               <p className="text-xs font-mono text-white/60 leading-relaxed">{insight.text}</p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
