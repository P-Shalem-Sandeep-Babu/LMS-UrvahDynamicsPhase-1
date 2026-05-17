import { motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Activity, Target, Zap, Clock } from "lucide-react";

const trendData = [
  { day: 'Mon', solved: 4 },
  { day: 'Tue', solved: 7 },
  { day: 'Wed', solved: 5 },
  { day: 'Thu', solved: 12 },
  { day: 'Fri', solved: 8 },
  { day: 'Sat', solved: 15 },
  { day: 'Sun', solved: 21 },
];

export const CodingAnalytics = () => {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Combat Analytics
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Performance Metrics & Skill Evaluation
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
           { l: "Total Solved", v: "124", i: Target, c: "text-blue-500", b: "bg-blue-500/10" },
           { l: "Global Rank", v: "Elite II", i: Activity, c: "text-primary", b: "bg-primary/10" },
           { l: "Current Streak", v: "14 Days", i: Zap, c: "text-yellow-500", b: "bg-yellow-500/10" },
           { l: "Avg Output Time", v: "24m", i: Clock, c: "text-green-500", b: "bg-green-500/10" },
        ].map((s, i) => (
           <div key={i} className="p-6 border bg-[#050505] border-white/10 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                 <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{s.l}</div>
                 <div className={`p-2 ${s.b} border border-white/10`}><s.i className={`w-4 h-4 ${s.c}`} /></div>
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-2">{s.v}</div>
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 border border-white/10 bg-[#080808] p-6 h-[400px] flex flex-col">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6 flex items-center gap-2">
               <Activity className="w-3 h-3" /> Execution Velocity (Weekly)
            </h2>
            <div className="flex-1">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} />
                   <Tooltip cursor={{ stroke: 'rgba(255,255,255,0.1)' }} contentStyle={{ borderRadius: '0', backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                   <Area type="monotone" dataKey="solved" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorSolved)" strokeWidth={2} />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
         
         <div className="border border-white/10 bg-[#080808] p-6 flex flex-col">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6 flex items-center gap-2">
               <Target className="w-3 h-3" /> Topic Mastery Matrix
            </h2>
            <div className="flex-1 space-y-6">
               {[
                 { t: "Arrays", p: 85, c: "bg-green-500" },
                 { t: "Dynamic Programming", p: 42, c: "bg-red-500" },
                 { t: "Graphs", p: 68, c: "bg-yellow-500" },
                 { t: "Trees", p: 75, c: "bg-blue-500" },
                 { t: "Math & Greedy", p: 50, c: "bg-orange-500" },
               ].map(s => (
                  <div key={s.t}>
                     <div className="flex justify-between items-end mb-2">
                        <div className="text-xs font-bold uppercase text-white tracking-tight">{s.t}</div>
                        <div className="text-[10px] font-mono text-white/50">{s.p}%</div>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.p}%` }} transition={{ duration: 1 }} className={`h-full ${s.c}`} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
