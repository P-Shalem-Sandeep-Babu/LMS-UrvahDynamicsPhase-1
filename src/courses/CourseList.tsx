import { useState } from "react";
import { lmsMockData } from "../data/lmsMock";
import { BookOpen, Search, PlayCircle, Filter, Clock, CheckCircle2 } from "lucide-react";

export const CourseList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = lmsMockData.courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-6 pb-12">
      <div className="border-b border-border pb-6 mb-2">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Learning Directory
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Access training modules and required curriculum
         </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Search courses, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
               <Filter className="w-3 h-3" /> Filters
            </button>
            <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
               Active Only
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredCourses.map(course => (
           <div key={course.id} className="border border-border bg-card hover:bg-white/[0.02] hover:border-border/80 transition-all cursor-pointer flex flex-col group overflow-hidden">
             <div className="h-40 overflow-hidden relative border-b border-border">
                <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10" />
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                   {course.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="text-[9px] font-mono uppercase tracking-widest bg-background/80 text-foreground px-2 py-1 border border-border backdrop-blur-sm">
                       {tag}
                     </span>
                   ))}
                </div>
             </div>
             
             <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">
                     <Clock className="w-3 h-3" /> {course.lastAccessed}
                   </div>
                   {course.progress === 100 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                  {course.title}
                </h3>
                
                <p className="text-xs font-mono text-muted-foreground line-clamp-2 mb-6">
                  {course.description}
                </p>
                
                <div className="mt-auto">
                   <div className="flex justify-between items-center mb-2 text-[10px] uppercase font-mono tracking-widest">
                     <span className="text-muted-foreground">Module Progress</span>
                     <span className="text-primary font-bold">{course.progress}%</span>
                   </div>
                   <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-primary" 
                         style={{ width: `${course.progress}%` }} 
                       />
                   </div>
                </div>
             </div>
             
             <button className="w-full bg-foreground/5 hover:bg-primary hover:text-black transition-colors py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 border-t border-border">
                <PlayCircle className="w-4 h-4" /> 
                {course.progress === 0 ? 'Initialize' : course.progress === 100 ? 'Review Module' : 'Resume Execution'}
             </button>
           </div>
         ))}
      </div>
    </div>
  );
};
