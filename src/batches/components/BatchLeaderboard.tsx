import React, { useState, useEffect } from "react";
import { Trophy, Award, Flame, Brain, Medal, Sparkles } from "lucide-react";
import { getStoredStudents } from "../../utils/batchState";
import { Student } from "../../types/student";

interface BatchLeaderboardProps {
  batchId: string;
}

export const BatchLeaderboard: React.FC<BatchLeaderboardProps> = ({ batchId }) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(getStoredStudents().filter(s => s.batchId === batchId));
    const handleUpdate = () => {
      setStudents(getStoredStudents().filter(s => s.batchId === batchId));
    };
    window.addEventListener("urvah_students_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_students_update", handleUpdate);
    };
  }, [batchId]);

  // Sort by codingScore descending, and then streakScore descending
  const sortedStudents = [...students].sort((a, b) => {
    if (b.codingScore !== a.codingScore) {
      return b.codingScore - a.codingScore;
    }
    return b.streakScore - a.streakScore;
  });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-green-600" />;
      default:
        return <span className="font-mono text-xs text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="flex justify-between items-center bg-[#0d0d0d] p-3 border border-border/50 rounded-lg">
        <div>
          <h4 className="text-xs font-black uppercase text-foreground tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4 text-yellow-400" /> Coding Honor Leaderboard
          </h4>
          <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">Ranked by score and consistency</p>
        </div>
      </div>

      <div className="space-y-2">
        {sortedStudents.map((s, idx) => {
          const rank = idx + 1;
          return (
            <div 
              key={s.id} 
              className={`flex items-center justify-between p-3 border transition-colors ${
                rank === 1
                  ? "bg-yellow-400/5 border-yellow-400/20"
                  : rank === 2
                  ? "bg-gray-300/5 border-gray-300/10"
                  : rank === 3
                  ? "bg-green-600/5 border-green-600/10"
                  : "bg-white/[0.01] border-border/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background/40 border border-border flex items-center justify-center shrink-0">
                  {getRankBadge(rank)}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    {s.name}
                    {rank === 1 && <Sparkles className="w-3 h-3 text-yellow-400" />}
                  </h5>
                  <p className="text-[9px] text-muted-foreground/80 uppercase">Year {s.year} • {s.branch}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[9px] text-green-400 font-bold">
                  <Flame className="w-3 h-3 shrink-0" />
                  <span>{s.streakScore} Streak</span>
                </div>
                
                <div>
                  <div className="text-xs font-bold text-foreground flex items-center gap-1 justify-end">
                    <Brain className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{s.codingScore}</span>
                  </div>
                  <span className="text-[8px] text-muted-foreground/60 uppercase block">Score rating</span>
                </div>
              </div>
            </div>
          );
        })}

        {sortedStudents.length === 0 && (
          <div className="p-8 text-center text-muted-foreground/60 italic text-xs border border-dashed border-border">
            No students registered to drive ranking data.
          </div>
        )}
      </div>
    </div>
  );
};
