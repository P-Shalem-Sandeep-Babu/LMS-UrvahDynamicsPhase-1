import { Users, Search, PlayCircle, Filter, Mail, Activity, Eye } from "lucide-react";
import { lmsMockData } from "../data/lmsMock";

export const StudentsList = () => {
  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-6 pb-12">
      <div className="border-b border-border pb-6 mb-2">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Users className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Operative Directory
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Monitor and Manage Student Progression
         </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Query operative by ID or name..."
              className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
               <Filter className="w-3 h-3" /> Risk Filters
            </button>
            <button className="flex-1 md:flex-none bg-primary text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_15px_var(--color-primary)] flex items-center justify-center gap-2">
               <Mail className="w-3 h-3" /> Broadcast Message
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {lmsMockData.students.map(student => (
            <div key={student.id} className="border border-border bg-card  flex flex-col">
               <div className="p-5 flex items-start gap-4 border-b border-border/50">
                  <div className="w-12 h-12 rounded-sm border border-border/80 bg-foreground/5 flex items-center justify-center shrink-0">
                     <span className="text-lg font-bold font-mono text-muted-foreground">{student.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col w-full">
                     <div className="flex justify-between items-start w-full">
                        <h3 className="text-base font-bold text-foreground leading-none mb-1">{student.name}</h3>
                        <span className={`text-[9px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 border ${
                           student.completionRate < 60 ? 'text-red-500 border-red-500/20 bg-red-500/10' :
                           student.completionRate > 90 ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                           'text-yellow-500 border-yellow-500/20 bg-yellow-500/10'
                        }`}>
                           {student.completionRate < 60 ? 'At Risk' : student.completionRate > 90 ? 'Elite' : 'Stable'}
                        </span>
                     </div>
                     <span className="text-xs font-mono text-muted-foreground">{student.email}</span>
                  </div>
               </div>

               <div className="p-5 grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                     <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-mono mb-1">Active Modules</span>
                     <span className="text-foreground font-mono">{student.enrolled}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-mono mb-1">Performance (GPA)</span>
                     <span className="text-primary font-mono">{student.gpa.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-mono">Completion Rate</span>
                        <span className="text-foreground text-xs font-mono">{student.completionRate}%</span>
                     </div>
                     <div className="h-1 bg-foreground/5 w-full rounded-full overflow-hidden">
                        <div 
                           className={`h-full ${student.completionRate < 60 ? 'bg-red-500' : 'bg-primary'}`}
                           style={{ width: `${student.completionRate}%` }}
                        />
                     </div>
                  </div>
               </div>

               <div className="mt-auto border-t border-border/50 grid grid-cols-2">
                  <button className="py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 border-r border-border/50">
                     <Activity className="w-3.5 h-3.5" /> Telemetry
                  </button>
                  <button className="py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                     <Eye className="w-3.5 h-3.5" /> Full Dossier
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
