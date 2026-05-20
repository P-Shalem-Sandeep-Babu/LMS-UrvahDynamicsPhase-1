import React from "react";
import { Achievement } from "../../types/gamification";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { motion } from "motion/react";

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const percent = Math.min((achievement.progress / achievement.maxProgress) * 100, 100);

  return (
    <div className={`p-4 border flex flex-col gap-3 ${
      achievement.isCompleted ? 'border-primary/20 bg-primary/5' : 'border-border bg-card'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-bold text-foreground tracking-tight mb-1">{achievement.title}</h4>
          <p className="text-[10px] font-mono text-muted-foreground">{achievement.description}</p>
        </div>
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 border border-border">
          {achievement.isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-primary" />
          ) : (
            <CircleDashed className="w-4 h-4 text-muted-foreground/60" />
          )}
        </div>
      </div>

      <div className="mt-2 space-y-2">
        <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono">
          <span className={achievement.isCompleted ? 'text-primary font-bold' : 'text-muted-foreground/80'}>
            {achievement.progress} / {achievement.maxProgress}
          </span>
          <span className="text-primary">+{achievement.xpReward} XP</span>
        </div>
        <div className="h-1.5 w-full bg-foreground/5 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1 }}
            className={`h-full ${achievement.isCompleted ? 'bg-primary' : 'bg-foreground/20'}`}
          />
        </div>
      </div>
    </div>
  );
};
