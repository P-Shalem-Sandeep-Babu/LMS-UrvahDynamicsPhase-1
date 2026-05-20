import { useState } from "react";
import { PlusCircle, Search, Trash, Play, Code2, ListChecks, Filter, Eye, Award, CheckCircle2, TrendingUp, BarChart2 } from "lucide-react";
import { TestCreationModal } from "./TestCreationModal";
import { useTestAssignment, Attempt, TestAssignment } from "../../../../context/TestAssignmentContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from "recharts";

export const AssessmentsView = () => {
  const { assessments, attempts, deleteAssessment, gradeAttempt, getLeaderboard, getAnalytics } = useTestAssignment();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"All" | "MCQ" | "Coding" | "Assignment">("All");
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<"inventory" | "grading">("inventory");

  // Selected assessment for live Analytics & Leaderboard display
  const [selectedAssId, setSelectedAssId] = useState<string | null>(null);

  // States for live grading popup/panel
  const [gradingAttempt, setGradingAttempt] = useState<Attempt | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(0);
  const [feedbackInput, setFeedbackInput] = useState("");

  const selectedAssessment = assessments.find(a => a.id === selectedAssId);
  const analytics = selectedAssId ? getAnalytics(selectedAssId) : null;
  const board = selectedAssId ? getLeaderboard(selectedAssId) : [];

  // Filtered list
  const filteredAssessments = assessments.filter(ass => {
    const matchesSearch = ass.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ass.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || ass.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Calculate high-level stats based on real attempts
  const activeCount = assessments.length;
  const pendingEvaluation = attempts.filter(att => att.status === "Pending Review").length;
  const totalSubCount = attempts.length;

  const handleOpenGrading = (att: Attempt) => {
    setGradingAttempt(att);
    setGradeInput(att.score);
    setFeedbackInput(att.feedback || "");
  };

  const handleGradeSubmit = () => {
    if (!gradingAttempt) return;
    if (gradeInput < 0 || gradeInput > gradingAttempt.totalMarks) {
      alert(`Invalid grade index score. Please supply values between 0 and ${gradingAttempt.totalMarks}`);
      return;
    }
    gradeAttempt(gradingAttempt.id, Number(gradeInput), feedbackInput);
    setGradingAttempt(null);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      {isCreating && <TestCreationModal onClose={() => setIsCreating(false)} />}
      
      {/* Upper Status Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card border border-border p-5 gap-4 shrink-0">
          <div>
             <h3 className="text-sm font-black text-foreground uppercase tracking-wider mb-1">Assessment Management Console</h3>
             <p className="text-[10px] font-mono text-muted-foreground lowercase">Configure MCQ databases, custom Kadane code templates, timed test parameters, and evaluate cadet submittals.</p>
          </div>
          <button 
             onClick={() => setIsCreating(true)}
             className="px-4 py-2.5 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-foreground transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]"
          >
             <PlusCircle className="w-3.5 h-3.5" /> Create Assessment
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="border border-border bg-card p-4 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-3"><ListChecks className="w-4 h-4 text-primary" /> Active Assignments & Tests</span>
            <span className="text-3xl font-black font-mono text-foreground">{activeCount}</span>
         </div>
         <div className="border border-border bg-card p-4 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-3"><Code2 className="w-4 h-4 text-rose-500" /> Pending Evaluation</span>
            <span className="text-3xl font-black font-mono text-rose-500">{pendingEvaluation}</span>
         </div>
         <div className="border border-border bg-card p-4 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-3"><Award className="w-4 h-4 text-emerald-500" /> Total Recorded Submissions</span>
            <span className="text-3xl font-black font-mono text-emerald-500">{totalSubCount}</span>
         </div>
      </div>

      {/* View Select Tab Bar */}
      <div className="flex border-b border-border">
         <button 
           onClick={() => { setActiveTab("inventory"); }}
           className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 ${
             activeTab === "inventory" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"
           }`}
         >
           <ListChecks className="w-3.5 h-3.5" /> Assessment Inventory
         </button>
         <button 
           onClick={() => { setActiveTab("grading"); }}
           className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 relative ${
             activeTab === "grading" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"
           }`}
         >
           <Award className="w-3.5 h-3.5" /> Student Grading Center
           {pendingEvaluation > 0 && (
             <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
           )}
         </button>
      </div>

      {activeTab === "inventory" && (
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* Left Side: Assessment List */}
            <div className="xl:col-span-2 space-y-4">
               <div className="border border-border bg-card">
                  <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01]">
                     <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <input 
                          type="text" 
                          placeholder="Search modules..." 
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)} 
                          className="w-full bg-background border border-border text-foreground text-xs font-mono px-9 py-2 focus:outline-none focus:border-primary/50 transition-colors" 
                        />
                     </div>
                     <div className="flex gap-2 items-center text-xs w-full sm:w-auto self-stretch sm:self-auto justify-end">
                        <span className="text-[10px] font-mono text-muted-foreground/80 uppercase">Format:</span>
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value as any)}
                          className="bg-background border border-border text-foreground font-mono text-[10px] px-2.5 py-1 focus:outline-none"
                        >
                           <option value="All">All Types</option>
                           <option value="MCQ">MCQ Test</option>
                           <option value="Coding">Coding</option>
                           <option value="Assignment">Assignment</option>
                        </select>
                     </div>
                  </div>

                  <table className="w-full text-left border-collapse min-w-[500px]">
                     <thead>
                        <tr className="border-b border-border bg-white/[0.01]">
                           <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Details</th>
                           <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Target / Max Score</th>
                           <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {filteredAssessments.length === 0 ? (
                           <tr>
                              <td colSpan={3} className="p-8 text-center text-xs font-mono text-muted-foreground/60">No assessments found in this cohort range.</td>
                           </tr>
                        ) : (
                           filteredAssessments.map(ass => {
                              const totalAttCount = attempts.filter(att => att.testId === ass.id).length;
                              const isSelected = selectedAssId === ass.id;
                              return (
                                 <tr key={ass.id} className={`border-b border-border/50 hover:bg-white/[0.01] transition-colors ${isSelected ? "bg-primary/[0.02]" : ""}`}>
                                    <td className="p-4">
                                       <div className="flex flex-col gap-1">
                                          <div className="flex items-center gap-2">
                                             <span className="font-bold text-foreground text-xs">{ass.title}</span>
                                             <span className={`px-1.5 py-0.5 text-[8px] uppercase font-mono border ${
                                                ass.type === 'MCQ' ? 'text-cyan-400 border-cyan-500/25 bg-cyan-500/10' :
                                                ass.type === 'Coding' ? 'text-purple-400 border-purple-500/25 bg-purple-500/10' :
                                                'text-green-400 border-green-500/25 bg-green-500/10'
                                             }`}>
                                                {ass.type}
                                             </span>
                                          </div>
                                          <div className="flex gap-2.5 text-[9px] font-mono text-muted-foreground/80">
                                             <span>ID: {ass.id}</span>
                                             <span>•</span>
                                             <span>Duration: {ass.duration === 0 ? "Untimed" : `${ass.duration}m`}</span>
                                             <span>•</span>
                                             <span>By: {new Date(ass.deadline).toLocaleDateString()}</span>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="p-4">
                                       <div className="flex flex-col gap-1 font-mono text-xs">
                                          <span className="text-foreground/80">{ass.targetBatch}</span>
                                          <span className="text-[10px] text-primary font-bold">Max: {ass.totalMarks} Marks</span>
                                       </div>
                                    </td>
                                    <td className="p-4 text-right">
                                       <div className="flex justify-end gap-2">
                                          <button 
                                             onClick={() => setSelectedAssId(isSelected ? null : ass.id)}
                                             className={`px-3 py-1 text-[10px] font-bold uppercase transition-all flex items-center gap-1 border ${
                                               isSelected 
                                                 ? "bg-primary border-primary text-black" 
                                                 : "border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                             }`}
                                          >
                                             <BarChart2 className="w-3 h-3" /> {isSelected ? "Closing" : "Analytics"}
                                          </button>
                                          <button 
                                             onClick={() => {
                                                if(confirm(`Remove assessment ${ass.title} and reset attempts?`)) {
                                                   deleteAssessment(ass.id);
                                                   if (selectedAssId === ass.id) setSelectedAssId(null);
                                                }
                                             }}
                                             className="px-2 py-1 text-[10px] font-bold uppercase hover:bg-rose-500 bg-rose-500/10 border border-rose-500/25 text-rose-500 hover:text-foreground transition-all rounded"
                                             title="Delete Permanently"
                                          >
                                             <Trash className="w-3.5 h-3.5" />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Right Side: Visual Analytics & Leaderboard breakdown */}
            <div className="space-y-4">
               {selectedAssessment && analytics && (
                  <div className="border border-border bg-card p-5.5 space-y-5 animate-in slide-in-from-right-4 duration-300">
                     <div className="flex justify-between items-center border-b border-border pb-3">
                        <div>
                           <h4 className="text-xs font-black text-foreground uppercase tracking-wider">{selectedAssessment.title}</h4>
                           <span className="text-[10px] font-mono text-primary uppercase font-bold">Statistical Breakdown</span>
                        </div>
                        <button 
                          onClick={() => setSelectedAssId(null)}
                          className="text-[10px] font-mono text-muted-foreground/80 hover:text-foreground uppercase"
                        >
                          Clear
                        </button>
                     </div>

                     {/* Stats Panel */}
                     <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background border border-border/50 p-3 text-center">
                           <span className="text-[9px] font-mono text-muted-foreground/80 uppercase block mb-1">Pass Ratio</span>
                           <span className="text-lg font-black font-mono text-emerald-500">{analytics.passRate}%</span>
                        </div>
                        <div className="bg-background border border-border/50 p-3 text-center">
                           <span className="text-[9px] font-mono text-muted-foreground/80 uppercase block mb-1">Average Score</span>
                           <span className="text-lg font-black font-mono text-foreground">{analytics.avgScore} <span className="text-[9px] text-muted-foreground/60">/ {selectedAssessment.totalMarks}</span></span>
                        </div>
                     </div>

                     {/* Recharts score distribution charts */}
                     <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-primary" /> Grade Spread Analytics</span>
                        <div className="h-[140px] w-full bg-background/40 border border-border/50 p-1 pt-3">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={analytics.distribution}>
                                 <XAxis dataKey="scoreRange" stroke="#444" fontSize={8} tickLine={false} />
                                 <YAxis stroke="#444" fontSize={8} allowDecimals={false} tickLine={false} />
                                 <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #222', fontSize: '9px' }} />
                                 <Bar dataKey="count" fill="var(--color-primary)">
                                    {analytics.distribution.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={index === 4 ? "#10b981" : index === 0 ? "#f43f5e" : "#eab308"} />
                                    ))}
                                 </Bar>
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     {/* Dynamic Leaderboard */}
                     <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-yellow-500" /> Active Cadet Standings</span>
                        {board.length === 0 ? (
                           <div className="text-[10px] text-muted-foreground/80 font-mono text-center py-4">No submissions record.</div>
                        ) : (
                           <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                              {board.map((student, idx) => (
                                 <div key={idx} className="bg-background/40 border border-border/50 hover:border-border px-2.5 py-1.5 flex items-center justify-between text-xs transition-colors">
                                    <div className="flex items-center gap-2">
                                       <span className={`font-mono text-[10px] w-4 text-center font-black ${idx === 0 ? "text-yellow-500" : idx === 1 ? "text-slate-400" : idx === 2 ? "text-green-600" : "text-muted-foreground/60"}`}>
                                         {student.rank}
                                       </span>
                                       <img src={student.avatar} alt={student.name} referrerPolicy="no-referrer" className="w-4.5 h-4.5 rounded-full border border-border" />
                                       <span className="font-bold text-foreground/80">{student.name}</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-primary font-black">{student.score} pts</span>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               )}

               {!selectedAssessment && (
                  <div className="p-8 border border-border border-dashed text-center bg-card text-muted-foreground/60 text-xs font-mono rounded">
                     Select an assessment from the left queue to display visual charts, score ranges, and active leaderboard matrices.
                  </div>
               )}
            </div>
         </div>
      )}

      {activeTab === "grading" && (
         <div className="space-y-4">
            <div className="border border-border bg-card">
               <div className="p-4 border-b border-border flex justify-between items-center bg-white/[0.01]">
                  <h4 className="text-xs font-black uppercase text-foreground tracking-widest">Recorded Submissions queue</h4>
                  <span className="font-mono text-[10px] text-muted-foreground/80 uppercase">{attempts.length} total attempts</span>
               </div>

               {attempts.length === 0 ? (
                  <div className="p-10 font-mono text-xs text-muted-foreground/60 text-center">No student submission attempts found.</div>
               ) : (
                  <div className="divide-y divide-white/5">
                     {attempts.map(att => {
                        const isPending = att.status === "Pending Review";
                        return (
                           <div key={att.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors text-xs">
                              <div className="space-y-1.5">
                                 <div className="flex items-center gap-2 font-mono flex-wrap">
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded leading-none ${
                                       att.status === 'Graded' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500' :
                                       att.status === 'Pending Review' ? 'bg-rose-500/10 border border-rose-500/19 text-rose-500 animate-pulse' :
                                       'bg-slate-500/10 border border-slate-500/19 text-slate-500'
                                    }`}>
                                       {att.status}
                                    </span>
                                    <span className="text-[10px] uppercase text-muted-foreground/80 block font-normal">attempt ID: {att.id}</span>
                                    <span className="text-foreground/80 font-bold font-sans text-xs">{att.testTitle} ({att.type})</span>
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <img src={att.userAvatar} alt={att.userName} referrerPolicy="no-referrer" className="w-4 h-4 rounded-full border border-border" />
                                    <span className="font-bold text-foreground/70">{att.userName}</span>
                                    <span className="text-[10px] font-mono text-muted-foreground/60">submitted on: {new Date(att.submittedAt).toLocaleString()}</span>
                                 </div>

                                 {/* Brief answers viewable for assignment evaluations */}
                                 {att.assignmentText && (
                                    <div className="bg-background/30 border border-border/50 p-2.5 max-w-2xl font-mono text-[10px] text-muted-foreground leading-normal rounded">
                                       <span className="text-[9px] font-bold uppercase text-muted-foreground/80 block mb-1">Essay Content:</span>
                                       {att.assignmentText}
                                    </div>
                                 )}

                                 {att.fileNameAttached && (
                                    <div className="text-[10px] font-mono text-primary flex items-center gap-1.5">
                                       <span className="text-muted-foreground/60">Mock Attachment:</span> {att.fileNameAttached}
                                    </div>
                                 )}

                                 {att.codeSubmitted && (
                                    <div className="bg-background/50 border border-border/50 p-2 max-w-2xl font-mono text-[9px] leading-relaxed text-emerald-400 overflow-x-auto whitespace-pre rounded">
                                       <span className="text-[9px] font-bold uppercase text-muted-foreground/80 block mb-1 font-sans">Cadet Solution Source:</span>
                                       {att.codeSubmitted}
                                    </div>
                                 )}

                                 {att.feedback && (
                                    <div className="text-[10px] text-emerald-500 italic font-mono bg-background px-2 py-1 max-w-xl border border-emerald-500/10">
                                       <span className="font-bold uppercase not-italic text-muted-foreground/80 text-[9px] mr-1.5">Trainer Feedback:</span>
                                       {att.feedback}
                                    </div>
                                 )}
                              </div>

                              <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                                 <div className="text-right font-mono">
                                    <span className="block text-muted-foreground/80 text-[9px] uppercase">evaluation Score</span>
                                    <span className="text-sm font-black text-foreground">{att.score} <span className="text-xs text-muted-foreground/60">/ {att.totalMarks}</span></span>
                                 </div>
                                 <button 
                                    onClick={() => handleOpenGrading(att)}
                                    className="px-3 py-1.5 border border-border/80 hover:border-primary text-foreground hover:text-black hover:bg-primary text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                                 >
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Evaluate
                                 </button>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </div>
      )}

      {/* Evaluating Assignment Modal overlay */}
      {gradingAttempt && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-[#0c0c0c] border border-border w-full max-w-lg p-6 space-y-4">
               <div className="flex justify-between items-center border-b border-border pb-2">
                  <h4 className="text-xs font-black uppercase text-foreground tracking-widest flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> Evaluate cadet work</h4>
                  <button onClick={() => setGradingAttempt(null)} className="text-white/45 hover:text-foreground text-xs">Close</button>
               </div>

               <div className="space-y-1 font-mono text-[11px]">
                  <p className="text-muted-foreground/80 uppercase">Student Name: <span className="text-foreground font-bold font-sans">{gradingAttempt.userName}</span></p>
                  <p className="text-muted-foreground/80 uppercase">Task Area: <span className="text-foreground font-bold font-sans">{gradingAttempt.testTitle}</span></p>
                  <p className="text-muted-foreground/80 uppercase">Assigned Weight: <span className="text-foreground">{gradingAttempt.totalMarks} Marks</span></p>
               </div>

               <div className="space-y-3 pt-2">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assigned Marks / Grade</label>
                     <input 
                       type="number" 
                       max={gradingAttempt.totalMarks}
                       min={0}
                       value={gradeInput}
                       onChange={(e) => setGradeInput(Math.min(gradingAttempt.totalMarks, Math.max(0, Number(e.target.value))))}
                       className="bg-background border border-border text-foreground font-mono text-xs p-2.5 focus:outline-none focus:border-primary" 
                     />
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Evaluation Report & Review Feedback</label>
                     <textarea 
                       rows={3} 
                       placeholder="Detail specific suggestions or markdowns..." 
                       value={feedbackInput}
                       onChange={(e) => setFeedbackInput(e.target.value)}
                       className="bg-background border border-border text-foreground font-mono text-xs p-2.5 focus:outline-none focus:border-primary" 
                     />
                  </div>
               </div>

               <div className="flex justify-end gap-3 pt-3 border-t border-border/50">
                  <button 
                    onClick={() => setGradingAttempt(null)}
                    className="px-4 py-2 border border-border/80 text-[10px] font-bold uppercase font-sans text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleGradeSubmit}
                    className="px-4 py-2 bg-primary text-black text-[10px] font-bold uppercase font-sans hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--color-primary),0.2)]"
                  >
                    Submit Grade Results
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
