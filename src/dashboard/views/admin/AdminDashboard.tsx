import { motion } from "motion/react";
import { AdminStats } from "./components/AdminStats";
import { TrafficChart } from "./components/TrafficChart";
import { SecurityAlerts } from "./components/SecurityAlerts";
import { ActiveUsers } from "./components/ActiveUsers";
import { PlatformActivity } from "./components/PlatformActivity";
import { CohortComparison } from "./components/CohortComparison";
import { useAuth } from "../../../context/AuthContext";
import { ShieldCheck, Download, RefreshCw } from "lucide-react";

export const AdminDashboard = () => {
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
            System Operations
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
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
          <button className="px-4 py-2 border border-white/20 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Force Sync
          </button>
        </motion.div>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TrafficChart />
          <CohortComparison />
        </div>
        <div className="flex flex-col gap-6">
          <SecurityAlerts />
          <ActiveUsers />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PlatformActivity />
      </div>
    </div>
  );
};
