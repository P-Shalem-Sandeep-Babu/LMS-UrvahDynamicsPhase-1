import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: 'Jan', rate: 65 },
  { name: 'Feb', rate: 72 },
  { name: 'Mar', rate: 78 },
  { name: 'Apr', rate: 85 },
  { name: 'May', rate: 92 },
  { name: 'Jun', rate: 98 },
];

export const Stats = () => {
  return (
    <section id="stats" className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-white mb-6">Global Scale <br/><span className="text-primary text-5xl md:text-7xl">Metrics</span></h2>
          <p className="text-white/50 font-mono text-sm leading-relaxed mb-12 max-w-md">
            Our infrastructure powers continuous learning across 12 timezones, maintaining 99.99% uptime while serving millions of automated evaluations daily.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="border-l border-white/20 pl-4 py-2">
              <div className="text-4xl font-mono font-bold text-white mb-1">10M+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Lines of code graded</div>
            </div>
            <div className="border-l border-white/20 pl-4 py-2">
              <div className="text-4xl font-mono font-bold text-white mb-1">94%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Cohort Completion Target</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border border-white/10 bg-[#080808] p-8 relative"
        >
           <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Engagement Trajectory</span>
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           </div>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  />
                  <Bar dataKey="rate" fill="var(--color-primary)" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
