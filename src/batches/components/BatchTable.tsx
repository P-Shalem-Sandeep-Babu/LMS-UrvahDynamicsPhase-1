import React from "react";
import { Link } from "react-router-dom";
import { Code, MoreVertical, Building } from "lucide-react";
import { Batch } from "../../types/batch";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

interface BatchTableProps {
  batches: Batch[];
  onEdit: (batch: Batch) => void;
  onDelete: (batch: Batch) => void;
}

export const BatchTable: React.FC<BatchTableProps> = ({ batches, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto border border-border rounded-xl bg-background/50 backdrop-blur-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-foreground/5 uppercase text-[10px] font-black tracking-widest text-muted-foreground border-b border-border">
          <tr>
            <th className="px-6 py-4">Batch</th>
            <th className="px-6 py-4">College</th>
            <th className="px-6 py-4">Assignment</th>
            <th className="px-6 py-4">Students</th>
            <th className="px-6 py-4">Activity</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {batches.map((batch) => (
            <tr key={batch.id} className="hover:bg-foreground/5 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <Link to={`/batches/${batch.id}`} className="font-bold hover:text-primary transition-colors flex items-center gap-2">
                    {batch.name}
                  </Link>
                  <Badge variant={batch.status === "active" ? "default" : batch.status === "upcoming" ? "secondary" : "destructive"} className="uppercase text-[8px] tracking-wider w-fit mt-1">
                    {batch.status}
                  </Badge>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Building className="w-4 h-4 text-muted-foreground/80" />
                  <span className="text-xs font-mono">{batch.collegeName}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-xs font-mono text-foreground/70">
                  {batch.trainerName ? <div>Trainer: {batch.trainerName}</div> : null}
                  {batch.facultyName ? <div className="text-muted-foreground/80">Faculty: {batch.facultyName}</div> : null}
                  {!batch.trainerName && !batch.facultyName && <span className="text-muted-foreground/60">Unassigned</span>}
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs">
                {batch.studentCount}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1 w-32">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-widest text-muted-foreground">Coding</span>
                    <span className="text-[8px] font-mono">{batch.codingActivity}%</span>
                  </div>
                  <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${batch.codingActivity}%` }} />
                  </div>
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
                       <Link to={`/batches/${batch.id}`} className="text-xs font-mono w-full cursor-pointer">
                         View Details
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(batch)} className="text-xs font-mono">
                      Edit batch
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(batch)} className="text-xs font-mono text-red-500 hover:text-red-400 hover:bg-red-500/10">
                      Delete batch
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
          {batches.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                No batches found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
