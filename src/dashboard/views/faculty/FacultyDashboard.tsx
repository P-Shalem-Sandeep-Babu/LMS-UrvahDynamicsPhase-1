import { motion } from "motion/react";
import { FacultyStats } from "./components/FacultyStats";
import { CoursePerformanceChart } from "./components/CoursePerformanceChart";
import { SubmissionReview } from "./components/SubmissionReview";
import { StudentAnalyticsTable } from "./components/StudentAnalyticsTable";
import { StudentWeaknessAnalysis } from "./components/StudentWeaknessAnalysis";
import { useAuth } from "../../../context/AuthContext";
import { Download, Filter, GraduationCap } from "lucide-react";

export const FacultyDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Faculty Command
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Professor {user?.name} — Academic Oversight
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 border border-white/20 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter Cohort
          </button>
          <button className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Export Gradebook
          </button>
        </motion.div>
      </div>

      <FacultyStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CoursePerformanceChart />
          <StudentAnalyticsTable />
        </div>
        <div className="flex flex-col gap-6">
          <SubmissionReview />
          <StudentWeaknessAnalysis />
        </div>
      </div>
    </div>
  );
};
