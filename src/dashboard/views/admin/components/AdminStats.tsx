import { motion } from "motion/react";
import { Users, Server, AlertOctagon, GraduationCap } from "lucide-react";

export const AdminStats = () => {
  const stats = [
    {
      label: "Active Nodes",
      value: "14,205",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "+12% this week",
    },
    {
      label: "System Load",
      value: "32%",
      icon: Server,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      trend: "Optimal",
    },
    {
      label: "Security Anomalies",
      value: "3",
      icon: AlertOctagon,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      trend: "Requires attention",
    },
    {
      label: "Cohort Completion",
      value: "84%",
      icon: GraduationCap,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      trend: "+2% from last cycle",
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
          className={`p-6 border bg-[#050505] border-white/10 relative overflow-hidden group hover:border-white/20 transition-all`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
              {stat.label}
            </div>
            <div className={`p-2 ${stat.bg} ${stat.border} border`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-[9px] font-bold tracking-widest uppercase text-white/40 border-t border-white/5 pt-2 mt-4">
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
