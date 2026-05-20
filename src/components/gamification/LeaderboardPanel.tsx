import React from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { LeaderboardUser } from "../../types/gamification";

interface LeaderboardPanelProps {
  users: LeaderboardUser[];
}

export const LeaderboardPanel = ({ users }: LeaderboardPanelProps) => {
  return (
    <div className="border border-border bg-card p-6">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" /> Top Coders (Cohort)
        </h3>
      </div>
      
      <div className="space-y-3">
        {users.map((user, index) => (
          <div key={user.id} className={`flex items-center gap-4 p-3 border transition-colors ${
            user.name.includes("You") ? 'border-primary/30 bg-primary/10' : 'border-border/50 bg-white/[0.02] hover:bg-white/[0.04]'
          }`}>
            <div className="w-6 font-mono text-sm font-bold text-muted-foreground/80 text-center shrink-0">
              {index + 1}
            </div>
            
            <div className="shrink-0">
              {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
              {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
              {index === 2 && <Award className="w-5 h-5 text-green-700" />}
              {index > 2 && <div className="w-5 h-5 rounded-full bg-foreground/10" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-bold truncate ${user.name.includes("You") ? 'text-primary' : 'text-foreground'}`}>
                {user.name}
              </h4>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80">
                {user.rank}
              </span>
            </div>

            <div className="text-right">
              <div className="text-sm font-black italic">{user.xp.toLocaleString()}</div>
              <span className="text-[9px] uppercase tracking-widest text-primary font-mono">XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
