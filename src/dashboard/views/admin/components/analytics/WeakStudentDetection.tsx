import { useState } from "react";
import { AlertTriangle, TrendingDown, Target, BrainCircuit } from "lucide-react";

const mockWeakStudents = Array.from({ length: 15 }).map((_, i) => ({
  id: `WS-${1000 + i}`,
  name: `Risk Student ${i + 1}`,
  college: `Engineering College ${i % 3 + 1}`,
  riskScore: Math.floor(Math.random() * 40) + 60, // 60 to 100
  recentDrop: Math.floor(Math.random() * 20) + 5,
  coreWeakness: i % 3 === 0 ? "Dynamic Programming" : i % 2 === 0 ? "Graph Theory" : "Systems Design",
  attendance: Math.floor(Math.random() * 50) + 30
}));

export const WeakStudentDetection = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 border border-red-500/10 bg-card p-6 lg:p-10 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="flex items-center gap-3 mb-6">
               <AlertTriangle className="w-8 h-8 text-red-500" />
               <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">At-Risk Detection Engine</h2>
             </div>
             
             <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest max-w-xl mb-8">
               AI-driven analysis of student performance metrics, identifying precipitous drops in score velocity and chronic absenteeism.
             </p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
                <div className="flex flex-col gap-1 border-l-2 border-red-500 pl-4">
                   <span className="text-3xl font-black text-foreground font-mono">142</span>
                   <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-bold">Total Flagged</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-yellow-500 pl-4">
                   <span className="text-3xl font-black text-foreground font-mono">85</span>
                   <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-bold">Needs Review</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-primary pl-4">
                   <span className="text-3xl font-black text-foreground font-mono">34</span>
                   <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-bold">Recovering</span>
                </div>
             </div>
         </div>
         
         <div className="border border-border bg-card p-6 flex flex-col gap-4">
             <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Common Weaknesses</h3>
             
             <div className="space-y-4">
                <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                      <span className="text-red-500">Dynamic Programming</span>
                      <span className="text-muted-foreground">45% of flags</span>
                   </div>
                   <div className="h-1 w-full bg-foreground/5 overflow-hidden"><div className="h-full bg-red-500 w-[45%]"></div></div>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                      <span className="text-green-500">Graph Theory</span>
                      <span className="text-muted-foreground">28% of flags</span>
                   </div>
                   <div className="h-1 w-full bg-foreground/5 overflow-hidden"><div className="h-full bg-green-500 w-[28%]"></div></div>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                      <span className="text-yellow-500">Recursion</span>
                      <span className="text-muted-foreground">15% of flags</span>
                   </div>
                   <div className="h-1 w-full bg-foreground/5 overflow-hidden"><div className="h-full bg-yellow-500 w-[15%]"></div></div>
                </div>
             </div>
             
             <button className="mt-auto w-full border border-border/80 hover:bg-foreground/5 transition-colors py-3 text-[10px] font-bold uppercase tracking-widest text-foreground flex items-center justify-center gap-2">
                <BrainCircuit className="w-3 h-3" /> Generate Remedial Plan
             </button>
         </div>
      </div>

      <div className="border border-border bg-card overflow-x-auto hide-scrollbar custom-scrollbar">
        <div className="p-4 border-b border-border flex justify-between items-center">
           <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Critical Watchlist</h3>
           <span className="text-[9px] font-mono uppercase tracking-widest text-red-500 font-bold bg-red-500/10 px-2 py-1">Top 15 High Risk</span>
        </div>
        <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-white/[0.02]">
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Operative</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Risk Status</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Core Weakness</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {mockWeakStudents.map(student => (
              <tr key={student.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-foreground text-sm">{student.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/80">{student.id} • {student.college}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-mono font-bold text-red-500">{student.riskScore}% Risk</span>
                       <TrendingDown className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest">Dropped {student.recentDrop}% recently</span>
                  </div>
                </td>
                <td className="p-4">
                   <span className="text-xs font-mono text-foreground/70">{student.coreWeakness}</span>
                </td>
                <td className="p-4">
                   <div className="flex items-center gap-2">
                     <span className={`text-xs font-mono font-bold ${student.attendance < 60 ? 'text-red-500' : 'text-yellow-500'}`}>{student.attendance}%</span>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
