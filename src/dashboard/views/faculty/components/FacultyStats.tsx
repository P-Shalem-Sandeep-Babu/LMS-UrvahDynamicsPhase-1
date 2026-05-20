import { motion } from "motion/react";
import { Users, FileText, CheckCircle, LineChart } from "lucide-react";

export const FacultyStats = () => {
  const stats = [
    {
      label: "Total Students",
      value: "342",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "Across 4 cohorts",
    },
    {
      label: "Pending Reviews",
      value: "28",
      icon: FileText,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      trend: "Needs attention",
    },
    {
      label: "Avg Attendance",
      value: "92%",
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      trend: "+3% this month",
    },
    {
      label: "Class Average",
      value: "81%",
      icon: LineChart,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      trend: "Stable",
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
          className={`p-6 border bg-background border-border relative overflow-hidden group hover:border-border/80 transition-all`}
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
