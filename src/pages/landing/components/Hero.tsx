import { motion } from "motion/react";
import { BrainCircuit, ChevronRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-10 overflow-hidden">
      {/* Animated Elements */}
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 border border-border mb-8 rounded-none">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">v3.0 Enterprise Engine Live</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Evolution of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00cc44]">Digital Learning</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-mono tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          An advanced AI-powered LMS platform engineered for enterprise-scale education. Featuring real-time coding contests, 24/7 AI mentoring, and predictive throughput analytics.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black text-xs font-black uppercase tracking-widest transition-all hover:bg-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Deploy Architecture <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/coding" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-border/80 text-foreground text-xs font-black uppercase tracking-widest hover:bg-foreground/5 transition-all">
            <Terminal className="w-4 h-4" /> Try Coding Lab
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="mt-24 relative border border-border bg-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-transparent" />
        <div className="p-4 border-b border-border flex items-center justify-between bg-background">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">dashboard_preview.tsx</div>
        </div>
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10 pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
            alt="Dashboard Preview" 
            className="w-full h-auto object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"
          />
        </div>
      </motion.div>
    </section>
  );
};
