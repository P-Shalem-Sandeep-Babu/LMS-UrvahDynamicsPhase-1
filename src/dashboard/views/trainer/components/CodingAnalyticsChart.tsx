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
import { Activity } from "lucide-react";

const data = [
  { name: "Strings", AC: 450, WA: 200, TLE: 50 },
  { name: "Arrays", AC: 520, WA: 300, TLE: 80 },
  { name: "Trees", AC: 200, WA: 400, TLE: 120 },
  { name: "Graphs", AC: 150, WA: 350, TLE: 200 },
  { name: "DP", AC: 90, WA: 500, TLE: 250 },
];

export const CodingAnalyticsChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden h-[350px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
          <Activity className="w-3 h-3" /> Topic Success Rates
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
            <Bar dataKey="AC" stackId="a" fill="#10b981" />
            <Bar dataKey="WA" stackId="a" fill="#ef4444" />
            <Bar
              dataKey="TLE"
              stackId="a"
              fill="#eab308"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
