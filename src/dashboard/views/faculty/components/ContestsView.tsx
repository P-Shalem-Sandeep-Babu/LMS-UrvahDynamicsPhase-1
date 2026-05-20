import { useState } from "react";
import { Search, Trophy, Code2, PlusCircle, Users, Eye, PlaySquare } from "lucide-react";

const mockContests = [
  { id: "CTC-101", title: "DSA Weekly Challenge #5", type: "Algorithm", status: "active", participants: 142, avgScore: 68, endsIn: "2h 45m" },
  { id: "CTC-102", title: "React Context Mastery", type: "Frontend", status: "scheduled", participants: 0, avgScore: null, endsIn: "Tomorrow" },
  { id: "CTC-100", title: "Array Manipulation Basics", type: "Algorithm", status: "completed", participants: 185, avgScore: 82, endsIn: "Ended" },
];

export const ContestsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredContests = mockContests.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 flex flex-col gap-6 border border-border bg-card p-6 lg:p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Code2 className="w-48 h-48" />
             </div>
             <div className="flex justify-between items-start relative z-10">
                <div>
                   <h2 className="text-2xl font-black italic uppercase tracking-widest text-primary mb-2">Contest Command Center</h2>
                   <p className="text-xs font-mono text-muted-foreground max-w-md">
                      Organize, monitor, and analyze coding challenges across all associated institutions.
                   </p>
                </div>
                <button className="px-6 py-3 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-foreground transition-colors flex items-center gap-2 shadow-[0_0_15px_var(--color-primary)]">
                   <PlusCircle className="w-4 h-4" /> New Contest
                </button>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 relative z-10 border-t border-border pt-6">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active</span>
                   <span className="text-xl font-bold font-mono text-foreground">1</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scheduled</span>
                   <span className="text-xl font-bold font-mono text-foreground">4</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Completed</span>
                   <span className="text-xl font-bold font-mono text-foreground">42</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg Participation</span>
                   <span className="text-xl font-bold font-mono text-foreground">165</span>
                </div>
             </div>
         </div>
         <div className="border border-border bg-card p-6 justify-between flex flex-col relative overflow-hidden">
             <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
                   <Trophy className="w-4 h-4 text-primary" /> Live Leader Tracker
                </h3>
                <div className="space-y-4 relative z-10">
                   {[
                      { name: "Student A", handles: "3 / 3 solved" },
                      { name: "Student B", handles: "2 / 3 solved" },
                      { name: "Student C", handles: "2 / 3 solved" }
                   ].map((usr, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                         <span className="font-bold text-foreground"><span className="text-muted-foreground/60 font-mono mr-2">{i+1}.</span>{usr.name}</span>
                         <span className="font-mono text-[10px] text-muted-foreground">{usr.handles}</span>
                      </div>
                   ))}
                </div>
             </div>
             <button className="w-full mt-6 py-2 border border-border/80 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors">
                View Live Board
             </button>
         </div>
      </div>

      <div className="border border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-white/[0.01]">
             <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Contest Directory</h3>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input type="text" placeholder="Search contests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64 bg-card border border-border text-foreground text-sm font-mono px-10 py-2 focus:outline-none focus:border-primary/50 transition-colors" />
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                   <tr className="border-b border-border bg-white/[0.02]">
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Contest & Info</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Status / Timing</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Participation</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Outcome</th>
                      <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                   </tr>
                </thead>
                <tbody>
                   {filteredContests.map((contest, i) => (
                      <tr key={contest.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                         <td className="p-4">
                            <div className="flex flex-col gap-1">
                               <span className="font-bold text-foreground text-sm">{contest.title}</span>
                               <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono border border-border/80 bg-foreground/5 px-2 py-0.5 text-muted-foreground uppercase">{contest.type}</span>
                                  <span className="text-[10px] font-mono text-muted-foreground/80">{contest.id}</span>
                               </div>
                            </div>
                         </td>
                         <td className="p-4">
                            <div className="flex flex-col gap-1">
                               <span className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 ${
                                  contest.status === 'active' ? 'text-green-500' :
                                  contest.status === 'scheduled' ? 'text-yellow-500' : 'text-muted-foreground/80'
                               }`}>
                                  {contest.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                                  {contest.status}
                               </span>
                               <span className="text-[10px] font-mono text-muted-foreground">{contest.endsIn}</span>
                            </div>
                         </td>
                         <td className="p-4 text-center">
                            <div className="flex flex-col justify-center items-center gap-1">
                               <span className="font-bold font-mono text-sm text-foreground flex items-center gap-1"><Users className="w-3 h-3 text-muted-foreground/80" /> {contest.participants}</span>
                               <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60">Students</span>
                            </div>
                         </td>
                         <td className="p-4 text-center">
                            <div className="flex flex-col justify-center items-center gap-1">
                               <span className="font-bold font-mono text-sm text-foreground">{contest.avgScore !== null ? `${contest.avgScore}%` : '-'}</span>
                               <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60">Avg Score</span>
                            </div>
                         </td>
                         <td className="p-4 text-right">
                            <button className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-2 border border-border">
                               {contest.status === 'completed' ? <><Eye className="w-3 h-3" /> Report</> : <><PlaySquare className="w-3 h-3" /> Manage</>}
                            </button>
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
