import React from "react";
import { ScheduledChallenge } from "../../../types/coding-automation";
import { ChallengeQueueCard } from "./ChallengeQueueCard";

interface AutomationTimelineProps {
  challenges: ScheduledChallenge[];
}

export const AutomationTimeline = ({ challenges }: AutomationTimelineProps) => {
  // Sort by date ascending to show timeline
  const sorted = [...challenges].sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Queue Timeline (Next 7 Days)</h3>
        <span className="text-[10px] font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded shadow">Max Capacity: 7</span>
      </div>
      
      <div className="relative border-l border-border ml-3 pl-6 space-y-6">
        {sorted.map((challenge, idx) => (
          <div key={challenge.id} className="relative">
            <div className={`absolute -left-[31px] top-4 w-3 h-3 rounded-full border-2 ${challenge.status === 'published' ? 'bg-primary border-black' : 'bg-card border-border'}`} />
            <ChallengeQueueCard challenge={challenge} />
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="text-xs font-mono text-muted-foreground/80 italic p-4">No challenges scheduled in the timeline.</div>
        )}
      </div>
    </div>
  );
};
