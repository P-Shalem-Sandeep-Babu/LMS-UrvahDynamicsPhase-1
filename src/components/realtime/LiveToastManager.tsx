import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Trophy, Zap, AlertTriangle, Code2 } from "lucide-react";

interface Toast {
  id: string;
  type: "submission" | "rank" | "system" | "contest";
  title: string;
  message: string;
}

export const LiveToastManager = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Simulate real-time events arriving
  useEffect(() => {
    const events: Toast[] = [
      { id: "eval_1", type: "submission", title: "Execution Accepted", message: "Alex Mercer solved 'Two Sum' (12ms)" },
      { id: "rank_1", type: "rank", title: "Leaderboard Shift", message: "Sarah Chen overtook 1st place!" },
      { id: "sys_1", type: "system", title: "System Oracle", message: "New AI recommendations generated." }
    ];

    let timer: any;
    let index = 0;

    const spawnToast = () => {
      if (index < events.length) {
        setToasts((prev) => [...prev, events[index]]);
        index++;
        timer = setTimeout(spawnToast, Math.random() * 8000 + 4000); // Random delay 4-12s
      }
    };

    timer = setTimeout(spawnToast, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Remove toast after fixed time
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const getIcon = (type: string) => {
    switch (type) {
      case "submission": return <Code2 className="w-4 h-4 text-green-500" />;
      case "rank": return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "system": return <Zap className="w-4 h-4 text-primary" />;
      case "contest": return <Terminal className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-white" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case "submission": return "border-green-500/30";
      case "rank": return "border-yellow-500/30";
      case "system": return "border-primary/30";
      case "contest": return "border-red-500/30";
      default: return "border-white/20";
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className={`w-72 bg-[#050505] border shadow-2xl p-3 flex gap-3 items-start pointer-events-auto ${getBorderColor(toast.type)}`}
          >
            <div className={`p-1.5 rounded-none border ${getBorderColor(toast.type)} bg-white/5`}>
              {getIcon(toast.type)}
            </div>
            <div className="flex flex-col gap-1">
               <h4 className={`text-[10px] font-bold uppercase tracking-widest ${toast.type === 'submission' ? 'text-green-500' : toast.type === 'rank' ? 'text-yellow-500' : toast.type === 'system' ? 'text-primary' : 'text-red-500'}`}>
                 {toast.title}
               </h4>
               <p className="text-xs font-mono text-white/70 leading-snug">
                 {toast.message}
               </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
