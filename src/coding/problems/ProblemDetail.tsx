import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Terminal, Filter, Code2, Users, FileCode } from "lucide-react";

export const ProblemDetail = () => {
  const problems = [
    { title: "Two Sum", difficulty: "Easy", acceptance: "52.4%", tags: ["Array", "Hash Table"] },
    { title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: "33.2%", tags: ["String", "DP"] },
    { title: "Reverse Subarray to Maximize Value", difficulty: "Hard", acceptance: "18.5%", tags: ["Array", "Math", "Greedy"] },
    { title: "Merge K Sorted Lists", difficulty: "Hard", acceptance: "51.2%", tags: ["Linked List", "Heap", "Divide and Conquer"] },
    { title: "Valid Parentheses", difficulty: "Easy", acceptance: "40.2%", tags: ["String", "Stack"] },
    { title: "LRU Cache", difficulty: "Medium", acceptance: "42.8%", tags: ["Design", "Hash Table", "Doubly-Linked List"] },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Algorithm Vault
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Problem Archive & Training Grounds
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 border border-white/20 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter By Tags
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="border border-white/10 bg-[#080808]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/[0.02]">
                  <th className="py-4 px-6 font-medium">Status / Title</th>
                  <th className="py-4 px-6 font-medium">Acceptance</th>
                  <th className="py-4 px-6 font-medium">Difficulty</th>
                  <th className="py-4 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {problems.map((prob, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white group-hover:text-primary transition-colors">{prob.title}</div>
                      <div className="flex gap-2 mt-2">
                         {prob.tags.map(t => <span key={t} className="text-[9px] font-mono border border-white/10 px-1.5 py-0.5 text-white/50">{t}</span>)}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-white/60">{prob.acceptance}</td>
                    <td className="py-4 px-6">
                       <span className={`text-[10px] font-bold uppercase ${
                         prob.difficulty === 'Hard' ? 'text-red-500' :
                         prob.difficulty === 'Medium' ? 'text-yellow-500' :
                         'text-green-500'
                       }`}>
                         {prob.difficulty}
                       </span>
                    </td>
                    <td className="py-4 px-6">
                       <Link to="/coding/workspace" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 inline-flex">
                          <Code2 className="w-3 h-3" /> Solve
                       </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
           <div className="border border-white/10 bg-[#080808] p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-primary" /> Session Stats
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <div className="text-[10px] uppercase font-bold text-white/40">Solved</div>
                   <div className="text-2xl font-mono text-white">124</div>
                 </div>
                 <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <div className="text-[10px] uppercase font-bold text-white/40">Accuracy</div>
                   <div className="text-2xl font-mono text-white">68%</div>
                 </div>
                 <div className="flex justify-between items-end pb-2">
                   <div className="text-[10px] uppercase font-bold text-white/40">Rank</div>
                   <div className="text-2xl font-mono text-primary">#14,204</div>
                 </div>
              </div>
           </div>
           
           <div className="border border-white/10 bg-primary/5 p-6 border-l-2 border-primary">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                 <FileCode className="w-4 h-4" /> Daily Challenge
              </h3>
              <p className="text-xs font-mono text-white/60 mb-4 leading-relaxed">
                 Earn +50 RP by completing today's algorithm challenge before midnight system time.
              </p>
              <button className="w-full py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                 Initiate Challenge
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
