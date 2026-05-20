import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Calendar, RefreshCw, Info, AppWindow } from "lucide-react";
import { CodingPlatformProfile, PracticeHeatmapCell } from "../../../types/codingPlatform";
import { getPlatformHeatmap } from "../../../services/codingPlatformService";

interface MultiPlatformHeatmapProps {
  profiles: CodingPlatformProfile[];
}

export const MultiPlatformHeatmap: React.FC<MultiPlatformHeatmapProps> = ({ profiles }) => {
  const [hoveredCell, setHoveredCell] = useState<PracticeHeatmapCell | null>(null);
  
  // Re-generate heatmap whenever profiles sync or update
  const cells = useMemo(() => {
    return getPlatformHeatmap(profiles);
  }, [profiles]);

  // Aggregate total submissions in last 6 months
  const totalSubmissions = useMemo(() => {
    return cells.reduce((sum, c) => sum + c.count, 0);
  }, [cells]);

  // Split into columns of 7 to represent weeks (26 columns x 7 days)
  const columns = useMemo(() => {
    const cols: PracticeHeatmapCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      cols.push(cells.slice(i, i + 7));
    }
    return cols;
  }, [cells]);

  // Define month headers based on columns
  const monthHeaders = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const headers: { text: string; index: number }[] = [];
    let lastMonth = -1;

    columns.forEach((col, colIdx) => {
      if (col[0]) {
        const d = new Date(col[0].date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          headers.push({ text: months[m], index: colIdx });
          lastMonth = m;
        }
      }
    });

    // Reduce overlap by dropping some close ones
    return headers.filter((h, idx) => {
      if (idx === 0) return true;
      return h.index - headers[idx - 1].index > 3;
    });
  }, [columns]);

  return (
    <div className="border border-border bg-card p-6 rounded-xl flex flex-col gap-5 overflow-hidden">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-border/50 pb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Multi-Platform Submission Ledger Heatmap
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
            Visualizing dynamic coding consistency over the past 6 months.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[9px] font-mono text-white/45 block uppercase">Combined Activity count</span>
          <strong className="text-base text-primary font-mono font-black">{totalSubmissions} commits</strong>
        </div>
      </div>

      {/* Heatmap Grid canvas */}
      <div className="flex flex-col gap-1 overflow-x-auto pb-4 pt-1 custom-scrollbar min-w-full">
        
        {/* Month labels header */}
        <div className="flex relative h-5 ml-8 text-[9px] font-mono text-muted-foreground/80 select-none">
          {monthHeaders.map((h, idx) => (
            <div 
              key={idx} 
              className="absolute" 
              style={{ left: `${h.index * 1.25}rem` }}
            >
              {h.text}
            </div>
          ))}
        </div>

        {/* Heatmap column builder */}
        <div className="flex gap-1.5 items-start">
          
          {/* Day index sidebar indicator */}
          <div className="flex flex-col gap-1 mr-2 text-[8px] font-mono text-muted-foreground/60 h-[112px] justify-between select-none pr-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid rows */}
          <div className="flex gap-1">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1">
                {col.map((cell, rowIdx) => {
                  const hasActivity = cell.count > 0;
                  
                  // Compute dynamic background styles based on activity volume
                  const bgClass = cell.count === 0 ? "bg-foreground/5" :
                                  cell.count <= 2  ? "bg-primary/30" :
                                  cell.count <= 5  ? "bg-primary/65" :
                                                     "bg-primary";

                  return (
                    <motion.div
                      key={rowIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (colIdx * 0.003) }}
                      className={`w-3.5 h-3.5 rounded-sm ${bgClass} hover:scale-115 hover:ring-1 hover:ring-white transition-all cursor-crosshair`}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{ transformOrigin: "center" }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Hover Status block / Tooltip details */}
      <div className="h-10 flex items-center justify-between text-[11px] font-mono border-t border-border/50 pt-3.5">
        
        {/* Active contextual item */}
        <div className="text-foreground/70">
          {hoveredCell ? (
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="text-foreground font-extrabold">{new Date(hoveredCell.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>&raquo;</span>
              <span className="text-primary font-bold">
                {hoveredCell.count === 0 ? "No Activity" : `${hoveredCell.count} Submissions`}
              </span>
              
              {/* Platform breakdown tags */}
              {hoveredCell.count > 0 && (
                <div className="flex items-center gap-1.5 ml-2">
                  {Object.entries(hoveredCell.platformDeltas).map(([pid, delta]) => {
                    const countDelta = delta as number;
                    if (countDelta === 0) return null;
                    const color = pid === "leetcode" ? "text-green-400" : pid === "codeforces" ? "text-blue-400" : pid === "hackerrank" ? "text-green-400" : "text-red-400";
                    return (
                      <span key={pid} className={`text-[9px] uppercase font-bold ${color}`}>
                        {pid.charAt(0).toUpperCase()}: +{countDelta}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <span className="text-white/45 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-muted-foreground/60" /> Hover over calendar segments to inspect detailed multi-platform activity
            </span>
          )}
        </div>

        {/* Legend levels */}
        <div className="flex items-center gap-1.5 select-none pr-1">
          <span className="text-[9px] text-muted-foreground/80 uppercase">Less</span>
          <div className="w-2.5 h-2.5 bg-foreground/5 rounded-sm" title="0" />
          <div className="w-2.5 h-2.5 bg-primary/30 rounded-sm" title="1-2 solved" />
          <div className="w-2.5 h-2.5 bg-primary/65 rounded-sm" title="3-5 solved" />
          <div className="w-2.5 h-2.5 bg-primary rounded-sm" title="6+ solved" />
          <span className="text-[9px] text-muted-foreground/80 uppercase">More</span>
        </div>

      </div>

    </div>
  );
};
