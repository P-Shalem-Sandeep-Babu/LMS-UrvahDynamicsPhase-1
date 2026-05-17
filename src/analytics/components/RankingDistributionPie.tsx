import { motion } from "motion/react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Award } from "lucide-react";

const data = [
  { name: 'Elite Master', value: 8 },
  { name: 'Diamond', value: 15 },
  { name: 'Platinum', value: 25 },
  { name: 'Gold', value: 30 },
  { name: 'Silver', value: 15 },
  { name: 'Bronze', value: 7 },
];

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#94a3b8', '#a16207'];

export const RankingDistributionPie = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden flex-1 flex flex-col min-h-[300px]"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
           <Award className="w-3 h-3 text-yellow-500" /> Rank Distribution Matrix
        </h2>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
         <ResponsiveContainer width="100%" height="100%">
           <PieChart>
             <Pie
               data={data}
               cx="50%"
               cy="45%"
               innerRadius={60}
               outerRadius={80}
               paddingAngle={2}
               dataKey="value"
               stroke="none"
             >
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
               ))}
             </Pie>
             <Tooltip 
               contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
               itemStyle={{ color: '#fff' }}
             />
             <Legend 
                wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }} 
                iconType="circle"
                iconSize={6}
             />
           </PieChart>
         </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
