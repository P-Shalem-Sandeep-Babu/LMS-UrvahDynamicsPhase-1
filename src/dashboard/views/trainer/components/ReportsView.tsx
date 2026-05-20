import { useState } from "react";
import { FileSpreadsheet, Download, Filter, Calendar } from "lucide-react";

export const ReportsView = () => {
  const [reportType, setReportType] = useState<"batch" | "student" | "assessment">("batch");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      <div className="border border-border bg-card p-6 lg:p-12 flex flex-col gap-8 max-w-4xl w-full mx-auto mt-4">
         
         <div className="flex flex-col gap-2 items-center text-center">
            <div className="w-16 h-16 bg-foreground/5 border border-border flex items-center justify-center mb-4">
               <FileSpreadsheet className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-widest text-foreground">Generate Reports</h2>
            <p className="text-xs font-mono text-muted-foreground max-w-sm">
               Export attendance, performance, and contest analytics data for your colleges and batches.
            </p>
         </div>

         <div className="border-t border-border pt-8 flex flex-col gap-6 w-full max-w-xl mx-auto">
            <div className="flex flex-col gap-3">
               <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Report Type</label>
               <div className="grid grid-cols-3 gap-2">
                  {['batch', 'student', 'assessment'].map(type => (
                     <button 
                        key={type}
                        onClick={() => setReportType(type as any)}
                        className={`py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                           reportType === type 
                           ? 'border-primary bg-primary/10 text-primary' 
                           : 'border-border bg-card text-muted-foreground hover:bg-foreground/5'
                        }`}
                     >
                        {type} Report
                     </button>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Select Target</label>
               <select className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                  <option>All Batches</option>
                  <option>FS-Cohort Alpha</option>
                  <option>DS-Cohort Gamma</option>
               </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Start Date</label>
                  <div className="relative">
                     <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                     <input type="date" className="w-full bg-card border border-border text-muted-foreground text-sm font-mono pl-10 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-colors focus:text-foreground" />
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">End Date</label>
                  <div className="relative">
                     <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                     <input type="date" className="w-full bg-card border border-border text-muted-foreground text-sm font-mono pl-10 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-colors focus:text-foreground" />
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Format</label>
               <select className="w-full bg-card border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                  <option>CSV (Spreadsheet)</option>
                  <option>PDF (Document)</option>
                  <option>JSON (Raw Data)</option>
               </select>
            </div>

            <button className="mt-4 w-full py-4 bg-primary text-black text-xs font-black uppercase tracking-widest hover:bg-foreground transition-colors flex items-center justify-center gap-3 shadow-[0_0_15px_var(--color-primary)]">
               <Download className="w-4 h-4" /> Generate & Download Report
            </button>
         </div>

      </div>
    </div>
  );
};
