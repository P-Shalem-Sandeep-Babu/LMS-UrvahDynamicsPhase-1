import { motion } from "motion/react";
import { StudentStats } from "./components/StudentStats";
import { ContinueLearning } from "./components/ContinueLearning";
import { AIMentorWidget } from "./components/AIMentorWidget";
import { PerformanceChart } from "./components/PerformanceChart";
import { UpcomingDeadlines } from "./components/UpcomingDeadlines";
import { CodingChallenges } from "./components/CodingChallenges";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { RankProgressCard } from "../../../components/gamification/RankProgressCard";
import { StreakTracker } from "../../../components/gamification/StreakTracker";
import { LeaderboardPanel } from "../../../components/gamification/LeaderboardPanel";
import { DailyRewardsWidget } from "../../../components/gamification/DailyRewardsWidget";
import { mockProfile, mockLeaderboard } from "../../../data/mockGamification";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { OnlineUsersWidget } from "../../../components/realtime/OnlineUsersWidget";
import { ActivityFeedWidget } from "../../../components/realtime/ActivityFeedWidget";
import { TopicWisePractice } from "./components/TopicWisePractice";
import { AssessmentSuite } from "./components/AssessmentSuite";
import { SkillGraph } from "./components/SkillGraph";
import { AnnouncementsPanel } from "./components/AnnouncementsPanel";
import { DiscussionForumWidget } from "./components/DiscussionForumWidget";
import { ActivityCalendar } from "./components/ActivityCalendar";
import { CodingRecommendations } from "../../../components/ai/CodingRecommendations";
import { PerformanceInsights } from "../../../components/ai/PerformanceInsights";
import { AIGeneratedSheets } from "../../../components/ai/AIGeneratedSheets";
import { useAuth } from "../../../context/AuthContext";
import { BrainCircuit } from "lucide-react";

export const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Command Center
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
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

      {/* Row 1: Core learning and progression */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ContinueLearning />
          <CodingRecommendations />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceChart />
            <SkillGraph />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <AIMentorWidget />
          <PerformanceInsights />
          <div className="flex flex-col gap-4">
            <DailyRewardsWidget />
            <RankProgressCard profile={mockProfile} />
            <StreakTracker profile={mockProfile} />
            <Link to="/gamification" className="flex items-center justify-center gap-2 p-3 bg-foreground/5 border border-border hover:bg-foreground/10 transition-colors text-xs font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground">
              View Gamification Profile <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Row 2: Practice and Competition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <AssessmentSuite />
          <TopicWisePractice />
          <AIGeneratedSheets />
          <CodingChallenges />
        </div>
        <div className="flex flex-col gap-6">
          <LeaderboardPanel users={mockLeaderboard.slice(0, 5)} />
          <UpcomingDeadlines />
        </div>
      </div>

      {/* Row 4: Activity & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <ActivityCalendar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OnlineUsersWidget />
            <DiscussionForumWidget />
          </div>
        </div>
        <div className="flex flex-col gap-6">
           <AnnouncementsPanel />
           <ActivityTimeline />
        </div>
      </div>
      
    </div>
  );
};
