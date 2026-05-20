import { motion } from "motion/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { LayoutGrid } from "lucide-react";

const data = [
  { name: "CS101", previous: 78, current: 85 },
  { name: "Algorithms", previous: 62, current: 68 },
  { name: "Web Dev", previous: 88, current: 92 },
  { name: "Data Sci", previous: 71, current: 75 },
];

export const CohortComparison = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-[300px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <LayoutGrid className="w-3 h-3" /> Cohort Performance Delta
        </h2>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
                fontFamily: "monospace",
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                borderRadius: "0px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "10px",
                textTransform: "uppercase",
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.5)",
              }}
            />
            <Bar
              dataKey="previous"
              fill="rgba(255,255,255,0.2)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="current"
              fill="var(--color-primary)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
