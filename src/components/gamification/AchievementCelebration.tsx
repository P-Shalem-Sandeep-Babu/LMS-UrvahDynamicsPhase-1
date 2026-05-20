import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Trophy, Star, Gift } from "lucide-react";

interface CelebrationEvent {
  title: string;
  icon?: string;
  xp?: number;
}

export const AchievementCelebration = () => {
  const [eventData, setEventData] = useState<CelebrationEvent | null>(null);

  useEffect(() => {
    const handleAchievement = (e: Event) => {
      const customEvent = e as CustomEvent<CelebrationEvent>;
      setEventData(customEvent.detail);
      
      // Auto dismiss
      setTimeout(() => {
        setEventData(null);
      }, 4000);
    };

    window.addEventListener("achievement-unlocked", handleAchievement);
    return () => window.removeEventListener("achievement-unlocked", handleAchievement);
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Trophy": return <Trophy className="w-12 h-12 text-yellow-500" />;
      case "Star": return <Star className="w-12 h-12 text-blue-500" />;
      case "Gift": return <Gift className="w-12 h-12 text-primary" />;
      default: return <Award className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <AnimatePresence>
      {eventData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -50 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          {/* Confetti simulation backing */}
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
          
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative bg-background border border-primary/30 p-8 flex flex-col items-center gap-4 text-center shadow-[0_0_100px_var(--color-primary)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="p-4 bg-primary/10 rounded-full border border-primary/20"
            >
              {getIcon(eventData.icon)}
            </motion.div>

            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-foreground">
                {eventData.title}
              </h2>
              {eventData.xp && (
                <p className="text-sm font-mono font-bold text-primary tracking-widest mt-2 uppercase">
                  +{eventData.xp} XP Earned
                </p>
              )}
            </div>
            
            <p className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest mt-2">
              Keep up the excellent work!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
