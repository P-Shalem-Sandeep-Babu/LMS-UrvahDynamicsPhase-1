import React, { useState, useEffect } from "react";
import { Search, Plus, Filter, LayoutGrid, List as ListIcon, Users } from "lucide-react";
import { getStoredFaculty, saveStoredFaculty } from "../services/facultyService";
import { Faculty } from "../types/faculty";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FacultyCard } from "./faculty/components/FacultyCard";
import { FacultyTable } from "./faculty/components/FacultyTable";
import { FacultyStatsWidget } from "./faculty/components/FacultyStatsWidget";
import { CreateFacultyModal } from "./faculty/components/CreateFacultyModal";
import { EditFacultyModal } from "./faculty/components/EditFacultyModal";
import { FacultyAssignmentModal } from "./faculty/components/FacultyAssignmentModal";

export const FacultyManagement = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [facultyList, setFacultyList] = useState<Faculty[]>(() => getStoredFaculty());

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editFaculty, setEditFaculty] = useState<Faculty | null>(null);
  const [assignFaculty, setAssignFaculty] = useState<Faculty | null>(null);

  const refreshFaculty = () => {
    setFacultyList(getStoredFaculty());
  };

  useEffect(() => {
    window.addEventListener("storage_faculty_updated", refreshFaculty);
    return () => {
      window.removeEventListener("storage_faculty_updated", refreshFaculty);
    };
  }, []);

  const handleCreateFaculty = (data: Partial<Faculty>) => {
    const newFaculty: Faculty = {
      id: `fac_${Date.now()}`,
      name: data.name || "Unnamed Faculty",
      email: data.email || "faculty@urvah.edu",
      phone: data.phone || "",
      department: data.department || "Computer Science",
      assignedColleges: [],
      assignedBatches: [],
      workloadHours: 0,
      studentsMonitored: 0,
      contestsMonitored: 0,
      status: data.status || "active"
    };

    const updated = [...facultyList, newFaculty];
    saveStoredFaculty(updated);
    setFacultyList(updated);
    setIsCreateOpen(false);
  };

  const handleEditFaculty = (data: Partial<Faculty>) => {
    if (!data.id) return;
    const updated = facultyList.map(f => f.id === data.id ? { ...f, ...data } as Faculty : f);
    saveStoredFaculty(updated);
    setFacultyList(updated);
    setEditFaculty(null);
  };

  const filteredFaculty = facultyList.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.email.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in pb-12 text-foreground">
      
      {/* Directory Header context */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Faculty Advisor Directory
          </h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Supervise department allocations, automated domain mapping, and student progress metrics.
          </p>
        </div>
      </div>

      <FacultyStatsWidget facultyList={facultyList} />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 border border-border rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input 
            type="text" 
            placeholder="Search faculty by name, email or dept..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border-border text-foreground pl-10 focus-visible:ring-primary/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="bg-primary text-black font-bold text-xs uppercase tracking-wider h-9"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Faculty Advisor
          </Button>
          
          <div className="flex bg-card border border-border rounded-md p-1 h-9">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-sm transition-colors ${view === "grid" ? "bg-foreground/10 text-foreground" : "text-muted-foreground/80 hover:text-foreground"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-sm transition-colors ${view === "list" ? "bg-foreground/10 text-foreground" : "text-muted-foreground/80 hover:text-foreground"}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFaculty.map(faculty => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
          {filteredFaculty.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground/80 font-mono text-sm border border-dashed border-border rounded-xl">
              No faculty found matching your criteria.
            </div>
          )}
        </div>
      ) : (
        <FacultyTable 
          facultyList={filteredFaculty} 
          onEdit={setEditFaculty}
          onAssign={setAssignFaculty}
        />
      )}

      <CreateFacultyModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={handleCreateFaculty}
      />

      <EditFacultyModal 
        faculty={editFaculty} 
        isOpen={!!editFaculty} 
        onClose={() => setEditFaculty(null)} 
        onSubmit={handleEditFaculty}
      />

      <FacultyAssignmentModal 
        faculty={assignFaculty} 
        isOpen={!!assignFaculty} 
        onClose={() => setAssignFaculty(null)} 
        onSuccess={refreshFaculty}
      />
    </div>
  );
};
