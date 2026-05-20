import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clock, Users, Terminal, Trophy, Zap, Info, ShieldAlert, ArrowLeft } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const ContestLobby = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [mode, setMode] = useState<"live" | "virtual">("live");

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-8 px-4 md:px-0">
      <Link to="/coding/contests" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors flex items-center gap-1 mb-8">
        <ArrowLeft className="w-3 h-3" /> Back to Tournaments
      </Link>

      <div className="border border-border bg-card flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="border-b border-border p-8 flex flex-col gap-2 relative z-10">
           <div className="flex items-center gap-3">
             <Trophy className="w-6 h-6 text-red-500" />
             <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border border-red-500/50 text-red-500 bg-red-500/10">
                Official Rated
             </span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground mt-4">
             Weekly Backend Hackerrank #42
           </h1>
           <p className="text-muted-foreground/80 font-mono text-sm max-w-2xl mt-2">
             Test your backend logic, database modeling, and algorithmic optimization skills in this standard rated contest.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border text-xs font-mono">
           <div className="p-6 border-r border-border flex flex-col gap-1">
             <span className="text-muted-foreground/80 uppercase tracking-widest">Duration</span>
             <span className="text-xl text-foreground font-bold flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 120 Minutes</span>
           </div>
           <div className="p-6 border-r border-border flex flex-col gap-1">
             <span className="text-muted-foreground/80 uppercase tracking-widest">Problems</span>
             <span className="text-xl text-foreground font-bold flex items-center gap-2"><Terminal className="w-4 h-4 text-primary" /> 4 Questions</span>
           </div>
           <div className="p-6 flex flex-col gap-1">
             <span className="text-muted-foreground/80 uppercase tracking-widest">Registered</span>
             <span className="text-xl text-foreground font-bold flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> 1,250 Elite</span>
           </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6 flex-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-2">Contest Rules</h3>
              <ul className="space-y-4 text-sm font-mono text-foreground/70">
                 <li className="flex gap-3 items-start">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div><strong className="text-foreground">Strict Anti-Cheat:</strong> Tab switching, copy-pasting from external sources, and background apps are heavily monitored. Violation leads to immediate ban.</div>
                 </li>
                 <li className="flex gap-3 items-start">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div><strong className="text-foreground">Scoring System:</strong> Points decay over time. Submitting wrong answers incurs a 10-minute penalty per wrong submission.</div>
                 </li>
                 <li className="flex gap-3 items-start">
                    <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div><strong className="text-foreground">Virtual Mode:</strong> If you miss the live window, you can run a virtual contest that simulates the live leaderboard.</div>
                 </li>
              </ul>
              
              <label className="flex items-center gap-3 mt-6 p-4 border border-border bg-foreground/5 cursor-pointer hover:bg-foreground/10 transition-colors">
                 <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-background accent-primary" />
                 <span className="text-xs uppercase tracking-widest font-bold text-foreground/80">I agree to the strict anti-cheat policy</span>
              </label>
           </div>
           
           <div className="flex flex-col gap-4 justify-end">
              <div className="bg-background border border-border/50 p-4 flex flex-col gap-3">
                 <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">Select Mode</div>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setMode('live')}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border ${mode === 'live' ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-transparent text-muted-foreground/80 border-border hover:bg-foreground/5'}`}>
                      <Zap className="w-4 h-4" /> Live Arena
                    </button>
                    <button 
                      onClick={() => setMode('virtual')}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border ${mode === 'virtual' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-transparent text-muted-foreground/80 border-border hover:bg-foreground/5'}`}>
                      <Clock className="w-4 h-4" /> Virtual Mode
                    </button>
                 </div>
              </div>
              
              <button 
                 disabled={!agreed}
                 onClick={() => navigate(`/coding/contests/live/${id}`)}
                 className="w-full py-4 bg-foreground text-black font-black uppercase tracking-widest hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                 {mode === 'live' ? 'Enter Live Arena' : 'Start Virtual Contest'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
