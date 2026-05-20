import { motion } from "motion/react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Brain } from "lucide-react";

const skillData = [
  { subject: "Algorithms", A: 85, fullMark: 100 },
  { subject: "Data Structures", A: 90, fullMark: 100 },
  { subject: "System Design", A: 60, fullMark: 100 },
  { subject: "Databases", A: 75, fullMark: 100 },
  { subject: "Web Dev", A: 80, fullMark: 100 },
  { subject: "Machine Learning", A: 40, fullMark: 100 },
];

export const SkillGraph = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card p-6 relative flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" /> Skill Graph
        </h2>
        <span className="text-[10px] font-mono text-muted-foreground">Lvl 42</span>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="60%" data={skillData}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#ffffff80", fontSize: 10, fontFamily: "monospace" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Student"
              dataKey="A"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
