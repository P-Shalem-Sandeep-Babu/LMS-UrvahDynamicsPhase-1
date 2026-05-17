import { motion } from "motion/react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";
import { Target } from "lucide-react";

const data = [
  { subject: 'Speed', a: 120, b: 110, fullMark: 150 },
  { subject: 'Accuracy', a: 98, b: 130, fullMark: 150 },
  { subject: 'Optimization', a: 86, b: 130, fullMark: 150 },
  { subject: 'Complexity', a: 99, b: 100, fullMark: 150 },
  { subject: 'Consistency', a: 85, b: 90, fullMark: 150 },
  { subject: 'Edge Cases', a: 65, b: 85, fullMark: 150 },
];

export const ContestPerformanceRadar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden flex-1 flex flex-col min-h-[300px]"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
           <Target className="w-3 h-3 text-red-500" /> Contest Diagnostics
        </h2>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
         <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9, fontFamily: 'monospace' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Cohort A" dataKey="a" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
              <Radar name="Cohort B" dataKey="b" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              <Legend wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }} />
              <Tooltip
                 contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
            </RadarChart>
         </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
