import { motion } from "motion/react";
import { Terminal, BrainCircuit, LineChart } from "lucide-react";

export const Showcases = () => {
  return (
    <section id="platform" className="py-24 px-6 md:px-10 bg-[#080808] border-t border-white/5">
      <div className="flex flex-col gap-32">
        {/* Coding Platform Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
             <div className="inline-flex items-center gap-2 p-2 bg-white/5 border border-white/10">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Compiler Module</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">Browser-Native Code Execution</h2>
             <p className="text-white/50 font-mono text-sm leading-relaxed max-w-md">
               Zero-setup environments. Students write, compile, and test code directly in the browser. 
               Automated test suites evaluate submissions against edge cases instantly.
             </p>
             <ul className="space-y-4 border-l border-white/10 pl-4 py-2 mt-4 text-xs font-bold uppercase tracking-widest text-white/80">
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"></div> Python, JS, C++, Java Support</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"></div> Interactive Debugging</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary"></div> Algorithmic Complexity Checking</li>
             </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative border border-white/10 bg-black p-4 lg:-mr-10 h-[400px] flex flex-col"
          >
             <div className="flex gap-2 border-b border-white/10 pb-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
             </div>
             <div className="flex-1 font-mono text-xs text-white/70">
                <span className="text-blue-400">function</span> <span className="text-yellow-200">twoSum</span>(nums: <span className="text-green-300">number</span>[], target: <span className="text-green-300">number</span>): <span className="text-green-300">number</span>[] {'{\n'}
                {'  '}const map = new Map();{'\n'}
                {'  '}for(let i=0; i&lt;nums.length; i++) {'{\n'}
                {'    '}const complement = target - nums[i];{'\n'}
                {'    '}if(map.has(complement)) return [map.get(complement), i];{'\n'}
                {'    '}map.set(nums[i], i);{'\n'}
                {'  }\n'}
                {'  '}return [];{'\n'}
                {'}'}
             </div>
             <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center bg-black/50 p-2">
                <span className="text-[10px] font-mono text-green-400">Tests passing: 15/15</span>
                <div className="px-4 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest">Submit O(N)</div>
             </div>
          </motion.div>
        </div>

        {/* AI Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center flex-col-reverse lg:flex-row">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative border border-primary/20 bg-primary/5 p-6 h-[400px] flex flex-col justify-end lg:-ml-10 order-2 lg:order-1"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px]" />
            <div className="space-y-4 relative z-10 w-full max-w-md ml-auto">
               <div className="bg-white/5 border border-white/10 p-4 w-3/4">
                 <p className="text-xs font-mono text-white/50">Why is my React state not updating synchronously?</p>
               </div>
               <div className="bg-primary/10 border border-primary/20 p-4 border-l-2 border-l-primary ml-auto w-5/6">
                 <p className="text-xs font-mono text-white/80 leading-relaxed">
                   React batches state updates for performance. To access the updated value immediately, use the dependency array in a <span className="text-primary">useEffect</span> hook or a functional state updater.
                 </p>
               </div>
               <div className="bg-white/5 border border-white/10 p-4 w-1/2">
                 <p className="text-[10px] font-mono text-white/30 uppercase">Generating Example Code...</p>
               </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
             <div className="inline-flex items-center gap-2 p-2 bg-white/5 border border-white/10">
                <BrainCircuit className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Neural Network Mentorship</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">Always-On AI Assistance</h2>
             <p className="text-white/50 font-mono text-sm leading-relaxed max-w-md">
               A contextual assistant that reads your code, understands the assignment rubric, and provides Socratic guidance rather than giving answers away.
             </p>
             <button className="px-6 py-3 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                Explore AI Workflows
             </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
