import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from "recharts";
import { 
  Activity, 
  Target, 
  Zap, 
  Clock, 
  Share2, 
  Calendar, 
  ShieldAlert, 
  GitCommit, 
  LineChart, 
  Trophy,
  Globe,
  Award,
  BookOpen,
  Terminal,
  Server
} from "lucide-react";

// Synchronized Platforms Submodules
import { PlatformSyncPanel } from "./components/PlatformSyncPanel";
import { SyncStatsOverview } from "./components/SyncStatsOverview";
import { DifficultyAnalytics } from "./components/DifficultyAnalytics";
import { TopicWiseProgress } from "./components/TopicWiseProgress";
import { MultiPlatformHeatmap } from "./components/MultiPlatformHeatmap";
import { CodingLeaderboard } from "./components/CodingLeaderboard";
import { SubmissionHistoryUI } from "./components/SubmissionHistoryUI";

// Synchronized Platforms Services
import { 
  getConnectedProfiles, 
  getSubmissionsHistory 
} from "../../services/codingPlatformService";

// Original Internal Data Assets
const trendData = [
  { day: 'Mon', solved: 4 },
  { day: 'Tue', solved: 7 },
  { day: 'Wed', solved: 5 },
  { day: 'Thu', solved: 12 },
  { day: 'Fri', solved: 8 },
  { day: 'Sat', solved: 15 },
  { day: 'Sun', solved: 21 },
];

const skillRadarData = [
  { subject: 'Algorithms', A: 90, fullMark: 100 },
  { subject: 'Data Structures', A: 85, fullMark: 100 },
  { subject: 'Math', A: 40, fullMark: 100 },
  { subject: 'Databases', A: 75, fullMark: 100 },
  { subject: 'DP', A: 30, fullMark: 100 },
  { subject: 'Graphs', A: 65, fullMark: 100 },
];

const contestHistory = [
  { id: 1, name: 'Weekly Hackerrank #42', rank: 142, percentile: 92, date: '2 days ago', status: 'Up' },
  { id: 2, name: 'Biweekly Systems #10', rank: 89, percentile: 95, date: '1 week ago', status: 'Up' },
  { id: 3, name: 'Weekly Hackerrank #41', rank: 310, percentile: 75, date: '2 weeks ago', status: 'Down' },
];

