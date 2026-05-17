import { motion } from "motion/react";
import { Flame, Target, Trophy, Clock } from "lucide-react";

export const StudentStats = () => {
  const stats = [
    {
      label: "Learning Streak",
      value: "14 Days",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      label: "Current Rank",
      value: "Novice II",
      icon: Trophy,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      label: "Quests Completed",
      value: "42/50",
      icon: Target,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      label: "Study Time",
      value: "128 hrs",
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`p-4 border bg-white/[0.02] border-white/5 relative overflow-hidden group hover:border-white/20 transition-all`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
              {stat.label}
            </div>
            <div className={`p-2 ${stat.bg} ${stat.border} border`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-white">
            {stat.value}
          </div>
          <div
            className={`absolute -bottom-4 -right-4 w-16 h-16 ${stat.bg} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
        </motion.div>
      ))}
    </div>
  );
};
