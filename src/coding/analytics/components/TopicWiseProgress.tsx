import React, { useState } from "react";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle,
  Code2, 
  HelpCircle,
  Lightbulb
} from "lucide-react";
import { getTopicProgressData } from "../../../services/codingPlatformService";

export const TopicWiseProgress: React.FC = () => {
  const [topics, setTopics] = useState(() => getTopicProgressData());
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleExpand = (topicName: string) => {
    setExpandedTopic(expandedTopic === topicName ? null : topicName);
  };

  return (
    <div className="border border-border bg-card p-6 rounded-xl flex flex-col gap-5">
      
      {/* Header index */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Topic-Wise Progress Modules
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
            Subject proficiency metrics across data structures and algorithm paradigms.
          </p>
        </div>
        <span className="text-[10px] font-mono text-primary font-black uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
          Syllabus Aligned
        </span>
      </div>

      {/* Grid listing */}
      <div className="flex flex-col gap-3">
        {topics.map((t, idx) => {
          const completionRate = Math.round((t.solved / t.total) * 100);
          const isExpanded = expandedTopic === t.topic;

          // Proficiency index classification
          const isLowAccuracy = t.accuracy < 60;
          const statusText = completionRate >= 75 ? "Highly Proficient" : completionRate >= 50 ? "Sufficient" : "Requires Practice";
          const statusClass = completionRate >= 75 ? "text-primary border-primary/20 bg-primary/5" :
                              completionRate >= 50 ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" :
                              "text-yellow-500 border-yellow-500/20 bg-yellow-500/5";

          return (
            <div 
              key={idx} 
              className={`border border-border/50 rounded-lg bg-background/40 hover:border-white/15 transition-all overflow-hidden`}
            >
              
              {/* Primary Bar Row */}
              <div 
                onClick={() => toggleExpand(t.topic)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none group"
              >
                
                {/* Topic label & aggregate fraction */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase text-foreground group-hover:text-primary transition-colors">{t.topic}</span>
                    <span className={`text-[9px] font-mono border px-2 py-0.5 rounded font-bold uppercase ${statusClass}`}>
                      {statusText}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground/80">
                    Submissions completed: <strong className="text-foreground">{t.solved}</strong> / {t.total} tasks
                  </div>
                </div>

                {/* Progress parameters */}
                <div className="flex items-center gap-6 min-w-[220px]">
                  
                  {/* Completeness percentage and bars */}
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                      <span>Progress Ratio</span>
                      <span className="font-bold text-foreground">{completionRate}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${completionRate >= 75 ? "bg-primary" : completionRate >= 50 ? "bg-cyan-500" : "bg-yellow-500"}`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Accuracy rate display */}
                  <div className="text-center">
                    <span className="text-[8px] uppercase font-mono text-muted-foreground/80 block mb-0.5">Avg Accuracy</span>
                    <strong className={`font-mono font-black text-sm ${isLowAccuracy ? "text-red-400" : "text-foreground"}`}>
                      {t.accuracy}%
                    </strong>
                  </div>

                  {/* Chevron expansion controls */}
                  <div className="text-muted-foreground/80 group-hover:text-foreground transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>

                </div>

              </div>

              {/* Expansion Detail Container */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-border/50 bg-white/[0.005] font-mono text-xs flex flex-col gap-3.5 animate-slide-down">
                  
                  {/* Detailed difficulty counts list */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                    <div className="p-2.5 border border-border/50 bg-background/40 rounded flex items-center justify-between">
                      <span className="text-green-400 uppercase font-black">Easy solved</span>
                      <strong className="text-foreground font-bold">{t.difficultyBreakdown.easy}</strong>
                    </div>
                    <div className="p-2.5 border border-border/50 bg-background/40 rounded flex items-center justify-between">
                      <span className="text-green-500 uppercase font-bold">Medium solved</span>
                      <strong className="text-foreground font-bold">{t.difficultyBreakdown.medium}</strong>
                    </div>
                    <div className="p-2.5 border border-border/50 bg-background/40 rounded flex items-center justify-between">
                      <span className="text-red-500 uppercase font-bold">Hard solved</span>
                      <strong className="text-foreground font-bold">{t.difficultyBreakdown.hard}</strong>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-3 bg-primary/5 border border-primary/10 rounded flex items-start gap-2 text-[10px] leading-relaxed text-white/75">
                    <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-primary uppercase block mb-0.5">Practice recommendation</strong>
                      {isLowAccuracy ? (
                        <span>Your accuracy on DP and recursive paradigms is low due to runtime out of boundary bounds. Click on Practice Workspace to launch active mentors for optimizations.</span>
                      ) : (
                        <span>Great consistency. Completing 5 extra Hard tier matrices on {t.topic} will place you in the Top 5% of class contestants.</span>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
