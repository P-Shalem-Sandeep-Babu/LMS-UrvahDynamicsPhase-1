import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, AlertTriangle, Calendar, Award, Clock, ArrowRight, BookOpen, 
  ChevronLeft, ChevronRight, Bookmark, ArrowLeft, Terminal, Upload, FileText, Paperclip, Check, Play 
} from "lucide-react";
import { useTestAssignment, TestAssignment, Attempt, MCQAnswer } from "../../../../context/TestAssignmentContext";
import { useAuth } from "../../../../context/AuthContext";

export const AssessmentSuite = () => {
  const { assessments, attempts, submitAttempt, getLeaderboard } = useTestAssignment();
  const { user } = useAuth();

  // Active overlays
  const [activeTest, setActiveTest] = useState<TestAssignment | null>(null);
  const [reviewAttempt, setReviewAttempt] = useState<Attempt | null>(null);

  // Filter tabs for student
  const [subTab, setSubTab] = useState<"assigned" | "history" | "leaderboard">("assigned");

  // Filter out assessments matching student's batch (or All Batches)
  const studentBatch = "FS-Cohort Alpha"; // Matching default student batches
  const availableAss = assessments.filter(ass => ass.targetBatch === "All Batches" || ass.targetBatch === studentBatch);

  // States for active MCQ testing
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({}); // questionId -> optionIndex
  const [bookmarkedQs, setBookmarkedQs] = useState<Record<string, boolean>>({}); // questionId -> true/false
  const [visitedQs, setVisitedQs] = useState<Record<string, boolean>>({}); // questionId -> true/false
  const [timeLeft, setTimeLeft] = useState(0);

  // States for Code Challenge taking
  const [editorCode, setEditorCode] = useState("");
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [codeConsole, setCodeConsole] = useState<string[]>([]);
  const [passedCheckCases, setPassedCheckCases] = useState<boolean | null>(null);

  // States for general Upload Assignment taking
  const [essayText, setEssayText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Timers
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up active test structure
  const startAssessment = (ass: TestAssignment) => {
    // Check if double attempts are locked out (already submitted)
    const hasAttempted = attempts.some(att => att.testId === ass.id && att.userId === user?.id);
    if (hasAttempted) {
      alert("You have already reached the maximum execution attempts limit for this module.");
      return;
    }

    setActiveTest(ass);
    setCurrentQIndex(0);
    setSelectedOptions({});
    setBookmarkedQs({});
    setVisitedQs({ [ass.questions?.[0]?.id || ""]: true });

    if (ass.type === "MCQ") {
      setTimeLeft(ass.duration * 60);
    } else if (ass.type === "Coding") {
      setTimeLeft(ass.duration * 60);
      setEditorCode(ass.codingQuestion?.templateCode || "");
      setCodeConsole(["Console ready.", "Execute compilation hooks."]);
      setPassedCheckCases(null);
    } else {
      setTimeLeft(0);
      setEssayText("");
      setUploadedFile(null);
    }
  };

  // MCQ Timer decrement listener
  useEffect(() => {
    if (activeTest && activeTest.type !== "Assignment" && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (activeTest && activeTest.type !== "Assignment" && timeLeft === 0) {
      // Automatic Submit Trigger when timer hits zero!
      handleFinalSubmission(true);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTest, timeLeft]);

  // Handle MCQ options choice & visited markers
  const selectMCQOption = (qId: string, optIdx: number) => {
    setSelectedOptions(prev => ({ ...prev, [qId]: optIdx }));
  };

  const nextQuestion = (questionsCount: number) => {
    if (activeTest?.questions) {
      const nextIdx = Math.min(questionsCount - 1, currentQIndex + 1);
      setCurrentQIndex(nextIdx);
      const nextQId = activeTest.questions[nextIdx]?.id;
      if (nextQId) {
        setVisitedQs(prev => ({ ...prev, [nextQId]: true }));
      }
    }
  };

  const prevQuestion = () => {
    const prevIdx = Math.max(0, currentQIndex - 1);
    setCurrentQIndex(prevIdx);
    if (activeTest?.questions) {
      const prevQId = activeTest.questions[prevIdx]?.id;
      if (prevQId) {
        setVisitedQs(prev => ({ ...prev, [prevQId]: true }));
      }
    }
  };

  const toggleBookmark = (qId: string) => {
    setBookmarkedQs(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Run Simulated Test Cases
  const executeSandboxCode = () => {
    if (!activeTest?.codingQuestion) return;
    setIsRunningCode(true);
    setCodeConsole(prev => [...prev, "❯ Running compilation engine...", "❯ Checking assertion matrices..."]);
    
    setTimeout(() => {
      setIsRunningCode(false);
      setPassedCheckCases(true);
      setCodeConsole(prev => [
        ...prev,
        "✔ Test Case 1: PASS Input matching outputs successfully.",
        "✔ Test Case 2: PASS Performance optimized bounds checked.",
        "STATUS COMPILATION: SUCCESSFUL [O(N) Complex space verified]"
      ]);
    }, 1200);
  };

  // Submitting assignment files drag simulations
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0].name);
    }
  };

  // Final submit handler (MCQ, Coding or Assignment)
  const handleFinalSubmission = (isTimeout = false) => {
    if (!activeTest) return;

    if (isTimeout) {
      alert("Allotted examination timeframe expired. Auto-grading intermediate calculations.");
    }

    // Build MCQ questions Answer payload
    let ansPayload: MCQAnswer[] = [];
    let calculatedMCQScore = 0;

    if (activeTest.type === "MCQ" && activeTest.questions) {
      ansPayload = activeTest.questions.map(q => {
        const sel = selectedOptions[q.id] !== undefined ? selectedOptions[q.id] : -1;
        return {
          questionId: q.id,
          selectedOption: sel,
          isBookmarked: !!bookmarkedQs[q.id]
        };
      });
    }

    const isLateness = new Date() > new Date(activeTest.deadline);

    const submission: Omit<Attempt, "id" | "submittedAt"> = {
      userId: user?.id || "stu_01",
      userName: user?.name || "Alex Johnson",
      userAvatar: user?.avatar || "https://i.pravatar.cc/150",
      testId: activeTest.id,
      testTitle: activeTest.title,
      type: activeTest.type,
      score: 0, // Auto calculated inside context for MCQs/Coding, or graded by Trainer
      totalMarks: activeTest.totalMarks,
      answers: activeTest.type === "MCQ" ? ansPayload : undefined,
      codeSubmitted: activeTest.type === "Coding" ? editorCode : undefined,
      assignmentText: activeTest.type === "Assignment" ? essayText : undefined,
      fileNameAttached: uploadedFile || undefined,
      status: activeTest.type === "Assignment" ? "Pending Review" : "Graded"
    };

    submitAttempt(submission);
    setActiveTest(null);
  };

  const formatTimer = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="border border-border bg-card">
      {/* Sub tabs of examination modules */}
      <div className="flex justify-between items-center px-4 py-3.5 border-b border-border bg-white/[0.01]">
         <div className="flex gap-4">
            <button 
              onClick={() => setSubTab("assigned")}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${
                subTab === "assigned" ? "text-primary border-b-2 border-primary" : "text-muted-foreground/80 hover:text-foreground"
              }`}
            >
              Assigned Assessments
            </button>
            <button 
              onClick={() => setSubTab("history")}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${
                subTab === "history" ? "text-primary border-b-2 border-primary" : "text-muted-foreground/80 hover:text-foreground"
              }`}
            >
              Result History & Labs
            </button>
            <button 
              onClick={() => setSubTab("leaderboard")}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${
                subTab === "leaderboard" ? "text-primary border-b-2 border-primary" : "text-muted-foreground/80 hover:text-foreground"
              }`}
            >
              Cadet Leaderboard
            </button>
         </div>
         <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">Assessment Hub</span>
      </div>

      <div className="p-5">
         {subTab === "assigned" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {availableAss.map(ass => {
                  const hasAttempted = attempts.find(att => att.testId === ass.id && att.userId === user?.id);
                  const deadlinePassed = new Date() > new Date(ass.deadline);
                  return (
                     <div key={ass.id} className="bg-white/[0.01] border border-border/50 hover:border-border p-5 flex flex-col justify-between gap-4 transition-colors">
                        <div className="space-y-2">
                           <div className="flex justify-between items-start gap-4">
                              <span className={`px-2 py-0.5 text-[8px] uppercase font-mono font-bold border ${
                                 ass.type === 'MCQ' ? 'text-cyan-400 border-cyan-500/20 bg-cyan-400/10' :
                                 ass.type === 'Coding' ? 'text-purple-400 border-purple-500/20 bg-purple-400/10' :
                                 'text-green-400 border-green-500/20 bg-green-400/10'
                              }`}>
                                 {ass.type}
                              </span>
                              
                              <div className="flex items-center gap-1.5 font-mono text-[9px]">
                                 <Clock className="w-3.5 h-3.5 text-muted-foreground/80" />
                                 <span className="text-muted-foreground/80">{ass.duration === 0 ? "No Time Limit" : `${ass.duration} Mins`}</span>
                              </div>
                           </div>

                           <div className="space-y-1 text-left">
                              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">{ass.title}</h3>
                              <p className="text-[10px] font-mono text-white/55 leading-relaxed lowercase line-clamp-2">{ass.description}</p>
                           </div>
                        </div>

                        <div className="border-t border-border/50 pt-3 flex items-center justify-between">
                           <div className="text-left font-mono text-[10px]">
                              <span className="text-muted-foreground/60 lowercase block mb-0.5 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-muted-foreground/60" /> Deadline Date:
                              </span>
                              <span className={deadlinePassed ? "text-rose-500 font-bold" : "text-muted-foreground"}>
                                 {new Date(ass.deadline).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                              </span>
                           </div>

                           {hasAttempted ? (
                              <div className="flex flex-col items-end">
                                 <span className="text-[9px] font-mono text-emerald-500 uppercase flex items-center gap-1 font-bold">
                                   <Check className="w-3.5 h-3.5" /> Synchronized
                                 </span>
                                 <span className="text-[10px] font-bold text-muted-foreground">{hasAttempted.score} / {hasAttempted.totalMarks} pts</span>
                              </div>
                           ) : deadlinePassed && ass.type !== "Assignment" ? (
                              <span className="text-[9px] font-mono font-bold text-rose-500 uppercase tracking-widest">Locked (Expired)</span>
                           ) : (
                              <button 
                                 onClick={() => startAssessment(ass)}
                                 className="px-4 py-1.5 bg-primary hover:bg-foreground text-black text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1"
                              >
                                 {deadlinePassed ? "Late submission" : "Initialize"} <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>
         )}

         {subTab === "history" && (
            <div className="space-y-3">
               {attempts.filter(att => att.userId === user?.id).length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-muted-foreground/60">You have no historic evaluation records. Complete active tests to list grading criteria.</div>
               ) : (
                  attempts.filter(att => att.userId === user?.id).map(att => (
                     <div key={att.id} className="bg-white/[0.01] border border-border/50 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-left space-y-1">
                           <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground uppercase tracking-wider">{att.testTitle}</span>
                              <span className="text-[8px] font-mono uppercase bg-foreground/5 border border-border text-muted-foreground/80 px-1 py-0.5">{att.type}</span>
                           </div>
                           <div className="flex gap-3 text-[10px] font-mono text-muted-foreground/80">
                              <span>Submitted on: {new Date(att.submittedAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className={`font-bold ${att.status === 'Graded' ? "text-emerald-500" : "text-green-500 animate-pulse"}`}>
                                 Status: {att.status}
                              </span>
                           </div>
                           {att.feedback && (
                              <p className="text-[10px] font-mono text-emerald-400 italic bg-background p-2 border border-emerald-500/10 mt-2 max-w-2xl">
                                 <span className="font-bold uppercase not-italic text-foreground hover:text-primary mr-1 bg-foreground/5 px-1 font-sans text-[8px]">Trainer Evaluation remarks</span> {att.feedback}
                              </p>
                           )}
                        </div>
                        <div className="flex items-center gap-4 self-end md:self-center">
                           <div className="text-right font-mono">
                              <span className="text-muted-foreground/60 text-[9px] uppercase tracking-wide block">marks secure</span>
                              <span className="text-sm font-black text-foreground">{att.score} <span className="text-xs text-muted-foreground/60">/ {att.totalMarks}</span></span>
                           </div>
                           <button 
                             onClick={() => setReviewAttempt(att)}
                             className="px-3 py-1.5 border border-border hover:border-white hover:bg-foreground/5 text-[10px] font-bold uppercase transition-all"
                           >
                             Inspect solutions
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         )}

         {subTab === "leaderboard" && (
            <div className="max-w-xl mx-auto border border-white/15 bg-background/40">
               <div className="px-4 py-3 border-b border-border bg-white/[0.02] flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> General Standings</span>
                  <span className="font-mono text-[9px] text-primary">All Test Aggregators</span>
               </div>
               
               <div className="divide-y divide-white/5">
                  {getLeaderboard().slice(0, 10).map((u, idx) => (
                     <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                           <span className={`w-5 font-mono text-center font-bold text-[11px] ${
                             idx === 0 ? "text-yellow-500" : idx === 1 ? "text-slate-300" : idx === 2 ? "text-green-600" : "text-muted-foreground/60"
                           }`}>
                             {idx + 1}
                           </span>
                           <img src={u.avatar} alt={u.name} referrerPolicy="no-referrer" className="w-5 h-5 rounded-full border border-border/80" />
                           <span className="text-foreground/80 font-bold">{u.name} {u.name === user?.name ? "(You)" : ""}</span>
                        </div>
                        <span className="font-mono text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 font-bold leading-none">{u.score} pts</span>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>

      {/* Active Examination Frame Overlay (Takes over center frame gracefully) */}
      {activeTest && (
         <div className="fixed inset-0 z-50 bg-card/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-background border border-border w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
               {/* Exam Header */}
               <div className="p-5 border-b border-white/15 flex justify-between items-center bg-[#0c0c0c] shrink-0">
                  <div className="text-left space-y-1">
                     <span className="px-1.5 py-0.5 text-[8px] border border-primary/20 text-primary uppercase font-mono bg-primary/10 tracking-widest font-black leading-none">{activeTest.type} MODULE</span>
                     <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">{activeTest.title}</h2>
                  </div>

                  {activeTest.type !== "Assignment" && (
                     <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 text-rose-500">
                        <Clock className="w-4 h-4 animate-spin-slow" />
                        <span className="font-mono text-xs font-black tracking-widest">{formatTimer(timeLeft)}</span>
                     </div>
                  )}

                  <button 
                     onClick={() => {
                        if(confirm("Discard current assessment attempts? Progress will be lost.")) {
                           setActiveTest(null);
                        }
                     }}
                     className="text-xs font-mono text-muted-foreground hover:text-foreground pb-0.5 uppercase tracking-wider border-b border-border/80"
                  >
                     Abort exam
                  </button>
               </div>

               {/* Quiz / coding body */}
               <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-6">
                  
                  {activeTest.type === "MCQ" && activeTest.questions && (
                     <>
                        {/* Main Question view */}
                        <div className="flex-1 space-y-5 text-left">
                           <h3 className="text-sm font-black text-foreground font-mono leading-relaxed border-b border-border/50 pb-3">
                             <span className="text-primary mr-1.5">Q{currentQIndex + 1}.</span> 
                             {activeTest.questions[currentQIndex]?.text}
                           </h3>

                           <div className="space-y-2.5">
                              {activeTest.questions[currentQIndex]?.options.map((option, oIdx) => {
                                 const qId = activeTest.questions![currentQIndex].id;
                                 const isSelected = selectedOptions[qId] === oIdx;
                                 return (
                                    <div 
                                       key={oIdx}
                                       onClick={() => selectMCQOption(qId, oIdx)}
                                       className={`p-4 border text-xs text-foreground/80 font-mono transition-all cursor-pointer flex justify-between items-center ${
                                          isSelected 
                                            ? "border-primary bg-primary/5 text-primary" 
                                            : "border-border hover:border-border/80 hover:bg-white/[0.01]"
                                       }`}
                                    >
                                       <span>{option}</span>
                                       <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                          isSelected ? "border-primary" : "border-border"
                                       }`}>
                                          {isSelected && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>

                           <div className="flex justify-between items-center pt-4 border-t border-border/50">
                              <button 
                                 disabled={currentQIndex === 0}
                                 onClick={prevQuestion}
                                 className="px-4 py-2 border border-border/80 text-[10px] font-bold uppercase transition-colors hover:bg-foreground/5 disabled:opacity-20"
                              >
                                 Previous
                              </button>

                              <button 
                                 onClick={() => toggleBookmark(activeTest.questions![currentQIndex].id)}
                                 className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-colors flex items-center gap-1 border border-dashed ${
                                    bookmarkedQs[activeTest.questions![currentQIndex].id]
                                      ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/10"
                                      : "text-muted-foreground/80 border-border"
                                 }`}
                              >
                                 <Bookmark className="w-3.5 h-3.5" /> {bookmarkedQs[activeTest.questions![currentQIndex].id] ? "Flagged" : "Flag / bookmark"}
                              </button>

                              {currentQIndex < activeTest.questions.length - 1 ? (
                                 <button 
                                    onClick={() => nextQuestion(activeTest.questions!.length)}
                                    className="px-4 py-2 bg-foreground text-black text-[10px] font-black uppercase transition-colors hover:bg-white/95"
                                 >
                                    Next Question
                                 </button>
                              ) : (
                                 <button 
                                    onClick={() => handleFinalSubmission(false)}
                                    className="px-5 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                                 >
                                    Submit assessment
                                 </button>
                              )}
                           </div>
                        </div>

                        {/* Question palette widgets sidebar */}
                        <div className="w-full md:w-56 shrink-0 bg-white/[0.01] border border-border p-4 space-y-4 text-left">
                           <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest border-b border-border/50 pb-2">Question Palette</h4>
                           <div className="grid grid-cols-4 gap-2">
                              {activeTest.questions.map((q, idx) => {
                                 const isSelected = selectedOptions[q.id] !== undefined;
                                 const isBookmarked = !!bookmarkedQs[q.id];
                                 const isVisited = !!visitedQs[q.id];
                                 const isActive = idx === currentQIndex;

                                 let colorClass = "bg-[#090909] border-border text-muted-foreground/80"; // unvisited
                                 if (isActive) {
                                   colorClass = "border-primary bg-primary/10 text-primary font-bold shadow-[0_0_8px_rgba(var(--color-primary),0.2)]";
                                 } else if (isBookmarked) {
                                   colorClass = "border-[#eab308] bg-[#eab308]/15 text-[#eab308]";
                                 } else if (isSelected) {
                                   colorClass = "border-[#10b981] bg-[#10b981]/15 text-[#10b981]";
                                 } else if (isVisited) {
                                   colorClass = "border-rose-500/30 bg-rose-500/10 text-rose-500";
                                 }

                                 return (
                                    <button 
                                       key={q.id}
                                       onClick={() => {
                                          setCurrentQIndex(idx);
                                          setVisitedQs(prev => ({ ...prev, [q.id]: true }));
                                       }}
                                       className={`h-10 border font-mono text-xs flex items-center justify-center transition-all ${colorClass}`}
                                    >
                                       {idx + 1}
                                    </button>
                                 );
                              })}
                           </div>

                           <div className="space-y-1.5 pt-4 text-[9px] font-mono text-muted-foreground/80 border-t border-border/50">
                              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> Answered choice</div>
                              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-yellow-500 rounded-sm" /> Flagged / Bookmarked</div>
                              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-red-500 rounded-sm" /> Skipped / Visited</div>
                              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#090909] border border-white/15 rounded-sm" /> Not Visited outstanding</div>
                           </div>
                        </div>
                     </>
                  )}

                  {activeTest.type === "Coding" && activeTest.codingQuestion && (
                     <div className="w-full flex flex-col md:flex-row gap-4 h-full">
                        {/* Prompt and Description */}
                        <div className="flex-1 space-y-4 text-left border-r border-border/50 pr-4">
                           <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-1">
                             <Terminal className="w-4 h-4 text-primary" /> Challenge: {activeTest.codingQuestion.title}
                           </h3>
                           <div className="p-3.5 bg-white/[0.01] border border-white/15 text-xs font-mono text-foreground/80 leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                              {activeTest.codingQuestion.description}
                           </div>

                           <div className="space-y-2 pt-2">
                              <h5 className="text-[10px] font-bold text-foreground uppercase tracking-wider">Algorithmic assertion limits</h5>
                              <div className="bg-background/40 border border-border/50 p-3 rounded space-y-2 text-[10px] font-mono text-muted-foreground/80 leading-relaxed">
                                 <div><span className="text-muted-foreground">Limit time:</span> 2000ms</div>
                                 <div><span className="text-muted-foreground">Memory footprint scale:</span> 64.0 MB</div>
                              </div>
                           </div>
                        </div>

                        {/* Code Sandbox and run results */}
                        <div className="flex-1 flex flex-col justify-between gap-4 h-full">
                           <div className="flex-1 flex flex-col gap-2">
                              <div className="flex justify-between items-center px-1">
                                 <span className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest">Interactive editor terminal (typescript/javascript)</span>
                                 {passedCheckCases && <span className="text-[9px] text-emerald-500 font-bold font-mono uppercase">✔ Checked cases Passed</span>}
                              </div>
                              <textarea 
                                 value={editorCode}
                                 onChange={(e) => setEditorCode(e.target.value)}
                                 className="w-full flex-1 min-h-[180px] bg-background border border-border p-3.5 text-xs text-primary font-mono outline-none focus:border-primary/50"
                              />
                           </div>

                           {/* Console view */}
                           <div className="h-[120px] bg-background border border-border font-mono text-[9px] text-muted-foreground p-2 overflow-y-auto text-left space-y-1">
                              {codeConsole.map((log, lIdx) => (
                                 <div key={lIdx} className="leading-tight">{log}</div>
                              ))}
                           </div>

                           <div className="flex justify-between items-center border-t border-border/50 pt-3 shrink-0">
                              <button 
                                 disabled={isRunningCode}
                                 onClick={executeSandboxCode}
                                 className="px-4 py-2 bg-foreground/10 hover:bg-white/15 text-foreground text-[10px] font-bold uppercase transition-colors flex items-center gap-1.5 disabled:opacity-40"
                              >
                                 <Play className="w-3.5 h-3.5" /> {isRunningCode ? "Running compilation..." : "Run Test Cases"}
                              </button>

                              <button 
                                 onClick={() => handleFinalSubmission(false)}
                                 className="px-5 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                              >
                                 Submit active code sandbox
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTest.type === "Assignment" && (
                     <div className="w-full flex flex-col gap-5 text-left max-w-2xl mx-auto">
                        <div className="space-y-1.5 border-b border-border/50 pb-2">
                           <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Project Instructions Guidelines</h3>
                           <p className="text-[10px] font-mono text-white/55 leading-relaxed">{activeTest.description}</p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Submittal answers/notes essay description</label>
                           <textarea 
                              rows={5}
                              placeholder="Describe your design specifications, links to repositories, or subjective explanations..." 
                              value={essayText}
                              onChange={(e) => setEssayText(e.target.value)}
                              className="bg-background border border-border p-3 text-xs font-mono text-foreground focus:outline-none focus:border-primary/40 leading-relaxed" 
                           />
                        </div>

                        {/* Simulated File Attachment Module */}
                        <div className="flex flex-col gap-1.5">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Upload supplementary files (PDF, Schema exports, ZIP archives)</label>
                           <div 
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              className={`border-2 border-dashed p-6 text-center text-xs font-mono transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                 uploadedFile 
                                   ? "border-emerald-500 bg-emerald-500/5 text-emerald-500" 
                                   : isDragging 
                                     ? "border-primary bg-primary/5 text-primary" 
                                     : "border-border bg-white/[0.01] hover:bg-foreground/5 text-muted-foreground/80"
                              }`}
                              onClick={() => {
                                 const name = prompt("Enter mock uploaded file name (e.g. topology_manifest.pdf):");
                                 if (name) setUploadedFile(name);
                              }}
                           >
                              <Paperclip className="w-6 h-6 opacity-40 mx-auto" />
                              {uploadedFile ? (
                                 <div>
                                    <span className="font-bold uppercase text-[10px] block">✔ File attached successfully</span>
                                    <span>{uploadedFile} (Click to replace file)</span>
                                 </div>
                              ) : (
                                 <div>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">Drag simulated file here or Click to browse</span>
                                    <span className="text-[9px] text-muted-foreground/60 lowercase">Simulates attachment file uploads safely</span>
                                 </div>
                              )}
                           </div>
                        </div>

                        <div className="flex justify-end pt-3 border-t border-border/50">
                           <button 
                              onClick={() => handleFinalSubmission(false)}
                              className="px-6 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-primary/95 transition-all shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                           >
                              Grade / submit assignment files
                           </button>
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </div>
      )}

      {/* Historic attempt solution review popup overlay */}
      {reviewAttempt && (
         <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border w-full max-w-2xl p-6 space-y-4 shadow-2xl text-left">
               <div className="flex justify-between items-center border-b border-border pb-2 bg-background -mx-6 -mt-6 p-4">
                  <div>
                     <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-widest">historic solutions audit</span>
                     <h3 className="text-xs font-black text-foreground uppercase tracking-wider">{reviewAttempt.testTitle}</h3>
                  </div>
                  <button onClick={() => setReviewAttempt(null)} className="text-muted-foreground/80 hover:text-foreground text-xs p-1">Close</button>
               </div>

               <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div className="space-y-1">
                     <p className="text-muted-foreground/80 uppercase">Attempt ID: <span className="text-foreground font-sans">{reviewAttempt.id}</span></p>
                     <p className="text-muted-foreground/80 uppercase">Format: <span className="text-foreground flex items-center inline-block">{reviewAttempt.type}</span></p>
                     <p className="text-muted-foreground/80 uppercase">Review date: <span className="text-foreground font-sans">{new Date(reviewAttempt.submittedAt).toLocaleDateString()}</span></p>
                  </div>
                  <div className="space-y-1 text-right">
                     <p className="text-muted-foreground/80 uppercase">Target Score Criteria</p>
                     <span className="text-lg font-black font-mono text-primary">{reviewAttempt.score} / {reviewAttempt.totalMarks} Points</span>
                  </div>
               </div>

               {reviewAttempt.answers && reviewAttempt.answers.length > 0 && (
                  <div className="space-y-2 border border-border/50 p-3.5 bg-background/40 max-h-[220px] overflow-y-auto custom-scrollbar">
                     <h4 className="text-[10px] font-bold uppercase text-muted-foreground border-b border-border/50 pb-1 mb-2 font-sans tracking-widest">MCQ Options Selection audit</h4>
                     {reviewAttempt.answers.map((ans, idx) => (
                        <div key={idx} className="text-xs font-mono flex items-center justify-between py-1 border-b border-white/[0.02]">
                           <span className="text-muted-foreground">Question {idx+1} indices selection:</span>
                           <span className="text-foreground font-bold">{ans.selectedOption === -1 ? "Skipped" : `Choice option: ${ans.selectedOption + 1}`}</span>
                        </div>
                     ))}
                  </div>
               )}

               {reviewAttempt.codeSubmitted && (
                  <div className="space-y-2">
                     <h4 className="text-[10px] font-bold uppercase text-muted-foreground border-b border-border/50 pb-1 font-sans tracking-widest">Submitted compilation codebase</h4>
                     <pre className="bg-background border border-border p-3 font-mono text-[10px] leading-relaxed text-emerald-400 max-h-[180px] overflow-y-auto whitespace-pre rounded select-all">
                        {reviewAttempt.codeSubmitted}
                     </pre>
                  </div>
               )}

               {reviewAttempt.assignmentText && (
                  <div className="space-y-2">
                     <h4 className="text-[10px] font-bold uppercase text-muted-foreground border-b border-border/50 pb-1 font-sans tracking-widest">Submitted Essay written notes description</h4>
                     <pre className="bg-background border border-border p-3 font-mono text-[10px] leading-relaxed text-foreground/70 max-h-[140px] overflow-y-auto whitespace-pre-wrap rounded">
                        {reviewAttempt.assignmentText}
                     </pre>
                  </div>
               )}

               {reviewAttempt.feedback && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 italic text-xs font-mono rounded">
                     <span className="font-bold uppercase not-italic text-foreground mr-1.5 bg-foreground/5 px-2 py-0.5 text-[9px] border border-border">Evaluator remarks:</span>
                     {reviewAttempt.feedback}
                  </div>
               )}

               <div className="flex justify-end pt-2 border-t border-border/50">
                  <button 
                    onClick={() => setReviewAttempt(null)}
                    className="px-5 py-2 hover:bg-foreground bg-primary text-black text-[10px] font-black uppercase transition-all"
                  >
                     Acknowledge review
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
