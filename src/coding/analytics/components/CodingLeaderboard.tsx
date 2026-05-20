import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  Search, 
  ArrowUpDown, 
  Medal, 
  Star, 
  TrendingUp, 
  Activity, 
  User, 
  Award,
  Flame,
  Globe
} from "lucide-react";
import { PlatformLeaderboardEntry } from "../../../types/codingPlatform";
import { getClassLeaderboard } from "../../../services/codingPlatformService";

export const CodingLeaderboard: React.FC = () => {
  const [boardData, setBoardData] = useState(() => getClassLeaderboard());
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sorting triggers
  const [sortBy, setSortBy] = useState<"rank" | "leetcode" | "codeforces" | "hackerrank" | "total" | "streak">("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: "rank" | "leetcode" | "codeforces" | "hackerrank" | "total" | "streak") => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false); // Default to highest/descending for most stats
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Filter matching search criteria
    let result = boardData.filter(student => 
      student.studentName.toLowerCase().includes(lowerQuery)
    );

    // Sort accordingly
    result.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      switch(sortBy) {
        case "rank":
          valA = a.rank;
          valB = b.rank;
          break;
        case "leetcode":
          valA = a.leetcodeSolved;
          valB = b.leetcodeSolved;
          break;
        case "codeforces":
          valA = a.codeforcesRating;
          valB = b.codeforcesRating;
          break;
        case "hackerrank":
          valA = a.hackerrankSolved;
          valB = b.hackerrankSolved;
          break;
        case "total":
          valA = a.totalSolved;
          valB = b.totalSolved;
          break;
        case "streak":
          valA = a.dailyStreak;
          valB = b.dailyStreak;
          break;
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [boardData, searchQuery, sortBy, sortAsc]);

  return (
    <div className="border border-border bg-card p-6 rounded-xl flex flex-col gap-5">
      
      {/* Search and control header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary animate-bounce-slow" /> Comprehensive Competitive Coding Leaderboard
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
            Real-time batch cohort benchmarks aggregated across online sync nodes.
          </p>
        </div>

        {/* Text Filter input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
          <input 
            type="text" 
            placeholder="Search classmate handle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded px-9 py-1.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {/* Leaderboard Grid Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-white/[0.01] text-[10px] uppercase font-mono tracking-widest text-muted-foreground select-none">
              
              <th className="p-3 font-semibold text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("rank")}>
                Rank <ArrowUpDown className="w-3 h-3 inline ml-1 text-muted-foreground/60" />
              </th>
              
              <th className="p-3 font-semibold">Trainee Candidate</th>
              
              <th className="p-3 font-semibold text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("leetcode")}>
                LeetCode Solved <ArrowUpDown className="w-3 h-3 inline ml-1 text-muted-foreground/60" />
              </th>
              
              <th className="p-3 font-semibold text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("codeforces")}>
                Codeforces Rating <ArrowUpDown className="w-3 h-3 inline ml-1 text-muted-foreground/60" />
              </th>
              
              <th className="p-3 font-semibold text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("hackerrank")}>
                HackerRank <ArrowUpDown className="w-3 h-3 inline ml-1 text-muted-foreground/60" />
              </th>
              
              <th className="p-3 font-semibold text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("streak")}>
                Streak <ArrowUpDown className="w-3 h-3 inline ml-1 text-muted-foreground/60" />
              </th>
              
              <th className="p-3 font-semibold text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("total")}>
                Combined Solved <ArrowUpDown className="w-3 h-3 inline ml-1 text-muted-foreground/60" />
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-xs font-mono">
            {filteredAndSortedData.map((cand, index) => {
              const isCurrentUser = cand.isCurrentUser;
              
              // Rank style medals
              const rankIcon = cand.rank === 1 ? <Medal className="w-4.5 h-4.5 text-green-400 inline" /> :
                               cand.rank === 2 ? <Medal className="w-4.5 h-4.5 text-slate-300 inline" /> :
                               cand.rank === 3 ? <Medal className="w-4.5 h-4.5 text-green-700 inline" /> :
                                                 <span className="text-white/45 font-bold font-mono">#{cand.rank}</span>;

              return (
                <tr 
                  key={index} 
                  className={`transition-all ${isCurrentUser ? "bg-primary/5 hover:bg-primary/10 border-l-2 border-primary" : "hover:bg-white/[0.01]"}`}
                >
                  
                  {/* Rank column */}
                  <td className="p-3.5 text-center">{rankIcon}</td>

                  {/* Name column */}
                  <td className="p-3.5 font-bold">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] uppercase border ${
                        isCurrentUser ? "bg-primary text-black border-primary/20 animate-pulse" : "bg-foreground/5 border-border text-muted-foreground"
                      }`}>
                        {cand.studentName.charAt(0)}
                      </div>
                      <span className={isCurrentUser ? "text-primary font-black" : "text-foreground"}>
                        {cand.studentName}
                      </span>
                    </div>
                  </td>

                  {/* LeetCode count column */}
                  <td className="p-3.5 text-center text-foreground/80 font-bold font-mono">
                    {cand.leetcodeSolved} <span className="text-[9px] text-[#444] font-normal">solved</span>
                  </td>

                  {/* Codeforces column */}
                  <td className="p-3.5 text-center font-bold">
                    {cand.codeforcesRating > 0 ? (
                      <span className={
                        cand.codeforcesRating >= 1600 ? "text-red-400 font-black" : 
                        cand.codeforcesRating >= 1400 ? "text-blue-400" : "text-green-400"
                      }>
                        {cand.codeforcesRating}
                      </span>
                    ) : (
                      <span className="text-white/20 font-light italic">not linked</span>
                    )}
                  </td>

                  {/* HackerRank solved count */}
                  <td className="p-3.5 text-center text-foreground/80 font-mono">
                    {cand.hackerrankSolved} <span className="text-[9px] text-[#444]">solved</span>
                  </td>

                  {/* Active Streak */}
                  <td className="p-3.5 text-center font-bold">
                    {cand.dailyStreak > 0 ? (
                      <span className="text-yellow-400 inline-flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {cand.dailyStreak}d
                      </span>
                    ) : (
                      <span className="text-white/20">-</span>
                    )}
                  </td>

                  {/* Aggregate solved count */}
                  <td className="p-3.5 text-center font-mono">
                    <span className={`font-black text-sm ${isCurrentUser ? "text-primary" : "text-slate-200"}`}>
                      {cand.totalSolved}
                    </span>
                    <span className="text-[9px] text-green-400 ml-1.5 font-normal" title="Recent performance improvements">
                      ▲{cand.recentImprovement}
                    </span>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
