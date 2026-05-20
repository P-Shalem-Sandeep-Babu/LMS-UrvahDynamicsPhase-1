import React from "react";
import { Link } from "react-router-dom";
import { Activity, Code, Mail, Building, Landmark, Trophy, ArrowRight, ShieldCheck, MailWarning, Clock } from "lucide-react";
import { Student } from "../../types/student";
import { Badge } from "../../components/ui/badge";
import { mockColleges } from "../../data/mockColleges";

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const college = mockColleges.find(c => c.id === student.collegeId);

  const getInviteBadge = (status?: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-green-400">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Active
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-green-500">
            <Clock className="w-3.5 h-3.5 text-green-500 animate-spin-slow" /> Queued
          </span>
        );
      case "expired":
        return (
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-red-500">
            <MailWarning className="w-3.5 h-3.5 text-red-500" /> Expired
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400">
            Applied
          </span>
        );
    }
  };

  return (
    <Link to={`/admin/students/${student.id}`} className="block">
      <div className="border border-border bg-card p-5 hover:bg-white/[0.02] hover:border-white/25 transition-all flex flex-col gap-4 group rounded-xl relative h-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary font-mono shrink-0">
              {student.name.charAt(0)}
            </div>
            <div className="truncate max-w-[140px]">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{student.name}</h3>
              <p className="text-[10px] text-muted-foreground/80 font-mono">@{student.userName}</p>
            </div>
          </div>
          {getInviteBadge(student.inviteStatus)}
        </div>

        <div className="flex flex-col gap-2 font-mono text-[10px] text-muted-foreground border-t border-b border-border/50 py-3 my-1">
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            <span className="truncate text-foreground/70">{college?.name || "Unknown College"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            <span className="truncate">{student.branch} • Year {student.year}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Assignment Progress</span>
            <span className="font-bold text-foreground">{student.assignmentProgress}%</span>
          </div>
          <div className="h-1 bg-foreground/5 w-full rounded-full overflow-hidden mt-0.5">
            <div 
              className={`h-full ${
                student.assignmentProgress > 80 ? "bg-green-500" :
                student.assignmentProgress > 50 ? "bg-primary" : "bg-red-500"
              }`}
              style={{ width: `${student.assignmentProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground/80 uppercase font-mono">Score</span>
              <span className="text-xs font-bold text-primary font-mono">{student.codingScore}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground/80 uppercase font-mono">Streak</span>
              <span className="text-xs font-bold text-green-400 font-mono">{student.streakScore} 🔥</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground/80 uppercase font-mono">Att. Rate</span>
              <span className={`text-xs font-bold font-mono ${
                (student.attendanceRate || 100) > 85 ? "text-green-400" : "text-red-400"
              }`}>{student.attendanceRate || 100}%</span>
            </div>
          </div>
          
          <div className="h-6 w-6 rounded-full bg-foreground/5 border border-border flex items-center justify-center text-muted-foreground/80 group-hover:text-primary group-hover:border-primary/30 transition-all">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
