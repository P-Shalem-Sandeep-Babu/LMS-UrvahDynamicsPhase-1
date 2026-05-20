import React, { useState } from "react";
import { Plus, BookOpen, Clock, FileCode2, Users, Search, CheckCircle2 } from "lucide-react";
import { CreateCWModal } from "./CreateCWModal";

export const CWManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data for analytics
  const analytics = {
    total: 24,
    active: 5,
    submitted: 850,
    pending: 120,
    avgScore: "82%"
  };

  const mockCws = [
    { id: "1", title: "Data Structures - Trees", type: "Coding", batch: "FS-Cohort Alpha", college: "VJIT", questions: 5, deadline: "2026-05-20T23:59:00Z", status: "Active" },
    { id: "2", title: "React Basics", type: "MCQ", batch: "WebDev Bootcamp", college: "CBIT", questions: 20, deadline: "2026-05-21T23:59:00Z", status: "Active" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Class Work Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage, create, and monitor class work assignments</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg hover:shadow-primary/20"
        >
          <Plus className="w-4 h-4" /> Create New CW
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: "Pass Percentage", value: "78%" },
          { icon: FileCode2, label: "Hidden TC Success", value: "85%", color: "text-green-500" },
          { icon: Clock, label: "Avg Runtime", value: "0.24s" },
          { icon: BookOpen, label: "Avg Memory", value: "18.5 MB", color: "text-primary" },
        ].map((card, i) => (
          <div key={i} className="bg-card border border-border p-4 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{card.label}</span>
              <card.icon className={`w-4 h-4 ${card.color || "text-muted-foreground"}`} />
            </div>
            <div className={`text-2xl font-bold font-mono ${card.color || "text-foreground"}`}>
              {card.value}
            </div>
          </div>
        ))}
        
        <div className="lg:col-span-4 bg-muted/10 border border-border p-4 flex items-center justify-between text-sm">
           <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Most Failed Question</span>
             <span className="font-mono text-foreground">Graph Traversal (DFS) - 62% failure rate</span>
           </div>
           <div className="flex flex-col gap-1 items-end">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Performance Trend</span>
             <span className="font-mono text-green-500 flex items-center gap-1">+4.2% passing rate this week <CheckCircle2 className="w-3 h-3" /></span>
           </div>
        </div>
      </div>

      {/* CW List */}
      <div className="bg-card glass-panel shadow-sm flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Recent Class Works</h2>
          <div className="relative w-64">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
             <input type="text" placeholder="Search CWs..." className="w-full bg-background border border-border text-foreground text-sm pl-10 pr-4 py-2 focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/10">
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Title & Type</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Target Audience</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Questions</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Deadline</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCws.map((cw) => (
                <tr key={cw.id} className="border-b border-border hover:bg-muted/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-sm text-foreground">{cw.title}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-widest">Type: {cw.type}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">{cw.batch}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1">{cw.college}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground font-bold">{cw.questions} Qs</span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">{new Date(cw.deadline).toLocaleDateString()}</div>
                    <div className="text-[10px] font-mono text-green-500 mt-1 uppercase tracking-widest">Ends 23:59</div>
                  </td>
                  <td className="p-4">
                     <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-green-500/10 text-green-600 border border-green-500/20">
                       {cw.status}
                     </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[10px] font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateModalOpen && <CreateCWModal onClose={() => setIsCreateModalOpen(false)} />}
    </div>
  );
};
