import React, { useState, useEffect } from "react";
import { BrainCircuit, AlertTriangle, TrendingDown } from "lucide-react";
import { aiClient } from "../../api/aiClient";

export const WeakStudentPrediction = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    aiClient.predictWeakStudents().then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-purple-500" /> AI At-Risk Prediction
        </h3>
        <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 border border-purple-500/20">AI Insights Model</span>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-10 bg-foreground/5 w-full"></div>
          <div className="h-10 bg-foreground/5 w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((student, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 border border-border/50 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-foreground uppercase tracking-widest">{student.name}</span>
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 ${
                  student.riskLevel === 'High' ? 'text-red-500 bg-red-500/10 border border-red-500/20' : 'text-green-500 bg-green-500/10 border border-green-500/20'
                }`}>
                  {student.riskLevel} Risk
                </span>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground flex items-start gap-1.5 mt-1">
                <AlertTriangle className="w-3 h-3 text-muted-foreground/60 shrink-0 mt-0.5" />
                {student.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
