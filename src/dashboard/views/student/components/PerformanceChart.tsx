import { motion } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Activity } from "lucide-react";

const data = [
  { day: "Mon", score: 65, avg: 50 },
  { day: "Tue", score: 72, avg: 52 },
  { day: "Wed", score: 85, avg: 55 },
  { day: "Thu", score: 81, avg: 60 },
  { day: "Fri", score: 92, avg: 61 },
  { day: "Sat", score: 88, avg: 65 },
  { day: "Sun", score: 96, avg: 66 },
];

export const PerformanceChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden h-[400px] flex flex-col"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
          <Activity className="w-3 h-3" /> Throughput Velocity
        </h2>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary"></div> You
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/20"></div> Cohort Avg
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="day"
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
            <Area
              type="monotone"
              dataKey="avg"
              stroke="rgba(255,255,255,0.2)"
              fillOpacity={0}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="var(--color-primary)"
              fillOpacity={1}
              fill="url(#colorScore)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
