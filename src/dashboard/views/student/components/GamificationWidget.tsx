import { motion } from "motion/react";
import { Hexagon, Shield, Sword } from "lucide-react";

export const GamificationWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          Combat Status
        </h2>
        <span className="text-[10px] font-mono text-yellow-500">
          Lvl 42 Knight
        </span>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <Hexagon className="w-16 h-16 text-yellow-500/20 fill-yellow-500/10" />
          <div className="absolute inset-0 flex items-center justify-center font-black font-mono text-xl text-yellow-500">
            42
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/70">
            <span>EXP</span>
            <span className="font-mono">8,450 / 10,000</span>
          </div>
          <div className="h-2 w-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "84.5%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-yellow-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border border-white/10 bg-white/[0.02] flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-crosshair">
          <Sword className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white">
              Aggressor
            </div>
            <div className="text-[8px] font-mono text-white/40">
              100 Contests won
            </div>
          </div>
        </div>
        <div className="p-3 border border-white/10 bg-white/[0.02] flex items-center gap-3 cursor-crosshair">
          <Shield className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white">
              Defender
            </div>
            <div className="text-[8px] font-mono text-primary">
              Equipped badge
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
