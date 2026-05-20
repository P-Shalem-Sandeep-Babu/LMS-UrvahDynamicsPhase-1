import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from "recharts";
import { Award, Layers, Target, HelpCircle, Activity } from "lucide-react";
import { CodingPlatformProfile, CodingPlatformId } from "../../../types/codingPlatform";

interface DifficultyAnalyticsProps {
  profiles: CodingPlatformProfile[];
}

export const DifficultyAnalytics: React.FC<DifficultyAnalyticsProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isConnected && p.stats);
  const [selectedId, setSelectedId] = useState<"all" | CodingPlatformId>("all");

  // Calculate stats based on filters
  let easy = 0, medium = 0, hard = 0;
  let tEasy = 0, tMedium = 0, tHard = 0;

  if (selectedId === "all") {
    activeProfiles.forEach(p => {
      if (p.stats) {
        easy += p.stats.difficultyAnalytics.easy;
        medium += p.stats.difficultyAnalytics.medium;
        hard += p.stats.difficultyAnalytics.hard;
        tEasy += p.stats.difficultyAnalytics.totalEasy;
        tMedium += p.stats.difficultyAnalytics.totalMedium;
        tHard += p.stats.difficultyAnalytics.totalHard;
      }
    });
  } else {
    const p = activeProfiles.find(x => x.id === selectedId);
    if (p?.stats) {
      easy = p.stats.difficultyAnalytics.easy;
      medium = p.stats.difficultyAnalytics.medium;
      hard = p.stats.difficultyAnalytics.hard;
      tEasy = p.stats.difficultyAnalytics.totalEasy;
      tMedium = p.stats.difficultyAnalytics.totalMedium;
      tHard = p.stats.difficultyAnalytics.totalHard;
    }
  }

  const total = easy + medium + hard;
  const grandTotal = tEasy + tMedium + tHard;

  const data = [
    { name: "Easy Problems", value: easy, color: "#22c55e", percentage: total > 0 ? Math.round((easy / total) * 100) : 0 },
    { name: "Medium Problems", value: medium, color: "#f59e0b", percentage: total > 0 ? Math.round((medium / total) * 100) : 0 },
    { name: "Hard Problems", value: hard, color: "#ef4444", percentage: total > 0 ? Math.round((hard / total) * 100) : 0 }
  ];

  return (
    <div className="border border-border bg-card p-6 rounded-xl flex flex-col gap-5">
      
      {/* Platform Filter ribbon */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-border/50 pb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" /> Difficulty Metrics Dashboard
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
            Analyzing problem sophistication across online repositories.
          </p>
        </div>

        {/* Filter Selector */}
        <div className="flex bg-background p-1 border border-border rounded-lg gap-1 text-[9px] font-mono select-none">
          <button
            onClick={() => setSelectedId("all")}
            className={`px-2.5 py-1.5 rounded uppercase font-bold transition-all ${selectedId === "all" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}
          >
            All Platforms
          </button>
          {activeProfiles.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`px-2.5 py-1.5 rounded uppercase font-bold transition-all ${selectedId === p.id ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {total === 0 ? (
        <div className="py-14 text-center font-mono text-xs text-muted-foreground/60 flex flex-col items-center gap-2">
          <Target className="w-8 h-8 text-white/15 animate-pulse" />
          No connected profile datasets detected for selected filter. Align handles under "Platform Sync" to visualize.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Recharts Donut Pie representation */}
          <div className="h-[230px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px" }}
                  itemStyle={{ fontFamily: "monospace", fontSize: "11px", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-mono font-black text-foreground">{total}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#777]">Combined Solved</span>
            </div>
          </div>

          {/* Bar metrics breakdown and target parameters */}
          <div className="flex flex-col gap-4">
            
            {data.map((tier, index) => {
              // Custom maximum available benchmarks if details exist
              const available = index === 0 ? tEasy || 650 : index === 1 ? tMedium || 1400 : tHard || 550;
              const ratio = available > 0 ? (tier.value / available) * 100 : 0;

              return (
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                      <span className="font-bold text-foreground uppercase">{tier.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-foreground">{tier.value}</span>
                      <span className="text-muted-foreground/80"> / {available} solved</span>
                      <span className="text-white/45 ml-2">({tier.percentage}%)</span>
                    </div>
                  </div>

                  {/* Progressive Meter bar */}
                  <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ 
                        backgroundColor: tier.color,
                        width: `${Math.min(100, Math.max(2, ratio))}%` 
                      }} 
                    />
                  </div>
                </div>
              );
            })}

            {/* General competency remarks */}
            <div className="mt-4 p-3 bg-white/[0.01] border border-border/50 rounded-lg text-[10px] font-mono text-muted-foreground leading-relaxed">
              <span className="text-foreground font-bold block mb-1">COMPETENCY FEEDBACK</span>
              Expert modules evaluate that your Medium problem submission balance (<strong>{medium} resolved</strong>) indicates healthy placement candidacy, though Hard level challenges (<strong>{hard} resolved</strong>) can be accelerated to target high-tier roles.
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
