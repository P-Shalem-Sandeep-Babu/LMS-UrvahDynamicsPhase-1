import React from "react";
import { 
  mockProfile, 
  mockLeaderboard, 
  mockXPHistory,
  mockBadges,
  mockAchievements
} from "../../data/mockGamification";
import { RankProgressCard } from "../../components/gamification/RankProgressCard";
import { StreakTracker } from "../../components/gamification/StreakTracker";
import { BadgeCard } from "../../components/gamification/BadgeCard";
import { AchievementCard } from "../../components/gamification/AchievementCard";
import { LeaderboardPanel } from "../../components/gamification/LeaderboardPanel";
import { XPWidget } from "../../components/gamification/XPWidget";
import { DailyRewardsWidget } from "../../components/gamification/DailyRewardsWidget";
import { ProgressMilestonesWidget } from "../../components/gamification/ProgressMilestonesWidget";
import { Trophy, CheckCircle } from "lucide-react";

export const GamificationPage = () => {
  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 pb-12 animate-in fade-in pt-6">
      <div className="border-b border-border pb-6">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" /> Command Center Profile
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Track your rank, badges, and achievements
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <RankProgressCard profile={mockProfile} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DailyRewardsWidget />
            <ProgressMilestonesWidget />
          </div>
          
          <div className="border border-border bg-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">Badge Collection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
          
          <div className="border border-border bg-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockAchievements.map(ach => (
                <AchievementCard key={ach.id} achievement={ach} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <StreakTracker profile={mockProfile} />
          <LeaderboardPanel users={mockLeaderboard} />
          <XPWidget history={mockXPHistory} />
        </div>
      </div>
    </div>
  );
};
