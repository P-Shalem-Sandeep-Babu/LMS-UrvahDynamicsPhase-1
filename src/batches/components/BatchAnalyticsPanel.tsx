import React, { useState } from "react";
import { Code, Code2, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const BatchAnalyticsPanel = () => {
  const [timeframe, setTimeframe] = useState<"1W" | "1M" | "ALL">("1W");

  // Mock analytical data matching timeframe
  const activeTimeline = timeframe === "1W" 
    ? [
        { label: "Mon", commits: 45, solved: 18 },
        { label: "Tue", commits: 72, solved: 31 },
        { label: "Wed", commits: 98, solved: 42 },
        { label: "Thu", commits: 60, solved: 25 },
        { label: "Fri", commits: 110, solved: 55 },
        { label: "Sat", commits: 130, solved: 64 },
        { label: "Sun", commits: 85, solved: 39 },
      ]
    : timeframe === "1M"
    ? [
        { label: "W1", commits: 210, solved: 85 },
        { label: "W2", commits: 340, solved: 150 },
        { label: "W3", commits: 400, solved: 190 },
        { label: "W4", commits: 480, solved: 220 },
      ]
    : [
        { label: "Jan", commits: 1200, solved: 450 },
        { label: "Feb", commits: 1800, solved: 720 },
        { label: "Mar", commits: 2100, solved: 940 },
        { label: "Apr", commits: 2600, solved: 1250 },
      ];

  const maxCommits = Math.max(...activeTimeline.map(t => t.commits), 1);
  const totalCommits = activeTimeline.reduce((sum, t) => sum + t.commits, 0);
  const totalSolved = activeTimeline.reduce((sum, t) => sum + t.solved, 0);

  return (
    <div className="flex flex-col gap-6 font-mono text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-2">
         <div>
           <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-foreground">
             <TrendingUp className="w-4 h-4 text-primary shrink-0" /> Coding Submission Matrix
           </h3>
           <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">Live developer submission logs</p>
         </div>
         <div className="flex gap-1 bg-background/40 border border-border p-0.5">
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={() => setTimeframe("1W")}
             className={`h-7 px-2.5 text-[9px] uppercase tracking-widest rounded-none ${timeframe === "1W" ? "bg-foreground/10 text-foreground font-bold" : "text-muted-foreground/80 hover:text-foreground"}`}
           >
             1W
           </Button>
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={() => setTimeframe("1M")}
             className={`h-7 px-2.5 text-[9px] uppercase tracking-widest rounded-none ${timeframe === "1M" ? "bg-foreground/10 text-foreground font-bold" : "text-muted-foreground/80 hover:text-foreground"}`}
           >
             1M
           </Button>
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={() => setTimeframe("ALL")}
             className={`h-7 px-2.5 text-[9px] uppercase tracking-widest rounded-none ${timeframe === "ALL" ? "bg-foreground/10 text-foreground font-bold" : "text-muted-foreground/80 hover:text-foreground"}`}
           >
             All Time
           </Button>
         </div>
      </div>

      {/* Styled Interactive SVG Bar Chart Workspace */}
      <div className="border border-border/50 rounded-lg p-5 bg-background/30 flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] text-muted-foreground border-b border-border/50 pb-2">
           <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-500" /> Commits: <strong>{totalCommits}</strong></span>
           <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5 text-primary" /> Questions Solved: <strong>{totalSolved}</strong></span>
         </div>

         <div className="h-44 flex items-end justify-between gap-2 pt-4 relative">
            {/* Grid background lines */}
            <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-white w-full h-0"></div>
              <div className="border-b border-white w-full h-0"></div>
              <div className="border-b border-white w-full h-0"></div>
              <div className="border-b border-white/50 w-full h-0"></div>
            </div>

            {activeTimeline.map((item, id) => {
              const commitHeightPct = Math.round((item.commits / maxCommits) * 100);
              const solvedHeightPct = Math.round((item.solved / maxCommits) * 100);

              return (
                <div key={id} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-background border border-border/80 p-2 text-[8px] uppercase leading-relaxed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 whitespace-nowrap text-center shadow-xl">
                    <p className="font-bold text-foreground mb-0.5">{item.label}</p>
                    <p className="text-yellow-400">Commits: {item.commits}</p>
                    <p className="text-primary">Solved: {item.solved}</p>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full h-32 flex items-end justify-center gap-1">
                     {/* Commits Bar */}
                     <div 
                       className="w-2 sm:w-3 bg-yellow-400/20 group-hover:bg-yellow-400/40 border-t-2 border-yellow-400 transition-all duration-500 rounded-t-sm" 
                       style={{ height: `${commitHeightPct}%` }}
                     />
                     {/* Solved Bar */}
                     <div 
                       className="w-2 sm:w-3 bg-primary/20 group-hover:bg-primary/40 border-t-2 border-primary transition-all duration-500 rounded-t-sm" 
                       style={{ height: `${solvedHeightPct}%` }}
                     />
                  </div>

                  <span className="text-[9px] text-muted-foreground/80 text-center font-bold">{item.label}</span>
                </div>
              );
            })}
         </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4">
          <div>
             <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mb-3">Recent Assignments</h4>
             <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-foreground/5 rounded border border-border/50">
                   <span className="text-xs">Array Manipulation 101</span>
                   <Badge className="bg-green-500/20 text-green-400 text-[8px] uppercase rounded-none font-bold">92% Done</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-foreground/5 rounded border border-border/50">
                   <span className="text-xs">React State Basics</span>
                   <Badge className="bg-green-500/20 text-green-400 text-[8px] uppercase rounded-none font-bold">45% Done</Badge>
                </div>
             </div>
          </div>
          <div>
             <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mb-3">Assigned Coding Sheets</h4>
             <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-foreground/5 rounded border border-border/50">
                   <span className="text-xs">Striver SDE Sheet (Part 1)</span>
                   <span className="text-xs font-mono text-primary font-bold">60/180 solved</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-foreground/5 rounded border border-border/50">
                   <span className="text-xs">Neetcode 150</span>
                   <span className="text-xs font-mono text-primary font-bold">22/150 solved</span>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};
