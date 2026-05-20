import { BookOpen, Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import { lmsMockData } from "../data/lmsMock";

export const ManageCourses = () => {
  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-6 pb-12">
      <div className="border-b border-border pb-6 mb-2">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Curriculum Control
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Faculty Module: Course Creation and Management
         </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Search courses..."
              className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
               <Filter className="w-3 h-3" /> Filter Matrix
            </button>
            <button className="flex-1 md:flex-none bg-primary text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_15px_var(--color-primary)] flex items-center justify-center gap-2">
               <Plus className="w-3 h-3" /> Compile New Course
            </button>
         </div>
      </div>

      <div className="border border-border bg-card overflow-x-auto custom-scrollbar hide-scrollbar">
         <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
            <thead>
               <tr className="border-b border-border bg-white/[0.02]">
                  <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Course Title</th>
                  <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Instructor</th>
                  <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Enrolled Operatives</th>
                  <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Directives</th>
               </tr>
            </thead>
            <tbody>
               {lmsMockData.courses.map((course, idx) => (
                  <tr key={course.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                     <td className="p-4">
                        <div className="flex flex-col">
                           <span className="font-bold text-foreground text-sm">{course.title}</span>
                           <div className="flex gap-1 mt-1">
                              {course.tags.slice(0, 2).map((tag, i) => (
                                 <span key={i} className="text-[8px] uppercase tracking-widest font-mono bg-foreground/5 px-1 py-0.5 text-muted-foreground/80">
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </td>
                     <td className="p-4 text-xs font-mono text-foreground/70">{course.instructor}</td>
                     <td className="p-4 text-xs font-mono text-foreground/70">{120 + idx * 8} Active</td>
                     <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
                              <Edit className="w-4 h-4" />
                           </button>
                           <button className="p-2 border border-border text-muted-foreground hover:text-red-500 hover:bg-foreground/5 transition-colors">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
