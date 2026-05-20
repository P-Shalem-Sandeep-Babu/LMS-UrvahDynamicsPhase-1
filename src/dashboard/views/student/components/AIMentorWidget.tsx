import { motion } from "motion/react";
import { BrainCircuit, Sparkles, Code2, MessagesSquare } from "lucide-react";

export const AIMentorWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden flex-1 flex flex-col"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <BrainCircuit className="w-3 h-3" /> System Oracle
        </h2>
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </div>

      <div className="flex-1 space-y-4">
        <div className="bg-foreground/5 border border-border p-4 relative group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="absolute -left-px top-2 bottom-2 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
          <div className="flex gap-3 mb-2">
            <Code2 className="w-4 h-4 text-muted-foreground/80 mt-0.5" />
            <p className="text-xs font-mono text-foreground/70 leading-relaxed">
              I noticed you struggled with time complexity in the last exercise.
              Let's review Big O notation.
            </p>
          </div>
        </div>

        <div className="bg-foreground/5 border border-border p-4 relative group hover:border-blue-500/50 transition-colors cursor-pointer">
          <div className="absolute -left-px top-2 bottom-2 w-[2px] bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
          <div className="flex gap-3 mb-2">
            <Sparkles className="w-4 h-4 text-muted-foreground/80 mt-0.5" />
            <p className="text-xs font-mono text-foreground/70 leading-relaxed">
              Your recursion code was clean, but could be optimized using
              memoization. Want a quick interactive walkthrough?
            </p>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 py-3 border border-border bg-white/[0.02] hover:bg-foreground/5 text-[10px] font-black uppercase tracking-widest text-foreground transition-colors flex items-center justify-center gap-2">
        <MessagesSquare className="w-3 h-3" /> Initiate Neural Session
      </button>
    </motion.div>
  );
};
