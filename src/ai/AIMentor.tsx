import { motion } from "motion/react";
import { BrainCircuit, Sparkles, Map, Target } from "lucide-react";
import { ChatInterface } from "./components/ChatInterface";
import { AIInsights } from "./components/AIInsights";
import { LearningRoadmap } from "./components/LearningRoadmap";

export const AIMentor = () => {
  return (
    <div className="flex flex-col gap-6 pb-8 h-[calc(100vh-100px)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2 shrink-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
            <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-primary" /> System Oracle
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Neural Guidance & Personalized Pathfinding
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <div className="px-4 py-2 bg-primary/10 border-l-2 border-primary flex items-center gap-3 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
               Cognitive Engine Online
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 border border-border bg-card flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <ChatInterface />
        </div>
        
        <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 min-h-0">
          <AIInsights />
          <LearningRoadmap />
        </div>
      </div>
    </div>
  );
};
