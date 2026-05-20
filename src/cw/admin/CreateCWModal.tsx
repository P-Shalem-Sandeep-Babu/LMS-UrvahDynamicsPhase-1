import React, { useState } from "react";
import { X, Plus, Trash2, Calendar, Clock } from "lucide-react";

export const CreateCWModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    title: "",
    college: "",
    batch: "",
    section: "",
    type: "Coding",
    noOfQuestions: 1,
    startDate: "",
    questions: [{}]
  });

  const handleNumQuestionsChange = (num: number) => {
    const qCount = Math.max(1, num);
    const newQuestions = [...formData.questions];
    if (qCount > newQuestions.length) {
      for (let i = newQuestions.length; i < qCount; i++) {
        newQuestions.push({});
      }
    } else {
      newQuestions.splice(qCount);
    }
    setFormData({ ...formData, noOfQuestions: qCount, questions: newQuestions });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-card w-full max-w-4xl border border-border shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20 sticky top-0 z-10 backdrop-blur-md">
          <h2 className="text-lg font-bold text-foreground">Create New Class Work</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-8">
          
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-right-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2">1. Basic Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">CW Title</label>
                  <input type="text" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g., Arrays & Pointers" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">CW Type</label>
                  <select className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Coding">Coding</option>
                    <option value="MCQ">MCQ</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">College</label>
                  <select className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})}>
                    <option value="">Select College</option>
                    <option value="VJIT">VJIT</option>
                    <option value="CBIT">CBIT</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Batch</label>
                  <select className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})}>
                    <option value="">Select Batch</option>
                    <option value="b1">FS-Cohort Alpha</option>
                    <option value="b2">DS-Cohort Beta</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Section (Optional)</label>
                  <input type="text" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g., A" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Start Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="date" className="w-full bg-background border border-border pl-10 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 justify-center mt-4">
                   <div className="bg-primary/5 border border-primary/20 p-3 flex items-center gap-2">
                     <Clock className="w-4 h-4 text-primary" />
                     <p className="text-[10px] font-mono text-primary uppercase tracking-widest leading-relaxed">
                       Deadline is automatically enforced at 23:59 on the start date. No submissions allowed past deadline.
                     </p>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Total Number of Questions</label>
                <input type="number" min="1" max="50" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors w-1/3" value={formData.noOfQuestions} onChange={e => handleNumQuestionsChange(parseInt(e.target.value) || 1)} />
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 pb-4">
               <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 sticky top-14 bg-card z-10">2. Configure {formData.noOfQuestions} Questions</h3>
               
               {formData.questions.map((q: any, i: number) => (
                 <div key={i} className="border border-border p-6 bg-muted/5 relative">
                   <div className="absolute -top-3 left-4 bg-card px-2 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground border border-border">Question {i + 1}</div>
                   
                   {formData.type === 'Coding' || (formData.type === 'Mixed' && i % 2 === 0) ? (
                     <div className="flex flex-col gap-4 mt-2">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-primary mb-2">Coding Type</span>
                       <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Question Title</label>
                         <input type="text" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="e.g. Find Array Pairs" />
                       </div>
                       <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Problem Statement & Description</label>
                         <textarea className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-[100px] resize-y" placeholder="Full problem description..."></textarea>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Input Format</label>
                            <textarea className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 h-16"></textarea>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Output Format</label>
                            <textarea className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 h-16"></textarea>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Sample Input</label>
                            <textarea className="bg-background border border-border px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50 h-20"></textarea>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Sample Output</label>
                            <textarea className="bg-background border border-border px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50 h-20"></textarea>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex justify-between items-center">
                              <span>Visible Test Cases (JSON Format)</span>
                              <span className="text-[9px] uppercase font-bold text-primary bg-primary/10 px-1 opacity-80 border border-primary/20">Not for grading</span>
                            </label>
                            <textarea className="bg-background border border-border px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50 h-24" placeholder='[{"input": "5\\n1 2 3", "output": "3 2 1"}]'></textarea>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex justify-between items-center">
                              <span>Hidden Test Cases (JSON Format)</span>
                              <span className="text-[9px] uppercase font-bold text-green-500 bg-green-500/10 px-1 opacity-80 border border-green-500/20">Used for grading</span>
                            </label>
                            <textarea className="bg-background border border-border px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50 h-24" placeholder='[{"input": "10\\n1 2 3...", "output": "..."}]'></textarea>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                         <div className="flex flex-col gap-1.5">
                           <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Difficulty</label>
                           <select className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
                             <option>Easy</option>
                             <option>Medium</option>
                             <option>Hard</option>
                           </select>
                         </div>
                         <div className="flex flex-col gap-1.5">
                           <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Marks</label>
                           <input type="number" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" defaultValue={10} />
                         </div>
                         <div className="flex flex-col gap-1.5">
                           <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Time L. (s)</label>
                           <input type="number" step="0.5" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" defaultValue={2} />
                         </div>
                         <div className="flex flex-col gap-1.5">
                           <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Mem. L. (MB)</label>
                           <input type="number" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" defaultValue={256} />
                         </div>
                       </div>
                       
                       <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Allowed Languages</label>
                         <div className="flex gap-4 items-center">
                           {['C', 'C++', 'Java', 'Python'].map(lang => (
                             <label key={lang} className="flex items-center gap-2 cursor-pointer">
                               <input type="checkbox" defaultChecked className="accent-primary" />
                               <span className="text-sm font-mono text-foreground">{lang}</span>
                             </label>
                           ))}
                         </div>
                       </div>
                     </div>
                   ) : (
                     <div className="flex flex-col gap-4 mt-2">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-primary mb-2">MCQ Type</span>
                       <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Question</label>
                         <textarea className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-[60px] resize-y" placeholder="What is the time complexity of..."></textarea>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {[1,2,3,4].map(opt => (
                           <div key={opt} className="flex flex-col gap-1.5">
                             <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Option {opt}</label>
                             <div className="flex items-center gap-2">
                               <input type="radio" name={`correct-${i}`} className="accent-primary" title="Mark as correct answer" />
                               <input type="text" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 w-full" placeholder={`Option ${opt} text`} />
                             </div>
                           </div>
                         ))}
                       </div>
                       
                       <div className="flex flex-col gap-1.5 w-1/4">
                         <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Marks</label>
                         <input type="number" className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" defaultValue={1} />
                       </div>
                     </div>
                   )}
                 </div>
               ))}
             </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex justify-end gap-4 sticky bottom-0 z-10 backdrop-blur-md">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
          
          {step === 1 ? (
            <button 
              onClick={() => setStep(2)}
              className="bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Next: Setup Questions
            </button>
          ) : (
            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="border border-border text-foreground px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-muted/50 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={onClose} /* Simulate Save */
                className="bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Publish Class Work
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
