import { motion } from "motion/react";
import { useState } from "react";
import { TrainerStats } from "./components/TrainerStats";
import { RealtimeSubmissions } from "./components/RealtimeSubmissions";
import { ActiveContests } from "./components/ActiveContests";
import { CodingAnalyticsChart } from "./components/CodingAnalyticsChart";
import { ProblemManagement } from "./components/ProblemManagement";
import { DiscussionModeration } from "./components/DiscussionModeration";
import { BatchesView } from "./components/BatchesView";
import { AssessmentsView } from "./components/AssessmentsView";
import { StudentsView } from "./components/StudentsView";
import { ReportsView } from "./components/ReportsView";
import { AnnouncementList } from "../../../components/announcements/AnnouncementList";
import { WeakStudentPrediction } from "../../../components/ai/WeakStudentPrediction";
import { AttendanceInsights } from "../../../components/ai/AttendanceInsights";
import { useAuth } from "../../../context/AuthContext";
import { Plus, Terminal, RefreshCw, LayoutDashboard, Layers, FileCode2, Users, FileSpreadsheet, Megaphone } from "lucide-react";

export const TrainerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "batches" | "assessments" | "reports" | "announcements">("overview");

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Trainer Console
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Identity: {user?.name} — Contest Ops & Mentorship
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 border border-border/80 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Sync TTY
          </button>
          <button className="px-4 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-foreground transition-colors flex items-center gap-2">
            <Plus className="w-3 h-3" /> New Contest
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
          <Layers className="w-4 h-4" /> Batches & Colleges
        </button>
        <button
          onClick={() => setActiveTab("assessments")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "assessments" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileCode2 className="w-4 h-4" /> Assessments & Tests
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "reports" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Reports
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
          <TrainerStats />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 flex flex-col gap-6">
              <ActiveContests />
              <CodingAnalyticsChart />
            </div>
            <div className="flex flex-col gap-6">
              <WeakStudentPrediction />
              <AttendanceInsights />
              <RealtimeSubmissions />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProblemManagement />
            <DiscussionModeration />
          </div>
        </div>
      )}

      {activeTab === "batches" && <BatchesView />}
      {activeTab === "assessments" && <AssessmentsView />}

      {activeTab === "reports" && <ReportsView />}
      {activeTab === "announcements" && <AnnouncementList canManage={true} />}
    </div>
  );
};
