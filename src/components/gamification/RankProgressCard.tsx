import React from "react";
import { Shield, Hexagon } from "lucide-react";
import { GamificationProfile } from "../../types/gamification";
import { motion } from "motion/react";

interface RankProgressCardProps {
  profile: GamificationProfile;
}

export const RankProgressCard = ({ profile }: RankProgressCardProps) => {
  const progressPercent = Math.min((profile.xp / profile.xpToNextRank) * 100, 100);

  return (
    <div className="border border-border bg-card p-6 relative overflow-hidden flex flex-col gap-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Shield className="w-3 h-3 text-primary" /> Current Rank
        </h3>
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary px-2 py-1 bg-primary/10 border border-primary/20">
          {profile.rank}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative shrink-0">
          <Hexagon className="w-16 h-16 text-primary/20 fill-primary/10" />
          <div className="absolute inset-0 flex items-center justify-center font-black font-mono text-xl text-primary">
            Lvl
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/70">
            <span>Total XP</span>
            <span className="font-mono">{profile.xp.toLocaleString()} / {profile.xpToNextRank.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full bg-foreground/5 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-primary"
            />
          </div>
          <p className="text-[9px] font-mono text-muted-foreground/80 uppercase text-right">
            {(profile.xpToNextRank - profile.xp).toLocaleString()} XP to Next Rank
          </p>
        </div>
      </div>
    </div>
  );
};
