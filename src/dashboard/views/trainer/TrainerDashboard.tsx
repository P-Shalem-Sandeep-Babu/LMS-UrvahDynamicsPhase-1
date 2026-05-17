import { motion } from "motion/react";
import { TrainerStats } from "./components/TrainerStats";
import { RealtimeSubmissions } from "./components/RealtimeSubmissions";
import { ActiveContests } from "./components/ActiveContests";
import { CodingAnalyticsChart } from "./components/CodingAnalyticsChart";
import { ProblemManagement } from "./components/ProblemManagement";
import { DiscussionModeration } from "./components/DiscussionModeration";
import { useAuth } from "../../../context/AuthContext";
import { Plus, Terminal, RefreshCw } from "lucide-react";

export const TrainerDashboard = () => {
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
            Trainer Console
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Identity: {user?.name} — Contest Ops & Mentorship
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 border border-white/20 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Sync TTY
          </button>
          <button className="px-4 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
            <Plus className="w-3 h-3" /> New Contest
          </button>
        </motion.div>
      </div>

      <TrainerStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ActiveContests />
          <CodingAnalyticsChart />
        </div>
        <div className="flex flex-col gap-6">
          <RealtimeSubmissions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProblemManagement />
        <DiscussionModeration />
      </div>
    </div>
  );
};
