import { useState } from "react";
import { X, CheckCircle2, ListChecks, Code2, Layers, PlusCircle, Trash } from "lucide-react";
import { useTestAssignment, MCQQuestion, CodingQuestion } from "../../../../context/TestAssignmentContext";

interface TestCreationModalProps {
  onClose: () => void;
}

export const TestCreationModal = ({ onClose }: TestCreationModalProps) => {
  const { addAssessment } = useTestAssignment();
  const [step, setStep] = useState(1);
  const [testType, setTestType] = useState<"MCQ" | "Coding" | "Assignment">("MCQ");

  // State for Step 2
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(30);
  const [deadline, setDeadline] = useState(() => {
    const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    return defaultDate.toISOString().slice(0, 16);
  });
  const [totalMarks, setTotalMarks] = useState(100);
  const [targetBatch, setTargetBatch] = useState("All Batches");

  // State for MCQ questions
  const [mcqQuestions, setMcqQuestions] = useState<MCQQuestion[]>([
    {
      id: "q_1",
      text: "What is the primary purpose of useMemo in React components?",
      options: [
        "To memoize expensive computations between re-renders",
        "To perform stateful network requests asynchronously",
        "To force child components to bypass the standard render pipeline",
        "To assign unique static identifiers to virtual DOM nodes"
      ],
      correctAnswer: 0
    }
  ]);
  const [newMcqText, setNewMcqText] = useState("");
  const [newMcqOptions, setNewMcqOptions] = useState<string[]>(["", "", "", ""]);
  const [newMcqCorrect, setNewMcqCorrect] = useState(0);

  // State for Coding question
  const [codingTitle, setCodingTitle] = useState("");
  const [codingDesc, setCodingDesc] = useState("");
  const [codingTemplate, setCodingTemplate] = useState("function solution(input) {\n  // Write your logic here\n  return input;\n}");
  const [codingInput1, setCodingInput1] = useState("");
  const [codingOutput1, setCodingOutput1] = useState("");
  const [codingInput2, setCodingInput2] = useState("");
  const [codingOutput2, setCodingOutput2] = useState("");

  const handleAddMcqQuestion = () => {
    if (!newMcqText.trim()) return;
    if (newMcqOptions.some(opt => !opt.trim())) {
      alert("Please fill in all 4 option slots for the question");
      return;
    }
    const newQ: MCQQuestion = {
      id: `q_${Date.now()}`,
      text: newMcqText,
      options: [...newMcqOptions],
      correctAnswer: newMcqCorrect
    };
    setMcqQuestions(prev => [...prev, newQ]);
    setNewMcqText("");
    setNewMcqOptions(["", "", "", ""]);
    setNewMcqCorrect(0);
  };

  const handleRemoveMcqQuestion = (index: number) => {
    setMcqQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAssessment = () => {
    if (!title.trim()) {
      alert("Please specify a title");
      return;
    }

    let payload: any = {
      title,
      description,
      type: testType,
      duration: testType === "Assignment" ? 0 : Number(duration),
      deadline,
      totalMarks: Number(totalMarks),
      targetBatch
    };

    if (testType === "MCQ") {
      if (mcqQuestions.length === 0) {
        alert("Please add at least one multiple choice question to this assessment");
        return;
      }
      payload.questions = mcqQuestions;
    } else if (testType === "Coding") {
      if (!codingTitle.trim()) {
        alert("Please set a coding challenge title");
        return;
      }
      const codingQuestion: CodingQuestion = {
        id: `cod_${Date.now()}`,
        title: codingTitle,
        description: codingDesc,
        templateCode: codingTemplate,
        testCases: [
          { input: codingInput1 || "[]", output: codingOutput1 || "0" },
          { input: codingInput2 || "[]", output: codingOutput2 || "0" }
        ]
      };
      payload.codingQuestion = codingQuestion;
    }

    addAssessment(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-card border border-border shadow-2xl flex flex-col max-h-[90vh] text-left">
         {/* Header */}
         <div className="flex justify-between items-center p-6 border-b border-border bg-background shrink-0">
            <div>
               <h2 className="text-sm font-black text-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                 <Layers className="w-4 h-4 text-primary" /> Create {testType} Module
               </h2>
               <span className="text-[10px] font-mono text-muted-foreground tracking-widest mt-1 block uppercase">Step {step} of 3</span>
            </div>
            <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
               <X className="w-5 h-5" />
            </button>
         </div>

         {/* Content Area */}
         <div className="p-6 md:p-8 flex-1 overflow-y-auto min-h-[40vh] custom-scrollbar">
            {step === 1 && (
               <div className="space-y-6 animate-in slide-in-from-right-8 duration-200">
                  <div className="space-y-1">
                     <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Select Format</h3>
                     <p className="text-[10px] font-mono text-muted-foreground/80 uppercase">Determine the operational scope of this task</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
                     {[
                        { id: "MCQ", title: "MCQ Practice Module", icon: ListChecks, desc: "Multiple choice test with instant grading and dynamic question palettes." },
                        { id: "Coding", title: "Coding Challenge", icon: Code2, desc: "Automated test sandbox that compiles solutions against custom test inputs." },
                        { id: "Assignment", title: "Project Assignment", icon: Layers, desc: "Hands-on subjective system tasks enabling CAD code or diagram attachments." }
                     ].map(type => (
                        <div 
                           key={type.id}
                           onClick={() => setTestType(type.id as any)}
                           className={`p-5 border cursor-pointer transition-all flex flex-col gap-4 ${
                              testType === type.id 
                                 ? 'border-primary bg-primary/5 text-primary shadow-[0_0_15px_rgba(var(--color-primary),0.1)]' 
                                 : 'border-border bg-white/[0.01] hover:bg-foreground/5 hover:border-border/80'
                           }`}
                        >
                           <type.icon className={`w-7 h-7 ${testType === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                           <div>
                              <h4 className="font-bold text-xs mb-1 text-foreground uppercase tracking-wide">{type.title}</h4>
                              <p className="text-[10px] font-mono leading-relaxed text-muted-foreground/80 lowercase">{type.desc}</p>
                           </div>
                           <div className="mt-auto pt-2 flex justify-end">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                 testType === type.id ? 'border-primary' : 'border-border'
                              }`}>
                                 {testType === type.id && <div className="w-2 h-2 bg-primary rounded-full animate-ping" />}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {step === 2 && (
               <div className="space-y-6 animate-in slide-in-from-right-8 duration-200">
                  <div className="space-y-1">
                     <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Metadata Configurations</h3>
                     <p className="text-[10px] font-mono text-muted-foreground/80 uppercase">Define cohorts, durations, and criteria</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Module Title</label>
                        <input 
                           type="text" 
                           placeholder="e.g., Dynamic Reducer Optimization" 
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-primary/50" 
                        />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Student Cohort</label>
                        <select 
                           value={targetBatch}
                           onChange={(e) => setTargetBatch(e.target.value)}
                           className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-primary/50"
                        >
                           <option value="All Batches">All Batches (Standard)</option>
                           <option value="FS-Cohort Alpha">FS-Cohort Alpha</option>
                           <option value="FS-Cohort Beta">FS-Cohort Beta</option>
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Allotted Marks</label>
                        <input 
                           type="number" 
                           value={totalMarks}
                           onChange={(e) => setTotalMarks(Number(e.target.value))}
                           className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-primary/50" 
                        />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time Limit (Minutes)</label>
                        <input 
                           type="number" 
                           disabled={testType === "Assignment"}
                           placeholder={testType === "Assignment" ? "No limit" : "30"}
                           value={testType === "Assignment" ? "" : duration}
                           onChange={(e) => setDuration(Number(e.target.value))}
                           className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-primary/50 disabled:opacity-30" 
                        />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Deadline system Date</label>
                        <input 
                           type="datetime-local" 
                           value={deadline}
                           onChange={(e) => setDeadline(e.target.value)}
                           className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2 px-1 focus:outline-none focus:border-primary/50" 
                        />
                     </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Brief Operational Instructions</label>
                     <textarea 
                        rows={3} 
                        placeholder="Detail constraints, instructions, late scoring parameters, or rules..." 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2 focus:outline-none focus:border-primary/50" 
                     />
                  </div>
               </div>
            )}

            {step === 3 && (
               <div className="space-y-6 animate-in slide-in-from-right-8 duration-200">
                  {testType === "MCQ" && (
                     <div className="space-y-4">
                        <div className="flex justify-between items-center bg-white/[0.01] p-3 border border-border/50">
                           <div>
                              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Question List ({mcqQuestions.length} added)</h4>
                              <p className="text-[10px] font-mono text-muted-foreground/80">These will be auto-graded once submitted by users.</p>
                           </div>
                        </div>

                        {mcqQuestions.length > 0 && (
                           <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 border border-border p-2 bg-background/40">
                              {mcqQuestions.map((q, idx) => (
                                 <div key={q.id} className="flex justify-between items-start gap-4 p-2 bg-white/[0.01] border border-border/50 text-xs">
                                    <div className="space-y-1">
                                       <span className="font-mono text-muted-foreground text-[10px]">Q{idx+1}: {q.text}</span>
                                       <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1 font-mono text-[9px] text-muted-foreground/60">
                                          {q.options.map((opt, oIdx) => (
                                             <div key={oIdx} className={oIdx === q.correctAnswer ? "text-primary font-bold" : ""}>
                                                • {opt} {oIdx === q.correctAnswer ? "(Correct)" : ""}
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                    <button 
                                       onClick={() => handleRemoveMcqQuestion(idx)}
                                       className="text-muted-foreground/80 hover:text-red-500 hover:bg-foreground/5 p-1 transition-all rounded"
                                    >
                                       <Trash className="w-3.5 h-3.5" />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        )}

                        <div className="p-4 bg-background border border-border space-y-3">
                           <h5 className="text-[10px] font-bold text-foreground uppercase tracking-wider">Add Question Block</h5>
                           <div className="flex flex-col gap-1">
                              <input 
                                 type="text" 
                                 placeholder="e.g. Which React 19 API serves dynamic metadata updates?" 
                                 value={newMcqText}
                                 onChange={(e) => setNewMcqText(e.target.value)}
                                 className="w-full bg-background border border-border text-foreground text-xs font-mono px-3 py-2 focus:outline-none focus:border-primary/40"
                              />
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {newMcqOptions.map((opt, oIdx) => (
                                 <input 
                                    key={oIdx}
                                    type="text" 
                                    placeholder={`Option ${oIdx+1}`} 
                                    value={opt}
                                    onChange={(e) => {
                                       const updated = [...newMcqOptions];
                                       updated[oIdx] = e.target.value;
                                       setNewMcqOptions(updated);
                                    }}
                                    className="bg-background border border-border text-foreground text-xs font-mono px-3 py-1.5 focus:outline-none focus:border-primary/40"
                                 />
                              ))}
                           </div>

                           <div className="flex justify-between items-center pt-1.5">
                              <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-mono text-muted-foreground">Correct Answer Index:</span>
                                 <select 
                                    value={newMcqCorrect}
                                    onChange={(e) => setNewMcqCorrect(Number(e.target.value))}
                                    className="bg-background border border-border text-foreground text-xs font-mono px-2 py-0.5"
                                 >
                                    <option value={0}>Option 1</option>
                                    <option value={1}>Option 2</option>
                                    <option value={2}>Option 3</option>
                                    <option value={3}>Option 4</option>
                                 </select>
                              </div>

                              <button 
                                 onClick={handleAddMcqQuestion}
                                 type="button" 
                                 className="px-4 py-1.5 bg-foreground/10 hover:bg-foreground/20 text-foreground text-[10px] font-bold uppercase transition-colors"
                              >
                                 Add to Queue
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {testType === "Coding" && (
                     <div className="space-y-4 font-mono text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-muted-foreground uppercase font-sans">Challenge Title</label>
                              <input 
                                 type="text" 
                                 placeholder="e.g. Binary Search Tree Mirror" 
                                 value={codingTitle}
                                 onChange={(e) => setCodingTitle(e.target.value)}
                                 className="bg-background border border-border p-2 text-foreground focus:outline-none" 
                              />
                           </div>
                           <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-muted-foreground uppercase font-sans">Description Prompt</label>
                              <textarea 
                                 rows={2}
                                 placeholder="Given root node, write algorithm to swap all left/right branches..." 
                                 value={codingDesc}
                                 onChange={(e) => setCodingDesc(e.target.value)}
                                 className="bg-background border border-border p-2 text-foreground focus:outline-none" 
                              />
                           </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                           <label className="text-[10px] font-bold text-muted-foreground uppercase font-sans">Template Editor Code Skeleton</label>
                           <textarea 
                              rows={3} 
                              value={codingTemplate}
                              onChange={(e) => setCodingTemplate(e.target.value)}
                              className="bg-background border border-border p-2 text-foreground font-mono focus:outline-none" 
                           />
                        </div>

                        <div className="border border-border p-3 bg-background space-y-3 font-sans">
                           <h5 className="text-[10px] font-bold uppercase text-foreground tracking-widest flex items-center gap-1.5">
                             <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Test Check Cases
                           </h5>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white/[0.01] border border-border/50 p-3 space-y-2">
                                 <span className="text-[9px] font-mono text-muted-foreground/80 block">TEST CASE 1 (Primary Verification)</span>
                                 <input 
                                    type="text" 
                                    placeholder="Input (e.g., [4, 2, 7])" 
                                    value={codingInput1}
                                    onChange={(e) => setCodingInput1(e.target.value)}
                                    className="w-full bg-background border border-white/15 text-xs font-mono p-1.5 text-foreground" 
                                 />
                                 <input 
                                    type="text" 
                                    placeholder="Expected Output (e.g., [4, 7, 2])" 
                                    value={codingOutput1}
                                    onChange={(e) => setCodingOutput1(e.target.value)}
                                    className="w-full bg-background border border-white/15 text-xs font-mono p-1.5 text-foreground" 
                                 />
                              </div>

                              <div className="bg-white/[0.01] border border-border/50 p-3 space-y-2">
                                 <span className="text-[9px] font-mono text-muted-foreground/80 block">TEST CASE 2 (Secondary Verification)</span>
                                 <input 
                                    type="text" 
                                    placeholder="Input" 
                                    value={codingInput2}
                                    onChange={(e) => setCodingInput2(e.target.value)}
                                    className="w-full bg-background border border-white/15 text-xs font-mono p-1.5 text-foreground" 
                                 />
                                 <input 
                                    type="text" 
                                    placeholder="Expected Output" 
                                    value={codingOutput2}
                                    onChange={(e) => setCodingOutput2(e.target.value)}
                                    className="w-full bg-background border border-white/15 text-xs font-mono p-1.5 text-foreground" 
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {testType === "Assignment" && (
                     <div className="p-12 border border-border border-dashed text-center space-y-3 bg-white/[0.01]">
                        <Layers className="w-10 h-10 text-muted-foreground/60 mx-auto" />
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Project File Upload Module Active</h4>
                        <p className="text-[10px] font-mono text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
                          Students will submit direct subjective text guidelines and attach single-page code snippets or schematic PDFs directly matching your instructions. Auto-evaluated logs are flagged for trainer grading status.
                        </p>
                     </div>
                  )}
               </div>
            )}
         </div>

         {/* Footer */}
         <div className="p-6 border-t border-border flex justify-between items-center bg-background shrink-0">
            {step > 1 ? (
               <button 
                 onClick={() => setStep(step - 1)}
                 className="px-5 py-2.5 border border-border/80 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors"
               >
                 Go Back
               </button>
            ) : <div></div>}
            
            {step < 3 ? (
               <button 
                 onClick={() => {
                   if (step === 2 && !title.trim()) {
                     alert("Please set a title for this assessment module before proceeding.");
                     return;
                   }
                   setStep(step + 1);
                 }}
                 className="px-5 py-2.5 bg-foreground text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
               >
                 Next Step
               </button>
            ) : (
               <button 
                 onClick={handleSaveAssessment}
                 className="px-5 py-2.5 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary/95 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
               >
                 <CheckCircle2 className="w-4 h-4" /> Finalize Setup
               </button>
            )}
         </div>
      </div>
    </div>
  );
};
