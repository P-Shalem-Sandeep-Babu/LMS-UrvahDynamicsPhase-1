import { useState } from "react";
import { ArrowLeft, PlusCircle, CheckCircle2 } from "lucide-react";

interface BatchCreateViewProps {
  onBack: () => void;
}

export const BatchCreateView = ({ onBack }: BatchCreateViewProps) => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <button 
          onClick={onBack}
          className="p-2 bg-foreground/5 hover:bg-foreground/10 border border-border transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex flex-col">
           <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">Create New Batch</h2>
           <span className="text-xs font-mono text-muted-foreground">Configure batch details, assignment & schedule.</span>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto border border-border bg-card p-8">
         <div className="flex justify-between items-center mb-8 relative">
             {/* Progress Line */}
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-foreground/5 -translate-y-1/2 z-0"></div>
             
             {[1, 2, 3].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                   <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold font-mono transition-colors border ${
                      step === s ? "bg-primary text-black border-primary shadow-[0_0_15px_var(--color-primary)]" : 
                      step > s ? "bg-green-500 text-black border-green-500" : "bg-card text-muted-foreground border-border"
                   }`}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                   </div>
                   <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-card px-2">
                      {s === 1 ? "Details" : s === 2 ? "Schedule & Domain" : "Faculty"}
                   </span>
                </div>
             ))}
         </div>

         {step === 1 && (
            <div className="flex flex-col gap-6 animate-in fade-in">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Batch Name</label>
                     <input type="text" placeholder="e.g. FS-Cohort Alpha" className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">College / Institution</label>
                     <select className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option>Select College...</option>
                        <option>Engineering College 1</option>
                        <option>Engineering College 2</option>
                     </select>
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Description</label>
                  <textarea rows={4} placeholder="Brief description of the batch objectives..." className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors hide-scrollbar" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Max Capacity</label>
                     <input type="number" placeholder="50" className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>
               </div>
            </div>
         )}

         {step === 2 && (
            <div className="flex flex-col gap-6 animate-in fade-in">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Learning Domain</label>
                     <select className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option>Full Stack Web Development</option>
                        <option>Data Science & ML</option>
                        <option>Cloud Architecture</option>
                     </select>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Start Date</label>
                     <input type="date" className="w-full bg-card border border-border text-muted-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors focus:text-foreground" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">End Date</label>
                     <input type="date" className="w-full bg-card border border-border text-muted-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors focus:text-foreground" />
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Schedule Pattern</label>
                  <div className="flex gap-4">
                     {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <label key={day} className="flex flex-col gap-2 items-center cursor-pointer group">
                           <input type="checkbox" className="hidden peer" />
                           <div className="w-10 h-10 border border-border flex items-center justify-center text-xs font-mono font-bold text-muted-foreground peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-colors group-hover:border-border">
                              {day.charAt(0)}
                           </div>
                        </label>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {step === 3 && (
            <div className="flex flex-col gap-6 animate-in fade-in">
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Primary Trainer</label>
                  <select className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                     <option>Select Primary Trainer...</option>
                     <option>John Doe - Domain Expert</option>
                     <option>Sarah Johnson - Technical Lead</option>
                  </select>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Teaching Assistants (Optional)</label>
                  <select className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none" multiple>
                     <option>Mike Williams</option>
                     <option>Emma Brown</option>
                  </select>
                  <span className="text-[10px] font-mono text-muted-foreground/80">Hold Ctrl/Cmd to select multiple</span>
               </div>
               
               <div className="mt-8 border border-primary/20 bg-primary/5 p-4 flex gap-4 items-center">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                     <h4 className="text-sm font-bold text-foreground mb-1">Ready to Create Batch</h4>
                     <p className="text-[10px] font-mono text-muted-foreground">Upon creation, students mapped to this domain from the selected college will be eligible for enrollment.</p>
                  </div>
               </div>
            </div>
         )}

         <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
            {step > 1 ? (
               <button 
                 onClick={() => setStep(step - 1)}
                 className="px-6 py-3 border border-border/80 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors"
               >
                 Back
               </button>
            ) : <div></div>}
            
            {step < 3 ? (
               <button 
                 onClick={() => setStep(step + 1)}
                 className="px-6 py-3 bg-foreground text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
               >
                 Next Step
               </button>
            ) : (
               <button 
                 onClick={onBack}
                 className="px-6 py-3 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-[0_0_15px_var(--color-primary)]"
               >
                 <PlusCircle className="w-3 h-3" /> Create Batch
               </button>
            )}
         </div>
      </div>
    </div>
  );
};
