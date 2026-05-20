import React from "react";
import { Building2, Users, Code, Activity, TrendingUp } from "lucide-react";
import { mockColleges } from "../../../data/mockColleges";

export const CollegeStatsWidget: React.FC = () => {
  const totalColleges = mockColleges.length;
  const totalStudents = mockColleges.reduce((acc, curr) => acc + curr.numStudents, 0);
  const avgActivity = Math.round(mockColleges.reduce((acc, curr) => acc + curr.codingActivityScore, 0) / (totalColleges || 1));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total Colleges</span>
        </div>
        <div className="text-3xl font-black">{totalColleges}</div>
      </div>
      
      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total Students</span>
        </div>
        <div className="text-3xl font-black">{totalStudents.toLocaleString()}</div>
      </div>

      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
            <Code className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Avg Score</span>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-black">{avgActivity}%</div>
          <TrendingUp className="w-4 h-4 text-green-400" />
        </div>
      </div>

      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Platform Health</span>
        </div>
        <div className="text-3xl font-black text-primary">Stable</div>
      </div>
    </div>
  );
};
