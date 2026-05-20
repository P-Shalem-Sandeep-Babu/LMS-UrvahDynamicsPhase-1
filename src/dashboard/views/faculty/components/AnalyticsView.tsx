import { useState } from "react";
import { Download, Activity, Code2, Users, FileCheck2, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const codingActivityData = [
  { day: "Mon", submissions: 120, accepted: 85, error: 35 },
  { day: "Tue", submissions: 150, accepted: 90, error: 60 },
  { day: "Wed", submissions: 180, accepted: 140, error: 40 },
  { day: "Thu", submissions: 130, accepted: 110, error: 20 },
  { day: "Fri", submissions: 170, accepted: 150, error: 20 },
  { day: "Sat", submissions: 200, accepted: 160, error: 40 },
  { day: "Sun", submissions: 90, accepted: 80, error: 10 },
];

const mockBatches = [
  { id: "BCH-Alpha", name: "Cohort Alpha", strength: 40, avgAttendance: 92, avgScore: 82, completion: 70 },
  { id: "BCH-Beta", name: "Cohort Beta", strength: 35, avgAttendance: 85, avgScore: 75, completion: 45 },
  { id: "BCH-Gamma", name: "Cohort Gamma", strength: 42, avgAttendance: 90, avgScore: 88, completion: 90 },
];

export const AnalyticsView = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Activity className="w-3 h-3 text-primary" /> Active Cohorts</span>
                <span className="text-3xl font-black font-mono text-foreground">3</span>
                <span className="text-[10px] font-mono text-muted-foreground mt-2">117 total students</span>
            </div>
            <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Code2 className="w-3 h-3 text-blue-500" /> Wkly Submissions</span>
                <span className="text-3xl font-black font-mono text-foreground">1,040</span>
                <span className="text-[10px] font-mono text-green-500 mt-2">+12% vs last week</span>
            </div>
            <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><FileCheck2 className="w-3 h-3 text-purple-500" /> Assignment Comp.</span>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black font-mono text-foreground">84</span>
                   <span className="text-sm font-bold text-muted-foreground mb-1">%</span>
                </div>
                <div className="w-full h-1 bg-foreground/5 mt-3"><div className="h-full bg-purple-500 w-[84%]"></div></div>
            </div>
            <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Users className="w-3 h-3 text-yellow-500" /> Avg Attendance</span>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black font-mono text-foreground">89</span>
                   <span className="text-sm font-bold text-muted-foreground mb-1">%</span>
                </div>
                <div className="w-full h-1 bg-foreground/5 mt-3"><div className="h-full bg-yellow-500 w-[89%]"></div></div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="border border-border bg-card p-6 flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2"><BarChart2 className="w-4 h-4 text-primary" /> Coding Activity (7-Day)</h3>
                 <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Opts</button>
              </div>
              <div className="flex-1 w-full relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={codingActivityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                       <XAxis dataKey="day" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                       <Tooltip
                         contentStyle={{ backgroundColor: "#080808", borderColor: "#ffffff20", borderRadius: "0" }}
                         itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
                         labelStyle={{ fontSize: "12px", color: "#ffffff50", marginBottom: "4px" }}
                         cursor={{ fill: "#ffffff05" }}
                       />
                       <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                       <Bar dataKey="accepted" name="Accepted" stackId="a" fill="var(--color-primary)" />
                       <Bar dataKey="error" name="Errors/Fails" stackId="a" fill="#3f3f46" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="border border-border bg-card flex flex-col overflow-hidden">
               <div className="p-6 border-b border-border bg-white/[0.01]">
                   <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Batch Insights</h3>
                   <p className="text-[10px] font-mono text-muted-foreground mt-1">Comparisons across all assigned batches</p>
               </div>
               <div className="overflow-y-auto flex-1 p-2">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b border-border/50">
                           <th className="px-4 py-3 text-[9px] font-bold font-mono uppercase tracking-widest text-muted-foreground/80">Cohort</th>
                           <th className="px-4 py-3 text-[9px] font-bold font-mono uppercase tracking-widest text-muted-foreground/80 text-center">Volume</th>
                           <th className="px-4 py-3 text-[9px] font-bold font-mono uppercase tracking-widest text-muted-foreground/80 text-center">Att. %</th>
                           <th className="px-4 py-3 text-[9px] font-bold font-mono uppercase tracking-widest text-muted-foreground/80 text-center">Avg. Score</th>
                        </tr>
                     </thead>
                     <tbody>
                        {mockBatches.map((batch, i) => (
                           <tr key={i} className="hover:bg-white/[0.02] transition-colors border-b border-border/50 last:border-0">
                               <td className="px-4 py-4">
                                  <div className="flex flex-col gap-1">
                                     <span className="text-sm font-bold text-foreground">{batch.name}</span>
                                     <div className="w-24 h-1 bg-foreground/10 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${batch.completion}%` }}></div></div>
                                  </div>
                               </td>
                               <td className="px-4 py-4 text-center">
                                  <span className="text-xs font-mono font-bold text-foreground">{batch.strength}</span>
                               </td>
                               <td className="px-4 py-4 text-center">
                                  <span className={`text-xs font-mono font-bold ${batch.avgAttendance < 80 ? 'text-red-500' : 'text-green-500'}`}>{batch.avgAttendance}%</span>
                               </td>
                               <td className="px-4 py-4 text-center">
                                  <span className="text-xs font-mono font-bold text-foreground/80">{batch.avgScore}</span>
                               </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
           </div>
        </div>

        <div className="border border-border bg-card p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
           <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Detailed Reports</h3>
              <p className="text-xs font-mono text-muted-foreground max-w-lg">
                 Need deep-dive data? Generate complete reports for offline analysis or management review.
              </p>
           </div>
           <button className="px-6 py-4 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-foreground transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_var(--color-primary)]">
              <Download className="w-4 h-4" /> Export Analytics Snapshot
           </button>
        </div>
    </div>
  );
};
