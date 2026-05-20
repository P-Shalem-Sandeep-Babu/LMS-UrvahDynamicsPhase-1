import { StatsGrid } from "./components/StatsGrid";
import { CourseProgressChart } from "./components/CourseProgressChart";
import { RecentActivity } from "./components/RecentActivity";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import { StudentDashboard } from "./views/student/StudentDashboard";
import { AdminDashboard } from "./views/admin/AdminDashboard";
import { FacultyDashboard } from "./views/faculty/FacultyDashboard";
import { TrainerDashboard } from "./views/trainer/TrainerDashboard";
import { LMS_CONFIG } from "../config/constants";

export const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  if (user.role === 'student') {
    return <StudentDashboard />;
  }
  
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (user.role === 'faculty') {
    return <FacultyDashboard />;
  }

  if (user.role === 'trainer') {
    return <TrainerDashboard />;
  }

  return (
    <div className="flex flex-col gap-8 pb-4">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            {user.role === 'admin' ? 'System Performance' : 'Learning Dashboard'}
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Welcome back, {user.name} — LMS v{LMS_CONFIG.VERSION} Active
          </p>
        </motion.div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-colors">Export Logs</button>
          <button className="px-4 py-2 border border-border/80 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-colors">Refresh Sync</button>
        </div>
      </div>

      {/* KPI Stats */}
      <StatsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseProgressChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
