import { Trophy, TrendingUp, Users, Target } from "lucide-react";

const mockContests = [
  { id: "C-101", name: "Global Hackathon 2024", participants: 450, completionRate: 72, avgScore: 84 },
  { id: "C-102", name: "Weekly Algorithm Sprint #45", participants: 1200, completionRate: 65, avgScore: 71 },
  { id: "C-103", name: "React System Design Challenge", participants: 320, completionRate: 45, avgScore: 58 },
  { id: "C-104", name: "SQL Mastery Tournament", participants: 850, completionRate: 88, avgScore: 92 },
];

export const ContestAnalytics = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="border border-border bg-card p-6 flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Trophy className="w-3 h-3 text-primary" /> Active Contests</span>
            <span className="text-4xl font-black font-mono text-foreground">4</span>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-green-500 bg-green-500/10 w-fit px-2 py-1">
               <TrendingUp className="w-3 h-3" /> +1 vs Last Week
            </div>
         </div>
         <div className="border border-border bg-card p-6 flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Users className="w-3 h-3 text-primary" /> Total Participants</span>
            <span className="text-4xl font-black font-mono text-foreground">2.8k</span>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-green-500 bg-green-500/10 w-fit px-2 py-1">
               <TrendingUp className="w-3 h-3" /> +15% vs Last Month
            </div>
         </div>
         <div className="border border-border bg-card p-6 flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Target className="w-3 h-3 text-primary" /> Global Completion</span>
            <span className="text-4xl font-black font-mono text-foreground">67.5%</span>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-blue-500 bg-blue-500/10 w-fit px-2 py-1">
               Stable Matrix
            </div>
         </div>
      </div>

      <div className="border border-border bg-card overflow-x-auto hide-scrollbar custom-scrollbar">
        <div className="p-4 border-b border-border">
           <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Recent Contest Metrics</h3>
        </div>
        <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-white/[0.02]">
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Contest Title</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Participants</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Completion Rate</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {mockContests.map(contest => (
              <tr key={contest.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground text-sm">{contest.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/80">{contest.id}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-xs font-mono text-foreground/80">{contest.participants}</span>
                </td>
                <td className="p-4 text-center">
                   <div className="flex items-center justify-center gap-2">
                     <span className={`text-xs font-mono font-bold ${contest.completionRate < 50 ? 'text-red-500' : 'text-green-500'}`}>{contest.completionRate}%</span>
                   </div>
                </td>
                <td className="p-4 text-center">
                   <span className="text-xs font-mono font-bold text-primary">{contest.avgScore} / 100</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
