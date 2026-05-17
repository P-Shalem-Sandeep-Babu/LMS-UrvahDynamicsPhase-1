import { motion } from "motion/react";
import { StudentStats } from "./components/StudentStats";
import { ContinueLearning } from "./components/ContinueLearning";
import { AIMentorWidget } from "./components/AIMentorWidget";
import { PerformanceChart } from "./components/PerformanceChart";
import { UpcomingDeadlines } from "./components/UpcomingDeadlines";
import { CodingChallenges } from "./components/CodingChallenges";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { GamificationWidget } from "./components/GamificationWidget";
import { OnlineUsersWidget } from "../../../components/realtime/OnlineUsersWidget";
import { ActivityFeedWidget } from "../../../components/realtime/ActivityFeedWidget";
import { useAuth } from "../../../context/AuthContext";
import { BrainCircuit } from "lucide-react";

export const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header section is managed by Dashboard wrapper, or we can handle it here and clean up Dashboard.tsx */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Command Center
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Welcome back, Cadet {user?.name} — LMS Cohort Beta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-2 bg-primary/10 border-l-2 border-primary flex items-center gap-3 backdrop-blur-md"
        >
          <div className="bg-primary p-1">
            <BrainCircuit className="w-4 h-4 text-black" />
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest">
            <span className="font-bold text-primary mr-2">Neural Link:</span>{" "}
            Synchronized.
          </div>
        </motion.div>
      </div>

      <StudentStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ContinueLearning />
          <PerformanceChart />
        </div>
        <div className="flex flex-col gap-6">
          <AIMentorWidget />
          <GamificationWidget />
          <UpcomingDeadlines />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CodingChallenges />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OnlineUsersWidget />
            <ActivityFeedWidget />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
};
