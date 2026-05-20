import { motion } from "motion/react";
import { useState } from "react";
import { FacultyStats } from "./components/FacultyStats";
import { CoursePerformanceChart } from "./components/CoursePerformanceChart";
import { SubmissionReview } from "./components/SubmissionReview";
import { StudentAnalyticsTable } from "./components/StudentAnalyticsTable";
import { StudentWeaknessAnalysis } from "./components/StudentWeaknessAnalysis";
import { PerformanceView } from "./components/PerformanceView";
import { ContestsView } from "./components/ContestsView";
import { AnalyticsView } from "./components/AnalyticsView";
import { BatchesView } from "./components/BatchesView";
import { WeakStudentPrediction } from "../../../components/ai/WeakStudentPrediction";
import { AttendanceInsights } from "../../../components/ai/AttendanceInsights";
import { useAuth } from "../../../context/AuthContext";
import { Download, Filter, GraduationCap, LayoutDashboard, TrendingUp, Trophy, BarChart3, Layers, Megaphone } from "lucide-react";
import { AnnouncementList } from "../../../components/announcements/AnnouncementList";

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "batches" | "performance" | "contests" | "analytics" | "announcements">("overview");

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Faculty Command
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Professor {user?.name} — Academic Oversight
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 border border-border/80 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter Cohort
          </button>
          <button className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Export Gradebook
          </button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("batches")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "batches" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" /> Batches
        </button>
        <button
          onClick={() => setActiveTab("performance")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "performance" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Student Performance
        </button>
        <button
          onClick={() => setActiveTab("contests")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "contests" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy className="w-4 h-4" /> Contests & Leaderboard
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "analytics" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Analytics & Insights
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "announcements" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Megaphone className="w-4 h-4" /> Announcements
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          <FacultyStats />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 flex flex-col gap-6">
              <CoursePerformanceChart />
              <StudentAnalyticsTable />
            </div>
            <div className="flex flex-col gap-6">
              <WeakStudentPrediction />
              <AttendanceInsights />
              <SubmissionReview />
              <StudentWeaknessAnalysis />
            </div>
          </div>
        </div>
      )}

      {activeTab === "batches" && <BatchesView />}
      {activeTab === "performance" && <PerformanceView />}
      {activeTab === "contests" && <ContestsView />}
      {activeTab === "analytics" && <AnalyticsView />}
      {activeTab === "announcements" && <AnnouncementList canManage={true} />}
    </div>
  );
};
