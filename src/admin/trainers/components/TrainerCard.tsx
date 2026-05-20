import React from "react";
import { Link } from "react-router-dom";
import { Building, Users, Activity, Code, Mail } from "lucide-react";
import { Trainer } from "../../../types/trainer";
import { Badge } from "../../../components/ui/badge";

interface TrainerCardProps {
  trainer: Trainer;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <Link to={`/admin/trainers/${trainer.id}`} className="block">
      <div className="border border-border bg-card p-5 hover:bg-white/[0.02] hover:border-border/80 transition-all flex flex-col gap-4 group rounded-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-bold">{trainer.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{trainer.name}</h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">{trainer.email}</p>
            </div>
          </div>
          <Badge className={
            trainer.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
          }>
            {trainer.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest flex items-center gap-1.5"><Building className="w-3 h-3" /> Colleges</span>
            <span className="text-sm font-bold mt-1">{trainer.assignedColleges.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest flex items-center gap-1.5"><Users className="w-3 h-3" /> Batches</span>
            <span className="text-sm font-bold mt-1">{trainer.assignedBatches.length}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4 mt-2">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
             <div className="flex flex-col border-r border-border">
                <span className="text-muted-foreground/80 font-mono text-[9px] uppercase tracking-widest">Students</span>
                <span className="font-bold">{trainer.activeStudents}</span>
             </div>
             <div className="flex flex-col border-r border-border">
                <span className="text-muted-foreground/80 font-mono text-[9px] uppercase tracking-widest">Engagement</span>
                <span className="font-bold text-primary">{trainer.codingEngagement}%</span>
             </div>
             <div className="flex flex-col">
                <span className="text-muted-foreground/80 font-mono text-[9px] uppercase tracking-widest">Completion</span>
                <span className="font-bold text-green-400">{trainer.assignmentCompletion}%</span>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
