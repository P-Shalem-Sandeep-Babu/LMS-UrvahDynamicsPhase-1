import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { courseProgress } from "../../data/mock";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const CourseProgressChart = () => {
  return (
    <div className="col-span-1 border border-white/10 p-6 relative h-full lg:col-span-2 xl:col-span-2 rounded-none bg-gradient-to-b from-[#080808] to-[#050505]">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-white/50 mb-1">Global Node Data</h2>
          <div className="text-3xl font-black italic tracking-tighter uppercase text-white">Throughput Analytics</div>
        </div>
        <div className="flex gap-2">
           <div className="px-2 py-1 bg-white/5 text-[8px] uppercase tracking-widest text-primary font-bold border border-primary/20">7D</div>
           <div className="px-2 py-1 text-[8px] uppercase tracking-widest text-white/50 hover:text-white cursor-pointer transition-colors">30D</div>
           <div className="px-2 py-1 text-[8px] uppercase tracking-widest text-white/50 hover:text-white cursor-pointer transition-colors">YTD</div>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={courseProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            />
            <Bar dataKey="completed" fill="var(--color-primary)" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