export const CodingAnalytics = () => {
  // Navigation trigger: default to internal (original UI untouched)
  const [activeMode, setActiveMode] = useState<"internal" | "integrations">("internal");
  const [copied, setCopied] = useState(false);

  // Synchronized Profile Reactive State
  const [connectedProfiles, setConnectedProfiles] = useState(() => getConnectedProfiles());
  const [submissionsList, setSubmissionsList] = useState(() => getSubmissionsHistory());

  const handleRefreshPlatforms = () => {
    setConnectedProfiles(getConnectedProfiles());
    setSubmissionsList(getSubmissionsHistory());
  };

  useEffect(() => {
    window.addEventListener("storage_coding_profiles_updated", handleRefreshPlatforms);
    window.addEventListener("storage_coding_submissions_updated", handleRefreshPlatforms);
    return () => {
      window.removeEventListener("storage_coding_profiles_updated", handleRefreshPlatforms);
      window.removeEventListener("storage_coding_submissions_updated", handleRefreshPlatforms);
    };
  }, []);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 pb-12 text-foreground">
      
      {/* Dossier profile navigation header row */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-border pb-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1.5"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
              Combat Profile
            </h1>
            <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 font-mono uppercase px-2 py-0.5 rounded font-bold">
              v1.4 Sync
            </span>
          </div>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Performance Metrics & Skill Evaluation
          </p>
        </motion.div>
        
        {/* Core switch controller & Share handler */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          
          {/* Main Dual Tab Switcher */}
          <div className="flex bg-card border border-border rounded-md p-1 h-10 w-full sm:w-auto shrink-0 select-none">
            <button
              onClick={() => setActiveMode("internal")}
              className={`px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all font-mono whitespace-nowrap ${
                activeMode === "internal" ? "bg-foreground/10 text-foreground" : "text-white/45 hover:text-foreground"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 inline mr-1.5" /> Internal assessments
            </button>
            <button
              onClick={() => setActiveMode("integrations")}
              className={`px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all font-mono whitespace-nowrap ${
                activeMode === "integrations" ? "bg-primary text-black font-black" : "text-white/45 hover:text-foreground"
              }`}
            >
              <Globe className="w-3.5 h-3.5 inline mr-1.5" /> Connected Platforms
            </button>
          </div>

          <button 
            onClick={handleShare}
            className="px-4 py-2 bg-foreground/5 border border-border hover:bg-foreground/10 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground h-10 w-full sm:w-auto justify-center"
          >
            <Share2 className="w-4 h-4" />
            {copied ? 'Link Copied!' : 'Share Public Profile'}
          </button>

        </div>
      </div>

      {/* ==================== RENDERS THE ENTIRE CURRENT UI UNTOUCHED if in internal mode ==================== */}
      {activeMode === "internal" ? (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Original stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
               { l: "Total Solved", v: "124", i: Target, c: "text-blue-500", b: "bg-blue-500/10" },
               { l: "Global Rank", v: "Elite II", i: Activity, c: "text-primary", b: "bg-primary/10" },
               { l: "Current Streak", v: "14 Days", i: Zap, c: "text-yellow-500", b: "bg-yellow-500/10" },
               { l: "Avg Output Time", v: "24m", i: Clock, c: "text-green-500", b: "bg-green-500/10" },
            ].map((s, i) => (
               <div key={i} className="p-6 border bg-background border-border relative overflow-hidden group hover:border-border/80 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.l}</div>
                     <div className={`p-2 ${s.b} border border-border`}><s.i className={`w-4 h-4 ${s.c}`} /></div>
                  </div>
                  <div className="text-3xl font-mono font-bold text-foreground mb-2">{s.v}</div>
               </div>
            ))}
          </div>

          {/* Original Heatmap */}
          <div className="border border-border bg-card p-6 flex flex-col overflow-hidden">
             <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Commit History (Last 6 Months)
             </h2>
             <div className="flex overflow-x-auto custom-scrollbar pb-2 pt-1 gap-1 min-w-full">
                {Array.from({ length: 26 }).map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1 shrink-0">
                     {Array.from({ length: 7 }).map((_, rowIndex) => {
                        const intensity = Math.random();
                        const bgClass = intensity < 0.3 ? 'bg-foreground/5' : 
                                        intensity < 0.6 ? 'bg-primary/40' : 
                                        intensity < 0.8 ? 'bg-primary/70' : 'bg-primary';
                        return (
                           <motion.div 
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (colIndex * 7 + rowIndex) * 0.002 }}
                              key={rowIndex} 
                              className={`w-4 h-4 rounded-sm ${bgClass} hover:ring-1 hover:ring-white transition-all`}
                              title={`${Math.floor(intensity * 10)} submissions`}
                           />
                        );
                     })}
                  </div>
                ))}
             </div>
          </div>

          {/* Original radar skill and submission grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Radar Skill Graph */}
             <div className="border border-border bg-card p-6 flex flex-col h-[350px]">
                 <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    <Target className="w-3 h-3" /> Skill Radar
                 </h2>
                 <div className="flex-1 w-full relative -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="60%" data={skillRadarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'monospace' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Student" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
                          <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)' }} itemStyle={{ color: '#fff' }} />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
             </div>

             {/* Identify Weak Areas */}
             <div className="border border-border bg-card p-6 flex flex-col">
                 <h2 className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-6 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3" /> Weak Topics Detected
                 </h2>
                 <div className="flex flex-col gap-4">
                    <div className="bg-red-500/5 border border-red-500/20 p-4">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold uppercase text-red-400 tracking-tight">Dynamic Programming</span>
                          <span className="text-[10px] font-mono text-red-500">30% Accuracy</span>
                       </div>
                       <p className="text-[10px] text-muted-foreground font-mono mb-3">Struggling with state transitions and memoization limits.</p>
                       <button className="w-full py-1.5 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/40 transition-colors">Practice DP Set</button>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 p-4">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold uppercase text-green-400 tracking-tight">Number Theory & Math</span>
                          <span className="text-[10px] font-mono text-green-400">40% Accuracy</span>
                       </div>
                       <p className="text-[10px] text-muted-foreground font-mono mb-3">Often receives TLE due to suboptimal prime generation.</p>
                       <button className="w-full py-1.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest hover:bg-green-500/40 transition-colors">View Math Modules</button>
                    </div>
                 </div>
             </div>
             
             {/* Detailed Submission Stats */}
             <div className="border border-border bg-card p-6 flex flex-col">
                 <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                    <GitCommit className="w-3 h-3" /> Submission Analytics
                 </h2>
                 <div className="flex-1 flex flex-col justify-center gap-6">
                    <div>
                       <div className="flex justify-between items-end mb-2">
                          <div className="text-xs font-bold uppercase text-foreground tracking-tight">Accepted (AC)</div>
                          <div className="text-[10px] font-mono text-green-500">62% (415)</div>
                       </div>
                       <div className="h-1.5 w-full bg-foreground/5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ duration: 1 }} className="h-full bg-green-500" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-end mb-2">
                          <div className="text-xs font-bold uppercase text-foreground tracking-tight">Wrong Answer (WA)</div>
                          <div className="text-[10px] font-mono text-red-500">24% (160)</div>
                       </div>
                       <div className="h-1.5 w-full bg-foreground/5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '24%' }} transition={{ duration: 1 }} className="h-full bg-red-500" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-end mb-2">
                          <div className="text-xs font-bold uppercase text-foreground tracking-tight">Time Limit Exceeded (TLE)</div>
                          <div className="text-[10px] font-mono text-yellow-500">10% (68)</div>
                       </div>
                       <div className="h-1.5 w-full bg-foreground/5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1 }} className="h-full bg-yellow-500" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-end mb-2">
                          <div className="text-xs font-bold uppercase text-foreground tracking-tight">Runtime Error / Other</div>
                          <div className="text-[10px] font-mono text-muted-foreground">4% (25)</div>
                       </div>
                       <div className="h-1.5 w-full bg-foreground/5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '4%' }} transition={{ duration: 1 }} className="h-full bg-white/40" />
                       </div>
                    </div>
                 </div>
             </div>
          </div>

          {/* Original Contest Timelines & ratings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Contest Rank History */}
             <div className="border border-border bg-card p-6 h-[400px] flex flex-col">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                   <LineChart className="w-3 h-3" /> Contest Rating Timeline
                </h2>
                <div className="flex-1">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={[
                        { contest: 'C1', rating: 1200 },
                        { contest: 'C2', rating: 1250 },
                        { contest: 'C3', rating: 1180 },
                        { contest: 'C4', rating: 1340 },
                        { contest: 'C5', rating: 1420 },
                        { contest: 'C6', rating: 1560 },
                        { contest: 'C7', rating: 1530 },
                        { contest: 'C8', rating: 1680 }
                     ]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                       <defs>
                         <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                       <XAxis dataKey="contest" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} dy={10} />
                       <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} />
                       <RechartsTooltip cursor={{ stroke: 'rgba(255,255,255,0.1)' }} contentStyle={{ borderRadius: '0', backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                       <Area type="stepAfter" dataKey="rating" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorRating)" strokeWidth={2} />
                     </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Recent Tournaments */}
             <div className="border border-border bg-card p-6 flex flex-col">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                   <Trophy className="w-3 h-3" /> Recent Tournaments
                </h2>
                <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                   {contestHistory.map((ch) => (
                      <div key={ch.id} className="p-4 border border-border bg-background flex flex-col gap-2 relative group hover:border-border/80 transition-colors">
                         <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">{ch.name}</h4>
                            <span className="text-[10px] font-mono text-muted-foreground/80">{ch.date}</span>
                         </div>
                         <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-4 text-xs font-mono">
                               <span className="text-muted-foreground">Rank: <span className="font-bold text-foreground">#{ch.rank}</span></span>
                               <span className="text-muted-foreground">Top: <span className="font-bold text-primary">{100 - ch.percentile}%</span></span>
                            </div>
                            <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                               ch.status === 'Up' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10'
                            }`}>
                               Rating {ch.status === 'Up' ? '+34' : '-12'}
                            </div>
                         </div>
                      </div>
                   ))}
                   <button className="w-full p-4 border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors mt-2">
                      View Complete History
                   </button>
                </div>
             </div>
          </div>

        </div>
      ) : (
        // ==================== RENDERS THE BRAND NEW DYNAMIC MULTI-PLATFORM SETUP HUB if selected ====================
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Synchronized Profiles Management & Connect forms */}
          <PlatformSyncPanel 
            profiles={connectedProfiles} 
            onProfilesUpdated={handleRefreshPlatforms} 
          />

          {/* Aggregate KPI Stats Cards (Problems solved, streaks, contests delta, improvement points) */}
          <SyncStatsOverview profiles={connectedProfiles} />

          {/* Difficulty Analytics visual percentage donuts and Progress on key CS Topics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DifficultyAnalytics profiles={connectedProfiles} />
            <TopicWiseProgress />
          </div>

          {/* Multi-platform activities Calendar Heatmap representation */}
          <MultiPlatformHeatmap profiles={connectedProfiles} />

          {/* Interactive Classmates Peer Leaderboard */}
          <CodingLeaderboard />

          {/* Synchronized Submission history listUI with expanding dialog viewers */}
          <SubmissionHistoryUI submissions={submissionsList} />

        </div>
      )}

    </div>
  );
};
