import React, { useState, useEffect, useMemo } from "react";
import { Users, Search, Filter, Plus, LayoutGrid, List, Download, FileSpreadsheet, X, HelpCircle, Send, CheckCircle, Clock } from "lucide-react";
import { getStoredStudents, saveStoredStudents, getStoredBatches } from "../utils/batchState";
import { mockColleges } from "../data/mockColleges";
import { StudentTable } from "./components/StudentTable";
import { StudentCard } from "./components/StudentCard";
import { Student } from "../types/student";
import { Button } from "../components/ui/button";
import { CreateStudentModal } from "./components/CreateStudentModal";
import { EditStudentModal } from "./components/EditStudentModal";
import { DeleteStudentModal } from "./components/DeleteStudentModal";
import { BulkUploadModal } from "./components/BulkUploadModal";
import { StudentStatsWidget } from "./components/StudentStatsWidget";
import { Badge } from "../components/ui/badge";

export const StudentManagement = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  
  // Storage State hook
  const [students, setStudents] = useState<Student[]>(() => getStoredStudents());
  const [batches, setBatches] = useState(() => getStoredBatches());

  // Filters State
  const [collegeFilter, setCollegeFilter] = useState<string>("all");
  const [batchFilter, setBatchFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [inviteStatusFilter, setInviteStatusFilter] = useState<string>("all");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Modals Visibility
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteTargetStudent, setDeleteTargetStudent] = useState<Student | null>(null);

  // Notifications feedback for actions
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Listen for storage events
  useEffect(() => {
    const syncStudents = () => {
      setStudents(getStoredStudents());
    };
    const syncBatches = () => {
      setBatches(getStoredBatches());
    };
    
    window.addEventListener("urvah_students_update", syncStudents);
    window.addEventListener("urvah_batches_update", syncBatches);
    
    return () => {
      window.removeEventListener("urvah_students_update", syncStudents);
      window.removeEventListener("urvah_batches_update", syncBatches);
    };
  }, []);

  const showNotification = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Extract unique branches of all students
  const availableBranches = useMemo(() => {
    const rawBranches = students.map(s => s.branch).filter(Boolean);
    return Array.from(new Set(rawBranches));
  }, [students]);

  // Handle student creation
  const handleCreateStudent = (studentData: Partial<Student>) => {
    const freshStudent: Student = {
      id: `stu_${Date.now()}`,
      name: studentData.name || "Unnamed Student",
      userName: studentData.userName || `user_${Date.now()}`,
      rollNo: studentData.rollNo || `REG-${Math.floor(Math.random() * 90000 + 10000)}`,
      personalMail: studentData.personalMail || "",
      collegeMail: studentData.collegeMail || "",
      phone: studentData.phone || "",
      collegeId: studentData.collegeId || (mockColleges[0]?.id || "col_1"),
      branch: studentData.branch || "Computer Science",
      year: Number(studentData.year) || 3,
      batchId: studentData.batchId || (batches[0]?.id || "batch_1"),
      codingScore: 0,
      assignmentProgress: 0,
      contestParticipation: 0,
      streakScore: 0,
      inviteStatus: "pending",
      inviteSentDate: new Date().toISOString().split("T")[0],
      attendanceRate: 100,
      attendanceLog: [],
      activityTimeline: [
        {
          id: `act_${Date.now()}`,
          type: "invite",
          title: "System Enrollment Invitation Dispatched",
          timestamp: new Date().toISOString(),
          details: `Portal invite sent to ${studentData.collegeMail || studentData.personalMail}.`,
          statusClass: "text-green-400"
        }
      ]
    };

    const newStudentList = [freshStudent, ...students];
    setStudents(newStudentList);
    saveStoredStudents(newStudentList);
    showNotification(`Student record for ${freshStudent.name} successfully established.`);
  };

  // Handle student modification
  const handleEditStudent = (updatedFields: Partial<Student>) => {
    if (!editStudent) return;
    const list = students.map(s => {
      if (s.id === editStudent.id) {
        return {
          ...s,
          ...updatedFields,
          // Convert numeric inputs correctly
          year: Number(updatedFields.year) || s.year,
        };
      }
      return s;
    });

    setStudents(list);
    saveStoredStudents(list);
    setEditStudent(null);
    showNotification(`Operative profile for ${editStudent.name} updated.`);
  };

  // Handle student purging
  const handleDeleteConfirm = () => {
    if (!deleteTargetStudent) return;
    const list = students.filter(s => s.id !== deleteTargetStudent.id);
    setStudents(list);
    saveStoredStudents(list);
    setDeleteTargetStudent(null);
    showNotification(`Purged student folder: ${deleteTargetStudent.name}.`, "info");
  };

  // Handle bulk spreadsheet uploads
  const handleBulkUpload = (importedStudents: Partial<Student>[]) => {
    const listWithIds: Student[] = importedStudents.map((stud, idx) => {
      const generatedId = `stu_bulk_${Date.now()}_${idx}`;
      return {
        ...stud,
        id: generatedId,
        name: stud.name || "Bulk Loaded",
        userName: stud.userName || `user_${generatedId}`,
        rollNo: stud.rollNo || `REG-${generatedId}`,
        personalMail: stud.personalMail || "",
        collegeMail: stud.collegeMail || "",
        phone: stud.phone || "",
        collegeId: collegeFilter !== "all" ? collegeFilter : (mockColleges[0]?.id || "col_1"),
        branch: stud.branch || "Computer Science",
        year: stud.year || 1,
        batchId: batchFilter !== "all" ? batchFilter : (batches[0]?.id || "batch_1"),
        codingScore: 0,
        assignmentProgress: 0,
        contestParticipation: 0,
        streakScore: 0,
        inviteStatus: "pending",
        inviteSentDate: new Date().toISOString().split("T")[0],
        attendanceRate: 100,
        attendanceLog: [],
        activityTimeline: [
          {
            id: `act_bulk_${idx}`,
            type: "invite",
            title: "Bulk Dispatched Portal Invitation",
            timestamp: new Date().toISOString(),
            details: `CSV/XLS loaded enrollment invitation queued.`,
            statusClass: "text-green-400"
          }
        ]
      } as Student;
    });

    const combinedList = [...listWithIds, ...students];
    setStudents(combinedList);
    saveStoredStudents(combinedList);
    showNotification(`Successfully imported and queued ${listWithIds.length} students.`);
  };

  // Invite actions (Remind, Revoke)
  const handleInviteRemind = (studentId: string) => {
    const list = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          inviteStatus: "pending" as const,
          inviteSentDate: new Date().toISOString().split("T")[0],
          activityTimeline: [
            {
              id: `act_remind_${Date.now()}`,
              type: "invite" as const,
              title: "Portal Access Invitation Re-Dispatched",
              timestamp: new Date().toISOString(),
              details: `Sent enrollment reminder pin to ${s.collegeMail}.`,
              statusClass: "text-green-400"
            },
            ...(s.activityTimeline || [])
          ]
        };
      }
      return s;
    });
    
    setStudents(list);
    saveStoredStudents(list);
    const matched = students.find(s => s.id === studentId);
    showNotification(`Access reminder dispatched to ${matched?.name || 'student'}.`);
  };

  const handleInviteRevoke = (studentId: string) => {
    const list = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          inviteStatus: "expired" as const,
          activityTimeline: [
            {
              id: `act_remind_${Date.now()}`,
              type: "invite" as const,
              title: "Enrollment Token Manually Expired",
              timestamp: new Date().toISOString(),
              details: `Portal token suspended by administrative console request.`,
              statusClass: "text-red-500"
            },
            ...(s.activityTimeline || [])
          ]
        };
      }
      return s;
    });
    
    setStudents(list);
    saveStoredStudents(list);
    const matched = students.find(s => s.id === studentId);
    showNotification(`Enrollment portal access revoked for ${matched?.name || 'student'}.`, "info");
  };

  // Filter & Search Logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // 1. Search Query
      const query = search.toLowerCase();
      const matchesSearch = 
        student.name.toLowerCase().includes(query) || 
        student.rollNo.toLowerCase().includes(query) ||
        student.userName.toLowerCase().includes(query) ||
        student.collegeMail.toLowerCase().includes(query);

      // 2. College Filter
      const matchesCollege = collegeFilter === "all" || student.collegeId === collegeFilter;

      // 3. Batch Filter
      const matchesBatch = batchFilter === "all" || student.batchId === batchFilter;

      // 4. Year Filter
      const matchesYear = yearFilter === "all" || student.year === Number(yearFilter);

      // 5. Department/Branch Filter
      const matchesBranch = branchFilter === "all" || student.branch.toLowerCase() === branchFilter.toLowerCase();

      // 6. Invite Status Filter
      const matchesInvite = inviteStatusFilter === "all" || student.inviteStatus === inviteStatusFilter;

      return matchesSearch && matchesCollege && matchesBatch && matchesYear && matchesBranch && matchesInvite;
    });
  }, [students, search, collegeFilter, batchFilter, yearFilter, branchFilter, inviteStatusFilter]);

  // Reset Filters trigger
  const handleResetFilters = () => {
    setCollegeFilter("all");
    setBatchFilter("all");
    setYearFilter("all");
    setBranchFilter("all");
    setInviteStatusFilter("all");
    setSearch("");
    setCurrentPage(1);
  };

  // Pagination bounds
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [search, collegeFilter, batchFilter, yearFilter, branchFilter, inviteStatusFilter]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in select-none">
      {/* Toast Alert */}
      {notification && (
        <div id="student-toast" className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded border font-mono text-xs shadow-2xl transition-all animate-bounce ${
          notification.type === "success" 
            ? "bg-green-950/90 border-green-500/30 text-green-400" 
            : "bg-muted/90 border-primary/30 text-primary"
        }`}>
          {notification.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0 animate-spin" /> : <Clock className="w-4 h-4 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-foreground">
            <Users className="w-6 h-6 text-primary" />
            OPERATIVE DIRECTORY
          </h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">Manage and audit student registries, allocations, and invite streams.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant="outline" 
            onClick={() => setIsBulkUploadOpen(true)}
            className="border-border text-xs font-mono uppercase tracking-wider h-9 bg-white/[0.02] hover:bg-foreground/5 text-foreground"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2 text-primary" /> Import Spreadsheet
          </Button>
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-primary text-black font-black text-xs uppercase tracking-wider h-9 rounded-none hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Student (Manual)
          </Button>
        </div>
      </div>

      {/* Numerical Stats Widgets */}
      <StudentStatsWidget students={students} />

      {/* Interactive Search, Views, & Expanding Filters Controls */}
      <div className="flex flex-col gap-4 border border-border bg-card p-4 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input 
                type="text" 
                placeholder="Query operative folder by name, roll no, or username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background/40 border border-border rounded-sm text-foreground text-xs font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/80 hover:text-foreground">
                  <X className="w-3" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-background rounded-lg border border-border/50">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`w-8 h-8 rounded-md`} 
                onClick={() => setView("grid")}
              >
                <LayoutGrid className={`w-4 h-4 ${view === "grid" ? "text-primary" : "text-muted-foreground/80"}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`w-8 h-8 rounded-md`} 
                onClick={() => setView("list")}
              >
                <List className={`w-4 h-4 ${view === "list" ? "text-primary" : "text-muted-foreground/80"}`} />
              </Button>
            </div>
            
            <div className="w-px h-6 bg-foreground/10 hidden md:block" />
            
            <Button 
              variant="outline" 
              onClick={() => setShowFiltersPanel(!showFiltersPanel)} 
              className={`border-border text-xs font-mono h-9 ${showFiltersPanel ? 'bg-primary/15 text-primary border-primary/30' : 'text-foreground'}`}
            >
              <Filter className="w-3.5 h-3.5 mr-2" /> Filters {(collegeFilter !== "all" || batchFilter !== "all" || yearFilter !== "all" || branchFilter !== "all" || inviteStatusFilter !== "all") && "●"}
            </Button>
          </div>
        </div>

        {/* Dynamic Filters Section */}
        {showFiltersPanel && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            {/* Filter by College */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">Aesthetic College</label>
              <select
                value={collegeFilter}
                onChange={(e) => setCollegeFilter(e.target.value)}
                className="bg-background/90 border border-border text-xs font-mono text-foreground p-2 rounded focus:outline-none focus:border-primary/50"
              >
                <option value="all">-- All Colleges --</option>
                {mockColleges.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Filter by Batch */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">Assigned Batch</label>
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="bg-background/90 border border-border text-xs font-mono text-foreground p-2 rounded focus:outline-none focus:border-primary/50"
              >
                <option value="all">-- All Batches --</option>
                {batches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Filter by Academic Year */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">Study Level (Year)</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="bg-background/90 border border-border text-xs font-mono text-foreground p-2 rounded focus:outline-none focus:border-primary/50"
              >
                <option value="all">-- All Years --</option>
                <option value={1}>Freshman (Year 1)</option>
                <option value={2}>Sophomore (Year 2)</option>
                <option value={3}>Junior (Year 3)</option>
                <option value={4}>Senior (Year 4)</option>
              </select>
            </div>

            {/* Filter by Branch */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">Branch/Major</label>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="bg-background/90 border border-border text-xs font-mono text-foreground p-2 rounded focus:outline-none focus:border-primary/50"
              >
                <option value="all">-- All Majors --</option>
                {availableBranches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Filter by Portal Invite Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">Invite State</label>
              <div className="flex gap-2">
                <select
                  value={inviteStatusFilter}
                  onChange={(e) => setInviteStatusFilter(e.target.value)}
                  className="bg-background/90 border border-border text-xs font-mono text-foreground p-2 rounded focus:outline-none focus:border-primary/50 flex-1"
                >
                  <option value="all">-- All Statuses --</option>
                  <option value="applied">Applied</option>
                  <option value="pending">Invitation Queued</option>
                  <option value="accepted">Accepted / Registered</option>
                  <option value="expired">Expired Tokens</option>
                </select>
                
                <Button 
                  onClick={handleResetFilters}
                  variant="ghost" 
                  size="icon" 
                  title="Clear All Filters"
                  className="h-9 w-9 bg-foreground/5 border border-border text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Student Directory Workstation view toggle */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedStudents.length > 0 ? (
            paginatedStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))
          ) : (
            <div className="col-span-full border border-dashed border-white/15 p-12 text-center rounded-xl bg-background/40">
              <HelpCircle className="w-10 h-10 mx-auto text-white/20 mb-2" />
              <p className="font-mono text-xs text-muted-foreground">NO MATCHING STUDENT CODES REPORTED.</p>
              <button onClick={handleResetFilters} className="text-xs uppercase font-mono text-primary font-bold mt-2 hover:underline">Clear Filters</button>
            </div>
          )}
        </div>
      ) : (
        <StudentTable 
          students={paginatedStudents} 
          onEdit={(s) => setEditStudent(s)}
          onDelete={(s) => setDeleteTargetStudent(s)}
          onInviteRemind={handleInviteRemind}
          onInviteRevoke={handleInviteRevoke}
        />
      )}

      {/* Custom Scannable Pagination component widget */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border bg-card p-4 rounded-xl mt-1">
          <span className="text-[11px] font-mono text-muted-foreground/80 uppercase tracking-widest text-center sm:text-left">
            Discovered {filteredStudents.length} entries. Visualizing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} files.
          </span>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase mr-1">Roster Page size</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-background border border-border border-r-4 border-r-transparent text-[11px] font-mono text-foreground p-1 rounded focus:outline-none"
            >
              <option value={4}>4 items</option>
              <option value={8}>8 items</option>
              <option value={12}>12 items</option>
              <option value={20}>20 items</option>
              <option value={50}>50 items</option>
            </select>

            <div className="flex items-center gap-1.5 ml-2">
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="text-[10px] font-mono tracking-widest uppercase border-border h-7 rounded-sm hover:bg-foreground/5 text-foreground disabled:pointer-events-none disabled:opacity-30"
              >
                Back Coordinates
              </Button>
              <div className="px-3 py-1 font-mono text-xs border border-border bg-background text-foreground/70">
                {currentPage} / {totalPages}
              </div>
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="text-[10px] font-mono tracking-widest uppercase border-border h-7 rounded-sm hover:bg-foreground/5 text-foreground disabled:pointer-events-none disabled:opacity-30"
              >
                Next Coordinates
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Creation Modal Dialog */}
      <CreateStudentModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={handleCreateStudent} 
      />
      
      {/* Modification Modal Dialog */}
      <EditStudentModal 
        student={editStudent} 
        isOpen={!!editStudent} 
        onClose={() => setEditStudent(null)} 
        onSubmit={handleEditStudent} 
      />
      
      {/* Purging Modal Dialog */}
      <DeleteStudentModal 
        student={deleteTargetStudent} 
        isOpen={!!deleteTargetStudent} 
        onClose={() => setDeleteTargetStudent(null)} 
        onConfirm={handleDeleteConfirm} 
      />
      
      {/* CSV/XLS Parsing Multi-Enrollment Import */}
      <BulkUploadModal 
        isOpen={isBulkUploadOpen} 
        onClose={() => setIsBulkUploadOpen(false)} 
        onUpload={handleBulkUpload} 
      />
    </div>
  );
};
