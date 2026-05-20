import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border bg-background/80 backdrop-blur-xl px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 font-bold bg-primary rounded-sm flex items-center justify-center text-black text-xl">
          U
        </div>
        <span className="text-lg font-bold tracking-tighter uppercase italic text-foreground">
          Urvah Dynamics
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
        <a href="#stats" className="hover:text-foreground transition-colors">Success</a>
        <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
      </nav>

      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2 px-4 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all border border-transparent hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]"
        >
          <BrainCircuit className="w-3 h-3" />
          Enter Dashboard
        </Link>
      </div>
    </header>
  );
};
