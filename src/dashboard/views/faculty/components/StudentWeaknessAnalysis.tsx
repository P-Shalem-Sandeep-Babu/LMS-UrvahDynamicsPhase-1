import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const data = [
  { subject: "Big O", A: 120, B: 110, fullMark: 150 },
  { subject: "Recursion", A: 98, B: 130, fullMark: 150 },
  { subject: "DP", A: 65, B: 130, fullMark: 150 },
  { subject: "Graphs", A: 85, B: 100, fullMark: 150 },
  { subject: "Trees", A: 105, B: 90, fullMark: 150 },
  { subject: "Sorting", A: 130, B: 85, fullMark: 150 },
];

export const StudentWeaknessAnalysis = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden flex-1 flex flex-col"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <BrainCircuit className="w-3 h-3" /> AI Insight: Class Weaknesses
        </h2>
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "rgba(255,255,255,0.5)",
                fontSize: 10,
                fontFamily: "monospace",
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 150]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Class Average"
              dataKey="A"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 border-t border-white/10 pt-4 max-w-sm">
        <p className="text-[10px] font-mono text-white/70 leading-relaxed uppercase">
          <span className="font-bold text-primary">Insight:</span> The cohort is
          underperforming in{" "}
          <span className="text-white">Dynamic Programming (DP)</span>.
          Generating recommended follow-up exercises to assign.
        </p>
        <button className="mt-3 px-3 py-1.5 border border-primary/30 text-primary text-[10px] font-bold uppercase hover:bg-primary hover:text-black transition-colors w-full tracking-widest">
          Deploy Targeted Practice
        </button>
      </div>
    </motion.div>
  );
};
