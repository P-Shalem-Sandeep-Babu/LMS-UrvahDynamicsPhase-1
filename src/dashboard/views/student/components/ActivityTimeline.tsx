import { motion } from "motion/react";
import { History, GitCommit, MessageSquare, CheckCircle2 } from "lucide-react";

export const ActivityTimeline = () => {
  const events = [
    {
      type: "commit",
      text: "Submitted assignment: Graph Traversal",
      time: "2 hrs ago",
      icon: GitCommit,
      color: "text-blue-400",
    },
    {
      type: "review",
      text: "Code Review completed with score 94/100",
      time: "5 hrs ago",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      type: "forum",
      text: "Replied to 'Understanding React Server Components'",
      time: "Yesterday",
      icon: MessageSquare,
      color: "text-foreground/70",
    },
    {
      type: "commit",
      text: "Passed Daily Code Kata: Dynamic Programming",
      time: "Yesterday",
      icon: GitCommit,
      color: "text-blue-400",
    },
    {
      type: "commit",
      text: "Submitted assignment: Redux State Management",
      time: "2 days ago",
      icon: GitCommit,
      color: "text-blue-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <History className="w-3 h-3" /> System Log
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-border bg-foreground/5 flex items-center justify-center group-hover:border-border transition-colors">
                <event.icon className={`w-3 h-3 ${event.color}`} />
              </div>
              {i !== events.length - 1 && (
                <div className="w-px h-full bg-foreground/10 my-2 group-hover:bg-foreground/20 transition-colors" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-xs font-mono text-foreground/80 leading-relaxed">
                {event.text}
              </p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                {event.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
