import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Play, CheckCircle2, LayoutDashboard, Maximize2, Settings, Terminal, Activity, FileText, AlignLeft, RefreshCw, Cpu, Users, ChevronRight, CheckCircle, XCircle, Trophy, Clock, Search, LogOut, BrainCircuit, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock data
const LANGUAGES = [
  { id: 'python', name: 'Python 3', defaultCode: 'def solve(nums):\n    pass' },
  { id: 'cpp', name: 'C++ (GCC 9.2.0)', defaultCode: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int solve(vector<int>& nums) {\n        return 0;\n    }\n};' }
];

const PROBLEMS = [
  { id: 'A', name: 'Two Sum', points: 100, solved: true },
  { id: 'B', name: 'Valid Parentheses', points: 200, solved: false },
  { id: 'C', name: 'Merge K Sorted Lists', points: 400, solved: false },
  { id: 'D', name: 'Network Delay Time', points: 500, solved: false }
];

const initialLiveLeaderboard = [
  { id: 1001, rank: 1, user: "Alex Mercer", score: 400 },
  { id: 1002, rank: 2, user: "Sarah Chen", score: 400 },
  { id: 1003, rank: 3, user: "David Kim", score: 300 },
  { id: 1004, rank: 4, user: "Emily Wong", score: 300 },
  { id: 1005, rank: 5, user: "Marcus Johnson", score: 200 },
  { id: 1006, rank: 6, user: "You", score: 100 },
];

interface ExecutionResult {
  status: string;
  stdout: string;
  stderr: string;
  compileOutput?: string;
  time: string;
  memory: string;
  testcaseResults?: { testcaseId: string, passed: boolean, actualOutput: string }[];
}

import { useWindowSize } from "react-use";

