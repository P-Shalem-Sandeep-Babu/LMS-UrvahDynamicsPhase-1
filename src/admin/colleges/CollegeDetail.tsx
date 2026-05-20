import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Users, UsersRound, BookOpen, Code, Mail, Activity, CalendarDays, MoreHorizontal, Layers, GraduationCap } from "lucide-react";
import { mockColleges } from "../../data/mockColleges";
import { CollegeAnalyticsCard } from "./components/CollegeAnalyticsCard";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

import { BatchTable } from "../../batches/components/BatchTable";
import { mockBatches } from "../../data/mockBatches";
import { EditBatchModal } from "../../batches/components/EditBatchModal";
import { Batch } from "../../types/batch";

import { lmsMockData } from "../../data/lmsMock";
import { ShieldCheck, Search, Filter, Plus } from "lucide-react";

export const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = mockColleges.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState<"overview" | "batches" | "faculty">("overview");
  
  const [editBatch, setEditBatch] = useState<Batch | null>(null);

  if (!college) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <Building2 className="w-12 h-12 text-white/20" />
        <h2 className="text-xl font-bold">College Not Found</h2>
        <Button variant="ghost" onClick={() => navigate("/admin/colleges")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to="/admin/colleges" className="flex items-center gap-2 text-muted-foreground/80 hover:text-foreground transition-colors w-fit text-[10px] font-mono uppercase tracking-widest">
          <ArrowLeft className="w-3 h-3" /> Back to Directory
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div className="flex gap-4 items-start">
            <div className="p-4 bg-foreground/5 border border-border rounded-xl hidden md:block">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-1">
                <Badge variant={college.status === "active" ? "default" : "secondary"} className="uppercase text-[8px] tracking-wider font-mono">
                  {college.status}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Mail className="w-3 h-3" /> {college.emailDomain}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
                {college.name}
              </h1>
              <p className="text-primary font-mono text-xs uppercase tracking-widest">
                Code: {college.code} • Joined {new Date(college.createdAt).getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="bg-foreground/5 border border-border hover:bg-foreground/10 gap-2 text-[10px] uppercase font-bold tracking-widest">
              <Activity className="w-3 h-3 text-primary" /> Generate Report
            </Button>
            <Button variant="ghost" size="icon" className="bg-foreground/5 border border-border hover:bg-foreground/10">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border mt-2 w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Activity className="w-4 h-4" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("batches")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "batches" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" /> Batches
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "faculty" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Faculty
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Analytics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CollegeAnalyticsCard 
          title="Total Students" 
          value={college.numStudents.toLocaleString()} 
          icon={Users} 
          color="blue"
        />
         <CollegeAnalyticsCard 
          title="Active Trainers" 
          value={college.numTrainers} 
          icon={UsersRound} 
          color="green"
        />
        <CollegeAnalyticsCard 
          title="Faculty Members" 
          value={college.numFaculty} 
          icon={BookOpen} 
          color="rose"
        />
        <CollegeAnalyticsCard 
          title="Coding Completion" 
          value={`${college.metrics.codingCompletionPercentage}%`} 
          icon={Code} 
          color="primary"
          trend="12%"
          trendUp={true}
        />
        <CollegeAnalyticsCard 
          title="Weekly Engagement" 
          value={`${college.metrics.weeklyEngagement}%`} 
          icon={CalendarDays} 
          color="green"
          trend="4%"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel border-border rounded-xl p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          </div>
          <div className="text-center z-10">
             <Activity className="w-10 h-10 text-white/20 mx-auto mb-3" />
             <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Activity Heatmap</h3>
             <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">Widget placeholder for full-stack integration</p>
          </div>
        </div>

        <div className="glass-panel border-border rounded-xl p-6 flex flex-col gap-6">
           <div>
             <h3 className="text-xs font-black uppercase tracking-widest border-b border-border pb-2 mb-4">Cohort Distribution</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Freshmen</span>
                      <span className="font-mono">40%</span>
                   </div>
                   <div className="w-full bg-foreground/10 h-1 rounded-full overflow-hidden">
                     <div className="bg-blue-400 h-full" style={{ width: '40%' }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Sophomores</span>
                      <span className="font-mono">30%</span>
                   </div>
                   <div className="w-full bg-foreground/10 h-1 rounded-full overflow-hidden">
                     <div className="bg-green-400 h-full" style={{ width: '30%' }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Juniors</span>
                      <span className="font-mono">20%</span>
                   </div>
                   <div className="w-full bg-foreground/10 h-1 rounded-full overflow-hidden">
                     <div className="bg-green-400 h-full" style={{ width: '20%' }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Seniors</span>
                      <span className="font-mono">10%</span>
                   </div>
                   <div className="w-full bg-foreground/10 h-1 rounded-full overflow-hidden">
                     <div className="bg-rose-400 h-full" style={{ width: '10%' }} />
                   </div>
                </div>
             </div>
           </div>
           
           <div className="mt-auto">
             <h3 className="text-xs font-black uppercase tracking-widest border-b border-border pb-2 mb-4">Quick Stats</h3>
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="text-[10px] text-muted-foreground/80 uppercase font-mono mb-1">Contest Rate</div>
                  <div className="text-lg font-bold text-foreground">{college.metrics.contestParticipation}%</div>
               </div>
               <div>
                  <div className="text-[10px] text-muted-foreground/80 uppercase font-mono mb-1">Total Batches</div>
                  <div className="text-lg font-bold text-foreground">{college.numBatches}</div>
               </div>
            </div>
         </div>
      </div>
      </div>
      </>
      )}

      {activeTab === "batches" && (
        <div className="flex flex-col gap-6 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Batches under {college.name}</h3>
            <Button className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] items-center gap-2">
              <Plus className="w-3 h-3" /> Create Batch
            </Button>
          </div>
          <BatchTable 
            batches={mockBatches.filter(b => b.collegeId === college.id)}
            onEdit={(b) => setEditBatch(b)}
            onDelete={(b) => console.log("Delete", b)}
          />
        </div>
      )}

      {activeTab === "faculty" && (
        <div className="flex flex-col gap-6 animate-in fade-in">
           <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
             <h3 className="text-xl font-bold">Faculty records for {college.name}</h3>
             <div className="flex items-center gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
                   <Filter className="w-3 h-3" /> Dept Filters
                </button>
                <button className="flex-1 md:flex-none bg-primary text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                   <Plus className="w-3 h-3" /> Provision Account
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {lmsMockData.courses.slice(0, 3).map((course, i) => (
                <div key={course.id} className="border border-border bg-card flex flex-col group hover:bg-white/[0.02] hover:border-border/80 transition-all rounded-xl overflow-hidden">
                   <div className="p-5 flex items-start gap-4 border-b border-border/50">
                      <div className="w-12 h-12 rounded-sm border border-border/80 bg-primary/10 flex items-center justify-center shrink-0">
                         <span className="text-lg font-bold font-mono text-primary">{course.instructor.charAt(0)}</span>
                      </div>
                      <div className="flex flex-col w-full">
                         <div className="flex justify-between items-start w-full">
                            <h3 className="text-base font-bold text-foreground leading-none mb-1">{course.instructor}</h3>
                            <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 border text-primary border-primary/20 bg-primary/10">
                               {i % 2 === 0 ? 'Senior' : 'Adjunct'}
                            </span>
                         </div>
                         <span className="text-xs font-mono text-muted-foreground">{course.instructor.split(' ')[0].toLowerCase()}@{college.emailDomain || "urvah.edu"}</span>
                      </div>
                   </div>

                   <div className="p-5 grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                         <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-mono mb-1">Assigned Modules</span>
                         <span className="text-foreground font-mono">{1 + (i % 3)} Active</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-mono mb-1">Student Load</span>
                         <span className="text-primary font-mono">{120 + i * 45} Users</span>
                      </div>
                   </div>

                   <div className="mt-auto border-t border-border/50 grid grid-cols-2">
                      <button className="py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 border-r border-border/50">
                         <Mail className="w-3.5 h-3.5" /> Secure Msg
                      </button>
                      <button className="py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
                         <ShieldCheck className="w-3.5 h-3.5" /> Access Rights
                      </button>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      <EditBatchModal 
        batch={editBatch} 
        isOpen={!!editBatch} 
        onClose={() => setEditBatch(null)} 
        onSubmit={console.log}
      />
    </div>
  );
};
