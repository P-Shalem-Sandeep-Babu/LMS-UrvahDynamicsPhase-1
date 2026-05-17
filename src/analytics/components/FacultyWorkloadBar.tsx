import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Users } from "lucide-react";

const data = [
  { name: 'Dr. Chen', classes: 12, grading: 45, mentoring: 20 },
  { name: 'Prof. Smith', classes: 8, grading: 30, mentoring: 15 },
  { name: 'T. Robbins', classes: 15, grading: 60, mentoring: 35 },
  { name: 'E. Wong', classes: 10, grading: 40, mentoring: 25 },
];

export const FacultyWorkloadBar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden h-[300px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
           <Users className="w-3 h-3 text-purple-500" /> Faculty Workload Distribution
        </h2>
      </div>

      <div className="flex-1 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis 
               dataKey="name" 
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
               cursor={{ fill: 'rgba(255,255,255,0.05)' }}
               contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
             />
             <Legend wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }} />
             <Bar dataKey="classes" name="Classes (hrs)" stackId="a" fill="#a855f7" />
             <Bar dataKey="grading" name="Grading (hrs)" stackId="a" fill="#3b82f6" />
             <Bar dataKey="mentoring" name="Mentoring (hrs)" stackId="a" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
           </BarChart>
         </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
