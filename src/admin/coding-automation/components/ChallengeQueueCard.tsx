import React from "react";
import { ScheduledChallenge } from "../../../types/coding-automation";
import { Code2, Calendar, Clock, CheckCircle2, Clock3 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";

interface ChallengeQueueCardProps {
  challenge: ScheduledChallenge;
}

export const ChallengeQueueCard = ({ challenge }: ChallengeQueueCardProps) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy": return "text-green-500 border-green-500/20";
      case "Medium": return "text-yellow-500 border-yellow-500/20";
      case "Hard": return "text-red-500 border-red-500/20";
      default: return "text-muted-foreground border-border";
    }
  };

  return (
    <div className={`p-4 border bg-card flex flex-col gap-3 transition-colors ${challenge.status === 'published' ? 'border-primary/20 bg-primary/5' : 'border-border hover:border-border/80'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-foreground text-sm tracking-wide">{challenge.title}</h4>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{challenge.topic}</span>
        </div>
        <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-widest ${getDifficultyColor(challenge.difficulty)} bg-transparent`}>
          {challenge.difficulty}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">
          <Calendar className="w-3 h-3" />
          {new Date(challenge.scheduledDate).toLocaleDateString()}
        </div>
        
        {challenge.status === "published" ? (
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" /> Published
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <Clock3 className="w-3 h-3" /> Pending 03:00 AM
          </div>
        )}
      </div>
    </div>
  );
};
