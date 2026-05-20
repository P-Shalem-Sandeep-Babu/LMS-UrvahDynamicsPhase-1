import React from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Code, Activity, MoreVertical } from "lucide-react";
import { College } from "../../../types/college";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

interface CollegeTableProps {
  colleges: College[];
  onEdit: (college: College) => void;
  onDelete: (college: College) => void;
}

export const CollegeTable: React.FC<CollegeTableProps> = ({ colleges, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto border border-border rounded-xl bg-background/50 backdrop-blur-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-foreground/5 uppercase text-[10px] font-black tracking-widest text-muted-foreground border-b border-border">
          <tr>
            <th className="px-6 py-4">College</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Users</th>
            <th className="px-6 py-4">Batches</th>
            <th className="px-6 py-4">Coding Score</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {colleges.map((college) => (
            <tr key={college.id} className="hover:bg-foreground/5 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <Link to={`/admin/colleges/${college.id}`} className="font-bold hover:text-primary transition-colors">
                    {college.name}
                  </Link>
                  <span className="text-[10px] text-muted-foreground font-mono">{college.code} • {college.emailDomain}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant={college.status === "active" ? "default" : college.status === "onboarding" ? "secondary" : "destructive"} className="uppercase text-[8px] tracking-wider font-mono">
                  {college.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground/80" />
                  <span className="font-mono text-xs">{college.numStudents + college.numTrainers + college.numFaculty}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs">
                {college.numBatches}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  <div className="w-24 bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${college.codingActivityScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono">{college.codingActivityScore}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-foreground/10" />} nativeButton={false}>
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-panel border-border">
                    {/* @ts-ignore */}
                    <DropdownMenuItem asChild>
                       <Link to={`/admin/colleges/${college.id}`} className="text-xs font-mono w-full cursor-pointer">
                         View Analytics
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(college)} className="text-xs font-mono">
                      Edit details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(college)} className="text-xs font-mono text-red-500 hover:text-red-400 hover:bg-red-500/10">
                      Delete college
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
          {colleges.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                No colleges found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
