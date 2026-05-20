import { motion } from "motion/react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { week: 'W1', performance: 45, confidence: 30, completion: 20 },
  { week: 'W2', performance: 52, confidence: 35, completion: 40 },
  { week: 'W3', performance: 65, confidence: 50, completion: 55 },
  { week: 'W4', performance: 68, confidence: 55, completion: 70 },
  { week: 'W5', performance: 75, confidence: 65, completion: 82 },
  { week: 'W6', performance: 85, confidence: 78, completion: 90 },
  { week: 'W7', performance: 92, confidence: 85, completion: 95 },
];

export const StudentProgressLine = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-[350px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           <TrendingUp className="w-3 h-3 text-green-500" /> Learning Progress Trajectory
        </h2>
      </div>

      <div className="flex-1 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis 
               dataKey="week" 
               axisLine={false}
               tickLine={false}
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
               dy={10}
             />
             <YAxis 
               axisLine={false}
               tickLine={false}
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
               domain={[0, 100]}
             />
             <Tooltip 
               cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}
               contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
             />
             <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }} />
             <Line type="monotone" dataKey="performance" name="Avg Performance" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#000', stroke: '#10b981' }} />
             <Line type="monotone" dataKey="confidence" name="Skill Confidence" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#000', stroke: '#3b82f6' }} />
             <Line type="monotone" dataKey="completion" name="Module Completion" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4, fill: '#000', stroke: 'var(--color-primary)' }} />
           </LineChart>
         </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
