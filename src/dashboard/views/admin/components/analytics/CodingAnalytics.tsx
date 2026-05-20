import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Code2, Bug, CheckCircle2, Terminal } from "lucide-react";

const chartData = [
  { day: "Mon", submissions: 1200, solved: 800 },
  { day: "Tue", submissions: 1500, solved: 1100 },
  { day: "Wed", submissions: 1800, solved: 1400 },
  { day: "Thu", submissions: 2200, solved: 1800 },
  { day: "Fri", submissions: 1900, solved: 1500 },
  { day: "Sat", submissions: 1100, solved: 900 },
  { day: "Sun", submissions: 1300, solved: 1000 },
];

export const CodingAnalytics = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
            <Terminal className="w-8 h-8 text-primary mb-2" />
            <span className="text-3xl font-bold text-foreground font-mono">11k</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Total Submissions</span>
         </div>
         <div className="border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-3xl font-bold text-green-500 font-mono">8.5k</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Successful Executions</span>
         </div>
         <div className="border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
            <Bug className="w-8 h-8 text-red-500 mb-2" />
            <span className="text-3xl font-bold text-red-500 font-mono">2.5k</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Compilation Errors</span>
         </div>
         <div className="border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
            <Code2 className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-3xl font-bold text-blue-500 font-mono">TypeScript</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Top Language</span>
         </div>
      </div>

      <div className="border border-border bg-card p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" /> Submission Trends (7 Days)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#080808", borderColor: "#ffffff20", borderRadius: "0" }}
                  itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
                  labelStyle={{ fontSize: "12px", color: "#ffffff50", marginBottom: "4px" }}
                />
                <Line type="monotone" dataKey="submissions" name="Total Submissions" stroke="#ffffff30" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="solved" name="Solved/Accepted" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: "var(--color-primary)", strokeWidth: 0, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};
