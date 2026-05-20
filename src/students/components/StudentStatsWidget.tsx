import React from "react";
import { Users, Code, Trophy, Activity, ShieldCheck, MailWarning, Clock } from "lucide-react";
import { Student } from "../../types/student";

interface StudentStatsWidgetProps {
  students: Student[];
}

export const StudentStatsWidget: React.FC<StudentStatsWidgetProps> = ({ students }) => {
  const totalStudents = students.length;
  const avgCodingScore = students.reduce((acc, s) => acc + s.codingScore, 0) / (totalStudents || 1);
  const activeContesters = students.filter(s => s.contestParticipation > 0).length;
  const avgProgress = students.reduce((acc, s) => acc + s.assignmentProgress, 0) / (totalStudents || 1);
  
  // Calculate invitation metrics
  const acceptedCount = students.filter(s => s.inviteStatus === "accepted").length;
  const pendingCount = students.filter(s => s.inviteStatus === "pending").length;
  const expiredCount = students.filter(s => s.inviteStatus === "expired").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-1">
      <div className="border border-border bg-card p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest font-black leading-none mb-1">Total Operatives</p>
          <p className="text-2xl font-black font-mono text-foreground leading-none">{totalStudents}</p>
          <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/80 font-mono mt-1 w-max">
            <span>Reg. Roster</span>
          </div>
        </div>
      </div>
      
      <div className="border border-border bg-card p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest font-black leading-none mb-1">Core Engagement</p>
          <p className="text-2xl font-black font-mono text-foreground leading-none">{avgProgress.toFixed(0)}%</p>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground/80 font-mono mt-1">
            <span>Avg progress</span>
          </div>
        </div>
      </div>

      <div className="border border-border bg-card p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
          <Code className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest font-black leading-none mb-1">Mean Code Points</p>
          <p className="text-2xl font-black font-mono text-foreground leading-none">{avgCodingScore.toFixed(0)}</p>
          <div className="flex items-center gap-2 text-[9px] bg-foreground/5 px-1 text-muted-foreground/80 font-mono mt-0.5">
            <span>Contests: {activeContesters}</span>
          </div>
        </div>
      </div>

      <div className="border border-border bg-card p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest font-black leading-none mb-1">Access Token Stream</p>
          <p className="text-2xl font-black font-mono text-green-500 leading-none">{pendingCount}</p>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground/80 font-mono mt-1 font-black">
            <span className="text-green-400">OK: {acceptedCount}</span>
            <span className="text-white/20">|</span>
            <span className="text-red-400">EXP: {expiredCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
