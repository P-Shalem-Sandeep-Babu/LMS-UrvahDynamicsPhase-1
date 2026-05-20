import React from "react";
import { Flame, CalendarDays } from "lucide-react";
import { GamificationProfile } from "../../types/gamification";

interface StreakTrackerProps {
  profile: GamificationProfile;
}

export const StreakTracker = ({ profile }: StreakTrackerProps) => {
  return (
    <div className="border border-border bg-card p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Flame className="w-4 h-4 text-green-500" /> Daily Streak
        </h3>
        <span className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest bg-foreground/5 px-2 py-1 rounded">
          Longest: {profile.longestStreak} Days
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-black italic tracking-tighter text-green-500">{profile.currentStreak}</span>
          <span className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">Day Streak</span>
        </div>
        
        <div className="flex gap-2">
          {/* Mock days representing the past week activity */}
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-6 h-6 flex items-center justify-center rounded-sm text-[10px] font-bold ${
                i < 5 ? 'bg-green-500 text-black' : 'bg-foreground/5 text-white/20'
              }`}>
                {i < 5 ? <Flame className="w-3 h-3" /> : '-'}
              </div>
              <span className="text-[8px] font-mono text-muted-foreground/60 uppercase">
                {['M','T','W','T','F','S','S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
