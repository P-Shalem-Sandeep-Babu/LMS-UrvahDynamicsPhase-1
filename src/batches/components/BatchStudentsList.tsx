import React, { useState, useEffect } from "react";
import { Users, Search, Plus, Trash2, UserPlus, GraduationCap, Trophy, Hash } from "lucide-react";
import { getStoredStudents, saveStoredStudents } from "../../utils/batchState";
import { Student } from "../../types/student";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

interface BatchStudentsListProps {
  batchId: string;
}

export const BatchStudentsList: React.FC<BatchStudentsListProps> = ({ batchId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedUnassignedId, setSelectedUnassignedId] = useState("");

  useEffect(() => {
    setStudents(getStoredStudents());
    const handleUpdate = () => {
      setStudents(getStoredStudents());
    };
    window.addEventListener("urvah_students_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_students_update", handleUpdate);
    };
  }, []);

  // Students belonging to this batch
  const batchStudents = students.filter(s => s.batchId === batchId);

  // Users belonging to other batches or no batch (to assign to this batch)
  const availableStudents = students.filter(s => s.batchId !== batchId);

  const handleAssignStudent = () => {
    if (!selectedUnassignedId) return;
    const updated = students.map(s => {
      if (s.id === selectedUnassignedId) {
        return { ...s, batchId }; // assign to this batch
      }
      return s;
    });
    setStudents(updated);
    saveStoredStudents(updated);
    setSelectedUnassignedId("");
    setIsAssigning(false);
  };

  const handleRemoveStudent = (studentId: string) => {
    if (confirm("Are you sure you want to remove this student from this batch?")) {
      const updated = students.map(s => {
        if (s.id === studentId) {
          return { ...s, batchId: "" }; // unassign
        }
        return s;
      });
      setStudents(updated);
      saveStoredStudents(updated);
    }
  };

  const filteredStudents = batchStudents.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    s.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#0d0d0d] p-3 border border-border/50 rounded-lg">
        <div>
          <h4 className="text-xs font-mono font-black uppercase text-foreground tracking-widest flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" /> Active Roll Call ({batchStudents.length})
          </h4>
          <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-mono mt-0.5">Students registered in cohort</p>
        </div>
        <button
          onClick={() => setIsAssigning(!isAssigning)}
          className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 text-[10px] font-mono uppercase tracking-widest font-black transition-all flex items-center gap-1"
        >
          <UserPlus className="w-3.5 h-3.5" /> Assign Student
        </button>
      </div>

      {isAssigning && (
        <div className="p-4 bg-white/[0.03] border border-border rounded-lg space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Select Student to Assign</div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedUnassignedId}
              onChange={(e) => setSelectedUnassignedId(e.target.value)}
              className="flex-1 bg-muted border border-border text-foreground rounded-none h-10 px-3 font-mono text-xs focus-visible:outline-none focus:border-primary/50"
            >
              <option value="">-- Choose student from directory --</option>
              {availableStudents.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo}) - Current Batch: {s.batchId || "None"}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button 
                onClick={handleAssignStudent}
                disabled={!selectedUnassignedId}
                className="bg-primary text-black font-mono text-[10px] uppercase font-black tracking-widest rounded-none h-10 px-4 whitespace-nowrap"
              >
                Confirm Link
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsAssigning(false)}
                className="font-mono text-[10px] uppercase tracking-widest rounded-none"
              >
                Cancel
              </Button>
            </div>
          </div>
          {availableStudents.length === 0 && (
            <p className="text-[10px] font-mono text-muted-foreground/60 italic">No available unassigned students found in database registry.</p>
          )}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
        <Input
          type="text"
          placeholder="Filter students by name, roll, branch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-foreground/5 border-border/50 rounded-none font-mono text-xs text-foreground"
        />
      </div>

      <div className="border border-border/50 rounded-lg overflow-hidden bg-background/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="border-b border-border/50 bg-foreground/5 text-[9px] uppercase tracking-wider text-muted-foreground">
                <th className="p-3">Ident No / Name</th>
                <th className="p-3">Branch Details</th>
                <th className="p-3">Coding Rating</th>
                <th className="p-3">Progress</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-foreground/80">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-foreground text-xs">{s.name}</div>
                    <div className="text-[9px] text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                      <Hash className="w-3 h-3 text-primary" /> {s.rollNo}
                    </div>
                  </td>
                  <td className="p-3 border-r border-border/50">
                    <div className="text-[11px] font-medium text-foreground/70">{s.branch}</div>
                    <div className="text-[9px] text-muted-foreground/80 uppercase">Year {s.year}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 font-bold text-yellow-500">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{s.codingScore}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="w-24">
                      <div className="flex justify-between items-center text-[9px] mb-1">
                        <span className="text-muted-foreground/80">HW progress</span>
                        <span className="text-foreground/80 font-bold">{s.assignmentProgress}%</span>
                      </div>
                      <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${s.assignmentProgress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleRemoveStudent(s.id)}
                      className="p-1.5 text-muted-foreground/60 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all rounded"
                      title="Remove from batch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground/60 italic text-[11px]">
                    No students currently mapped to this batch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
