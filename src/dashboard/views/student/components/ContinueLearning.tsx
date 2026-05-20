import { motion } from "motion/react";
import { Play, Code, BookOpen } from "lucide-react";

export const ContinueLearning = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Active Directive
          </h2>
        </div>
        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 border border-primary/20">
          Module 04
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 relative group/video cursor-pointer">
          <div className="absolute inset-0 bg-background/60 group-hover/video:bg-background/40 transition-colors flex items-center justify-center border border-border z-10">
            <div className="w-12 h-12 rounded-full border border-border/80 bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover/video:scale-110 group-hover/video:border-primary/50 transition-all">
              <Play className="w-4 h-4 text-foreground group-hover/video:text-primary ml-1" />
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
            alt="Course Thumbnail"
            className="w-full h-32 object-cover grayscale opacity-50 group-hover/video:grayscale-0 group-hover/video:opacity-100 transition-all duration-700"
          />
          <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-0.5 text-[8px] font-mono text-foreground/70 z-20 border border-border">
            14:20 left
          </div>
        </div>

        <div className="md:w-2/3 flex flex-col justify-center space-y-4">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
              Advanced Recursion Patterns
            </h3>
            <p className="text-sm font-mono text-muted-foreground line-clamp-2">
              Mastering depth-first algorithms using advanced recursion
              patterns. This module covers tree traversal, backtracking, and
              memoization techniques.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-foreground/70">
              <span>Progress</span>
              <span className="font-mono text-primary">68%</span>
            </div>
            <div className="h-1.5 w-full bg-foreground/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-primary relative"
              >
                <div className="absolute inset-0 bg-foreground/20 w-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
