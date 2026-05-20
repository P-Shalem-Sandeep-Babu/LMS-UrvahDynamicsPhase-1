import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, BookOpen, Users, Code, CalendarDays, ClipboardCheck, 
  Building, MoreHorizontal, UserSquare2, TrendingUp, HelpCircle, 
  Lock, Save, Edit, Trophy, Award, Landmark 
} from "lucide-react";
import { getStoredBatches, saveStoredBatches, getStoredTrainers, getStoredFaculty, getStoredStudents } from "../utils/batchState";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Batch } from "../types/batch";

import { BatchAnalyticsPanel } from "./components/BatchAnalyticsPanel";
import { BatchStudentsList } from "./components/BatchStudentsList";
import { BatchAttendanceTracker } from "./components/BatchAttendanceTracker";
import { BatchLeaderboard } from "./components/BatchLeaderboard";
import { BatchProgressTracking } from "./components/BatchProgressTracking";

export const BatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [batches, setBatches] = useState<Batch[]>(() => getStoredBatches());
  const [activeTab, setActiveTab ] = useState<"analytics" | "roster" | "attendance" | "leaderboard">("analytics");
  const [isEditingAssignments, setIsEditingAssignments] = useState(false);

  // Editors bindings
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [liveStudentsCount, setLiveStudentsCount] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setBatches(getStoredBatches());
    };
    window.addEventListener("urvah_batches_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_batches_update", handleUpdate);
    };
  }, []);

  const batch = batches.find(b => b.id === id);

  // Let's count real students assigned to this batch of our localStorage
  useEffect(() => {
    if (batch) {
      const allStudents = getStoredStudents();
      const relative = allStudents.filter(s => s.batchId === batch.id);
      setLiveStudentsCount(relative.length || batch.studentCount);
      
      setSelectedTrainerId(batch.trainerId || "");
      setSelectedFacultyId(batch.facultyId || "");
    }
  }, [batch]);

  if (!batch) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 font-mono">
        <BookOpen className="w-12 h-12 text-white/20" />
        <h2 className="text-xl font-bold text-foreground">Batch Log Entry Not Found</h2>
        <Button variant="ghost" onClick={() => navigate("/batches")} className="text-xs uppercase border border-border hover:bg-foreground/5">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
        </Button>
      </div>
    );
  }

  const trainers = getStoredTrainers();
  const faculty = getStoredFaculty();

  const handleSaveAssignments = () => {
    const chosenTrainer = trainers.find(t => t.id === selectedTrainerId);
    const chosenFaculty = faculty.find(f => f.id === selectedFacultyId);

    const updated = batches.map(b => {
      if (b.id === batch.id) {
        return {
          ...b,
          trainerId: selectedTrainerId || undefined,
          trainerName: chosenTrainer ? chosenTrainer.name : undefined,
          facultyId: selectedFacultyId || undefined,
          facultyName: chosenFaculty ? chosenFaculty.name : undefined,
        };
      }
      return b;
    });

    setBatches(updated);
    saveStoredBatches(updated);
    setIsEditingAssignments(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8 select-none">
      <div className="flex flex-col gap-4">
        <Link to="/batches" className="flex items-center gap-2 text-muted-foreground/80 hover:text-primary transition-colors w-fit text-[10px] font-mono uppercase tracking-widest font-bold">
          <ArrowLeft className="w-3" /> Back to Batches
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div className="flex gap-4 items-start">
            <div className="p-4 bg-foreground/5 border border-border rounded-xl hidden md:block">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <Badge variant={batch.status === "active" ? "default" : batch.status === "upcoming" ? "secondary" : "destructive"} className="uppercase text-[8px] tracking-wider font-mono rounded-none">
                  {batch.status}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Building className="w-3 h-3 text-primary" /> {batch.collegeName}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
                {batch.name}
              </h1>
              <p className="text-primary font-mono text-xs uppercase tracking-widest mt-2 block font-black">
                Term: {new Date(batch.startDate).toLocaleDateString()} to {new Date(batch.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="bg-foreground/5 border border-border hover:bg-foreground/10 gap-2 text-[10px] uppercase font-mono font-bold tracking-widest rounded-none">
              <Code className="w-3 h-3 text-primary" /> Assign Coding Sheet
            </Button>
            <Button variant="ghost" size="icon" className="bg-foreground/5 border border-border hover:bg-foreground/10 rounded-none">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel border-border p-5 rounded-none flex flex-col relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-muted-foreground">Allocated Students</span>
          </div>
          <div className="text-3xl font-black font-mono text-foreground">{liveStudentsCount}</div>
        </div>
        
        <div className="glass-panel border-border p-5 rounded-none flex flex-col relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 text-green-400">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-muted-foreground">Attendance</span>
          </div>
          <div className="text-3xl font-black font-mono text-green-400">92%</div>
        </div>
        
        <div className="glass-panel border-border p-5 rounded-none flex flex-col relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 text-primary">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-muted-foreground">Coding Progress</span>
          </div>
          <div className="text-3xl font-black font-mono text-foreground">{batch.codingActivity}%</div>
        </div>
        
        <div className="glass-panel border-border p-5 rounded-none flex flex-col relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 text-green-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-muted-foreground">Assignments</span>
          </div>
          <div className="text-3xl font-black font-mono text-foreground">{batch.assignmentProgress}%</div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-3 border-b border-border overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "analytics" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Progress & Analytics
        </button>
        <button
          onClick={() => setActiveTab("roster")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "roster" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" /> Active Roster ({liveStudentsCount})
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "attendance" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ClipboardCheck className="w-4 h-4" /> Attendance Sheet
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "leaderboard" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy className="w-4 h-4" /> Leaders
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main interactive workstation */}
        <div className="lg:col-span-2 glass-panel border-border rounded-xl p-6 flex flex-col gap-6 bg-background/40">
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <BatchAnalyticsPanel />
              <BatchProgressTracking batchName={batch.name} activityPercentage={batch.codingActivity} />
            </div>
          )}

          {activeTab === "roster" && <BatchStudentsList batchId={batch.id} />}

          {activeTab === "attendance" && <BatchAttendanceTracker batchId={batch.id} />}

          {activeTab === "leaderboard" && <BatchLeaderboard batchId={batch.id} />}
        </div>

        {/* Sidebar widgets */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel border-border rounded-xl p-6 bg-background/40">
            <div className="flex justify-between items-center border-b border-border pb-2 mb-4">
              <h3 className="text-xs font-black uppercase font-mono tracking-widest">Team Allocations</h3>
              {!isEditingAssignments && (
                <button 
                  onClick={() => setIsEditingAssignments(true)}
                  className="text-[10px] font-mono text-primary hover:underline uppercase font-bold"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Trainer Allocation */}
              <div>
                <h4 className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mb-2 font-mono">Assigned Trainer</h4>
                {isEditingAssignments ? (
                  <select
                    value={selectedTrainerId}
                    onChange={(e) => setSelectedTrainerId(e.target.value)}
                    className="w-full bg-muted border border-border text-foreground font-mono text-xs p-2 rounded-none focus:outline-none focus:border-primary/50"
                  >
                    <option value="">-- No Trainer --</option>
                    {trainers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                ) : batch.trainerName ? (
                  <div className="flex items-center gap-3 bg-foreground/5 p-3 border border-border">
                    <UserSquare2 className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-foreground">{batch.trainerName}</div>
                      <div className="text-[9px] text-muted-foreground/80 font-mono">Lead Instructor</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground/60 font-mono p-3 bg-foreground/5 border border-dashed border-border text-center">Unallocated</div>
                )}
              </div>

              {/* Faculty Allocation */}
              <div>
                <h4 className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mb-2 font-mono">Assigned Faculty Representative</h4>
                {isEditingAssignments ? (
                  <select
                    value={selectedFacultyId}
                    onChange={(e) => setSelectedFacultyId(e.target.value)}
                    className="w-full bg-muted border border-border text-foreground font-mono text-xs p-2 rounded-none focus:outline-none focus:border-primary/50"
                  >
                    <option value="">-- No Faculty --</option>
                    {faculty.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                ) : batch.facultyName ? (
                  <div className="flex items-center gap-3 bg-foreground/5 p-3 border border-border">
                    <Users className="w-8 h-8 text-purple-400 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-foreground">{batch.facultyName}</div>
                      <div className="text-[9px] text-muted-foreground/80 font-mono">{batch.collegeName} Liaison</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground/60 font-mono p-3 bg-foreground/5 border border-dashed border-border text-center">Unallocated</div>
                )}
              </div>

              {isEditingAssignments && (
                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <Button 
                    onClick={handleSaveAssignments}
                    className="flex-1 bg-primary text-black font-mono text-[10px] uppercase font-black tracking-widest rounded-none h-8"
                  >
                    <Save className="w-3 h-3 mr-1" /> Save
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setSelectedTrainerId(batch.trainerId || "");
                      setSelectedFacultyId(batch.facultyId || "");
                      setIsEditingAssignments(false);
                    }}
                    className="flex-1 font-mono text-[10px] uppercase tracking-widest rounded-none h-8"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="glass-panel border-border rounded-xl p-6 bg-background/40">
             <h3 className="text-xs font-black uppercase tracking-widest border-b border-border pb-2 mb-4">Batch Discussions</h3>
             <div className="space-y-3">
                <div className="bg-foreground/5 p-3 border border-border/50">
                   <div className="text-xs font-bold mb-1">Help with Binary Search?</div>
                   <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>4 replies</span>
                      <span>2h ago</span>
                   </div>
                </div>
                <div className="bg-foreground/5 p-3 border border-border/50">
                   <div className="text-xs font-bold mb-1">Doubt in DP Assignment</div>
                   <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>1 reply</span>
                      <span>Yesterday</span>
                   </div>
                </div>
             </div>
             <Button variant="ghost" className="w-full mt-2 text-[10px] uppercase font-bold text-primary rounded-none">View Discussion Board</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
