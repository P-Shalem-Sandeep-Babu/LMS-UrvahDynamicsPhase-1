import React from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Code, Mail, Activity, Trophy, GraduationCap, TrendingUp, User } from "lucide-react";
import { College } from "../../../types/college";
import { Badge } from "../../../components/ui/badge";
import { motion } from "motion/react";

interface CollegeCardProps {
  college: College;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  // Mock analytics data for the hover panel
  const analytics = {
    activeStudents: Math.floor(college.numStudents * 0.85),
    codingCompletion: college.codingActivityScore,
    averageScore: Math.floor(Math.random() * 20 + 75), // 75-95
    activeTrainer: "Dr. Smith",
    placementReadiness: Math.floor(Math.random() * 30 + 60), // 60-90
    contestParticipation: Math.floor(Math.random() * 40 + 40), // 40-80
    weeklyActivity: Math.floor(Math.random() * 50 + 50) // 50-100
  };

  return (
    <Link 
      to={`/admin/colleges/${college.id}`}
      className="glass-panel border-border p-5 rounded-xl hover:bg-foreground/5 transition-all group flex flex-col gap-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors pointer-events-none" />
      
      <div className="flex justify-between items-start z-10 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-foreground/5 rounded-xl border border-border group-hover:border-primary/30 transition-colors">
            <Building2 className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{college.name}</h3>
            <span className="text-xs font-mono text-muted-foreground/80 uppercase tracking-widest">{college.code}</span>
          </div>
        </div>
        <Badge variant={college.status === "active" ? "default" : college.status === "onboarding" ? "secondary" : "destructive"} className="uppercase text-[10px]">
          {college.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2 z-10 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-xs font-mono">{college.numStudents} Students</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="text-xs font-mono truncate">{college.emailDomain}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border mt-auto z-10 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">Coding Activity</span>
          <span className="text-xs font-bold text-primary">{college.codingActivityScore}%</span>
        </div>
        <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-1000" 
            style={{ width: `${college.codingActivityScore}%` }}
          />
        </div>
      </div>

      {/* Hover Analytics Panel */}
      <div className="absolute inset-0 bg-card/95 backdrop-blur-sm p-5 z-20 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
           <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
             <Activity className="w-4 h-4" /> Quick Analytics
           </h4>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest flex items-center gap-1"><Users className="w-3 h-3"/> Active Students</span>
            <span className="text-sm font-bold text-foreground">{analytics.activeStudents}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest flex items-center gap-1"><Code className="w-3 h-3"/> Completion %</span>
            <span className="text-sm font-bold text-blue-400">{analytics.codingCompletion}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest flex items-center gap-1"><Trophy className="w-3 h-3"/> Avg Score</span>
            <span className="text-sm font-bold text-yellow-500">{analytics.averageScore}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest flex items-center gap-1"><User className="w-3 h-3"/> Active Trainer</span>
            <span className="text-sm rounded font-bold text-foreground max-w-[100px] truncate">{analytics.activeTrainer}</span>
          </div>
          <div className="flex flex-col gap-1 col-span-2 mt-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest flex items-center gap-1"><GraduationCap className="w-3 h-3"/> Placement Readiness</span>
              <span className="text-[10px] font-bold text-emerald-500">{analytics.placementReadiness}%</span>
            </div>
            <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${analytics.placementReadiness}%` }} />
            </div>
          </div>
           <div className="flex flex-col gap-1 col-span-2 mt-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Contest Participation</span>
              <span className="text-[10px] font-bold text-purple-500">{analytics.contestParticipation}%</span>
            </div>
            <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${analytics.contestParticipation}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

