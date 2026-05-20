import { motion } from "motion/react";
import { Calendar, AlertTriangle } from "lucide-react";

export const UpcomingDeadlines = () => {
  const deadlines = [
    {
      title: "Binary Trees Project",
      due: "Today, 23:59",
      type: "assignment",
      critical: true,
    },
    {
      title: "Algorithms Quiz",
      due: "Tomorrow, 14:00",
      type: "assessment",
      critical: false,
    },
    {
      title: "Project Assessment: Sorting",
      due: "Friday, 18:00",
      type: "review",
      critical: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Calendar className="w-3 h-3" /> Timeline Constraints
        </h2>
      </div>

      <div className="space-y-4">
        {deadlines.map((task, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 border border-border/50 bg-white/[0.02] hover:bg-foreground/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              {task.critical && (
                <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              )}
              <div>
                <div className="text-xs font-bold text-foreground uppercase tracking-tight">
                  {task.title}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/80">
                  {task.type}
                </div>
              </div>
            </div>
            <div
              className={`text-[10px] font-mono font-bold ${task.critical ? "text-red-500" : "text-primary"}`}
            >
              {task.due}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