export const LiveContestArena = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [activeProblem, setActiveProblem] = useState('A');
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<"testcases" | "output">("testcases");
  const [activeLeftTab, setActiveLeftTab] = useState<"problem" | "submissions" | "ai-hints">("problem");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  
  // Contest specific state
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [liveLeaderboard, setLiveLeaderboard] = useState(initialLiveLeaderboard);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowEndModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time rank updates in drawer
    const interval = setInterval(() => {
      setLiveLeaderboard(prev => {
        const newLeaderboard = [...prev];
        if (Math.random() > 0.6) {
          const idx1 = Math.floor(Math.random() * (newLeaderboard.length - 1)) + 1;
          const idx2 = Math.max(1, idx1 - 1);
          
          const temp = newLeaderboard[idx1];
          newLeaderboard[idx1] = newLeaderboard[idx2];
          newLeaderboard[idx2] = temp;
          
          newLeaderboard.forEach((user, i) => {
            user.rank = i + 1;
          });
        }
        return newLeaderboard;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    setIsRunning(true);
    setActiveBottomTab("output");
    setExecutionResult({ status: 'Executing...', stdout: '', stderr: '', time: '-', memory: '-' });
    setTimeout(() => {
      setExecutionResult({
        status: 'Accepted',
        stdout: 'Testing on public testcases:\nCase 1 -> Passed\n',
        stderr: '',
        time: '12ms', memory: '42.1MB',
        testcaseResults: [{ testcaseId: '1', passed: true, actualOutput: 'Expected' }]
      });
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setActiveBottomTab("output");
    setExecutionResult({ status: 'Executing...', stdout: '', stderr: '', time: '-', memory: '-' });
    setTimeout(() => {
      setExecutionResult({
        status: 'Accepted',
        stdout: 'All test cases passed.',
        stderr: '',
        time: '14ms', memory: '42.1MB',
        testcaseResults: [{ testcaseId: '1', passed: true, actualOutput: 'Hidden' }]
      });
      setIsRunning(false);
    }, 1500);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
       workspaceRef.current?.requestFullscreen();
       setIsFullscreen(true);
    } else {
       document.exitFullscreen();
       setIsFullscreen(false);
    }
  };

  return (
    <div ref={workspaceRef} className="h-screen w-screen bg-background fixed inset-0 z-[100] flex flex-col font-mono">
      {/* Contest Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card border-b border-border px-4 py-2 shrink-0 gap-2 md:gap-0">
        <div className="flex items-center justify-between w-full md:w-auto gap-6 mt-1 md:mt-0">
           <div className="flex items-center gap-2">
             <Trophy className="w-5 h-5 text-red-500" />
             <span className="text-xs font-bold uppercase tracking-widest text-foreground">#42 Weekly</span>
           </div>
           
           <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0 hide-scrollbar">
             {PROBLEMS.map(p => (
                <button 
                  key={p.id}
                  onClick={() => setActiveProblem(p.id)}
                  className={`px-3 py-1 flex items-center gap-2 border text-xs font-bold transition-colors uppercase whitespace-nowrap ${activeProblem === p.id ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:bg-foreground/5'}`}
                >
                  {p.solved ? <CheckCircle className="w-3 h-3 text-green-500" /> : p.id}
                  {!isMobile && p.points}
                </button>
             ))}
           </div>
        </div>
        
        <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
           <button 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
           >
              <Users className="w-4 h-4" /> Live Rank
           </button>
           <div className="flex gap-2 text-sm md:text-xl font-black text-red-500 items-center bg-red-500/10 px-3 py-1 border border-red-500/20">
              <Clock className="w-4 h-4 animate-pulse" /> {formatTime(timeLeft)}
           </div>
           
           <div className="flex gap-2">
             <button onClick={toggleFullscreen} className="p-2 border border-border hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                <Maximize2 className="w-4 h-4" />
             </button>
             <button onClick={() => setShowEndModal(true)} className="p-2 bg-red-500 text-foreground hover:bg-red-600 transition-colors" title="End Contest Early">
                <LogOut className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>

      <div className="flex-1 border-border/50 relative overflow-hidden flex flex-col">
        {/* @ts-ignore */}
        <PanelGroup orientation={isMobile ? "vertical" : "horizontal"}>
          <Panel defaultSize={35} minSize={20}>
             <div className="h-full flex flex-col border-r border-border bg-card">
                <div className="flex justify-between items-center border-b border-border px-2 bg-background shrink-0">
                   <div className="flex gap-2">
                      <button onClick={() => setActiveLeftTab('problem')} className={`px-3 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 transition-colors ${activeLeftTab === 'problem' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground/80 hover:text-foreground/70'}`}>
                         <FileText className="w-3.5 h-3.5" /> Problem {activeProblem}
                      </button>
                      <button onClick={() => setActiveLeftTab('ai-hints')} className={`px-3 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 transition-colors ${activeLeftTab === 'ai-hints' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground/80 hover:text-foreground/70'}`}>
                         <BrainCircuit className="w-3.5 h-3.5" /> AI Mentor
                      </button>
                      <button onClick={() => setActiveLeftTab('submissions')} className={`px-3 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 transition-colors ${activeLeftTab === 'submissions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground/80 hover:text-foreground/70'}`}>
                         <RefreshCw className="w-3.5 h-3.5" /> Submissions
                      </button>
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                   {activeLeftTab === 'problem' ? (
                      <div className="p-5 prose prose-sm dark:prose-invert font-mono text-foreground/70 max-w-none">
                        <h2 className="text-foreground text-xl uppercase tracking-widest">{PROBLEMS.find(p=>p.id===activeProblem)?.name}</h2>
                        <span className="text-primary text-xs font-bold">Points: {PROBLEMS.find(p=>p.id===activeProblem)?.points}</span>
                        <p className="mt-4">Solve the problem efficiently within the given constraints.</p>
                      </div>
                   ) : activeLeftTab === 'ai-hints' ? (
                      <div className="p-4 space-y-4">
                         <div className="bg-primary/5 border border-primary/20 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-xl pointer-events-none" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-2">
                               <Sparkles className="w-4 h-4" /> Cognitive Analysis
                            </h3>
                            <p className="text-xs font-mono text-foreground/70">
                               For "Two Sum", consider using a Hash Map. It reduces the time complexity from O(n^2) to O(n) by storing the complement of each element as you iterate.
                            </p>
                         </div>
                         <div className="bg-foreground/5 border border-border p-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
                               <FileText className="w-4 h-4" /> Related Concepts
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                               <span className="px-2 py-1 bg-foreground/5 text-[10px] font-mono text-muted-foreground uppercase">Hash Tables</span>
                               <span className="px-2 py-1 bg-foreground/5 text-[10px] font-mono text-muted-foreground uppercase">Array Iteration</span>
                            </div>
                         </div>
                         <button className="w-full py-2 bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors">
                            Request AI Hint (-10 Points)
                         </button>
                      </div>
                   ) : (
                      <div className="p-4 space-y-3">
                         <div className="text-muted-foreground text-xs text-center uppercase tracking-widest mt-10">No submissions for this problem yet.</div>
                      </div>
                   )}
                </div>
             </div>
          </Panel>
          <PanelResizeHandle className="w-1 bg-foreground/5 hover:bg-primary/50 transition-colors cursor-col-resize shrink-0" />
          <Panel defaultSize={65}>
            <PanelGroup orientation="vertical">
              <Panel defaultSize={70}>
                <div className="h-full flex flex-col bg-card">
                   <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2 text-xs shrink-0">
                      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-background border border-border font-mono px-3 py-1.5 text-foreground/80 focus:outline-none focus:border-primary/50">
                         {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                      </select>
                   </div>
                   <div className="flex-1 bg-card">
                     <Editor
                        height="100%"
                        language={language === 'cpp' ? 'cpp' : language}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
                     />
                   </div>
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-foreground/5 hover:bg-primary/50 transition-colors cursor-row-resize shrink-0" />
              <Panel defaultSize={30}>
                 <div className="h-full bg-background flex flex-col">
                    <div className="flex justify-between items-center border-b border-border px-4 py-2 bg-background shrink-0">
                       <div className="flex gap-4">
                          <button onClick={() => setActiveBottomTab("testcases")} className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${activeBottomTab === 'testcases' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground/80 hover:text-foreground'}`}>Test Cases</button>
                          <button onClick={() => setActiveBottomTab("output")} className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${activeBottomTab === 'output' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground/80 hover:text-foreground'}`}>Execution Result</button>
                       </div>
                       <div className="flex gap-2">
                         <button disabled={isRunning} onClick={handleRun} className="px-4 py-1.5 bg-foreground/5 border border-border text-xs font-bold uppercase tracking-widest text-foreground hover:bg-foreground/10 hover:border-border/80 transition-colors flex items-center gap-2"><Play className="w-3 h-3" /> Run</button>
                         <button disabled={isRunning} onClick={handleSubmit} className="px-4 py-1.5 bg-primary text-black text-xs font-bold uppercase tracking-widest hover:bg-foreground transition-colors flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Submit</button>
                       </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-card">
                       {activeBottomTab === 'testcases' && (
                          <div className="p-4"><div className="text-muted-foreground text-xs font-mono">Example testcases will be visible here.</div></div>
                       )}
                       {activeBottomTab === 'output' && (
                          <div className="p-4 flex flex-col gap-4">
                             <div className="text-muted-foreground text-xs font-mono">{executionResult ? JSON.stringify(executionResult, null, 2) : "Run code to see output."}</div>
                             {executionResult && (
                               <div className={`bg-foreground/5 border p-4 ${executionResult.status === 'Accepted' ? 'border-primary/20 bg-primary/5' : 'border-red-500/20 bg-red-500/5'}`}>
                                  <h3 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-2 ${executionResult.status === 'Accepted' ? 'text-primary' : 'text-red-500'}`}>
                                     <BrainCircuit className="w-3.5 h-3.5" /> {executionResult.status === 'Accepted' ? 'AI Code Analysis' : 'AI Mistake Explanation'}
                                  </h3>
                                  <p className="text-xs font-mono text-foreground/70">
                                     {executionResult.status === 'Accepted' 
                                       ? 'Great job! Your solution handles the base cases efficiently. However, you could optimize memory by doing it in-place instead of allocating a new array.'
                                       : 'Your code fails on negative numbers. Arrays with negative values incorrectly trigger your early exit condition. Consider taking the absolute value or checking the sign before breaking the loop.'}
                                  </p>
                               </div>
                             )}
                          </div>
                       )}
                    </div>
                 </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>

        {/* Real-time Leaderboard Drawer Overlay */}
        <AnimatePresence>
        {showLeaderboard && (
          <motion.div 
             initial={{ x: '100%' }}
             animate={{ x: 0 }}
             exit={{ x: '100%' }}
             transition={{ type: "spring", damping: 25, stiffness: 200 }}
             className="absolute top-0 right-0 h-full w-full md:w-[400px] border-l border-border bg-card/95 backdrop-blur-md shadow-2xl flex flex-col z-50">
             <div className="p-4 border-b border-border flex justify-between items-center bg-background">
                <span className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                   <Users className="w-4 h-4 text-primary" /> Live Standings
                   <span className="flex gap-1 ml-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /></span>
                </span>
                <button onClick={() => setShowLeaderboard(false)} className="text-muted-foreground hover:text-foreground"><XCircle className="w-5 h-5" /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-2 relative">
                <AnimatePresence>
                {liveLeaderboard.map((user) => (
                  <motion.div 
                     layout
                     key={user.id} 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`border p-3 flex justify-between items-center transition-colors ${user.user === 'You' ? 'bg-primary/20 border-primary/40' : 'bg-foreground/5 border-border'}`}>
                     <div className="flex items-center gap-3">
                        <span className={`font-bold text-lg w-8 ${user.rank <= 3 ? 'text-primary' : 'text-muted-foreground/80'}`}>#{user.rank}</span>
                        <span className={`text-xs font-mono ${user.user === 'You' ? 'text-foreground font-bold' : 'text-foreground/80'}`}>{user.user}</span>
                     </div>
                     <div className="text-right">
                        <div className="text-sm font-bold text-primary">{user.score} pts</div>
                     </div>
                  </motion.div>
                ))}
                </AnimatePresence>
             </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Contest End Modal */}
      <AnimatePresence>
      {showEndModal && (
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[200]">
           <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-background border border-border p-8 max-w-md w-full text-center flex flex-col items-center shadow-2xl">
              <Trophy className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-2">Contest Concluded</h2>
              <p className="text-sm font-mono text-muted-foreground mb-6 mx-4">Your final submissions are being evaluated against hidden test cases. System tests taking place.</p>
              
              <div className="w-full bg-foreground/5 border border-border p-4 mb-6 flex flex-col gap-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full" />
                 <div className="flex justify-between items-center text-xs font-mono relative z-10"><span className="text-muted-foreground">Current Rank</span><span className="text-foreground font-bold">#6</span></div>
                 <div className="flex justify-between items-center text-xs font-mono relative z-10"><span className="text-muted-foreground">Score</span><span className="text-primary font-bold">100</span></div>
              </div>
              
              <button onClick={() => navigate('/coding/contests/leaderboard')} className="w-full py-3 bg-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-foreground transition-colors">
                 View Final Leaderboard
              </button>
           </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};
