import { motion } from "motion/react";
import { useState } from "react";
import { AdminStats } from "./components/AdminStats";
import { TrafficChart } from "./components/TrafficChart";
import { SecurityAlerts } from "./components/SecurityAlerts";
import { ActiveUsers } from "./components/ActiveUsers";
import { PlatformActivity } from "./components/PlatformActivity";
import { CohortComparison } from "./components/CohortComparison";
import { ManagementView } from "./components/ManagementView";
import { AnalyticsView } from "./components/AnalyticsView";
import { WeakStudentPrediction } from "../../../components/ai/WeakStudentPrediction";
import { AttendanceInsights } from "../../../components/ai/AttendanceInsights";
import { useAuth } from "../../../context/AuthContext";
import { ShieldCheck, Download, RefreshCw, LayoutDashboard, Users, LineChart, Megaphone } from "lucide-react";
import { AnnouncementList } from "../../../components/announcements/AnnouncementList";

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "management" | "analytics" | "announcements">("overview");

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            System Operations
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Identity: {user?.name} — Root Access Granted
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Export Logs
          </button>
          <button className="px-4 py-2 border border-border/80 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Force Sync
          </button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 md:gap-8 border-b border-border overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("management")}
          className={`pb-3 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "management" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" /> Management
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "analytics" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <LineChart className="w-4 h-4" /> Analytics
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`pb-3 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "announcements" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Megaphone className="w-4 h-4" /> Announcements
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <AdminStats />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 flex flex-col gap-6">
              <TrafficChart />
              <CohortComparison />
            </div>
            <div className="flex flex-col gap-6">
              <AttendanceInsights />
              <WeakStudentPrediction />
              <SecurityAlerts />
              <ActiveUsers />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <PlatformActivity />
          </div>
        </>
      )}

      {activeTab === "management" && <ManagementView />}
      {activeTab === "analytics" && <AnalyticsView />}
      {activeTab === "announcements" && <AnnouncementList canManage={true} />}
    </div>
  );
};
