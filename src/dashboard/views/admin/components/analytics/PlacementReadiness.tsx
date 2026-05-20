import { Briefcase, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";

export const PlacementReadiness = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="border border-border bg-card p-6 lg:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[300px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <Briefcase className="w-12 h-12 text-primary mb-4 relative z-10" />
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-foreground mb-2 relative z-10">Placement Readiness Matrix</h2>
          <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest max-w-lg mb-8 relative z-10">Overall cohort readiness index based on coding assessments, mock interviews, and project completions.</p>
          
          <div className="flex items-end gap-2 relative z-10">
             <span className="text-6xl md:text-7xl font-black text-foreground leading-none tracking-tighter">78</span>
             <span className="text-xl font-bold text-primary mb-2">%</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-green-500 bg-green-500/10 px-3 py-1 flex items-center gap-2 mt-4 relative z-10">
             <TrendingUp className="w-3 h-3" /> +4.2% Growth M/M
          </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="border border-border bg-card p-6">
             <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6 border-b border-border pb-4">Readiness Breakdown</h3>
             
             <div className="flex flex-col gap-5">
                {[
                  { label: "Data Structures & Algorithms", score: 85 },
                  { label: "System Design", score: 62 },
                  { label: "Frontend/UI Architecture", score: 78 },
                  { label: "Backend API Integration", score: 88 },
                  { label: "Mock Interviews", score: 71 },
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-2">
                     <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                        <span className="text-foreground/70">{item.label}</span>
                        <span className={item.score > 75 ? 'text-green-500' : 'text-yellow-500'}>{item.score}%</span>
                     </div>
                     <div className="h-1 bg-foreground/5 w-full overflow-hidden">
                        <div className={`h-full ${item.score > 75 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${item.score}%` }}></div>
                     </div>
                  </div>
                ))}
             </div>
         </div>
         <div className="border border-border bg-card p-6 flex flex-col gap-4">
             <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-2 border-b border-border pb-4">Intervention Required</h3>
             
             <div className="border border-red-500/20 bg-red-500/5 p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">System Design Weakness</span>
                   <span className="text-[10px] font-mono text-muted-foreground">Cohort 4 shows a 15% drop in system design score. Suggesting immediate remedial batch allocation.</span>
                </div>
             </div>
             
             <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-1">Mock Interview Delays</span>
                   <span className="text-[10px] font-mono text-muted-foreground">250 students are pending their second mock interview round. Trainer scheduling conflict detected.</span>
                </div>
             </div>

             <div className="mt-auto border border-green-500/20 bg-green-500/5 p-4 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Database Queries Resolved</span>
                   <span className="text-[10px] font-mono text-muted-foreground">Previous week's SQL query lag has been improved securely by 40% globally.</span>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};
