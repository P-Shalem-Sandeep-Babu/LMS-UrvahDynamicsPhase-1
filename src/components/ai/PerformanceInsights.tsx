import React, { useState, useEffect } from "react";
import { Activity, TrendingUp, Target } from "lucide-react";
import { aiClient } from "../../api/aiClient";

export const PerformanceInsights = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    aiClient.getPerformanceInsights("entity_123", "student").then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" /> AI Performance Analysis
        </h3>
        <span className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Auto-Generated
        </span>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-foreground/5 w-3/4"></div>
          <div className="h-4 bg-foreground/5 w-1/2"></div>
          <div className="h-16 bg-foreground/5 w-full mt-4"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono text-foreground/70 leading-relaxed border-l-2 border-emerald-500 pl-3">
            "{data.summary}"
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2 flex items-center gap-1.5">
                <Target className="w-3 h-3" /> Strengths
              </h4>
              <ul className="flex flex-wrap gap-2">
                {data.keyStrengths.map((str: string, i: number) => (
                  <li key={i} className="text-[10px] font-mono text-muted-foreground bg-foreground/5 border border-border px-2 py-0.5">
                    {str}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-2 flex items-center gap-1.5">
                <Target className="w-3 h-3" /> Focus Areas
              </h4>
              <ul className="flex flex-wrap gap-2">
                {data.areasForImprovement.map((area: string, i: number) => (
                  <li key={i} className="text-[10px] font-mono text-muted-foreground bg-foreground/5 border border-border px-2 py-0.5">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
