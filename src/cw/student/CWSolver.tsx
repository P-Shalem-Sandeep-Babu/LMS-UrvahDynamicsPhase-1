import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Play, CheckCircle2, Save, Terminal, ChevronLeft, AlertTriangle, Bot, Lightbulb, Code2, ShieldAlert, XCircle, ShieldCheck } from "lucide-react";
import Editor from "@monaco-editor/react";

const languages = ["C", "C++", "Java", "Python"];

export const CWSolver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock CW data
  const cw = {
    title: "Daily Practice: Arrays & Pointers",
    description: "Write a program to reverse an array in-place using pointers. You are given an array of integers, and you need to reverse it without using any extra space. The modifications must be done directly on the original array.",
    inputFormat: "First line contains an integer N, the size of the array. Second line contains N space-separated integers.",
    outputFormat: "Print the reversed array as space-separated integers.",
    sampleInput: "5\n1 2 3 4 5",
    sampleOutput: "5 4 3 2 1",
    timeLimit: 1,
    memoryLimit: 256,
    marks: 10,
    deadline: new Date(new Date().getTime() + 1000 * 60 * 60 * 2) // 2 hours left
  };

  const [code, setCode] = useState(() => localStorage.getItem(`cw_draft_${id}`) || "// Write your code here\n");
  const [language, setLanguage] = useState("Python");
  
  // States for Execution and UI
  const [output, setOutput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [now, setNow] = useState(new Date());
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [activeTab, setActiveTab] = useState<"problem" | "submissions">("problem");
  const [consoleTab, setConsoleTab] = useState<"visible" | "console" | "hidden">("visible");
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  
  // AI Assistant States
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role: 'ai'|'user', content: string}[]>([
    { role: 'ai', content: "Hi! I'm your AI Mentor. I won't write the code for you, but I can help you debug, explain errors, or give hints. How can I help?" }
  ]);

  // Anti-cheating States
  const [tabSwitches, setTabSwitches] = useState(0);
  const [suspiciousLogs, setSuspiciousLogs] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Anti-cheating mechanism
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        setSuspiciousLogs(prev => [...prev, `Tab switch detected at ${new Date().toLocaleTimeString()}`]);
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handlePaste = (e: React.ClipboardEvent) => {
    setSuspiciousLogs(prev => [...prev, `Code paste detected at ${new Date().toLocaleTimeString()}`]);
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  };

  // Auto-save
  useEffect(() => {
    setSaveStatus("Saving...");
    const timeout = setTimeout(() => {
      localStorage.setItem(`cw_draft_${id}`, code);
      setSaveStatus("Saved");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [code, id]);

  const diff = cw.deadline.getTime() - now.getTime();
  const isClosed = diff <= 0;
  
  const h = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
  const m = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const s = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));
  const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  const handleRun = () => {
    setIsExecuting(true);
    setConsoleTab("console");
    setOutput("Compiling code...\n");
    setTimeout(() => {
      setOutput(prev => prev + "Executing against visible test cases...\n\n");
      setTimeout(() => {
        setIsExecuting(false);
        setOutput(prev => prev + "[Test Case 1]\nInput: 5\\n1 2 3 4 5\nExpected: 5 4 3 2 1\nActual Output: 5 4 3 2 1\nStatus: PASSED ✔️\n\nExecution Time: 0.04s\nMemory: 12MB\n");
      }, 800);
    }, 500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setConsoleTab("hidden");
    setSubmissionResult(null);
    setOutput("Compiling and submitting code...\nEvaluating against hidden test cases...");

    setTimeout(() => {
      setIsSubmitting(false);
      // Mock evaluation result
      const totalHidden = 5;
      const passedHidden = 4;
      const score = (passedHidden / totalHidden) * cw.marks;
      
      setSubmissionResult({
        status: "Partially Accepted",
        passed: passedHidden,
        total: totalHidden,
        score: score,
        maxScore: cw.marks,
        runtime: "0.06s",
        memory: "14MB"
      });
      setOutput(`Evaluation Complete.\nResult: Partially Accepted\nScore: ${score}/${cw.marks}`);
    }, 2000);
  };

  const handleAIAction = (action: string) => {
    setAiMessages(prev => [...prev, { role: 'user', content: action }]);
    setShowAIPanel(true);
    
    setTimeout(() => {
      let response = "";
      if (action.includes("Hint")) {
        response = "Hint: Try using two pointers, one at the beginning of the array and one at the end, and swap their values while moving them towards the center.";
      } else if (action.includes("Error")) {
        response = "It looks like you might have an index out of bounds error. Check the condition in your while loop. Remember array indices go from 0 to N-1.";
      } else if (action.includes("Logic")) {
        response = "Your logic seems solid, but ensure you are handling the case where the array has an odd number of elements correctly. The middle element doesn't need to be swapped.";
      } else if (action.includes("Optimize")) {
        response = "You're currently using an extra array which takes O(N) space. The problem requires O(1) space. Try modifying the array in-place.";
      } else {
        response = "I'm looking at your code. Remember to check edge cases!";
      }
      setAiMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  if (isClosed) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="bg-card glass-panel p-8 text-center max-w-md w-full">
          <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Class Work Closed</h2>
          <p className="text-sm text-muted-foreground mb-6">The deadline (23:59) has passed. You can no longer submit answers for this assignment.</p>
          <button onClick={() => navigate('/student/cw')} className="bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase tracking-widest w-full">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background h-[calc(100vh-80px)] flex flex-col border border-border relative overflow-hidden">
      
      {/* Anti-Cheating Warning Overlay */}
      {showWarning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-widest">Suspicious Activity Detected</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="h-12 bg-card border-b border-border flex justify-between items-center px-4 shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/student/cw')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-foreground leading-tight">{cw.title}</h1>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Marks: {cw.marks}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-[10px] font-mono text-muted-foreground">
             {tabSwitches > 0 && <span className="text-green-500 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Tab Switches: {tabSwitches}</span>}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono border-r border-border pr-4">
            <Save className="w-3 h-3" /> {saveStatus}
          </div>
          <button 
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 border transition-colors ${showAIPanel ? 'bg-primary/20 text-primary border-primary/50' : 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20'}`}
          >
            <Bot className="w-4 h-4" /> AI Tutor
          </button>
          <div className="flex items-center gap-2 text-primary font-mono font-bold bg-primary/10 px-3 py-1 border border-primary/20">
            <Clock className="w-4 h-4" />
            <span className={diff < 300000 ? 'text-red-500 animate-pulse' : ''}>{timeString}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Problem Statement / History */}
        <div className="w-[30%] bg-background border-r border-border flex flex-col z-10">
          <div className="flex border-b border-border bg-card">
             <button 
               className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'problem' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
               onClick={() => setActiveTab('problem')}
             >
               Problem
             </button>
             <button 
               className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'submissions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
               onClick={() => setActiveTab('submissions')}
             >
               History
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {activeTab === 'problem' ? (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">Description</h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">{cw.description}</p>
                </div>
                
                <div className="flex gap-4">
                  <span className="text-xs font-mono bg-muted text-foreground px-2 py-1 flex items-center gap-1"><Clock className="w-3 h-3 text-muted-foreground" /> {cw.timeLimit}s CPU Limit</span>
                  <span className="text-xs font-mono bg-muted text-foreground px-2 py-1 flex items-center gap-1"><Save className="w-3 h-3 text-muted-foreground" /> {cw.memoryLimit}MB RAM</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Input Format</h3>
                  <p className="text-sm text-foreground/80">{cw.inputFormat}</p>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Output Format</h3>
                  <p className="text-sm text-foreground/80">{cw.outputFormat}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                 <div className="text-xs font-mono text-muted-foreground text-center py-8">No previous submissions.</div>
              </div>
            )}
          </div>
        </div>

        {/* Middle Panel: Editor & Terminal */}
        <div className={`flex flex-col transition-all duration-300 ${showAIPanel ? 'w-[45%]' : 'flex-1'}`}>
          {/* Editor Header */}
          <div className="h-12 bg-card border-b border-border flex justify-between items-center px-4 shrink-0">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-background border border-border px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50"
            >
              {languages.map(lang => <option key={lang}>{lang}</option>)}
            </select>
            
            <div className="flex gap-3 text-xs font-bold uppercase tracking-widest">
              <button 
                onClick={handleRun} 
                disabled={isExecuting || isSubmitting}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
              >
                {isExecuting ? <span className="animate-spin relative w-3 h-3 border-2 border-foreground border-t-transparent rounded-full" /> : <Play className="w-3 h-3" />} 
                Run Code
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || isExecuting}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isSubmitting ? <span className="animate-spin relative w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full" /> : <CheckCircle2 className="w-3 h-3" />} 
                Submit Answer
              </button>
            </div>
          </div>
          
          {/* Editor */}
          <div className="flex-[3] bg-card relative" onPaste={handlePaste}>
            <Editor
              height="100%"
              language={language.toLowerCase() === "c++" ? "cpp" : language.toLowerCase()}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                scrollBeyondLastLine: false,
                padding: { top: 16 }
              }}
            />
          </div>

          {/* Terminal / Output */}
          <div className="flex-[2] border-t border-border bg-card flex flex-col shrink-0">
            <div className="h-10 bg-muted/20 border-b border-border flex px-4">
              <button 
                onClick={() => setConsoleTab("visible")}
                className={`px-4 text-xs font-bold uppercase tracking-widest transition-colors border-t-2 ${consoleTab === 'visible' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Visible Tests
              </button>
              <button 
                onClick={() => setConsoleTab("console")}
                className={`px-4 text-xs font-bold uppercase tracking-widest transition-colors border-t-2 ${consoleTab === 'console' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Execution Log
              </button>
              {submissionResult && (
                <button 
                  onClick={() => setConsoleTab("hidden")}
                  className={`px-4 text-xs font-bold uppercase tracking-widest transition-colors border-t-2 ${consoleTab === 'hidden' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  Hidden Tests Result
                </button>
              )}
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto font-mono text-sm bg-background">
              {consoleTab === 'visible' && (
                <div className="flex flex-col gap-4">
                   <div className="border border-border p-4 bg-muted/5">
                      <div className="flex items-center gap-2 mb-3">
                         <span className="px-2 py-1 bg-muted font-bold text-xs">Test Case 1</span>
                         <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Does not impact score</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Input</span>
                            <pre className="mt-1 bg-card border border-border p-2 text-xs">{cw.sampleInput}</pre>
                         </div>
                         <div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Expected Output</span>
                            <pre className="mt-1 bg-card border border-border p-2 text-xs">{cw.sampleOutput}</pre>
                         </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                         <button onClick={handleRun} className="text-xs text-primary font-bold uppercase tracking-widest hover:text-primary/80">Run this case {'>'}</button>
                      </div>
                   </div>
                </div>
              )}
              
              {consoleTab === 'console' && (
                 <div className="whitespace-pre-wrap text-foreground">
                   {output ? output : <span className="text-muted-foreground">Run or submit code to see execution logs...</span>}
                 </div>
              )}

              {consoleTab === 'hidden' && submissionResult && (
                 <div className="flex flex-col gap-4">
                   <div className={`border p-6 flex flex-col items-center justify-center text-center ${submissionResult.status === 'Accepted' ? 'border-green-500/50 bg-green-500/5' : submissionResult.status === 'Partially Accepted' ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
                      {submissionResult.status === 'Accepted' ? <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" /> : submissionResult.status === 'Partially Accepted' ? <AlertTriangle className="w-12 h-12 text-green-500 mb-2" /> : <XCircle className="w-12 h-12 text-red-500 mb-2" />}
                      <h3 className="text-lg font-bold text-foreground">{submissionResult.status}</h3>
                      <p className="text-sm text-foreground/70 mt-1">Passed {submissionResult.passed} out of {submissionResult.total} hidden test cases.</p>
                      
                      <div className="mt-4 pt-4 border-t border-border/50 w-full flex justify-around">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Score</span>
                          <span className="text-xl font-mono font-bold text-primary">{submissionResult.score} <span className="text-sm">/ {submissionResult.maxScore}</span></span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Runtime</span>
                          <span className="text-sm font-mono text-foreground mt-1">{submissionResult.runtime}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Memory</span>
                          <span className="text-sm font-mono text-foreground mt-1">{submissionResult.memory}</span>
                        </div>
                      </div>
                   </div>
                 </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: AI Assistant */}
        {showAIPanel && (
          <div className="w-[25%] bg-card border-l border-border flex flex-col z-10 animate-in slide-in-from-right-4">
            <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5">
               <div className="flex items-center gap-2">
                 <Bot className="w-5 h-5 text-primary" />
                 <span className="text-sm font-bold uppercase tracking-widest text-foreground">AI Tutor</span>
               </div>
               <div className="text-[9px] uppercase tracking-widest text-primary font-bold px-2 py-1 border border-primary/30 bg-primary/10">Mentor Mode</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
               {aiMessages.map((msg, idx) => (
                 <div key={idx} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                   <div className={`text-[10px] font-bold uppercase tracking-widest text-muted-foreground ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>{msg.role === 'user' ? 'You' : 'AI'}</div>
                   <div className={`px-4 py-3 text-sm rounded-lg max-w-[90%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted border border-border text-foreground rounded-tl-none'} leading-relaxed`}>
                     {msg.content}
                   </div>
                 </div>
               ))}
            </div>

            <div className="p-4 border-t border-border bg-background grid grid-cols-2 gap-2">
               <button onClick={() => handleAIAction("Ask for a Hint")} className="bg-card border border-border hover:bg-muted p-2 flex flex-col items-center gap-1 transition-colors group">
                 <Lightbulb className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Ask Hint</span>
               </button>
               <button onClick={() => handleAIAction("Explain an Error")} className="bg-card border border-border hover:bg-muted p-2 flex flex-col items-center gap-1 transition-colors group">
                 <AlertTriangle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Explain Error</span>
               </button>
               <button onClick={() => handleAIAction("Check my Logic")} className="bg-card border border-border hover:bg-muted p-2 flex flex-col items-center gap-1 transition-colors group">
                 <Code2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Check Logic</span>
               </button>
               <button onClick={() => handleAIAction("Optimize my Code")} className="bg-card border border-border hover:bg-muted p-2 flex flex-col items-center gap-1 transition-colors group">
                 <ShieldCheck className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Optimize Code</span>
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

