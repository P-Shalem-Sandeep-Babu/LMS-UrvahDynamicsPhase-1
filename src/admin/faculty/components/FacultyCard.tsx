import React from "react";
import { Link } from "react-router-dom";
import { Users, Building, GraduationCap, Clock, Award } from "lucide-react";
import { Faculty } from "../../../types/faculty";
import { Badge } from "../../../components/ui/badge";

interface FacultyCardProps {
  faculty: Faculty;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  return (
    <Link to={`/admin/faculty/${faculty.id}`} className="block">
      <div className="border border-border bg-card p-5 hover:bg-white/[0.02] hover:border-border/80 transition-all flex flex-col gap-4 group rounded-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-bold">{faculty.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{faculty.name}</h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">{faculty.department}</p>
            </div>
          </div>
          <Badge className={
            faculty.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
            faculty.status === "on_leave" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
            "bg-red-500/10 text-red-500 border-red-500/20"
          }>
            {faculty.status === "on_leave" ? "On Leave" : faculty.status}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground mb-2 font-mono truncate">{faculty.email}</div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest flex items-center gap-1.5"><Building className="w-3 h-3" /> Colleges</span>
            <span className="text-sm font-bold mt-1">{faculty.assignedColleges.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest flex items-center gap-1.5"><Users className="w-3 h-3" /> Batches</span>
            <span className="text-sm font-bold mt-1">{faculty.assignedBatches.length}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4 mt-auto">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
             <div className="flex flex-col border-r border-border">
                <span className="text-muted-foreground/80 font-mono text-[9px] uppercase tracking-widest"><Clock className="w-3 h-3 inline mr-1" /> Hrs/Wk</span>
                <span className="font-bold">{faculty.workloadHours}</span>
             </div>
             <div className="flex flex-col border-r border-border">
                <span className="text-muted-foreground/80 font-mono text-[9px] uppercase tracking-widest"><GraduationCap className="w-3 h-3 inline mr-1" /> Students</span>
                <span className="font-bold text-primary">{faculty.studentsMonitored}</span>
             </div>
             <div className="flex flex-col">
                <span className="text-muted-foreground/80 font-mono text-[9px] uppercase tracking-widest"><Award className="w-3 h-3 inline mr-1" /> Contests</span>
                <span className="font-bold text-green-400">{faculty.contestsMonitored}</span>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
