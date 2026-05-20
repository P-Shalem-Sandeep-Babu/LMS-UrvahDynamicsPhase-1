import React, { useState, useEffect } from "react";
import { Users, Radar } from "lucide-react";
import { aiClient } from "../../api/aiClient";

export const AttendanceInsights = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    aiClient.getAttendanceInsights("batch_42").then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Radar className="w-4 h-4 text-blue-500" /> AI Attendance Scanner
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-6 border border-border/50 border-dashed">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80">Analyzing patterns...</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 border border-border/50 bg-background p-3 text-center">
              <div className="text-2xl font-black italic tracking-tighter text-foreground">{data.riskCategory}</div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/80">Overall Risk Model</div>
            </div>
            <div className="flex-1 border border-border/50 bg-background p-3 text-center">
              <div className="text-2xl font-black text-red-500">{data.predictedDropouts}</div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/80">Predicted Dropouts</div>
            </div>
          </div>
          
          <div className="bg-blue-500/5 border border-blue-500/20 p-3 mt-2 flex items-start gap-3">
             <Users className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
             <p className="text-[11px] font-mono text-foreground/70 leading-relaxed uppercase tracking-tight">
               {data.insights}
             </p>
          </div>
        </div>
      )}
    </div>
  );
};
