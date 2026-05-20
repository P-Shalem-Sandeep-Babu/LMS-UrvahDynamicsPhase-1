import { motion } from "motion/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Activity } from "lucide-react";

const data = [
  { week: "W1", algorithms: 65, webDev: 70, dsa: 60 },
  { week: "W2", algorithms: 68, webDev: 75, dsa: 65 },
  { week: "W3", algorithms: 75, webDev: 80, dsa: 72 },
  { week: "W4", algorithms: 72, webDev: 82, dsa: 70 },
  { week: "W5", algorithms: 80, webDev: 85, dsa: 78 },
  { week: "W6", algorithms: 85, webDev: 88, dsa: 82 },
  { week: "W7", algorithms: 82, webDev: 90, dsa: 85 },
];

export const CoursePerformanceChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden h-[400px] flex flex-col"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Activity className="w-3 h-3" /> Average Score Trends
        </h2>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="week"
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
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{
                stroke: "rgba(255,255,255,0.1)",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
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
            <Line
              type="monotone"
              dataKey="algorithms"
              name="Algorithms"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000", stroke: "var(--color-primary)" }}
            />
            <Line
              type="monotone"
              dataKey="webDev"
              name="Web Development"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000", stroke: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="dsa"
              name="Data Structures"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000", stroke: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
