import { useState } from "react";
import { Search, Filter, Calendar, Users, Layers, MoreHorizontal } from "lucide-react";
import { BatchDetailView } from "./BatchDetailView";
import { BatchCreateView } from "./BatchCreateView";

const mockBatches = Array.from({ length: 15 }).map((_, i) => ({
  id: `BCH-${2024 + Math.floor(i / 10)}-${String(i + 1).padStart(3, '0')}`,
  name: `Full Stack Engineering - Cohort ${i + 1}`,
  college: `Engineering College ${i % 3 + 1}`,
  startDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`,
  endDate: `2024-${String(((i + 6) % 12) + 1).padStart(2, '0')}-01`,
  studentsCount: Math.floor(Math.random() * 30) + 20,
  trainers: ["Trainer A", "Trainer B"],
  status: i % 4 === 0 ? "completed" : i % 3 === 0 ? "upcoming" : "active",
  progress: i % 4 === 0 ? 100 : i % 3 === 0 ? 0 : Math.floor(Math.random() * 80) + 10,
}));

export const BatchManagement = () => {
  const [search, setSearch] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <BatchCreateView onBack={() => setIsCreating(false)} />;
  }

  if (selectedBatchId) {
    return <BatchDetailView batchId={selectedBatchId} onBack={() => setSelectedBatchId(null)} />;
  }

  const filteredBatches = mockBatches.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search batches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
             <Filter className="w-3 h-3" /> Status Filter
           </button>
           <button onClick={() => setIsCreating(true)} className="flex-1 md:flex-none bg-primary text-black px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center justify-center shadow-[0_0_15px_var(--color-primary)]">
             Create Batch
           </button>
        </div>
      </div>

      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border bg-white/[0.02]">
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Batch Details</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Timeline</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Composition</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Progress</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatches.map(batch => (
              <tr key={batch.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-foreground text-sm leading-tight">{batch.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/80">{batch.id} • {batch.college}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-muted-foreground/60" /> Start: {batch.startDate}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground/80 ml-4.5">End: {batch.endDate}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-xs font-mono">
                    <span className="text-foreground/80">{batch.studentsCount} Students</span>
                    <span className="text-muted-foreground/80 text-[10px]">{batch.trainers.length} Trainers</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest">
                       <span className={`px-1.5 py-0.5 border ${
                         batch.status === 'completed' ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                         batch.status === 'upcoming' ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' :
                         'text-primary border-primary/20 bg-primary/10'
                       }`}>
                         {batch.status}
                       </span>
                       <span className="text-muted-foreground">{batch.progress}%</span>
                     </div>
                     <div className="h-1 bg-foreground/5 w-full rounded-full overflow-hidden">
                        <div className={`h-full ${batch.status === 'completed' ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${batch.progress}%` }}></div>
                     </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setSelectedBatchId(batch.id)}
                    className="p-2 border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors inline-flex"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
