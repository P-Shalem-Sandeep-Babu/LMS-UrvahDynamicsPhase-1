import React, { useState, useEffect } from "react";
import { Sparkles, Code, BookOpen } from "lucide-react";
import { aiClient } from "../../api/aiClient";

export const CodingRecommendations = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    aiClient.getCodingRecommendations("stu_123").then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="border border-border bg-card p-6 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> AI Smart Recommendations
        </h3>
      </div>

      {loading ? (
        <div className="flex gap-2">
          <div className="h-20 bg-foreground/5 w-1/2 rounded-none"></div>
          <div className="h-20 bg-foreground/5 w-1/2 rounded-none"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((rec, i) => (
            <div key={i} className="border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-2">
                <Code className="w-3 h-3" /> {rec.topic}
              </h4>
              <p className="text-[10px] font-mono text-muted-foreground mb-3 line-clamp-2 h-8">
                {rec.reason}
              </p>
              <button className="w-full py-1.5 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors">
                <BookOpen className="w-3 h-3" /> {rec.suggestedResource}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
