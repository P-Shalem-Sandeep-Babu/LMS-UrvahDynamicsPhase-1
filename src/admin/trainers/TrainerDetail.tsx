import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Users, 
  Building, 
  Activity, 
  Calendar, 
  Mail, 
  Phone, 
  Edit, 
  BookOpen, 
  Settings, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  FileText, 
  Sparkles, 
  ArrowRight,
  BarChart, 
  Star, 
  AlertCircle,
  Download,
  Terminal,
  RefreshCw,
  Award
} from "lucide-react";
import { 
  getStoredTrainers, 
  saveStoredTrainers,
  getTrainerCodingActivities,
  getTrainerWeeklyReports,
  getPerformanceTrend,
  getBatchPerformanceComparisons,
  ActivityLog,
  WeeklyReport,
  PerformanceTrend,
  BatchPerformanceComparison
} from "../../services/trainerService";
import { mockColleges } from "../../data/mockColleges";
import { mockBatches } from "../../data/mockBatches";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { TrainerAssignmentModal } from "./components/TrainerAssignmentModal";

// Recharts imports
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart as RechartsBarChart, 
  Bar, 
  Legend 
} from "recharts";

export const TrainerDetail = () => {
  const { id } = useParams();
  const [allTrainers, setAllTrainers] = useState(() => getStoredTrainers());
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "comparison" | "reports">("overview");
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);

  useEffect(() => {
    // Refresh list if external storage events occur
    const handleStorageUpdate = () => {
      setAllTrainers(getStoredTrainers());
    };
    window.addEventListener("storage_trainers_updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("storage_trainers_updated", handleStorageUpdate);
    };
  }, []);

  const trainer = allTrainers.find(t => t.id === id);

  if (!trainer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-foreground gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <div className="font-mono text-sm uppercase">Trainer dossier file not found</div>
        <Link to="/dashboard" className="text-xs text-primary underline">&larr; Return to Dashboard</Link>
      </div>
    );
  }

  // Reload handler from assignment modal
  const handleSuccessRefresh = () => {
    setAllTrainers(getStoredTrainers());
  };

  const assignedCollegesData = trainer.assignedColleges.map(cid => mockColleges.find(c => c.id === cid)).filter(Boolean);
  const assignedBatchesData = trainer.assignedBatches.map(bid => {
    // Check local storage modified values or fallback to hardcoded
    return mockBatches.find(b => b.id === bid);
  }).filter(Boolean);

  // Load stateful dynamic analytics
  const activities: ActivityLog[] = getTrainerCodingActivities(trainer.id);
  const weeklyReports: WeeklyReport[] = getTrainerWeeklyReports(trainer.id);
  const trendData: PerformanceTrend[] = getPerformanceTrend(trainer.id);
  const batchComparisons: BatchPerformanceComparison[] = getBatchPerformanceComparisons(trainer.id);

  // Simulated exporter
  const triggerExportReport = (reportId: string) => {
    setIsExporting(reportId);
    setTimeout(() => {
      setIsExporting(null);
      // Create and click mock anchor
      const headers = "Week starting, Hours worked, Sessions conducted, Engagement score, Critical issues corrected\n";
      const report = weeklyReports.find(r => r.id === reportId);
      if (report) {
        const rows = `${report.weekStarting}, ${report.hoursWorked}, ${report.sessionsConducted}, ${report.engagementScore}%, ${report.criticalIssuesResolved}\n`;
        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", `trainer_${trainer.name.replace(/\s+/g, '_')}_weekly_report_${report.weekStarting}.csv`);
        a.click();
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in pb-16 w-full max-w-[1200px] mx-auto text-foreground">
      
      {/* Back to Control Panel */}
      <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-xs font-mono uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Go back to Control Board
      </Link>
      
      {/* Head Capsule */}
      <div className="border border-border bg-card p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-primary font-mono">{trainer.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black uppercase tracking-tight">{trainer.name}</h1>
                <Badge className={
                  trainer.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20 uppercase font-mono tracking-widest text-[9px]" : "bg-red-500/10 text-red-500 border-red-500/20 uppercase font-mono tracking-widest text-[9px]"
                }>
                  {trainer.status}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground/80" /> {trainer.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground/80" /> {trainer.phone}</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-primary" /> Senior Technical Lead</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button 
              onClick={() => setIsAssignOpen(true)}
              className="bg-primary text-black font-extrabold text-xs uppercase tracking-wider h-9 hover:bg-primary/95"
            >
              <Settings className="w-4 h-4 mr-2" /> Manage Assignments & replacement
            </Button>
          </div>
        </div>
      </div>

      {/* Meta Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-muted-foreground/80 tracking-widest">Colleges Assigned</p>
            <p className="text-lg font-bold font-mono">{trainer.assignedColleges.length}</p>
          </div>
        </div>

        <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-muted-foreground/80 tracking-widest">Active Batches</p>
            <p className="text-lg font-bold font-mono">{trainer.assignedBatches.length}</p>
          </div>
        </div>

        <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-muted-foreground/80 tracking-widest">Students Guided</p>
            <p className="text-lg font-bold font-mono">{trainer.activeStudents}</p>
          </div>
        </div>

        <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-muted-foreground/80 tracking-widest">Coding Engagement</p>
            <p className="text-lg font-bold font-mono text-primary">{trainer.codingEngagement}%</p>
          </div>
        </div>
      </div>

      {/* Profile Ribbon Switch */}
      <div className="flex items-center gap-6 border-b border-border mt-2 w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "overview" ? "border-primary text-primary font-black" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building className="w-4 h-4" /> Overview & Assignments
        </button>
        <button
          onClick={() => setActiveTab("performance")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "performance" ? "border-primary text-primary font-black" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Performance & Activities
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "comparison" ? "border-primary text-primary font-black" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart className="w-4 h-4" /> Batch Comparison
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "reports" ? "border-primary text-primary font-black" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" /> Weekly Reports ({weeklyReports.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ASSIGNMENTS PANEL */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Assigned Colleges Card */}
          <div className="border border-border p-6 bg-card rounded-xl flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-wider text-xs font-mono flex items-center gap-2 pb-4 border-b border-border text-muted-foreground">
              <Building className="w-4 h-4 text-primary" /> Assigned Colleges Portfolio
            </h3>
            {assignedCollegesData.length === 0 ? (
              <div className="text-muted-foreground/80 font-mono text-xs py-8 text-center flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 opacity-40 text-yellow-500" />
                No college assignments bound to this profile record.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {assignedCollegesData.map(c => c && (
                  <div key={c.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg bg-white/[0.01] hover:bg-white/[0.02] transition-colors gap-3">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-sm text-primary mb-1">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest flex items-center gap-2">
                        {c.code} • Domain: {c.emailDomain}
                      </span>
                    </div>
                    <div className="flex gap-4 text-right justify-between md:justify-end text-xs font-mono">
                      <div className="flex flex-col border-r border-border/50 pr-4">
                        <span className="text-[9px] text-white/35 uppercase">Batches</span>
                        <span className="font-bold text-foreground">{c.numBatches || 0}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-white/35 uppercase">Rating score</span>
                        <span className="font-bold text-yellow-400">● {c.codingActivityScore || 0}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assigned Batches List */}
          <div className="border border-border p-6 bg-card rounded-xl flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-wider text-xs font-mono flex items-center gap-2 pb-4 border-b border-border text-muted-foreground">
              <BookOpen className="w-4 h-4 text-primary" /> Connected Student Batches
            </h3>
            {assignedBatchesData.length === 0 ? (
              <div className="text-muted-foreground/80 font-mono text-xs py-8 text-center flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 opacity-40 text-yellow-500" />
                No student batches assigned to this profile.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {assignedBatchesData.map(b => b && (
                  <div key={b.id} className="flex flex-col p-4 border border-border rounded-lg bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm group-hover:text-primary transition-colors">{b.name}</span>
                      <Badge className="bg-foreground/5 border-border text-foreground/70 font-mono text-[9px] uppercase">{b.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono text-muted-foreground">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground/60 uppercase">Parent College</span>
                        <span className="text-foreground text-xs truncate max-w-[150px]">{b.collegeName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground/60 uppercase">Roster Headcount</span>
                        <span className="text-foreground text-xs flex items-center gap-1"><Users className="w-3 h-3" /> {b.studentCount} Students</span>
                      </div>
                      <div className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-[9px] text-muted-foreground/60 uppercase">Run Duration</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-3 mt-3 flex items-center justify-between text-[11px] font-mono">
                      <div className="flex gap-4">
                        <span>Coding Activity: <strong className="text-primary">{b.codingActivity}%</strong></span>
                        <span>Assignment progress: <strong className="text-green-400">{b.assignmentProgress}%</strong></span>
                      </div>
                      <Link to={`/batches/${b.id}`} className="text-primary hover:underline flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold">
                        Browse Batch <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PERFORMANCE & ACTIVITIES (Charts & Coding Tracker) */}
      {activeTab === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Trend Graph */}
            <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-4">
              <div>
                <h3 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground">
                  Weekly Student Progress Trend
                </h3>
                <p className="text-[10px] text-muted-foreground/80 font-mono mt-1">Monitors engagement loops versus raw assignment submission indices.</p>
              </div>

              <div className="h-[280px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d2fc43" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#d2fc43" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.05} />
                    <XAxis dataKey="week" stroke="#ffffff" strokeOpacity={0.4} fontSize={10} fontStyle="italic" />
                    <YAxis stroke="#ffffff" strokeOpacity={0.4} fontSize={10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }}
                      labelStyle={{ color: "#d2fc43", fontWeight: "bold", fontFamily: "monospace" }}
                    />
                    <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: "11px", fontFamily: "monospace" }} />
                    <Area type="monotone" name="Coding Engagement %" dataKey="engagement" stroke="#d2fc43" strokeWidth={2} fillOpacity={1} fill="url(#colorEngagement)" />
                    <Area type="monotone" name="Assignment Completion %" dataKey="completion" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorCompletion)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Participation indices */}
            <div className="border border-border p-5 bg-card rounded-xl">
              <div>
                <h3 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground mb-1">
                  Weekly Active Participation Headcount
                </h3>
                <p className="text-[10px] text-muted-foreground/80 font-mono mb-4">Total number of students actively making submissions daily.</p>
              </div>
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fff" strokeOpacity={0.03} />
                    <XAxis dataKey="week" stroke="#ffffff" strokeOpacity={0.3} fontSize={10} />
                    <YAxis stroke="#ffffff" strokeOpacity={0.3} fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }}
                    />
                    <Bar name="Active Trainees Headcount" dataKey="activeParticipation" fill="#9333ea" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Coding Activity Tracking Feed */}
          <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-4">
            <div>
              <h3 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground">
                Coding Activity Tracker Log
              </h3>
              <p className="text-[10px] text-muted-foreground/80 font-mono mt-1">Real-time code submissions, reviews, and test assessments processed.</p>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[480px] pr-1">
              {activities.length === 0 ? (
                <div className="text-center font-mono py-8 text-muted-foreground/60 text-xs">No recent coding actions recorded.</div>
              ) : (
                activities.map((act) => {
                  let badgeColor = "bg-primary/10 text-primary border-primary/20";
                  let labelName = "Problem Duty";
                  if (act.type === "code_review") {
                    badgeColor = "bg-green-500/10 text-green-400 border-green-500/20";
                    labelName = "Grade Review";
                  } else if (act.type === "contest_created") {
                    badgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/20";
                    labelName = "Contest Event";
                  } else if (act.type === "support_ticket") {
                    badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
                    labelName = "Bug Debug";
                  } else if (act.type === "feedback") {
                    badgeColor = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
                    labelName = "Workshop Feedback";
                  }

                  return (
                    <div key={act.id} className="border-b border-border/50 pb-3 last:border-0 text-xs flex flex-col gap-1.5 relative">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <Badge className={`${badgeColor} border font-mono tracking-wider text-[9px] uppercase px-1.5 py-0`}>
                          {labelName}
                        </Badge>
                        <span className="text-muted-foreground/60">{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-foreground/80 leading-snug">{act.description}</p>
                      
                      <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                        <span>Batch: <strong className="text-foreground">{act.batchName}</strong></span>
                        {act.studentName && <span>Student: <strong className="text-foreground">{act.studentName}</strong></span>}
                        {act.score !== undefined && <span className="text-yellow-400 font-bold">Feedback: {act.score}%</span>}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: BATCH PERFORMANCE COMPARISON */}
      {activeTab === "comparison" && (
        <div className="border border-border p-6 bg-card rounded-xl flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 text-primary">
              <BarChart className="w-5 h-5 text-primary" /> Multi-Batch Performance Comparison
            </h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">Contrast and review active batch tracks currently assigned side-by-side.</p>
          </div>

          {batchComparisons.length === 0 ? (
            <div className="text-center p-8 font-mono text-xs text-muted-foreground/60 border border-border/50 bg-background rounded">
              No performance comparisons available. Assign multiple active batches to trigger delta analytics.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border bg-foreground/5 text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
                    <th className="p-4 font-medium">Batch Profile Name</th>
                    <th className="p-4 font-medium">College Context</th>
                    <th className="p-4 font-medium text-center">Students</th>
                    <th className="p-4 font-medium">Coding Engagement</th>
                    <th className="p-4 font-medium">Assignment Completion</th>
                    <th className="p-4 font-medium text-center">Attendance %</th>
                    <th className="p-4 font-medium text-center">Avg Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {batchComparisons.map((item) => (
                    <tr key={item.batchId} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-bold text-foreground">{item.batchName}</td>
                      <td className="p-4 text-muted-foreground">{item.collegeName}</td>
                      <td className="p-4 text-center text-foreground">{item.studentCount}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${item.codingActivity}%` }} />
                          </div>
                          <span>{item.codingActivity}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-400 h-full rounded-full" style={{ width: `${item.assignmentProgress}%` }} />
                          </div>
                          <span>{item.assignmentProgress}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold text-green-400">{item.attendanceRate}%</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center gap-1 justify-center text-yellow-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{item.averageRating.toFixed(1)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: WEEKLY TRAINER REPORTS */}
      {activeTab === "reports" && (
        <div className="flex flex-col gap-6">
          <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 text-primary">
                <FileText className="w-5 h-5 text-primary" /> Periodic Weekly Activity Reports
              </h2>
              <p className="text-xs text-muted-foreground font-mono mt-1">Official timekeeping submission activity logs reviewed by institutional heads.</p>
            </div>
          </div>

          {weeklyReports.length === 0 ? (
            <div className="text-center p-8 font-mono text-xs text-muted-foreground/60 border border-border/50 bg-card rounded-xl">
              No submitted weekly activity records found. Inactive profiles do not report active clock cycles.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {weeklyReports.map((report) => (
                <div key={report.id} className="border border-border bg-card rounded-xl overflow-hidden">
                  
                  {/* Top Header info */}
                  <div className="p-5 border-b border-border bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 h-10 w-10 bg-primary/10 rounded-lg text-primary flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-foreground">Activity Report for Week {report.weekStarting}</h4>
                        <p className="text-[10px] font-mono text-muted-foreground/80 uppercase mt-0.5">Author: {trainer.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-bold font-mono tracking-widest text-[9px] uppercase">
                        Approved by Faculty
                      </Badge>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => triggerExportReport(report.id)}
                        disabled={isExporting === report.id}
                        className="border-border h-8 font-mono text-[10px] tracking-wider uppercase"
                      >
                        {isExporting === report.id ? (
                          <><RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> EXPORTING...</>
                        ) : (
                          <><Download className="w-3 h-3 mr-1.5" /> EXPORT REPORT CARD</>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Stat Ribbon */}
                  <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border divide-x divide-white/5 text-center p-4">
                    <div className="p-2 flex flex-col">
                      <span className="text-[9px] text-muted-foreground/80 font-mono uppercase">Clock Hours</span>
                      <span className="text-base font-bold text-foreground font-mono mt-1">{report.hoursWorked} hrs</span>
                    </div>
                    <div className="p-2 flex flex-col">
                      <span className="text-[9px] text-muted-foreground/80 font-mono uppercase">Sessions led</span>
                      <span className="text-base font-bold text-foreground font-mono mt-1">{report.sessionsConducted} lectures</span>
                    </div>
                    <div className="p-2 flex flex-col">
                      <span className="text-[9px] text-muted-foreground/80 font-mono uppercase">Engagement Score</span>
                      <span className="text-base font-bold text-primary font-mono mt-1">{report.engagementScore}%</span>
                    </div>
                    <div className="p-2 flex flex-col">
                      <span className="text-[9px] text-muted-foreground/80 font-mono uppercase">Avg completions</span>
                      <span className="text-base font-bold text-indigo-400 font-mono mt-1">{report.assignmentCompletionRate}%</span>
                    </div>
                  </div>

                  {/* Body highlights and textual feedback */}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-bold text-xs uppercase font-mono tracking-wider text-primary mb-2 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" /> Weekly Highlights
                        </h5>
                        <ul className="list-disc pl-4 text-xs text-foreground/70 space-y-1.5">
                          {report.highlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-xs uppercase font-mono tracking-wider text-xs text-red-400 mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Challenges Enacted
                        </h5>
                        <ul className="list-disc pl-4 text-xs text-foreground/70 space-y-1.5">
                          {report.challenges.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-bold text-xs uppercase font-mono tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Next Steps & Recommendations
                        </h5>
                        <ul className="list-disc pl-4 text-xs text-foreground/70 space-y-1.5">
                          {report.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>

                      <div className="border border-border/50 bg-white/[0.01] p-3 rounded-lg">
                        <h5 className="font-bold text-xs uppercase font-mono tracking-wider text-yellow-400 mb-2 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" /> Faculty Head Review
                        </h5>
                        <p className="text-xs text-white/85 italic font-mono">
                          "{report.facultyFeedback}"
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assignment workspace hub modal */}
      <TrainerAssignmentModal 
        trainer={trainer} 
        isOpen={isAssignOpen} 
        onClose={() => setIsAssignOpen(false)} 
        onSuccess={handleSuccessRefresh}
      />

    </div>
  );
};
