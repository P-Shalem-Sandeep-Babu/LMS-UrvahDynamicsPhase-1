import React from "react";
import { Users, Building, Activity, ShieldCheck } from "lucide-react";
import { Faculty } from "../../../types/faculty";

interface FacultyStatsWidgetProps {
  facultyList: Faculty[];
}

export const FacultyStatsWidget: React.FC<FacultyStatsWidgetProps> = ({ facultyList }) => {
  const activeCount = facultyList.filter(f => f.status === 'active').length;
  const leaveCount = facultyList.filter(f => f.status === 'on_leave').length;
  const totalStudents = facultyList.reduce((acc, f) => acc + f.studentsMonitored, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><ShieldCheck className="w-16 h-16 text-primary" /></div>
        <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest relative z-10">Total Faculty</span>
        <span className="text-3xl font-black relative z-10">{facultyList.length}</span>
        <div className="flex gap-2 text-xs font-mono relative z-10">
          <span className="text-green-500">{activeCount} Active</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-yellow-500">{leaveCount} On Leave</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><Building className="w-16 h-16 text-primary" /></div>
        <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest relative z-10">Avg Workload</span>
        <span className="text-3xl font-black relative z-10">
          {facultyList.length ? Math.round(facultyList.reduce((acc, f) => acc + f.workloadHours, 0) / facultyList.length) : 0}
          <span className="text-sm text-muted-foreground ml-1">hrs/wk</span>
        </span>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><Users className="w-16 h-16 text-primary" /></div>
        <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest relative z-10">Students Under Mgmt</span>
        <span className="text-3xl font-black text-primary relative z-10">{totalStudents}</span>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><Activity className="w-16 h-16 text-primary" /></div>
        <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest relative z-10">Overall Coverage</span>
        <span className="text-3xl font-black text-green-400 relative z-10">High</span>
        <span className="text-xs text-muted-foreground font-mono relative z-10">Based on batch-faculty ratio</span>
      </div>
    </div>
  );
};
