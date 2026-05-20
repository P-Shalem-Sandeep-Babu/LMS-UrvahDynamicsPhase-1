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
  Award, 
  Briefcase, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  TrendingDown, 
  Award as ContestIcon, 
  Laptop, 
  Clock, 
  Terminal, 
  UserCheck, 
  Share2, 
  FileDown, 
  RefreshCw, 
  BarChart, 
  Plus, 
  ShieldCheck,
  Search,
  Filter
} from "lucide-react";

import { 
  getStoredFaculty, 
  saveStoredFaculty,
  getStudentsMonitoredProgress,
  getContestsMonitoredHistory,
  getFacultyWeeklyReports,
  getFacultyBatchInsights,
  StudentProgressMetric,
  ContestHistoryLog,
  FacultyWeeklyProgress,
  FacultyBatchInsight
} from "../../services/facultyService";

import { mockColleges } from "../../data/mockColleges";
import { mockBatches } from "../../data/mockBatches";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { FacultyAssignmentModal } from "./components/FacultyAssignmentModal";

// Recharts imports for visuals
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

export const FacultyDetail = () => {
  const { id } = useParams();
  const [facultyList, setFacultyList] = useState(() => getStoredFaculty());
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "contests" | "batches" | "reports">("overview");
  
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [exportingReportId, setExportingReportId] = useState<string | null>(null);
  const [exportingWholeSummary, setExportingWholeSummary] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");

  const faculty = facultyList.find(f => f.id === id);

  const handleRefresh = () => {
    setFacultyList(getStoredFaculty());
  };

  useEffect(() => {
    window.addEventListener("storage_faculty_updated", handleRefresh);
    return () => {
      window.removeEventListener("storage_faculty_updated", handleRefresh);
    };
  }, []);

  if (!faculty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-foreground gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <div className="font-mono text-sm uppercase">Faculty dossier record and telemetry missing</div>
        <Link to="/faculty-mgmt" className="text-xs text-primary underline">&larr; Return to Faculty Management</Link>
      </div>
    );
  }

  // Assigned datasets
  const assignedCollegesData = (faculty.assignedColleges || [])
    .map(cid => mockColleges.find(c => c.id === cid))
    .filter(Boolean);

  const assignedBatchesData = (faculty.assignedBatches || [])
    .map(bid => mockBatches.find(b => b.id === bid))
    .filter(Boolean);

  // Dynamic analytic hooks
  const studentMetrics: StudentProgressMetric[] = getStudentsMonitoredProgress(faculty.id);
  const contestLogs: ContestHistoryLog[] = getContestsMonitoredHistory(faculty.id);
  const weeklyReports: FacultyWeeklyProgress[] = getFacultyWeeklyReports(faculty.id);
  const batchInsights: FacultyBatchInsight[] = getFacultyBatchInsights(faculty.id);

  // Filter student metrics if searched
  const filteredStudents = studentMetrics.filter(student => 
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.batchName.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // CSV Export trigger for weekly report CARD
  const handleExportWeeklyReport = (report: FacultyWeeklyProgress) => {
    setExportingReportId(report.id);
    setTimeout(() => {
      setExportingReportId(null);
      const csvHeaders = "Week starting, Grading hours, One-On-One Sessions, Contests Created, Monitored Student Engagement %\n";
      const csvRow = `${report.weekStarting}, ${report.gradingHours}, ${report.oneOnOneSessions}, ${report.activeContestsCreated}, ${report.monitoredStudentActivityRate}%\n\n`;
      
      const milestoneHeader = "Milestones Reached Key\n";
      const milestones = report.milestonesReached.map((m, idx) => `${idx + 1}. ${m.replace(/"/g, '""')}`).join("\n") + "\n\n";
      
      const challengeHeader = "Challenges Detected Key\n";
      const challenges = report.challengesDetected.map((c, idx) => `${idx + 1}. ${c.replace(/"/g, '""')}`).join("\n") + "\n\n";

      const blobs = new Blob([csvHeaders + csvRow + milestoneHeader + milestones + challengeHeader + challenges], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blobs);
      const anchor = document.createElement("a");
      anchor.setAttribute("href", url);
      anchor.setAttribute("download", `Faculty_Report_${faculty.name.replace(/\s+/g, '_')}_Week_${report.weekStarting}.csv`);
      anchor.click();
    }, 1000);
  };

  // CSV Export trigger for all cumulative faculty telemetry summary
  const handleExportAllTelemetry = () => {
    setExportingWholeSummary(true);
    setTimeout(() => {
      setExportingWholeSummary(false);
      let content = `FACULTY WORKSPACE REPORT METADATA\n`;
      content += `Faculty Name, ${faculty.name}\n`;
      content += `Department, ${faculty.department}\n`;
      content += `Email, ${faculty.email}\n`;
      content += `Phone, ${faculty.phone}\n`;
      content += `Status, ${faculty.status}\n`;
      content += `Students Monitored Count, ${faculty.studentsMonitored}\n`;
      content += `Workload hours quota, ${faculty.workloadHours} hrs\n`;
      content += `Assigned Colleges portfolio count, ${assignedCollegesData.length}\n`;
      content += `Assigned Batches roster count, ${assignedBatchesData.length}\n\n`;

      content += `STUDENT MONITORED ROSTER DATA\n`;
      content += `Student Name, Connected Batch, Completion Rate %, Solved Problems Count, Avg Grade Score %\n`;
      studentMetrics.forEach(m => {
        content += `"${m.name}", "${m.batchName}", ${m.completionRate}%, ${m.solvedCount}, ${m.averageGrade}%\n`;
      });
      content += `\n`;

      content += `CONTEST SUPERVISION RECORD\n`;
      content += `Contest Title, Connected Batch, Participants, Avg Score %, Top Performer, Status\n`;
      contestLogs.forEach(c => {
        content += `"${c.title}", "${c.batchName}", ${c.participantsCount}, ${c.averageScore}%, "${c.topPerformerName}", "${c.status}"\n`;
      });

      const blobs = new Blob([content], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blobs);
      const anchor = document.createElement("a");
      anchor.setAttribute("href", url);
      anchor.setAttribute("download", `Faculty_Complete_Telemetry_${faculty.name.replace(/\s+/g, '_')}.csv`);
      anchor.click();
    }, 1200);
  };

  // Mock colors for doughnut cell segments
  const DoughnutColors = ["#d2fc43", "#9333ea", "#38bdf8", "#f43f5e"];

  // Average completion score
  const averageBatchProgress = batchInsights.length > 0 
    ? Math.round(batchInsights.reduce((sum, b) => sum + b.completionIndex, 0) / batchInsights.length)
    : 75;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in pb-16 w-full max-w-[1200px] mx-auto text-foreground">
      
      {/* Return Ribbon */}
      <Link to="/faculty-mgmt" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-xs font-mono uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Go back to Faculty Administration Board
      </Link>

      {/* Profile Header Block */}
      <div className="border border-border bg-card p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center relative">
              <span className="text-3xl font-black text-primary font-mono">{faculty.name.charAt(0)}</span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] text-muted-foreground font-bold">
                {faculty.id === "fac_1" || faculty.id === "fac_2" ? "PhD" : "MSc"}
              </div>
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <h1 className="text-3xl font-black uppercase tracking-tight">{faculty.name}</h1>
                <Badge className={
                  faculty.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20 uppercase font-mono tracking-widest text-[9px]" : 
                  faculty.status === "on_leave" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 uppercase font-mono tracking-widest text-[9px]" :
                  "bg-red-500/10 text-red-500 border-red-500/20 uppercase font-mono tracking-widest text-[9px]"
                }>
                  {faculty.status === "on_leave" ? "On Leave" : faculty.status}
                </Badge>
              </div>
              <div className="text-sm font-bold text-primary mb-2 font-mono uppercase tracking-wider">{faculty.department} Division</div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground/80" /> {faculty.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground/80" /> {faculty.phone}</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-primary" /> Senior Faculty Counselor</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
            <Button 
              onClick={() => setIsAssignOpen(true)}
              className="bg-primary text-black font-extrabold text-xs uppercase tracking-wider h-10 hover:bg-primary/95 font-mono"
            >
              <Briefcase className="w-4 h-4 mr-2" /> Modify Assignments & Domain Mapping
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleExportAllTelemetry}
              disabled={exportingWholeSummary}
              className="border-border text-xs h-10 font-mono tracking-wider text-foreground uppercase"
            >
              {exportingWholeSummary ? (
                <><RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" /> EXPORTING...</>
              ) : (
                <><FileDown className="w-3.5 h-3.5 mr-2 text-primary" /> Export Data Dossier</>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Meta Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="border border-border/50 bg-card p-4 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Building className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[9px] uppercase font-mono text-white/45 tracking-widest">Colleges</p>
            <p className="text-base font-black font-mono mt-0.5">{assignedCollegesData.length}</p>
          </div>
        </div>

        <div className="border border-border/50 bg-card p-4 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[9px] uppercase font-mono text-white/45 tracking-widest font-bold">Batches</p>
            <p className="text-base font-black font-mono mt-0.5">{assignedBatchesData.length}</p>
          </div>
        </div>

        <div className="border border-border/50 bg-card p-4 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[9px] uppercase font-mono text-white/45 tracking-widest">Students</p>
            <p className="text-base font-black font-mono mt-0.5">{faculty.studentsMonitored}</p>
          </div>
        </div>

        <div className="border border-border/50 bg-card p-4 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 shrink-0">
            <Laptop className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[9px] uppercase font-mono text-white/45 tracking-widest">Workload</p>
            <p className="text-base font-black font-mono mt-0.5 text-primary">{faculty.workloadHours} hrs</p>
          </div>
        </div>

        <div className="border border-border/50 bg-card p-4 rounded-xl flex items-center gap-3 col-span-2 md:col-span-1">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
            <Activity className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[9px] uppercase font-mono text-white/45 tracking-widest">Contests</p>
            <p className="text-base font-black font-mono mt-0.5">{contestLogs.length}</p>
          </div>
        </div>
      </div>

      {/* Profile Ribbon Switch */}
      <div className="flex items-center gap-6 border-b border-border mt-2 w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "overview" ? "border-primary text-primary font-black animate-scale-in" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building className="w-4 h-4" /> Portfolio Overview
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "students" ? "border-primary text-primary font-black animate-scale-in" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" /> Student Performance Monitoring
        </button>
        <button
          onClick={() => setActiveTab("contests")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "contests" ? "border-primary text-primary font-black animate-scale-in" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Activity className="w-4 h-4" /> Contest Tracking
        </button>
        <button
          onClick={() => setActiveTab("batches")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "batches" ? "border-primary text-primary font-black animate-scale-in" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart className="w-4 h-4" /> Batch Insights
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "reports" ? "border-primary text-primary font-black animate-scale-in" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="w-4 h-4" /> Weekly Reports ({weeklyReports.length})
        </button>
      </div>

      {/* TAB 1: PORTFOLIO OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Areas */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Colleges Portfolio */}
            <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <h3 className="font-extrabold uppercase tracking-widest text-[11px] font-mono text-muted-foreground flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" /> Managed College Portfolios ({assignedCollegesData.length})
                </h3>
                <span className="text-[10px] font-mono font-bold text-primary">Domain Alignments Active</span>
              </div>

              {assignedCollegesData.length === 0 ? (
                <div className="text-muted-foreground/80 font-mono text-xs py-10 text-center flex flex-col items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-500 opacity-60" />
                  No college mapping indices currently aligned with this profile.
                  <Button 
                    onClick={() => setIsAssignOpen(true)}
                    variant="outline" 
                    size="sm"
                    className="border-border text-[10px] mt-2 font-mono uppercase"
                  >
                    Bind New School Record
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {assignedCollegesData.map(c => c && (
                    <div key={c.id} className="p-4 border border-border/50 rounded-lg bg-white/[0.01] hover:bg-white/[0.02] transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{c.name}</span>
                          <span className="text-[9px] bg-foreground/5 border border-border text-muted-foreground px-1.5 py-0.5 rounded font-mono uppercase">{c.code}</span>
                        </div>
                        <span className="text-[9px] text-white/45 font-mono uppercase tracking-widest block mb-4">Domain Context: {c.emailDomain}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50 text-[10px] font-mono mt-2 text-muted-foreground">
                        <span>Active Batches: <strong className="text-foreground">{c.numBatches || 0}</strong></span>
                        <span className="text-primary font-bold">● Connected</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Student Batches portfolio */}
            <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <h3 className="font-extrabold uppercase tracking-widest text-[11px] font-mono text-muted-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Subscribed Batches & Roster Overview ({assignedBatchesData.length})
                </h3>
              </div>

              {assignedBatchesData.length === 0 ? (
                <div className="text-muted-foreground/80 font-mono text-xs py-10 text-center flex flex-col items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-500 opacity-60" />
                  No student classes aligned in roster database.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {assignedBatchesData.map(b => b && (
                    <div key={b.id} className="p-4 border border-border/50 rounded-lg bg-[#0c0c0c] hover:border-primary/20 transition-all flex flex-col justify-between gap-3 relative overflow-hidden group">
                      <div className="absolute right-0 top-0 h-full w-1.5 bg-primary/25" />
                      
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-black text-xs text-foreground block mb-0.5 uppercase tracking-wide group-hover:text-primary transition-colors">{b.name}</span>
                          <span className="text-[9px] font-mono text-muted-foreground/80">{b.collegeName}</span>
                        </div>
                        <Badge className="bg-primary/5 text-primary border-primary/20 uppercase tracking-widest text-[8px] px-1.5 py-0">
                          {b.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono text-white/65 pt-2 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-muted-foreground/60 uppercase">Students</span>
                          <span className="font-bold text-foreground mt-0.5">{b.studentCount} candidates</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-muted-foreground/60 uppercase">Progress</span>
                          <span className="font-bold text-foreground mt-0.5">{b.assignmentProgress}% submissions</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-muted-foreground/60 uppercase">Active Activity</span>
                          <span className="font-bold text-primary mt-0.5">{b.codingActivity}% eng.</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-muted-foreground/60 uppercase font-bold text-indigo-400">Time span</span>
                          <span className="text-[9px] text-muted-foreground truncate mt-0.5">{new Date(b.startDate).getFullYear()}-{new Date(b.endDate).getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Quick Metrics & Highlights Panel */}
          <div className="flex flex-col gap-6">
            
            {/* Action Card */}
            <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl" />
              <h3 className="font-extrabold uppercase tracking-widest text-[11px] font-mono text-muted-foreground">
                Departmental Status Notes
              </h3>

              <div className="text-xs text-foreground/80 leading-relaxed font-mono flex flex-col gap-3 bg-[#0c0c0c] p-3.5 border border-border/50 rounded">
                <span className="text-yellow-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  ● ACTIVE COUNCIL REMITTANCE
                </span>
                <span>The faculty advisor has satisfied the required syllabus tracking guidelines, with {faculty.workloadHours} completed supervision hours clocked for the period.</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono pt-3 border-t border-border/50">
                <span className="text-white/45">Department head:</span>
                <span className="text-foreground font-bold">Dr. Joseph Fourier</span>
              </div>
            </div>

            {/* Quick Batch performance chart */}
            <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold uppercase tracking-widest text-[11px] font-mono text-muted-foreground">
                  Batch Completion Inds
                </h3>
                <span className="text-[10px] font-mono text-primary font-bold">AVG: {averageBatchProgress}%</span>
              </div>

              <div className="h-[210px] w-full">
                {batchInsights.length === 0 ? (
                  <div className="text-center font-mono py-12 text-muted-foreground/60 text-xs">No active batches metrics for display.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={batchInsights} margin={{ left: -30, right: 0, top: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#fff" strokeOpacity={0.05} />
                      <XAxis dataKey="batchName" stroke="#ffffff" strokeOpacity={0.3} fontSize={9} />
                      <YAxis stroke="#ffffff" strokeOpacity={0.3} fontSize={9} domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: "#0c0c0c", border: `1px solid rgba(255,255,255,.1)` }} />
                      <Bar name="Completion index" dataKey="completionIndex" fill="#d2fc43" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: STUDENT PERFORMANCE MONITORING */}
      {activeTab === "students" && (
        <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border/50 pb-4">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2">
                <Users className="w-5 h-5" /> Student Progress Monitoring Directory
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">Continuous evaluation data across all cohorts assigned under supervision.</p>
            </div>

            {/* Sub Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
              <input 
                type="text" 
                placeholder="Search candidates by name..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full bg-card border border-border text-xs text-foreground font-mono px-9 py-2 rounded focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center font-mono py-16 text-muted-foreground/80 border border-border/50 rounded-lg bg-white/[0.01]">
              <AlertCircle className="w-8 h-8 mx-auto opacity-30 text-yellow-500 mb-2" />
              No trainees found under managed batches matching "{studentSearch}"
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border bg-white/[0.02] text-[10px] uppercase font-mono tracking-wider text-white/55">
                    <th className="p-4 font-bold">Candidate Name</th>
                    <th className="p-4 font-bold">Cohort Group</th>
                    <th className="p-4 font-bold text-center">Active Coding Hours</th>
                    <th className="p-4 font-bold text-center">Questions Solved</th>
                    <th className="p-4 font-bold">Completion Factor</th>
                    <th className="p-4 font-bold">Average Grades</th>
                    <th className="p-4 font-bold text-center">Status Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-white/[0.01]">
                      <td className="p-4 font-bold text-primary">{std.name}</td>
                      <td className="p-4 text-muted-foreground">{std.batchName}</td>
                      <td className="p-4 text-center text-foreground">{std.activeCodingHours} hrs</td>
                      <td className="p-4 text-center text-foreground font-semibold">{std.solvedCount} exercises</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                            <div className={`h-full rounded-full ${std.completionRate >= 80 ? 'bg-primary' : std.completionRate >= 60 ? 'bg-blue-400' : 'bg-red-500'}`} style={{ width: `${std.completionRate}%` }} />
                          </div>
                          <span>{std.completionRate}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-black ${std.averageGrade >= 90 ? 'text-primary' : std.averageGrade >= 80 ? 'text-green-400' : std.averageGrade >= 70 ? 'text-yellow-400' : 'text-red-500'}`}>
                          {std.averageGrade}% score
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${std.completionRate >= 80 ? 'bg-green-500' : std.completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} title={std.completionRate >= 80 ? "Safe Zone" : "At Risk Alert"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONTEST TRACKING */}
      {activeTab === "contests" && (
        <div className="border border-border p-5 bg-card rounded-xl flex flex-col gap-5">
          <div className="border-b border-border/50 pb-3">
            <h3 className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2">
              <ContestIcon className="w-5 h-5" /> Coding Contest Tracking & Oversight
            </h3>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">Tracks competitive sprint timelines and score outputs supervised by faculty.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contestLogs.length === 0 ? (
              <div className="col-span-2 text-center py-10 font-mono text-xs text-muted-foreground/60">
                No contest supervisions connected to current batches.
              </div>
            ) : (
              contestLogs.map((c) => (
                <div key={c.id} className="p-5 border border-border/50 bg-[#0d0d0d] hover:border-primary/20 transition-all rounded-lg flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-xs font-black uppercase text-foreground block mb-0.5">{c.title}</span>
                      <span className="text-[9px] text-[#888] font-mono block">Class cohort: {c.batchName}</span>
                    </div>

                    <Badge className={
                      c.status === "completed" ? "bg-foreground/5 border border-border text-muted-foreground text-[8px] uppercase font-mono tracking-widest px-2 py-0" :
                      c.status === "active" ? "bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] uppercase font-mono tracking-widest px-2 py-0 animate-pulse" :
                      "bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] uppercase font-mono tracking-widest px-2 py-0"
                    }>
                      {c.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 border-t border-border/50 pt-3.5 text-[10px] font-mono text-foreground/70">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-muted-foreground/60 uppercase">Participating</span>
                      <span className="font-bold text-foreground mt-0.5">{c.participantsCount} cand.</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[8px] text-muted-foreground/60 uppercase">Average Score</span>
                      <span className="font-bold text-primary mt-0.5">{c.averageScore > 0 ? `${c.averageScore}%` : "In Progress"}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[8px] text-muted-foreground/60 uppercase">Launcher date</span>
                      <span className="text-[9px] text-white/45 mt-0.5 truncate">{new Date(c.startDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="bg-background border border-border/50 p-2 rounded text-[10px] font-mono text-foreground/80 flex items-center justify-between">
                    <span className="text-[#666]">Top Performer:</span>
                    <strong className="text-yellow-400">{c.topPerformerName}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: BATCH INSIGHTS */}
      {activeTab === "batches" && (
        <div className="flex flex-col gap-6">
          <div className="border border-border p-5 bg-card rounded-xl">
            <h3 className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-primary" /> Active Cohorts Batch Insights
            </h3>
            <p className="text-xs text-muted-foreground font-mono">Statistical indices regarding progress matrices and risk assessment triggers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batchInsights.map((b) => (
              <div key={b.batchId} className="border border-border bg-card rounded-xl overflow-hidden p-5 flex flex-col gap-4 relative">
                
                {/* Header info */}
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-border/50">
                  <div>
                    <span className="text-sm font-black uppercase text-foreground block mb-0.5">{b.batchName}</span>
                    <span className="text-[10px] text-white/45 font-mono">{b.collegeName}</span>
                  </div>
                  
                  <Badge className="bg-foreground/5 border border-border text-muted-foreground font-mono text-[9px]">
                    Speed: {b.avgSubmissionSpeed}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-foreground/70">
                  <div className="flex flex-col p-3 border border-border/50 bg-white/[0.01] rounded">
                    <span className="text-[8px] text-white/35 uppercase">Submission Indices</span>
                    <strong className="text-base text-foreground mt-1">{b.completionIndex}% Completion</strong>
                  </div>

                  <div className="flex flex-col p-3 border border-border/50 bg-white/[0.01] rounded">
                    <span className="text-[8px] text-white/35 uppercase">Attendance rates</span>
                    <strong className="text-base text-green-400 mt-1">{b.attendanceIndex}% Attendance</strong>
                  </div>
                </div>

                <div className="bg-background/40 border border-border/50 p-3 rounded text-[11px] font-mono flex justify-between items-center text-foreground/80">
                  <span className="text-[#777] flex items-center gap-1">Stagnant Coders: </span>
                  {b.stagnantCoders > 0 ? (
                    <strong className="text-red-400 font-bold flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[10px]">
                      ● {b.stagnantCoders} candidates requiring aid
                    </strong>
                  ) : (
                    <strong className="text-green-400">0 - All clear</strong>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-muted-foreground">
                  <span>Class top rank:</span>
                  <strong className="text-yellow-400">{b.topPerformer}</strong>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: WEEKLY REPORTS & PROGRESS UI */}
      {activeTab === "reports" && (
        <div className="flex flex-col gap-6">
          <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Submitted Weekly Progress Logs
              </h3>
              <p className="text-xs text-muted-foreground font-mono">Academic timekeeping submissions filed within LMS records.</p>
            </div>
          </div>

          {weeklyReports.length === 0 ? (
            <div className="text-center py-12 font-mono text-xs text-muted-foreground/60 border border-border/50 bg-card rounded-xl">
              No submitted weekly logs recorded for this inactive profile directory.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {weeklyReports.map((report) => (
                <div key={report.id} className="border border-border bg-card rounded-xl overflow-hidden">
                  
                  {/* Report Card Top Row */}
                  <div className="p-4 bg-white/[0.01] border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary rounded-lg flex items-center justify-center">
                        <Clock className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-foreground">Academic Submission: Week starting {report.weekStarting}</h4>
                        <p className="text-[10px] font-mono text-white/45 mt-0.5">Assigned evaluator: {faculty.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportWeeklyReport(report)}
                        disabled={exportingReportId === report.id}
                        className="border-border h-8 font-mono text-[9px] tracking-wider uppercase"
                      >
                        {exportingReportId === report.id ? (
                          <><RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> EXPORTING...</>
                        ) : (
                          <><FileDown className="w-3.5 h-3.5 mr-1 text-primary" /> EXPORT REPORT WEEK CARD</>
                        )}
                      </Button>
                      
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[8px] uppercase font-mono px-2 py-0.5">
                        Approved
                      </Badge>
                    </div>
                  </div>

                  {/* Summary row stats details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 border-b border-border text-center p-3">
                    <div className="py-2.5">
                      <span className="text-[9px] text-[#777] font-mono uppercase">Grading Hours</span>
                      <p className="text-sm font-black text-foreground font-mono mt-0.5">{report.gradingHours} hrs</p>
                    </div>
                    <div className="py-2.5">
                      <span className="text-[9px] text-[#777] font-mono uppercase">1-on-1 Sessions</span>
                      <p className="text-sm font-black text-foreground font-mono mt-0.5">{report.oneOnOneSessions} reviews</p>
                    </div>
                    <div className="py-2.5">
                      <span className="text-[9px] text-[#777] font-mono uppercase">Contests Created</span>
                      <p className="text-sm font-black text-foreground font-mono mt-0.5">{report.activeContestsCreated} tests</p>
                    </div>
                    <div className="py-2.5">
                      <span className="text-[9px] text-[#777] font-mono uppercase">Student Activity</span>
                      <p className="text-sm font-black text-primary font-mono mt-0.5">{report.monitoredStudentActivityRate}% rate</p>
                    </div>
                  </div>

                  {/* Highlights and Challenges details */}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed border-b border-border/50">
                    <div>
                      <h5 className="font-extrabold text-[10px] uppercase font-mono tracking-wider text-primary mb-2 flex items-center gap-1 px-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Core Highlights & Milestones
                      </h5>
                      <ul className="list-disc pl-5 text-foreground/70 space-y-1.5">
                        {report.milestonesReached.map((node, i) => <li key={i}>{node}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-extrabold text-[10px] uppercase font-mono tracking-wider text-red-400 mb-2 flex items-center gap-1 px-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Logged Challenges Detected
                      </h5>
                      <ul className="list-disc pl-5 text-foreground/70 space-y-1.5">
                        {report.challengesDetected.map((chal, i) => <li key={i}>{chal}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* department review comments */}
                  <div className="p-4 bg-white/[0.005] text-[11px] font-mono text-foreground/80">
                    <span className="text-[#888] font-bold block mb-1">Administrative Remarks:</span>
                    <span className="italic block pl-2 border-l-2 border-primary/45">"{report.departmentNotes}"</span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Assignment modal layer */}
      <FacultyAssignmentModal 
        faculty={faculty} 
        isOpen={isAssignOpen} 
        onClose={() => setIsAssignOpen(false)}
        onSuccess={handleRefresh}
      />

    </div>
  );
};
