import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, BookOpen, Code, Mail, Activity, Trophy, Edit2, Phone, 
  Building, LayoutGrid, CalendarCheck, Clock, PlusCircle, CheckCircle2, 
  XCircle, AlertCircle, FilePlus, Shield, Sparkles, Milestone 
} from "lucide-react";
import { getStoredStudents, saveStoredStudents } from "../utils/batchState";
import { mockColleges } from "../data/mockColleges";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { EditStudentModal } from "./components/EditStudentModal";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, Cell 
} from "recharts";

export const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState(() => getStoredStudents());
  const [activeTab, setActiveTab ] = useState<"overview" | "analytics" | "attendance" | "timeline" | "assignments" | "contests">("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New manual log form state
  const [newLogTitle, setNewLogTitle] = useState("");
  const [newLogType, setNewLogType] = useState<"submission" | "contest" | "attendance" | "course" | "invite">("submission");
  const [newLogDetails, setNewLogDetails] = useState("");

  // New attendance edit state
  const [newAttendanceDate, setNewAttendanceDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [newAttendanceStatus, setNewAttendanceStatus] = useState<"present" | "absent" | "late">("present");

  const [notification, setNotification] = useState<string | null>(null);

  // Listen for storage events
  useEffect(() => {
    const handleSync = () => {
      setStudents(getStoredStudents());
    };
    window.addEventListener("urvah_students_update", handleSync);
    return () => {
      window.removeEventListener("urvah_students_update", handleSync);
    };
  }, []);

  const student = students.find(s => s.id === id);
  const college = mockColleges.find(c => c.id === student?.collegeId);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Pre-formatted default timelines
  const timelineLogs = useMemo(() => {
    if (!student) return [];
    return student.activityTimeline || [
      {
        id: "d1",
        type: "invite",
        title: "Registration Token Created",
        timestamp: student.inviteSentDate ? `${student.inviteSentDate}T09:00:00Z` : new Date().toISOString(),
        details: "Operative dossier file initialized successfully.",
        statusClass: "text-primary"
      }
    ];
  }, [student]);

  // Pre-formatted default attendance
  const attendanceLogs = useMemo(() => {
    if (!student) return [];
    return student.attendanceLog || [
      { date: "2026-05-18", status: "present" },
      { date: "2026-05-17", status: "present" },
      { date: "2026-05-16", status: "present" },
    ];
  }, [student]);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4 font-mono select-none">
        <AlertCircle className="w-12 h-12 text-white/20" />
        <h2 className="text-xl font-bold text-foreground uppercase tracking-wider">Operative Dossier Not Found</h2>
        <Button variant="ghost" onClick={() => navigate("/students")} className="text-xs uppercase border border-border hover:bg-foreground/5 rounded-none">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
        </Button>
      </div>
    );
  }

  // Handle manual timeline log submission
  const handleAddTimelineLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;

    const freshLog = {
      id: `act_${Date.now()}`,
      type: newLogType,
      title: newLogTitle,
      timestamp: new Date().toISOString(),
      details: newLogDetails.trim() || undefined,
      statusClass: 
        newLogType === "submission" ? "text-green-400" :
        newLogType === "contest" ? "text-primary" :
        newLogType === "attendance" ? "text-red-400" :
        newLogType === "course" ? "text-purple-400" : "text-green-400"
    };

    const updatedTimeline = [freshLog, ...(student.activityTimeline || [])];
    
    const updatedStudentsList = students.map(s => {
      if (s.id === student.id) {
        return { ...s, activityTimeline: updatedTimeline };
      }
      return s;
    });

    setStudents(updatedStudentsList);
    saveStoredStudents(updatedStudentsList);
    setNewLogTitle("");
    setNewLogDetails("");
    showToast("Appended diagnostic log entry into timeline.");
  };

  // Handle manual attendance status override
  const handleAddAttendanceOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttendanceDate) return;

    const currentAttendance: { date: string; status: "present" | "absent" | "late" }[] = [
      ...attendanceLogs
    ].map(a => ({
      date: a.date,
      status: a.status as "present" | "absent" | "late"
    }));
    const existingIndex = currentAttendance.findIndex(a => a.date === newAttendanceDate);

    if (existingIndex > -1) {
      currentAttendance[existingIndex].status = newAttendanceStatus;
    } else {
      currentAttendance.unshift({ date: newAttendanceDate, status: newAttendanceStatus });
    }

    // Sort by date descending
    currentAttendance.sort((a, b) => b.date.localeCompare(a.date));

    // Calculate new attendance rate based on logs
    const totalDays = currentAttendance.length;
    const presentCount = currentAttendance.filter(a => a.status === "present" || a.status === "late").length;
    const calculatedRate = Math.round((presentCount / totalDays) * 100);

    const updatedStudentsList = students.map(s => {
      if (s.id === student.id) {
        return { 
          ...s, 
          attendanceLog: currentAttendance,
          attendanceRate: calculatedRate
        };
      }
      return s;
    });

    setStudents(updatedStudentsList);
    saveStoredStudents(updatedStudentsList);
    showToast(`Updated attendance status for ${newAttendanceDate} to ${newAttendanceStatus}.`);
  };

  // Update student from detailed edit modal
  const handleUpdateStudentProfile = (updatedFields: Partial<typeof student>) => {
    const list = students.map(s => {
      if (s.id === student.id) {
        return {
          ...s,
          ...updatedFields,
          year: Number(updatedFields.year) || s.year
        };
      }
      return s;
    });
    setStudents(list);
    saveStoredStudents(list);
    setIsEditModalOpen(false);
    showToast("Profile specifications successfully calibrated.");
  };

  // Calculate dynamic chart values
  const difficultyChartData = [
    { name: "Easy Problems", solved: student.codingScore > 800 ? 52 : student.codingScore > 400 ? 28 : 8, fill: "#22c55e" },
    { name: "Medium Problems", solved: student.codingScore > 800 ? 32 : student.codingScore > 400 ? 12 : 1, fill: "#f59e0b" },
    { name: "Hard Problems", solved: student.codingScore > 800 ? 12 : student.codingScore > 400 ? 3 : 0, fill: "#ef4444" }
  ];

  const submissionTrendData = [
    { week: "Wk 1", submissions: student.codingScore > 800 ? 8 : 4 },
    { week: "Wk 2", submissions: student.codingScore > 800 ? 15 : 6 },
    { week: "Wk 3", submissions: student.codingScore > 800 ? 22 : 9 },
    { week: "Wk 4", submissions: student.codingScore > 800 ? 35 : 12 },
    { week: "Wk 5", submissions: student.codingScore > 800 ? 48 : 17 },
    { week: "Wk 6", submissions: student.codingScore > 800 ? 64 : 21 }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12 select-none animate-in fade-in">
      {/* Toast Alert */}
      {notification && (
        <div id="dossier-toast" className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded border font-mono text-xs shadow-2xl bg-green-950/90 border-green-500/30 text-green-400">
          <CheckCircle2 className="w-4 h-4 shrink-0 animate-bounce" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation and Top Dossier Banner */}
      <div className="flex flex-col gap-4">
        <Link to="/students" className="flex items-center gap-2 text-muted-foreground/80 hover:text-primary transition-colors w-fit text-[10px] font-mono uppercase tracking-widest font-bold">
          <ArrowLeft className="w-3" /> Back to students list
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border border-border p-6 bg-background/40 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center relative z-10">
            <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-primary font-mono text-3xl font-black">
              {student.name.charAt(0)}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <Badge variant="outline" className="uppercase text-[8px] tracking-wider font-mono bg-foreground/5 border-white/15 text-foreground/70 py-0.5 rounded-none">
                  Operative ID: {student.id}
                </Badge>
                {student.inviteStatus === "accepted" ? (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-mono text-[8px] uppercase tracking-wider rounded-none">Accepted</Badge>
                ) : student.inviteStatus === "pending" ? (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-mono text-[8px] uppercase tracking-wider rounded-none">Invite Queued</Badge>
                ) : (
                  <Badge className="bg-red-500/10 text-red-500 border-red-500/20 font-mono text-[8px] uppercase tracking-wider rounded-none">Expired Token</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none text-foreground">
                {student.name}
              </h1>
              <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-primary" /> {college?.name || "Independent"} • {student.branch} • Year {student.year}
              </p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0 relative z-10 w-full sm:w-auto">
            <Button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-5 bg-primary text-black font-mono text-[10px] uppercase font-black tracking-widest rounded-none h-9 flex-1 sm:flex-none"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1" /> Calibration parameters
            </Button>
          </div>
        </div>
      </div>

      {/* Top Diagnostics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-border p-5 rounded-xl bg-background/30 relative overflow-hidden flex flex-col justify-between">
          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-muted-foreground/80 mb-2 block">Aggregated Score</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-mono text-primary">{student.codingScore}</span>
            <span className="text-[10px] font-mono text-muted-foreground/60">PTS</span>
          </div>
        </div>
        
        <div className="border border-border p-5 rounded-xl bg-background/30 relative overflow-hidden flex flex-col justify-between">
          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-muted-foreground/80 mb-2 block">Task Completion</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-mono text-green-400">{student.assignmentProgress}%</span>
          </div>
        </div>

        <div className="border border-border p-5 rounded-xl bg-background/30 relative overflow-hidden flex flex-col justify-between">
          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-muted-foreground/80 mb-2 block">Streak Record</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-mono text-green-400">{student.streakScore}</span>
            <span className="text-xs">🔥</span>
          </div>
        </div>

        <div className="border border-border p-5 rounded-xl bg-background/30 relative overflow-hidden flex flex-col justify-between">
          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-muted-foreground/80 mb-2 block">Attendance Ratio</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-black font-mono ${
              (student.attendanceRate || 100) > 85 ? "text-green-400" : "text-red-400"
            }`}>{student.attendanceRate || 100}%</span>
          </div>
        </div>
      </div>

      {/* Detailed Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-border overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" /> Dossier Info
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "analytics" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code className="w-3.5 h-3.5" /> Coding analytics
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "attendance" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" /> Attendance tracker
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "timeline" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="w-3.5 h-3.5" /> Activity Timeline ({timelineLogs.length})
        </button>
        <button
          onClick={() => setActiveTab("assignments")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "assignments" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Modules
        </button>
        <button
          onClick={() => setActiveTab("contests")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "contests" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy className="w-3.5 h-3.5" /> Contests
        </button>
      </div>

      {/* Main Tab Station Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-border rounded-xl p-6 bg-background/40 flex flex-col">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6 animate-in fade-in">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/80">Operative Information Parameters</h3>
                <Shield className="w-4 h-4 text-primary" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Authentic Name</label>
                    <div className="text-sm font-bold text-foreground bg-foreground/5 border border-border px-3 py-2">{student.name}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">User Identifier handle</label>
                    <div className="text-sm font-mono text-primary bg-foreground/5 border border-border px-3 py-2">@{student.userName}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Roll Register Number</label>
                    <div className="text-sm font-mono text-foreground bg-foreground/5 border border-border px-3 py-2">{student.rollNo}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Contact communication line</label>
                    <div className="text-sm font-mono text-foreground bg-foreground/5 border border-border px-3 py-2">{student.phone || "N/A"}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Aesthetic Academy College</label>
                    <div className="text-sm text-foreground bg-foreground/5 border border-border px-3 py-2 truncate">{college?.name || "Independent Dev"}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Scientific Major Branch</label>
                    <div className="text-sm text-foreground bg-foreground/5 border border-border px-3 py-2">{student.branch}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Level Year of study</label>
                    <div className="text-sm font-mono text-foreground bg-foreground/5 border border-border px-3 py-2">Level Grade {student.year}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/80 uppercase font-mono tracking-widest block mb-1">Portal registration token date</label>
                    <div className="text-sm font-mono text-foreground bg-foreground/5 border border-border px-3 py-2">Dispatched: {student.inviteSentDate || "Unassigned"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-foreground/5 border border-border rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono text-foreground uppercase tracking-widest">Portal Credentials</h4>
                  <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">E-Mail reference: {student.collegeMail || student.personalMail}</p>
                </div>
                {student.inviteStatus === "accepted" ? (
                  <Badge className="bg-green-500/10 text-green-500 border border-green-500/20 font-mono text-[9px] uppercase tracking-wider py-1 rounded-none select-none">
                    Verified registered node
                  </Badge>
                ) : (
                  <Badge className="bg-green-500/10 text-green-500 border border-green-500/20 font-mono text-[9px] uppercase tracking-wider py-1 rounded-none select-none">
                    Awaiting node response
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="flex flex-col gap-6 animate-in fade-in">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/80">Coding Progression Telemetry</h3>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>

              {/* Submissions over times Area chart */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono uppercase text-muted-foreground/80 tracking-wider">Weekly Submission Flow metrics</h4>
                <div className="h-64 border border-border/50 bg-card rounded-lg p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={submissionTrendData}>
                      <defs>
                        <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="week" stroke="#ffffff40" fontSize={10} fontFamily="monospace" />
                      <YAxis stroke="#ffffff40" fontSize={10} fontFamily="monospace" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "rgba(255,255,255,0.15)", borderRadius: "8px" }} 
                        labelStyle={{ color: "#aaa" }} 
                        itemStyle={{ color: "#00f0ff", fontFamily: "monospace" }}
                      />
                      <Area type="monotone" dataKey="submissions" stroke="#00f0ff" fillOpacity={1} fill="url(#gradientColor)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Problem difficulty metrics distribution bar chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[10px] font-mono uppercase text-muted-foreground/80 tracking-wider">Difficulty Division Index</h4>
                  <div className="h-48 border border-border/50 bg-card rounded-lg p-2 flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={difficultyChartData}>
                        <XAxis dataKey="name" stroke="#ffffff40" fontSize={8} fontFamily="monospace" />
                        <YAxis stroke="#ffffff40" fontSize={8} fontFamily="monospace" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "rgba(255,255,255,0.15)" }}
                          itemStyle={{ fontSize: 10, fontFamily: "monospace" }}
                        />
                        <Bar dataKey="solved">
                          {difficultyChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Programming languages analytics checklist */}
                <div className="flex flex-col gap-3 justify-center min-h-[192px] border border-border/50 bg-card p-4 rounded-lg">
                  <h4 className="text-[10px] font-mono uppercase text-muted-foreground/80 tracking-widest border-b border-border pb-1.5 mb-1 text-center">Languages proficient</h4>
                  
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-foreground/80">
                        <span>TypeScript (Node/React)</span>
                        <span className="font-bold">64%</span>
                      </div>
                      <div className="h-1.5 bg-foreground/5 w-full rounded-sm overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: "64%" }} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-foreground/80">
                        <span>C++ (Algorithms)</span>
                        <span className="font-bold">25%</span>
                      </div>
                      <div className="h-1.5 bg-foreground/5 w-full rounded-sm overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "25%" }} />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-foreground/80">
                        <span>Python (AI)</span>
                        <span className="font-bold">11%</span>
                      </div>
                      <div className="h-1.5 bg-foreground/5 w-full rounded-sm overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: "11%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="flex flex-col gap-6 animate-in fade-in">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/80">Active Check-In Attendance Tracker</h3>
                <CalendarCheck className="w-4 h-4 text-green-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Simulated Past month checked block logs visualizers */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-muted-foreground/80 tracking-wider mb-3">Diagnostic Check-in History Logs</h4>
                  
                  <div className="grid grid-cols-6 gap-2">
                    {attendanceLogs.map((log, index) => (
                      <div 
                        key={index}
                        title={`Date: ${log.date} - ${log.status}`}
                        className={`flex flex-col items-center justify-center p-2 border font-mono rounded ${
                          log.status === "present" ? "bg-green-500/10 border-green-500/30 text-green-400" :
                          log.status === "absent" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                          "bg-green-500/10 border-green-500/20 text-green-500"
                        }`}
                      >
                        <span className="text-[8px] opacity-40 uppercase">{log.date.split("-").slice(1).join("/")}</span>
                        <span className="text-[11px] font-black uppercase mt-1">
                          {log.status === "present" ? "PR" : log.status === "absent" ? "AB" : "LT"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center mt-6 gap-4 text-[10px] font-mono text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-green-500/10 border border-green-500/30 rounded-sm" /> PR = Present
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-red-500/10 border border-red-500/20 rounded-sm" /> AB = Absent
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-green-500/10 border border-green-500/20 rounded-sm" /> LT = Late
                    </div>
                  </div>
                </div>

                {/* Interactive override form */}
                <form onSubmit={handleAddAttendanceOverride} className="p-4 border border-white/15 bg-white/[0.01] rounded-xl flex flex-col gap-4 font-mono text-xs">
                  <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-border/50">
                    <PlusCircle className="w-4 h-4 text-primary" /> Override attendance
                  </h4>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-muted-foreground/80 uppercase">Acknowledge date</label>
                    <input 
                      type="date"
                      value={newAttendanceDate}
                      onChange={e => setNewAttendanceDate(e.target.value)}
                      className="bg-background text-foreground py-1.5 px-2 border border-border rounded focus:outline-none focus:border-primary/50 text-xs"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-muted-foreground/80 uppercase">Status override</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["present", "absent", "late"].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setNewAttendanceStatus(st as any)}
                          className={`py-2 text-[10px] uppercase font-bold tracking-wider border rounded transition-colors ${
                            newAttendanceStatus === st 
                              ? "bg-primary border-primary text-black" 
                              : "bg-background border-border text-foreground hover:bg-foreground/5"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-black font-mono font-black text-[10px] uppercase tracking-widest h-9"
                  >
                    Calibrate Check-In
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === "timeline" && (
            <div className="flex flex-col gap-6 animate-in fade-in">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/80">Diagnostic Activity Timeline</h3>
                <Milestone className="w-4 h-4 text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                
                {/* Simple Form inputs for diagnostic timelines */}
                <form onSubmit={handleAddTimelineLog} className="md:col-span-2 p-4 border border-white/15 bg-white/[0.01] rounded-xl flex flex-col gap-4 font-mono text-xs">
                  <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-border/50">
                    <FilePlus className="w-4 h-4 text-primary" /> Log generic event
                  </h4>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-muted-foreground/80 uppercase">Action title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Passed Exam #2"
                      value={newLogTitle}
                      onChange={e => setNewLogTitle(e.target.value)}
                      className="bg-background text-foreground py-1.5 px-2 border border-border rounded focus:outline-none focus:border-primary/50 text-xs"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-muted-foreground/80 uppercase">Event classification</label>
                    <select
                      value={newLogType}
                      onChange={e => setNewLogType(e.target.value as any)}
                      className="bg-background text-foreground p-2 border border-border rounded focus:outline-none focus:border-primary/50 text-xs"
                    >
                      <option value="submission">Submission Checkpoint</option>
                      <option value="contest">Contest standing</option>
                      <option value="attendance">Attendance anomaly</option>
                      <option value="course">Syllabus Complete</option>
                      <option value="invite">Token status</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-muted-foreground/80 uppercase">Detailed diagnostic description</label>
                    <textarea 
                      placeholder="Enter supplementary event metadata details..."
                      rows={3}
                      value={newLogDetails}
                      onChange={e => setNewLogDetails(e.target.value)}
                      className="bg-background text-foreground p-2 border border-border rounded focus:outline-none focus:border-primary/50 text-xs resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-black font-mono font-black text-[10px] uppercase tracking-widest h-9"
                  >
                    Commit Diagnostic Log
                  </Button>
                </form>

                {/* Visual Timeline list component logs */}
                <div className="md:col-span-3 space-y-5 relative pl-4 border-l border-border">
                  {timelineLogs.map((log) => (
                    <div key={log.id} className="relative group select-none flex flex-col gap-1 animate-in slide-in-from-left-2 pb-2">
                      <div className="absolute -left-[20px] top-1 h-2.5 w-2.5 bg-card border-2 border-primary rounded-full group-hover:bg-primary transition-colors" />
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-bold ${log.statusClass || "text-foreground"}`}>{log.title}</span>
                        <span className="text-[9px] text-muted-foreground/60 font-mono">
                          {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <p className="text-[10px] font-mono text-muted-foreground leading-relaxed bg-white/[0.01] border border-border/50 p-2 rounded">
                        {log.details || "Supplementary operational parameters not reported."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MODULES ASSIGNMENTS */}
          {activeTab === "assignments" && (
            <div className="flex flex-col gap-4 animate-in fade-in select-none">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/80">Syllabus Module Assignments</h3>
                <BookOpen className="w-4 h-4 text-primary" />
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { name: "Binary Trees & BST Reversal", score: 95, date: "2026-05-18", status: "solved" },
                  { name: "Dynamic Programming Memoization", score: 88, date: "2026-05-15", status: "solved" },
                  { name: "Greedy Interval Scheduling algorithms", score: 100, date: "2026-05-12", status: "solved" },
                  { name: "Multi-Source Dijkstra Shortest Paths", score: 0, date: "-", status: "under review" },
                ].map((asg, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card border border-border/50 hover:border-border transition-colors gap-3 rounded">
                    <div>
                      <p className="text-xs font-bold text-foreground mb-0.5">{asg.name}</p>
                      <p className="text-[9px] font-mono text-muted-foreground/80">Calibrated submission: {asg.date}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="font-mono text-xs text-foreground/80">
                        GRADE: <span className="text-primary font-bold">{asg.score || "-"}</span> / 100
                      </div>

                      <span className={`text-[8px] uppercase font-mono font-bold px-2 py-0.5 border ${
                        asg.status === "solved" ? "text-green-400 border-green-500/20 bg-green-500/10" : "text-green-500 border-green-500/20 bg-green-500/10"
                      }`}>
                        {asg.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTESTS */}
          {activeTab === "contests" && (
            <div className="flex flex-col gap-4 animate-in fade-in select-none">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/80">Algorithm Duels standings</h3>
                <Trophy className="w-4 h-4 text-primary" />
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { name: "Urvah Algorithm Sprints #18", rank: 12, total: 320, score: 320, badge: "Master Solver" },
                  { name: "Weekly Speed Duel #42", rank: 4, total: 540, score: 480, badge: "Speedrunner" },
                  { name: "Spring HackSprint #1", rank: 54, total: 800, score: 120, badge: "Persistent Node" },
                ].map((ct, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card border border-border/50 hover:border-border transition-colors gap-3 rounded">
                    <div>
                      <p className="text-xs font-bold text-foreground mb-0.5">{ct.name}</p>
                      <p className="text-[9px] font-mono text-primary font-bold">Awarded: {ct.badge}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="font-mono text-[11px] text-muted-foreground">
                        RANK: <span className="text-foreground font-bold">#{ct.rank}</span> / {ct.total}
                      </div>

                      <Badge className="bg-foreground/5 border border-white/15 text-foreground/80 font-mono text-[9px] uppercase tracking-wider rounded-none">
                        +{ct.score} PTS
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Information Widgets Card */}
        <div className="flex flex-col gap-6">
          <div className="border border-border rounded-xl p-6 bg-background/40">
            <h3 className="text-xs font-black uppercase font-mono tracking-widest border-b border-border pb-2.5 mb-4 text-foreground">Administrative Actions</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/[0.02] border border-border/50 rounded">
                <h4 className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest block mb-1">Invite Status Coordinate</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  {student.inviteStatus === "accepted" ? (
                    <div className="flex items-center gap-2 text-green-400 text-xs font-mono font-bold">
                      <CheckCircle2 className="w-5 h-5" /> Node is online & synced
                    </div>
                  ) : student.inviteStatus === "pending" ? (
                    <div className="flex items-center gap-2 text-green-500 text-xs font-mono font-bold">
                      <Clock className="w-5 h-5 animate-spin-slow" /> Token sent - Pending register
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-mono font-bold">
                      <XCircle className="w-5 h-5" /> Token validation elapsed
                    </div>
                  )}
                </div>
                
                {student.inviteStatus !== "accepted" && (
                  <div className="mt-4 flex gap-2">
                    <Button 
                      onClick={() => showToast("Flashed email reminder code to registered academic mail.")}
                      className="bg-primary hover:bg-primary/95 text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-none h-8 flex-1"
                    >
                      Resend invite
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => showToast("Invalidated and locked enrollment token.")}
                      className="border border-border text-foreground font-mono text-[10px] uppercase tracking-widest rounded-none h-8 flex-1 hover:text-red-400 hover:bg-red-950/20"
                    >
                      Invalidate
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/[0.02] border border-border/50 rounded space-y-1">
                <h4 className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest block">System specifications</h4>
                <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                  <span>Datastore State:</span>
                  <span className="text-green-500 font-bold">SYNCED</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                  <span>Dossier Lock:</span>
                  <span className="text-muted-foreground/80">CALIBRATED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit profiles bindings Modal */}
      <EditStudentModal
        student={student}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateStudentProfile}
      />
    </div>
  );
};
