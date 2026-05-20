import { useState } from "react";
import { Search, Filter, Building2, MapPin, Edit2, Users, Activity } from "lucide-react";
import { CollegeDetailView } from "./CollegeDetailView";

const mockColleges = Array.from({ length: 12 }).map((_, i) => ({
  id: `COL-${100 + i}`,
  name: `Institute of Technology & Science ${i + 1}`,
  location: i % 2 === 0 ? "New York, NY" : "San Francisco, CA",
  students: Math.floor(Math.random() * 500) + 100,
  trainers: Math.floor(Math.random() * 10) + 2,
  status: i % 10 === 0 ? "archived" : "active",
  performanceIndex: (Math.random() * 2 + 7).toFixed(1), // 7.0 to 9.0
}));

export const CollegeManagement = () => {
  const [search, setSearch] = useState("");
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);

  if (selectedCollegeId) {
    return <CollegeDetailView collegeId={selectedCollegeId} onBack={() => setSelectedCollegeId(null)} />;
  }

  const filteredColleges = mockColleges.filter(c => 

    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search colleges by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <button className="w-full md:w-auto border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
          <Filter className="w-3 h-3" /> Region Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college, idx) => (
          <div key={college.id} className="border border-border bg-card p-5 flex flex-col group relative overflow-hidden transition-colors hover:bg-white/[0.02] hover:border-border/80 cursor-pointer">
             <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-foreground/5 border border-border flex items-center justify-center relative z-10">
                   <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className={`text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-1 border ${
                  college.status === 'active' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-zinc-500 border-zinc-500/20 bg-zinc-500/10'
                }`}>
                  {college.status}
                </span>
             </div>
             
             <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{college.name}</h3>
             <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest mb-6">
                <MapPin className="w-3 h-3" /> {college.location}
             </div>

             <div className="grid grid-cols-2 gap-4 mt-auto border-t border-border/50 pt-4">
                <div className="flex flex-col">
                   <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80 mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> Population</span>
                   <span className="text-sm font-bold text-foreground font-mono">{college.students} Students</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80 mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> PI Score</span>
                   <span className="text-sm font-bold text-primary font-mono">{college.performanceIndex} / 10</span>
                </div>
             </div>

             {/* Hover Analytics Overlay */}
             <div className="absolute inset-0 bg-card/95 backdrop-blur-sm p-5 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-widest border-b border-border pb-2">Quick Stats</h4>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-muted-foreground">Active Batches</span>
                      <span className="text-foreground">12</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-muted-foreground">Trainers Assigned</span>
                      <span className="text-foreground">{college.trainers}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-muted-foreground">Avg Placement %</span>
                      <span className="text-primary font-bold">84%</span>
                   </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-2">
                   <button className="py-2 bg-foreground/5 hover:bg-foreground/10 text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors flex items-center justify-center gap-2">
                     <Edit2 className="w-3 h-3" /> Edit
                   </button>
                   <button 
                     onClick={() => setSelectedCollegeId(college.id)}
                     className="py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest transition-colors"
                   >
                     Full Report
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
