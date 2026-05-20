import React from "react";
import { Link } from "react-router-dom";
import { MoreVertical, Mail, Building, Clock, Users } from "lucide-react";
import { Faculty } from "../../../types/faculty";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

interface FacultyTableProps {
  facultyList: Faculty[];
  onEdit: (faculty: Faculty) => void;
  onAssign: (faculty: Faculty) => void;
}

export const FacultyTable: React.FC<FacultyTableProps> = ({ facultyList, onEdit, onAssign }) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="overflow-x-auto custom-scrollbar hide-scrollbar">
        <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-foreground/5">
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Faculty Member</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Department & Contact</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Assignments</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Workload</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Status</th>
              <th className="p-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {facultyList.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <span className="text-primary font-bold text-xs">{faculty.name.charAt(0)}</span>
                    </div>
                    <div>
                      <Link to={`/admin/faculty/${faculty.id}`} className="font-bold text-sm hover:text-primary transition-colors">
                        {faculty.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-foreground/80">{faculty.department}</span>
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1.5 hover:text-foreground cursor-pointer"><Mail className="w-3 h-3" /> {faculty.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs flex items-center gap-1.5 text-muted-foreground"><Building className="w-3 h-3" /> {faculty.assignedColleges.length} Colleges</span>
                    <span className="text-[10px] text-muted-foreground/80 font-mono uppercase tracking-widest">{faculty.assignedBatches.length} Batches</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col border-r border-border pr-4">
                      <span className="text-[10px] text-muted-foreground/80 uppercase font-mono"><Clock className="w-3 h-3 inline mr-1 text-primary" /> Hours/Week</span>
                      <span className="text-xs font-bold text-foreground content-center h-4">{faculty.workloadHours}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/80 uppercase font-mono"><Users className="w-3 h-3 inline mr-1 text-green-400" /> Students</span>
                      <span className="text-xs font-bold text-primary content-center h-4">{faculty.studentsMonitored}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge className={
                    faculty.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                    faculty.status === "on_leave" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                    "bg-red-500/10 text-red-500 border-red-500/20"
                  }>
                    {faculty.status === "on_leave" ? "On Leave" : faculty.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    {/* @ts-ignore */}
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 border-border bg-card">
                      {/* @ts-ignore */}
                    <DropdownMenuItem asChild>
                        <Link to={`/admin/faculty/${faculty.id}`} className="cursor-pointer">View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAssign(faculty)} className="cursor-pointer">Manage Assignments</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(faculty)} className="cursor-pointer">Edit Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {facultyList.length === 0 && (
          <div className="p-8 text-center text-muted-foreground/80 font-mono text-sm">
            No faculty found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
