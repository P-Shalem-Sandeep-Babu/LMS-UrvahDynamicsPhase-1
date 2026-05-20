import { useState, useEffect } from "react";
import { Building2, Layers, Search, Calendar, Users, Eye, PlaySquare } from "lucide-react";
import { getStoredBatches } from "../../../../utils/batchState";
import { Link } from "react-router-dom";

const mockColleges = [
  { id: "col_3", name: "Global Institute of Technology", mappedBatches: 1, totalStudents: 30 },
  { id: "col_4", name: "Future Skills Academy", mappedBatches: 1, totalStudents: 25 }
];

export const BatchesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [batches, setBatches] = useState(() => getStoredBatches());

  useEffect(() => {
    const handleUpdate = () => {
      setBatches(getStoredBatches());
    };
    window.addEventListener("urvah_batches_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_batches_update", handleUpdate);
    };
  }, []);

  const filteredBatches = batches.filter(
    (b) =>
      b.facultyId === "fac_1" || b.facultyId === "fac_01" || b.facultyId === "faculty_1" // Mock faculty ID filter
  ).filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.collegeName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-8 animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex justify-between items-center bg-card border border-border p-4">
               <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Your Mentored Batches</h3>
                  <p className="text-[10px] font-mono text-muted-foreground">Manage batches assigned to your oversight.</p>
               </div>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input type="text" placeholder="Search batches..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64 bg-card border border-border text-foreground text-sm font-mono px-10 py-2 focus:outline-none focus:border-primary/50 transition-colors" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {filteredBatches.map(batch => (
                  <div key={batch.id} className="border border-border bg-card p-5 flex flex-col group hover:bg-white/[0.02] hover:border-border/80 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-foreground/5 border border-border flex items-center justify-center">
                           <Layers className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-primary px-2 py-1 bg-primary/10 border border-primary/20">
                           {batch.codingActivity}% Activity
                        </span>
                     </div>
                     <Link to={`/batches/${batch.id}`} className="text-lg font-bold text-foreground mb-1 hover:text-primary transition-colors">{batch.name}</Link>
                     <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6">
                        <Building2 className="w-3 h-3" /> {batch.collegeName}
                     </div>

                     <div className="mt-auto flex justify-between items-end border-t border-border pt-4">
                        <div className="flex flex-col gap-1">
                           <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80">Students</span>
                           <span className="text-xs font-bold text-foreground flex items-center gap-1.5"><Users className="w-3 h-3 text-primary" /> {batch.studentCount}</span>
                        </div>
                        <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                           <PlaySquare className="w-3 h-3" /> Start Contest
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="border border-border bg-card p-6 flex flex-col gap-4 h-full">
               <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-4">Assigned Colleges</h3>
               
               <div className="flex flex-col gap-4">
                  {mockColleges.map((college, idx) => (
                     <div key={idx} className="flex border border-border/50 bg-white/[0.01] p-4 flex-col gap-3">
                        <div className="flex items-center gap-3">
                           <Building2 className="w-5 h-5 text-primary" />
                           <h4 className="text-sm font-bold text-foreground">{college.name}</h4>
                        </div>
                        <div className="flex gap-4 items-center">
                           <div className="flex flex-col">
                              <span className="text-[9px] uppercase font-mono text-muted-foreground/80 mb-1">Batches</span>
                              <span className="text-sm font-bold font-mono text-foreground">{college.mappedBatches}</span>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[9px] uppercase font-mono text-muted-foreground/80 mb-1">Students</span>
                              <span className="text-sm font-bold font-mono text-foreground">{college.totalStudents}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="mt-auto pt-4 border-t border-border">
                  <button className="w-full py-3 bg-foreground/5 hover:bg-foreground/10 transition-colors text-[10px] font-bold uppercase tracking-widest text-foreground flex items-center justify-center gap-2">
                     <Eye className="w-3 h-3" /> View Institution Analytics
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
