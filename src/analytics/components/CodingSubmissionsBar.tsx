import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Terminal } from "lucide-react";

const data = [
  { language: 'Python', count: 42500 },
  { language: 'JavaScript', count: 38200 },
  { language: 'TypeScript', count: 25400 },
  { language: 'C++', count: 18900 },
  { language: 'Java', count: 15300 },
  { language: 'Go', count: 8500 },
  { language: 'Rust', count: 4200 },
];

export const CodingSubmissionsBar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-[300px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           <Terminal className="w-3 h-3 text-green-500" /> Run Operations by Language
        </h2>
      </div>

      <div className="flex-1 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis 
               type="number"
               axisLine={false}
               tickLine={false}
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
             />
             <YAxis 
               dataKey="language"
               type="category"
               axisLine={false}
               tickLine={false}
               width={80}
               tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'monospace' }}
             />
             <Tooltip 
               cursor={{ fill: 'rgba(255,255,255,0.05)' }}
               contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
             />
             <Bar dataKey="count" name="Submissions" fill="#10b981" radius={[0, 2, 2, 0]} barSize={12} />
           </BarChart>
         </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
