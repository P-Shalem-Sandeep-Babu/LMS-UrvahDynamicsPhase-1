import React from "react";
import { BookOpen, CheckCircle, Code2, Hourglass, Landmark, Milestone, Sparkles } from "lucide-react";

interface BatchProgressTrackingProps {
  batchName: string;
  activityPercentage: number;
}

export const BatchProgressTracking: React.FC<BatchProgressTrackingProps> = ({ batchName, activityPercentage }) => {
  // Mock syllabus modules
  const modules = [
    { name: "Variables & Logic Operators", total: 10, solved: 10, status: "completed" },
    { name: "Arrays & Cyclic Sorting", total: 24, solved: 22, status: "completed" },
    { name: "Recursion & Backtracking", total: 15, solved: 11, status: "active" },
    { name: "Trees & Binary Search Trees", total: 20, solved: 8, status: "active" },
    { name: "Graphs & Disjoint Sets", total: 18, solved: 2, status: "upcoming" },
    { name: "Dynamic Programming Basics", total: 25, solved: 0, status: "upcoming" },
  ];

  const totalQuestions = modules.reduce((sum, m) => sum + m.total, 0);
  const solvedQuestions = modules.reduce((sum, m) => sum + m.solved, 0);
  const overallSolveRate = Math.round((solvedQuestions / totalQuestions) * 100);

  return (
    <div className="space-y-6 font-mono">
      {/* Visual Progress Banner */}
      <div className="bg-white/[0.01] border border-border/50 p-4 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Milestone className="w-24 h-24 text-primary" />
        </div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1">
              <Code2 className="w-4 h-4 text-primary shrink-0" /> Coding Progress Matrix
            </h4>
            <p className="text-[10px] text-muted-foreground/80 uppercase mt-0.5">Calculated syllabus completeness logs</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-primary">{overallSolveRate}%</span>
            <span className="text-[8px] text-muted-foreground/60 uppercase block">Solved Ratio</span>
          </div>
        </div>

        <div className="w-full bg-foreground/5 h-2 rounded-none overflow-hidden mb-2">
          <div className="bg-primary h-full transition-all duration-500" style={{ width: `${overallSolveRate}%` }} />
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground/80">
          <span>{solvedQuestions} challenges solved</span>
          <span>{totalQuestions} total syllabus target</span>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">Module-wise Breakdown</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod, idx) => {
            const pct = Math.round((mod.solved / mod.total) * 100);
            return (
              <div 
                key={idx} 
                className={`p-3 border flex flex-col justify-between ${
                  mod.status === "completed"
                    ? "bg-green-500/[0.01] border-green-500/10"
                    : mod.status === "active"
                    ? "bg-primary/[0.01] border-primary/20"
                    : "bg-white/[0.005] border-border/50 opacity-50"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[11px] font-bold text-foreground line-clamp-1">{mod.name}</span>
                    <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 whitespace-nowrap ${
                      mod.status === "completed"
                        ? "bg-green-500/10 text-green-400"
                        : mod.status === "active"
                        ? "bg-primary/10 text-primary"
                        : "bg-foreground/5 text-muted-foreground/80"
                    }`}>
                      {mod.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>Progress: {pct}%</span>
                    <span>{mod.solved}/{mod.total} solved</span>
                  </div>
                </div>
                
                <div className="w-full bg-foreground/5 h-1.5 mt-1 overflow-hidden">
                  <div 
                    className={`h-full ${mod.status === "completed" ? "bg-green-400" : "bg-primary"}`} 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
