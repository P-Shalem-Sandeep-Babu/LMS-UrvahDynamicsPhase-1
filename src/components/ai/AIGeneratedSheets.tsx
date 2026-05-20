import React, { useState } from "react";
import { FileText, Wand2, ArrowRight } from "lucide-react";
import { aiClient } from "../../api/aiClient";

export const AIGeneratedSheets = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const res = await aiClient.generateCodingSheet(topic, difficulty);
    setData(res.data);
    setLoading(false);
  };

  return (
    <div className="border border-border bg-card p-6 relative">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-pink-500" /> AI Practice Sheet Generator
        </h3>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Topic (e.g. Backtracking, Tries)" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 bg-background border border-border text-foreground text-xs font-mono px-3 py-2 outline-none focus:border-pink-500/50 transition-colors"
          />
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-background border border-border text-foreground text-xs font-mono px-3 py-2 outline-none focus:border-pink-500/50 transition-colors uppercase tracking-widest"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="bg-pink-500/10 text-pink-500 border border-pink-500/30 hover:bg-pink-500/20 px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Wand2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />} 
          Generate Curated Sheet
        </button>
      </div>

      {data && (
        <div className="border border-border/50 bg-background p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">{data.title}</h4>
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 border border-border px-2 py-0.5">
              {data.conceptFocus}
            </span>
          </div>
          
          <div className="space-y-2">
            {data.problems.map((prob: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-2 bg-foreground/5 border border-border/50 hover:border-border/80 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground/80 group-hover:text-pink-500 transition-colors" />
                  <span className="text-xs font-mono text-foreground/80 group-hover:text-foreground transition-colors">{prob.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest hidden sm:inline-block">{prob.type}</span>
                  <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-1.5 py-0.5">{prob.expectedTime}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-colors py-2 border border-dashed border-border hover:border-border">
            Export to IDE <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
