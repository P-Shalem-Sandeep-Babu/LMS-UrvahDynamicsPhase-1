import { useState } from "react";
import { Download, Search, TrendingUp, TrendingDown, Star, Trophy, Users, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { week: "W1", avgScore: 65, topScore: 90 },
  { week: "W2", avgScore: 68, topScore: 92 },
  { week: "W3", avgScore: 75, topScore: 95 },
  { week: "W4", avgScore: 72, topScore: 94 },
  { week: "W5", avgScore: 80, topScore: 98 },
  { week: "W6", avgScore: 82, topScore: 100 },
];

const mockStudents = Array.from({ length: 25 }).map((_, i) => ({
  id: `STU-${1000 + i}`,
  name: `Student Name ${i + 1}`,
  batch: i % 2 === 0 ? "Batch Alpha" : "Batch Beta",
  score: Math.floor(Math.random() * 40) + 60,
  trend: Math.random() > 0.5 ? "up" : "down",
  rank: i + 1,
}));

export const PerformanceView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = mockStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 border border-border bg-card p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Cohort Progress</h3>
              <p className="text-[10px] font-mono text-muted-foreground">Average vs Top Score trend over 6 weeks</p>
            </div>
            <button className="px-4 py-2 border border-border/80 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center gap-2">
              <Download className="w-3 h-3" /> Export Data
            </button>
          </div>
          <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                 <XAxis dataKey="week" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip
                   contentStyle={{ backgroundColor: "#080808", borderColor: "#ffffff20", borderRadius: "0" }}
                   itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
                   labelStyle={{ fontSize: "12px", color: "#ffffff50", marginBottom: "4px" }}
                 />
                 <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#ffffff50" strokeWidth={2} dot={false} />
                 <Line type="monotone" dataKey="topScore" name="Top Score" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: "var(--color-primary)", strokeWidth: 0, r: 4 }} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
           {/* Summary Cards */}
           <div className="border border-border bg-card p-6 flex flex-col gap-2 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                 <Trophy className="w-16 h-16" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground relative z-10">Top Performer</span>
              <span className="text-xl font-bold text-foreground relative z-10">{mockStudents[0].name}</span>
              <span className="text-xs font-mono text-primary relative z-10">{mockStudents[0].score} Avg Score</span>
           </div>
           <div className="border border-border bg-card p-6 flex flex-col gap-2 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform text-red-500">
                 <AlertCircle className="w-16 h-16" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground relative z-10">Needs Intervention</span>
              <span className="text-2xl font-black font-mono text-foreground relative z-10">{mockStudents.filter(s => s.score < 70).length}</span>
              <span className="text-xs font-mono text-muted-foreground relative z-10">Students under 70%</span>
           </div>
        </div>
      </div>

      <div className="border border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-white/[0.01]">
             <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Global Leaderboard</h3>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input type="text" placeholder="Search student..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64 bg-card border border-border text-foreground text-sm font-mono px-10 py-2 focus:outline-none focus:border-primary/50 transition-colors" />
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="border-b border-border bg-white/[0.02]">
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center w-20">Rank</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Student</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Batch</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Score</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Trend</th>
                   </tr>
                </thead>
                <tbody>
                   {filteredStudents.map((stu) => (
                      <tr key={stu.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors group">
                         <td className="p-4 text-center">
                            <span className={`text-lg font-black italic ${stu.rank <= 3 ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-muted-foreground'}`}>#{stu.rank}</span>
                         </td>
                         <td className="p-4">
                            <div className="font-bold text-foreground text-sm">{stu.name}</div>
                            <div className="text-[10px] font-mono text-muted-foreground/80">{stu.id}</div>
                         </td>
                         <td className="p-4"><span className="text-xs font-mono text-foreground/70">{stu.batch}</span></td>
                         <td className="p-4 text-center">
                            <span className={`font-bold font-mono text-sm ${stu.score < 70 ? 'text-red-500' : 'text-foreground'}`}>{stu.score}</span>
                         </td>
                         <td className="p-4 text-center">
                            {stu.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500 mx-auto" /> : <TrendingDown className="w-4 h-4 text-red-500 mx-auto" />}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
};
