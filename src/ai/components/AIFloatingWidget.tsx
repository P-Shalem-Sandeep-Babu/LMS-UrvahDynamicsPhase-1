import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, X, MessageSquare, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const AIFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on the actual mentor page
  if (location.pathname === '/mentor') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-primary/10 border-b border-border p-3 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <BrainCircuit className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary">System Oracle</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                 <X className="w-4 h-4" />
               </button>
            </div>
            
            <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
               <p className="text-xs font-mono text-foreground/80 leading-relaxed max-w-[250px]">
                 I noticed you are browsing. Do you need cognitive assistance or performance analysis?
               </p>
               
               <div className="mt-4 space-y-2">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/mentor');
                    }}
                    className="w-full flex items-center justify-between p-2 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors"
                  >
                     <span><Sparkles className="w-3 h-3 inline mr-2" /> Initialize Full Session</span>
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <BrainCircuit className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};
