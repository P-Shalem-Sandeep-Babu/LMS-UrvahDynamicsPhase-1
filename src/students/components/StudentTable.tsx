import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, Mail, Code, Building, RefreshCw, XCircle, Trash2, Edit2, AlertCircle, CalendarClock, Shield } from "lucide-react";
import { Student } from "../../types/student";
import { mockColleges } from "../../data/mockColleges";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onInviteRemind?: (studentId: string) => void;
  onInviteRevoke?: (studentId: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  onEdit, 
  onDelete,
  onInviteRemind,
  onInviteRevoke
}) => {
  const navigate = useNavigate();
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="overflow-x-auto custom-scrollbar hide-scrollbar">
        <table className="w-full text-left border-collapse min-w-max whitespace-nowrap select-none">
          <thead>
            <tr className="border-b border-border bg-foreground/5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              <th className="p-4 font-bold tracking-wider font-medium">Student (Code name)</th>
              <th className="p-4 font-bold tracking-wider font-medium">Contact & Registry</th>
              <th className="p-4 font-bold tracking-wider font-medium">Collegiate Branch</th>
              <th className="p-4 font-bold tracking-wider font-medium">Engagement (Completion)</th>
              <th className="p-4 font-bold tracking-wider font-medium">Invite Token Telemetry</th>
              <th className="p-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => {
              const college = mockColleges.find(c => c.id === student.collegeId);
              
              // Resolve invite status indicators
              const getInviteBadge = (status?: string) => {
                switch (status) {
                  case "accepted":
                    return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-mono text-[9px] uppercase tracking-wider rounded-none">Accepted</Badge>;
                  case "pending":
                    return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-mono text-[9px] uppercase tracking-wider rounded-none">Token Queued</Badge>;
                  case "expired":
                    return <Badge className="bg-red-500/10 text-red-500 border-red-500/20 font-mono text-[9px] uppercase tracking-wider rounded-none">Expired Token</Badge>;
                  default:
                    return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-mono text-[9px] uppercase tracking-wider rounded-none">Applied</Badge>;
                }
              };

              return (
                <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group border-b border-border/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-primary font-black text-xs font-mono">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <Link to={`/admin/students/${student.id}`} className="font-bold text-sm text-foreground hover:text-primary transition-colors block leading-tight">
                          {student.name}
                        </Link>
                        <div className="text-[10px] text-muted-foreground/80 font-mono mt-0.5">@{student.userName} • {student.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col text-xs text-muted-foreground font-mono gap-0.5">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-white/35" /> {student.collegeMail}</div>
                      <div className="text-[10px] text-white/35 flex items-center gap-2">CELL: {student.phone || "None Listed"}</div>
                    </div>
                  </td>
                  <td className="p-4 font-mono">
                    <div className="flex flex-col">
                       <span className="text-xs text-foreground/80">{college?.name || "Unknown Academy"}</span>
                       <span className="text-[10px] text-muted-foreground/80 mt-0.5">{student.branch} • Year {student.year}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col gap-1.5 min-w-[100px]">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-muted-foreground/80">Assignment</span>
                          <span className="text-foreground font-bold">{student.assignmentProgress}%</span>
                        </div>
                        <div className="h-1 bg-foreground/5 w-full rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              student.assignmentProgress > 80 ? "bg-green-500" :
                              student.assignmentProgress > 50 ? "bg-primary" : "bg-red-500"
                            }`}
                            style={{ width: `${student.assignmentProgress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col min-w-[45px]">
                          <span className="text-[9px] text-muted-foreground/80 uppercase font-mono">Code Ref</span>
                          <span className="text-xs font-bold text-primary font-mono">{student.codingScore}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] text-muted-foreground/80 uppercase font-mono">Streak</span>
                          <span className="text-xs font-bold text-green-400 font-mono">{student.streakScore} 🔥</span>
                        </div>
                        <div className="flex flex-col min-w-[55px]">
                          <span className="text-[9px] text-muted-foreground/80 uppercase font-mono">Attendance</span>
                          <span className={`text-xs font-bold font-mono ${
                            (student.attendanceRate || 100) > 85 ? "text-green-400" : "text-red-400"
                          }`}>{student.attendanceRate || 100}%</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getInviteBadge(student.inviteStatus)}
                      
                      {student.inviteStatus === "pending" && (
                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          {onInviteRemind && (
                            <button
                              onClick={() => onInviteRemind(student.id)}
                              title="Remind via Mail"
                              className="p-1 text-green-500 hover:text-foreground border border-green-500/20 hover:bg-green-500/10 font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1"
                            >
                              <RefreshCw className="w-2.5 h-2.5" /> Remind
                            </button>
                          )}
                          {onInviteRevoke && (
                            <button
                              onClick={() => onInviteRevoke(student.id)}
                              title="Revoke and Invalidate"
                              className="p-1 text-red-500 hover:text-foreground border border-red-500/20 hover:bg-red-500/10 font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1"
                            >
                              <XCircle className="w-2.5 h-2.5" /> Invalidate
                            </button>
                          )}
                        </div>
                      )}
                      
                      {student.inviteStatus === "expired" && onInviteRemind && (
                        <button
                          onClick={() => onInviteRemind(student.id)}
                          className="p-1 text-green-400 hover:text-foreground border border-green-500/20 hover:bg-green-500/10 font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
                        >
                          <RefreshCw className="w-2.5 h-2.5 animate-spin-slow" /> Re-Invite
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-8 h-8 opacity-40 hover:opacity-100 hover:bg-foreground/5 transition-all rounded-sm inline-flex items-center justify-center border-0 p-0 text-foreground select-none cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] border-white/15 bg-card text-foreground">
                        <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}`)} className="focus:bg-foreground/5 cursor-pointer flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-primary" /> View dossier file
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(student)} className="focus:bg-foreground/5 cursor-pointer flex items-center gap-2">
                          <Edit2 className="w-3.5 h-3.5 text-blue-400" /> Edit profile details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(student)} className="text-red-500 focus:text-foreground focus:bg-red-600/20 cursor-pointer flex items-center gap-2">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" /> Purge from datastore
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="p-12 text-center text-muted-foreground/80 font-mono text-xs uppercase tracking-widest flex flex-col items-center gap-2">
            <AlertCircle className="w-8 h-8 opacity-40" />
            No records match the requested parameters.
          </div>
        )}
      </div>
    </div>
  );
};
