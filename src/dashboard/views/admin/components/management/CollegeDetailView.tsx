import { useState } from "react";
import { ArrowLeft, Users, Code2, Briefcase, Layers, Presentation, Network, Activity, FileSpreadsheet, PlusCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface CollegeDetailViewProps {
  collegeId: string;
  onBack: () => void;
}

const mockWeeklyActivity = [
  { day: "Mon", active: 320, coding: 280 },
  { day: "Tue", active: 350, coding: 310 },
  { day: "Wed", active: 400, coding: 380 },
  { day: "Thu", active: 420, coding: 400 },
  { day: "Fri", active: 380, coding: 350 },
  { day: "Sat", active: 150, coding: 200 },
  { day: "Sun", active: 180, coding: 220 },
];

const mockDomains = [
  { id: "dom-1", name: "Full Stack Web Development", mappedStudents: 220, activeBatches: 5 },
  { id: "dom-2", name: "Data Science & ML", mappedStudents: 150, activeBatches: 4 },
  { id: "dom-3", name: "Cloud Architecture", mappedStudents: 80, activeBatches: 3 },
];

const mockTrainers = [
  { id: "trn-1", name: "Alice Johnson", role: "Sr. Domain Expert", assignedBatches: 3 },
  { id: "trn-2", name: "David Chen", role: "Technical Trainer", assignedBatches: 2 },
  { id: "trn-3", name: "Sarah Williams", role: "Soft Skills Coach", assignedBatches: 5 },
];

const mockBatches = [
  { id: "BCH-2024-001", name: "FS-Cohort Alpha", domain: "Full Stack", students: 45, completion: 78, trainer: "Alice Johnson" },
  { id: "BCH-2024-002", name: "DS-Cohort Beta", domain: "Data Science", students: 38, completion: 45, trainer: "David Chen" },
  { id: "BCH-2024-003", name: "CA-Cohort Gamma", domain: "Cloud Arch", students: 42, completion: 12, trainer: "Pending" },
];

export const CollegeDetailView = ({ collegeId, onBack }: CollegeDetailViewProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "domains" | "trainers" | "batches">("overview");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border pb-4">
         <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 bg-foreground/5 hover:bg-foreground/10 border border-border transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div className="flex flex-col">
               <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">{collegeId} Dashboard</h2>
               <span className="text-xs font-mono text-muted-foreground">Performance Overview & Management</span>
            </div>
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-border text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors flex items-center gap-2">
               <FileSpreadsheet className="w-3 h-3" /> Export Report
            </button>
         </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border bg-card">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "domains", label: "Domain Mapping", icon: Network },
          { id: "trainers", label: "Trainer Assignment", icon: Presentation },
          { id: "batches", label: "Batch Linking", icon: Layers },
        ].map(tab => {
           const Icon = tab.icon;
           return (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
             >
                <Icon className="w-3 h-3" /> {tab.label}
             </button>
           )
        })}
      </div>

      {/* Overview Tab content */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          {/* Performance KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Users className="w-3 h-3 text-primary" /> Active Students</span>
                <span className="text-3xl font-black font-mono text-foreground">450</span>
                <span className="text-[10px] font-mono text-green-500 mt-2">+12% vs last month</span>
             </div>
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Code2 className="w-3 h-3 text-blue-500" /> Coding Completion</span>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black font-mono text-foreground">68</span>
                   <span className="text-sm font-bold text-blue-500 mb-1">%</span>
                </div>
                <div className="h-1 bg-foreground/5 w-full mt-3"><div className="h-full bg-blue-500 w-[68%]"></div></div>
             </div>
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Briefcase className="w-3 h-3 text-green-500" /> Placement Readiness</span>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black font-mono text-foreground">72</span>
                   <span className="text-sm font-bold text-green-500 mb-1">%</span>
                </div>
                <div className="h-1 bg-foreground/5 w-full mt-3"><div className="h-full bg-green-500 w-[72%]"></div></div>
             </div>
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Layers className="w-3 h-3 text-purple-500" /> Mapped Batches</span>
                <span className="text-3xl font-black font-mono text-foreground">12</span>
                <span className="text-[10px] font-mono text-muted-foreground mt-2">Across 3 Domains</span>
             </div>
          </div>

          {/* Activity Chart */}
          <div className="border border-border bg-card p-6">
             <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6 border-b border-border pb-4">Weekly Platform Activity</h3>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockWeeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="day" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#080808", borderColor: "#ffffff20", borderRadius: "0" }}
                      itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
                      labelStyle={{ fontSize: "12px", color: "#ffffff50", marginBottom: "4px" }}
                      cursor={{ fill: "#ffffff05" }}
                    />
                    <Bar dataKey="active" name="Active Users" fill="#ffffff30" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="coding" name="Coding Submissions" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      )}

      {/* Domain Mapping Tab */}
      {activeTab === "domains" && (
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Domain & Track Allocation</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">Manage learning domains assigned to this institution.</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-primary/20">
                 <PlusCircle className="w-3 h-3" /> Map New Domain
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockDomains.map(domain => (
                 <div key={domain.id} className="border border-border bg-card p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
                    <Network className="w-6 h-6 text-primary mb-4" />
                    <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-widest">{domain.name}</h4>
                    
                    <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-4">
                       <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80 mb-1">Students Mapped</span>
                          <span className="text-lg font-bold text-foreground">{domain.mappedStudents}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80 mb-1">Active Batches</span>
                          <span className="text-lg font-bold text-foreground">{domain.activeBatches}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* Trainer Assignment Tab */}
      {activeTab === "trainers" && (
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Assigned Faculty & Trainers</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">Allocate trainers directly to the college batches.</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-primary/20">
                 <PlusCircle className="w-3 h-3" /> Assign Trainer
              </button>
           </div>
           
           <div className="border border-border bg-card overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border bg-white/[0.02]">
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Trainer Name</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Role</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Batches Handled</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {mockTrainers.map(trainer => (
                   <tr key={trainer.id} className="border-b border-border/50 hover:bg-white/[0.02]">
                     <td className="p-4">
                        <div className="font-bold text-foreground text-sm">{trainer.name}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/80">{trainer.id}</div>
                     </td>
                     <td className="p-4"><span className="px-2 py-1 bg-foreground/5 border border-border text-[10px] uppercase font-mono tracking-widest text-foreground/70">{trainer.role}</span></td>
                     <td className="p-4"><span className="text-xs font-mono text-foreground font-bold">{trainer.assignedBatches} Active</span></td>
                     <td className="p-4 text-right">
                        <button className="text-[10px] font-bold uppercase hover:bg-foreground/10 px-3 py-1.5 transition-colors border border-border text-muted-foreground hover:text-foreground">Unassign</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Batch Linking Tab */}
      {activeTab === "batches" && (
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Batch Registry</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">View all cohorts and batches associated with this college.</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-primary/20">
                 <PlusCircle className="w-3 h-3" /> Link Cohort
              </button>
           </div>
           
           <div className="border border-border bg-card overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border bg-white/[0.02]">
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Batch Identity</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Domain</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Trainer</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Students & Progress</th>
                 </tr>
               </thead>
               <tbody>
                 {mockBatches.map(batch => (
                   <tr key={batch.id} className="border-b border-border/50 hover:bg-white/[0.02]">
                     <td className="p-4">
                        <div className="font-bold text-foreground text-sm">{batch.name}</div>
                        <div className="text-[10px] font-mono text-primary font-bold">{batch.id}</div>
                     </td>
                     <td className="p-4"><span className="text-xs font-mono text-foreground/70">{batch.domain}</span></td>
                     <td className="p-4"><span className="text-xs font-mono text-foreground/70">{batch.trainer}</span></td>
                     <td className="p-4">
                        <div className="flex flex-col gap-2">
                           <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                              <span>{batch.students} Students</span>
                              <span className={batch.completion > 50 ? 'text-green-500' : 'text-yellow-500'}>{batch.completion}%</span>
                           </div>
                           <div className="h-1 w-full bg-foreground/5">
                              <div className={`h-full ${batch.completion > 50 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${batch.completion}%` }}></div>
                           </div>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

    </div>
  );
};
