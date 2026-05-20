import React from "react";
import { Flag, Lock, Check } from "lucide-react";

export const ProgressMilestonesWidget = () => {
  const milestones = [
    { title: "Complete 10 Problems", xp: 500, status: "completed" },
    { title: "Reach Level 5", xp: 1000, status: "current" },
    { title: "Submit Final Project", xp: 5000, status: "locked" },
    { title: "Help 5 Students", xp: 1000, status: "locked" },
  ];

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Flag className="w-4 h-4 text-primary" /> Journey Milestones
        </h3>
      </div>

      <div className="relative border-l border-border ml-3 space-y-6">
        {milestones.map((milestone, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute -left-[13px] top-1 w-6 h-6 rounded-full border flex items-center justify-center bg-card ${
              milestone.status === "completed" ? "border-primary text-primary" : 
              milestone.status === "current" ? "border-emerald-500 text-emerald-500" : 
              "border-border/80 text-white/20"
            }`}>
              {milestone.status === "completed" && <Check className="w-3 h-3" />}
              {milestone.status === "current" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
              {milestone.status === "locked" && <Lock className="w-3 h-3" />}
            </div>
            
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-tight ${
                milestone.status === "locked" ? "text-muted-foreground/80" : "text-foreground"
              }`}>
                {milestone.title}
              </h4>
              <p className="text-[10px] font-mono text-primary uppercase tracking-widest mt-1">
                Reward: {milestone.xp} XP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
