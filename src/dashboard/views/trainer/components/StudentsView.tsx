import { useState } from "react";
import { Search, Trophy, AlertTriangle, TrendingUp, TrendingDown, Star, ChevronRight } from "lucide-react";

const mockStudents = Array.from({ length: 20 }).map((_, i) => {
   const isWeak = Math.random() > 0.7;
   return {
      id: `STU-${1000 + i}`,
      name: `Student Name ${i + 1}`,
      batch: i % 2 === 0 ? "FS-Cohort Alpha" : "DS-Cohort Gamma",
      points: Math.floor(Math.random() * 5000) + 1000,
      trend: Math.random() > 0.5 ? "up" : "down",
      status: isWeak ? "needs-attention" : "on-track",
      recentScore: Math.floor(Math.random() * 40) + (isWeak ? 30 : 60)
   };
}).sort((a, b) => b.points - a.points);

export const StudentsView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="border border-border bg-card p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Trophy className="w-64 h-64" />
         </div>
         <div className="flex flex-col gap-2 relative z-10">
            <h2 className="text-2xl font-black italic uppercase tracking-widest text-primary">Global Leaderboard Insight</h2>
            <p className="text-xs font-mono text-muted-foreground max-w-lg">
               Analyze student performance across all your assigned batches. Identify top performers and those at-risk.
            </p>
         </div>
         <div className="flex gap-4 relative z-10">
            <div className="bg-foreground/5 border border-border p-4 flex flex-col items-center justify-center min-w-[120px]">
               <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80 mb-1">Total Monitored</span>
               <span className="text-2xl font-black font-mono text-foreground">127</span>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 p-4 flex flex-col items-center justify-center min-w-[120px]">
               <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 mb-1">Needs Attention</span>
               <span className="text-2xl font-black font-mono text-red-500">{mockStudents.filter(s => s.status === 'needs-attention').length}</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Top 3 Leaders */}
         <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-4 flex items-center gap-2">
               <Star className="w-4 h-4 text-yellow-500" /> Star Performers
            </h3>
            <div className="flex flex-col gap-3">
               {mockStudents.slice(0, 3).map((stu, idx) => (
                  <div key={stu.id} className="relative border border-border bg-card p-4 flex gap-4 overflow-hidden group">
                     {idx === 0 && <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 blur-2xl rounded-full"></div>}
                     <div className={`w-10 h-10 flex items-center justify-center font-black italic text-lg ${
                        idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : 'text-green-600'
                     }`}>
                        #{idx + 1}
                     </div>
                     <div className="flex flex-col relative z-10">
                        <span className="font-bold text-foreground text-sm truncate">{stu.name}</span>
                        <span className="text-[9px] font-mono text-muted-foreground">{stu.batch}</span>
                     </div>
                     <div className="ml-auto flex flex-col items-end justify-center relative z-10">
                        <span className="text-xs font-mono font-bold text-primary">{stu.points}</span>
                        <span className="text-[8px] uppercase tracking-widest text-primary/50">XP</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Full Student List */}
         <div className="lg:col-span-2 border border-border bg-card flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center bg-white/[0.01]">
               <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input type="text" placeholder="Lookup student..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2 focus:outline-none focus:border-primary/50 transition-colors" />
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                     <tr className="border-b border-border bg-white/[0.02]">
                        <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground w-16 text-center">Rank</th>
                        <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Student</th>
                        <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Points</th>
                        <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Trend</th>
                        <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredStudents.map((stu, idx) => (
                        <tr key={stu.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                           <td className="p-4 text-center text-xs font-mono text-muted-foreground/60 group-hover:text-foreground/70">
                              {idx + 1}
                           </td>
                           <td className="p-4">
                              <div className="flex flex-col">
                                 <span className="font-bold text-foreground text-sm">{stu.name}</span>
                                 <span className="text-[10px] font-mono text-muted-foreground/80">{stu.id} • {stu.batch}</span>
                              </div>
                           </td>
                           <td className="p-4"><span className="text-xs font-mono font-bold text-foreground bg-foreground/5 px-2 py-1">{stu.points}</span></td>
                           <td className="p-4 text-center">
                              {stu.trend === 'up' ? (
                                 <TrendingUp className="w-4 h-4 text-green-500 mx-auto" />
                              ) : (
                                 <TrendingDown className="w-4 h-4 text-red-500 mx-auto" />
                              )}
                           </td>
                           <td className="p-4 flex items-center justify-between">
                              {stu.status === 'needs-attention' ? (
                                 <span className="px-2 py-1 text-[9px] uppercase font-bold tracking-widest text-red-500 border border-red-500/20 bg-red-500/10 flex items-center gap-1.5 w-fit">
                                    <AlertTriangle className="w-3 h-3" /> At Risk (Score: {stu.recentScore})
                                 </span>
                              ) : (
                                 <span className="px-2 py-1 text-[9px] uppercase font-bold tracking-widest text-green-500/70 border border-green-500/10 bg-green-500/5 w-fit">
                                    On Track
                                 </span>
                              )}
                              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};
