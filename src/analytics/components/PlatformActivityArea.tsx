import { motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Server } from "lucide-react";

const data = [
  { time: '00:00', requests: 12000, compute: 8000, bandwidth: 4500 },
  { time: '04:00', requests: 8000, compute: 6000, bandwidth: 3200 },
  { time: '08:00', requests: 45000, compute: 38000, bandwidth: 21000 },
  { time: '12:00', requests: 62000, compute: 55000, bandwidth: 32000 },
  { time: '16:00', requests: 58000, compute: 50000, bandwidth: 28000 },
  { time: '20:00', requests: 42000, compute: 36000, bandwidth: 19000 },
  { time: '24:00', requests: 15000, compute: 12000, bandwidth: 6000 },
];

export const PlatformActivityArea = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-[400px] flex flex-col"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           <Server className="w-3 h-3 text-blue-500" /> Platform Infrastructure Analytics
        </h2>
        <div className="flex items-center gap-4 text-[10px] font-mono">
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500"></div> Output</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-primary"></div> Compute</div>
        </div>
      </div>

      <div className="flex-1 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <defs>
               <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
               </linearGradient>
               <linearGradient id="colorCompute" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                 <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis 
               dataKey="time" 
               axisLine={false}
               tickLine={false}
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
               dy={10}
             />
             <YAxis 
               axisLine={false}
               tickLine={false}
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
             />
             <Tooltip 
               cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}
               contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
             />
             <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRequests)" strokeWidth={2} />
             <Area type="monotone" dataKey="compute" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorCompute)" strokeWidth={2} />
           </AreaChart>
         </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
