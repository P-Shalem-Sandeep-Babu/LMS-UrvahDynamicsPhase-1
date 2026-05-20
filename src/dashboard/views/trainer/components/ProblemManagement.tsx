import { motion } from "motion/react";
import { FileCode2, Edit2, Play } from "lucide-react";

export const ProblemManagement = () => {
  const problems = [
    {
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      tags: ["String", "DP"],
    },
    {
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      tags: ["Linked List", "Heap"],
    },
    {
      title: "LRU Cache",
      difficulty: "Medium",
      tags: ["Design", "Hash Map", "Doubly-Linked List"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <FileCode2 className="w-3 h-3" /> Problem Library
        </h2>
        <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {problems.map((prob, i) => (
          <div
            key={i}
            className="p-4 border border-border/50 bg-white/[0.02] flex items-start justify-between group hover:border-border/80 transition-colors"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-tight text-foreground mb-2">
                {prob.title}
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-1.5 py-0.5 text-[8px] font-mono font-bold border ${
                    prob.difficulty === "Hard"
                      ? "text-red-500 border-red-500/30 bg-red-500/10"
                      : prob.difficulty === "Medium"
                        ? "text-yellow-500 border-yellow-500/30 bg-yellow-500/10"
                        : "text-green-500 border-green-500/30 bg-green-500/10"
                  }`}
                >
                  {prob.difficulty}
                </span>
                {prob.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground border border-border bg-foreground/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-foreground/5 hover:bg-foreground/10 transition-colors border border-border">
                <Edit2 className="w-3 h-3 text-foreground" />
              </button>
              <button className="p-2 bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20">
                <Play className="w-3 h-3 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
