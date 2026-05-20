import React from "react";
import { Link } from "react-router-dom";
import { MoreVertical, Mail, Building, Users, Activity } from "lucide-react";
import { Trainer } from "../../../types/trainer";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

interface TrainerTableProps {
  trainers: Trainer[];
  onEdit: (trainer: Trainer) => void;
  onDelete: (trainer: Trainer) => void;
  onAssign: (trainer: Trainer) => void;
}

export const TrainerTable: React.FC<TrainerTableProps> = ({ trainers, onEdit, onDelete, onAssign }) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="overflow-x-auto custom-scrollbar hide-scrollbar">
        <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-foreground/5">
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Trainer</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Assignments</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Workload</th>
              <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Status</th>
              <th className="p-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <span className="text-primary font-bold text-xs">{trainer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <Link to={`/admin/trainers/${trainer.id}`} className="font-bold text-sm hover:text-primary transition-colors">
                        {trainer.name}
                      </Link>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {trainer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs flex items-center gap-1.5 text-muted-foreground"><Building className="w-3 h-3" /> {trainer.assignedColleges.length} Colleges</span>
                    <span className="text-[10px] text-muted-foreground/80 font-mono uppercase tracking-widest">{trainer.assignedBatches.length} Batches</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col border-r border-border pr-4">
                      <span className="text-[10px] text-muted-foreground/80 uppercase font-mono">Students</span>
                      <span className="text-xs font-bold text-foreground content-center h-4">{trainer.activeStudents}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/80 uppercase font-mono">Engagement</span>
                      <span className="text-xs font-bold text-primary content-center h-4">{trainer.codingEngagement}%</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge className={
                    trainer.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                  }>
                    {trainer.status}
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
                        <Link to={`/admin/trainers/${trainer.id}`} className="cursor-pointer">View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAssign(trainer)} className="cursor-pointer">Manage Assignments</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(trainer)} className="cursor-pointer">Edit Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(trainer)} className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-500/10">Remove Trainer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trainers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground/80 font-mono text-sm">
            No trainers found.
          </div>
        )}
      </div>
    </div>
  );
};
