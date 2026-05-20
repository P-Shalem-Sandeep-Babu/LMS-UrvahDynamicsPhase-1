import { motion } from "motion/react";
import {
  Terminal,
  Activity,
  FileCode2,
  MessageSquareWarning,
} from "lucide-react";

export const TrainerStats = () => {
  const stats = [
    {
      label: "Active Contests",
      value: "3",
      icon: Terminal,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      trend: "Live events",
    },
    {
      label: "Code Submissions",
      value: "1.2k",
      icon: Activity,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "+240/hr",
    },
    {
      label: "Problem Bank",
      value: "450",
      icon: FileCode2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      trend: "Ready to deploy",
    },
    {
      label: "Flagged Posts",
      value: "12",
      icon: MessageSquareWarning,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      trend: "Awaiting moderation",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`p-6 border bg-card border-border relative overflow-hidden group hover:border-border/80 transition-all`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground/80 transition-colors">
              {stat.label}
            </div>
            <div className={`p-2 ${stat.bg} ${stat.border} border`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-2">
            {stat.value}
          </div>
          <div className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground/80 border-t border-border/50 pt-2 mt-4">
            {stat.trend}
          </div>
          <div
            className={`absolute -bottom-4 -right-4 w-16 h-16 ${stat.bg} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
        </motion.div>
      ))}
    </div>
  );
};
