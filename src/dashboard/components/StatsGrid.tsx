import { motion } from "motion/react";
import { BookOpen, Award, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";

const studentStats: Array<{ title: string, value: string, icon: any, trend: string, live?: boolean, variant?: string }> = [
  { title: "Active Courses", value: "4", icon: BookOpen, trend: "+1 FROM PREV PERIOD" },
  { title: "Certificates", value: "12", icon: Award, trend: "+3 FROM PREV PERIOD" },
  { title: "Hours Learned", value: "128h", icon: Clock, trend: "+14h LOGGED THIS WEEK" },
  { title: "Current Streak", value: "7 Days", icon: Target, trend: "CONSISTENT EFFORT" },
];

const adminStats: Array<{ title: string, value: string, icon: any, trend: string, live?: boolean, variant?: string }> = [
  { title: "Total Users", value: "12,450", icon: BookOpen, trend: "+14% FROM PREVIOUS GEN", live: true },
  { title: "Active Instructors", value: "342", icon: Award, trend: "+2% FROM PREVIOUS GEN" },
  { title: "System Health", value: "99.9%", icon: Clock, trend: "STABLE OPERATION" },
  { title: "Open Issues", value: "3", icon: Target, trend: "REQUIRES ATTENTION", variant: "destructive" },
];


export const StatsGrid = () => {
  const { user } = useAuth();
  
  const stats = user.role === 'admin' ? adminStats : studentStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
         <motion.div
           key={stat.title}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, delay: i * 0.1 }}
           className="bg-white/[0.03] border border-white/10 p-6 rounded-none relative overflow-hidden group hover:bg-white/[0.05] transition-colors"
         >
             {stat.live && (
               <div className="absolute top-0 right-0 px-2 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-tighter">Live</div>
             )}
             <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-4 flex justify-between items-center">
                 {stat.title}
                 <stat.icon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
             </span>
             <div className="text-4xl lg:text-5xl font-mono font-bold tracking-tighter">{stat.value}</div>
             <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
               <span className={`text-[9px] font-bold tracking-widest uppercase ${stat.variant === 'destructive' ? 'text-red-400' : 'text-primary'}`}>
                  {stat.trend}
               </span>
             </div>
          </motion.div>
      ))}
    </div>
  );
};

