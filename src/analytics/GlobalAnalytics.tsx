import { motion } from "motion/react";
import { Download, Filter, BarChart3 } from "lucide-react";
import { StudentProgressLine } from "./components/StudentProgressLine";
import { EngagementHeatmap } from "./components/EngagementHeatmap";
import { PlatformActivityArea } from "./components/PlatformActivityArea";
import { ContestPerformanceRadar } from "./components/ContestPerformanceRadar";
import { RankingDistributionPie } from "./components/RankingDistributionPie";
import { FacultyWorkloadBar } from "./components/FacultyWorkloadBar";
import { CodingSubmissionsBar } from "./components/CodingSubmissionsBar";

export const GlobalAnalytics = () => {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
            <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Multi-Vector Analytics
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            Enterprise Telemetry & Performance Data
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <button className="px-4 py-2 border border-white/20 text-foreground text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" /> Global Filters
          </button>
          <button className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Extract Report
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PlatformActivityArea />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CodingSubmissionsBar />
            <FacultyWorkloadBar />
          </div>
          <StudentProgressLine />
        </div>
        
        <div className="flex flex-col gap-6">
          <EngagementHeatmap />
          <RankingDistributionPie />
          <ContestPerformanceRadar />
        </div>
      </div>
    </div>
  );
};
