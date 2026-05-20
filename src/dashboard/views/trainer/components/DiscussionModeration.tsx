import { motion } from "motion/react";
import { MessageSquare, AlertTriangle, Check } from "lucide-react";

export const DiscussionModeration = () => {
  const discussions = [
    {
      user: "amercer",
      topic: "O(n) logic not working for Array sum",
      status: "unresolved",
    },
    {
      user: "schen",
      topic: "Explanation for Dijkstra relaxation step?",
      status: "unresolved",
    },
    {
      user: "jdoe",
      topic: "Please fix test case #4 on Problem 55",
      status: "flagged",
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
          <MessageSquare className="w-3 h-3" /> Discourse Moderation
        </h2>
      </div>

      <div className="space-y-3">
        {discussions.map((disc, i) => (
          <div
            key={i}
            className="p-4 border border-border/50 bg-white/[0.02] flex justify-between items-center group"
          >
            <div>
              <div className="text-xs font-bold text-foreground mb-1">
                {disc.topic}
              </div>
              <div className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest">
                Posted by @{disc.user}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {disc.status === "flagged" ? (
                <div className="p-1.5 bg-red-500/10 text-red-500 border border-red-500/20">
                  <AlertTriangle className="w-3 h-3" />
                </div>
              ) : (
                <div className="p-1.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                  <span className="text-[8px] font-bold uppercase tracking-widest block leading-none">
                    Open
                  </span>
                </div>
              )}
              <button className="p-1.5 bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors border border-border">
                <Check className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 border border-border text-[10px] font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors">
        Open Forum Console
      </button>
    </motion.div>
  );
};
