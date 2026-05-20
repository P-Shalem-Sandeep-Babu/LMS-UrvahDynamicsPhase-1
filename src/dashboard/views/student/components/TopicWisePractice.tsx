import { motion } from "motion/react";
import { BookOpen, CheckCircle, Code2, Database, Share2, GitBranch } from "lucide-react";

const topics = [
  { name: "Arrays & Hashing", progress: 85, icon: Database, total: 50, completed: 42 },
  { name: "Two Pointers", progress: 60, icon: Share2, total: 30, completed: 18 },
  { name: "Dynamic Programming", progress: 30, icon: Code2, total: 60, completed: 18 },
  { name: "Trees & Graphs", progress: 45, icon: GitBranch, total: 45, completed: 20 },
  { name: "System Design", progress: 10, icon: BookOpen, total: 20, completed: 2 },
];

export const TopicWisePractice = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
          Topic-Wise Practice
        </h2>
        <button className="text-[10px] font-mono text-primary hover:text-foreground transition-colors">
          VIEW ALL TOPICS
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <div key={i} className="p-4 border border-border bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 border border-border bg-foreground/5">
                <topic.icon className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">
                {topic.completed}/{topic.total} <CheckCircle className="inline-block w-3 h-3 text-green-500 ml-1 mb-0.5" />
              </div>
            </div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
              {topic.name}
            </h3>
            <div className="w-full h-1 bg-foreground/10 overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${topic.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
