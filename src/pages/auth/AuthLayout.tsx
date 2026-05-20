import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-card border-r border-border flex-col items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              rotate: [360, 270, 180, 90, 0],
              scale: [1, 1.5, 1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px]" 
          />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 font-bold bg-primary rounded-sm flex items-center justify-center text-black text-2xl">
              U
            </div>
            <span className="text-2xl font-bold tracking-tighter uppercase italic text-foreground">
              Urvah Dynamics
            </span>
          </div>

          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9] text-foreground mb-6">
            Enter The <br/>
            <span className="text-primary">Ecosystem</span>
          </h1>

          <p className="text-sm text-muted-foreground font-mono tracking-tight leading-relaxed mb-12 max-w-md">
            Authentication gateway for the enterprise learning management system. Secure access to AI mentorship, predictive analytics, and collaborative coding arenas.
          </p>

          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Systems Operational</span>
            </div>
            <span>|</span>
            <span>v3.0.4.Enterprise</span>
          </div>
        </div>
      </div>

      {/* Right side - Forms container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <motion.div 
          className="w-full max-w-[400px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>

        {/* Mobile branding */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
           <div className="w-8 h-8 font-bold bg-primary rounded-sm flex items-center justify-center text-black">
             U
           </div>
           <span className="text-sm font-bold tracking-tighter uppercase italic text-foreground">
             Urvah Dynamics
           </span>
        </div>
      </div>
    </div>
  );
};
