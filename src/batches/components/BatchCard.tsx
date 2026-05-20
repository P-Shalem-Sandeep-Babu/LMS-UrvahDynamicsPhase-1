import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Code, Activity, Building } from "lucide-react";
import { Batch } from "../../types/batch";
import { Badge } from "../../components/ui/badge";

interface BatchCardProps {
  batch: Batch;
}

export const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  return (
    <Link 
      to={`/batches/${batch.id}`}
      className="glass-panel border-border p-5 rounded-xl hover:bg-foreground/5 transition-all group flex flex-col gap-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors pointer-events-none" />
      
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-foreground/5 rounded-xl border border-border group-hover:border-primary/30 transition-colors">
            <BookOpen className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{batch.name}</h3>
            <span className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest flex items-center gap-1 mt-1">
              <Building className="w-3 h-3" /> {batch.collegeName}
            </span>
          </div>
        </div>
        <Badge variant={batch.status === "active" ? "default" : batch.status === "upcoming" ? "secondary" : "destructive"} className="uppercase text-[10px]">
          {batch.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2 z-10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-xs font-mono">{batch.studentCount} Students</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-mono truncate">{batch.trainerName || batch.facultyName || "No lead"}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border mt-auto z-10 grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] font-mono uppercase text-muted-foreground">Coding Activity</span>
            <span className="text-[10px] font-bold text-primary">{batch.codingActivity}%</span>
          </div>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${batch.codingActivity}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] font-mono uppercase text-muted-foreground">Assignments</span>
            <span className="text-[10px] font-bold text-blue-400">{batch.assignmentProgress}%</span>
          </div>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full transition-all duration-1000" style={{ width: `${batch.assignmentProgress}%` }} />
          </div>
        </div>
      </div>
    </Link>
  );
};
