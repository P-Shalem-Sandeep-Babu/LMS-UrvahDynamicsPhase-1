import { motion } from "motion/react";
import { CheckSquare, ArrowRight, Clock } from "lucide-react";

export const SubmissionReview = () => {
  const submissions = [
    {
      student: "Alex Mercer",
      assignment: "React State Management",
      time: "10 min ago",
      status: "Needs Review",
      risk: "Low",
    },
    {
      student: "Sarah Chen",
      assignment: "Dijkstra's Algorithm",
      time: "1 hr ago",
      status: "Needs Review",
      risk: "Medium",
    },
    {
      student: "Marcus Johnson",
      assignment: "REST API Design",
      time: "3 hrs ago",
      status: "Flagged by AI",
      risk: "High",
    },
    {
      student: "Emily Wong",
      assignment: "Docker Containerization",
      time: "5 hrs ago",
      status: "Needs Review",
      risk: "Low",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <CheckSquare className="w-3 h-3" /> Pending Evaluations
        </h2>
      </div>

      <div className="space-y-3">
        {submissions.map((sub, i) => (
          <div
            key={i}
            className={`p-4 border bg-white/[0.02] transition-colors relative group overflow-hidden ${
              sub.risk === "High"
                ? "border-red-500/30"
                : "border-border/50 hover:border-border/80"
            }`}
          >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-foreground/10 hover:bg-foreground/20 text-foreground p-1">
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex justify-between items-start mb-2 pr-6">
              <div className="text-xs font-bold uppercase tracking-tight text-foreground">
                {sub.assignment}
              </div>
              <div className="flex items-center gap-1 text-[8px] font-mono text-muted-foreground/80">
                <Clock className="w-2.5 h-2.5" /> {sub.time}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="text-[10px] font-mono text-muted-foreground">
                {sub.student}
              </div>
              <div
                className={`text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 border ${
                  sub.risk === "High"
                    ? "border-red-500/50 text-red-500 bg-red-500/10"
                    : "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
                }`}
              >
                {sub.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 border border-border text-[10px] font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors">
        View All Submissions
      </button>
    </motion.div>
  );
};
