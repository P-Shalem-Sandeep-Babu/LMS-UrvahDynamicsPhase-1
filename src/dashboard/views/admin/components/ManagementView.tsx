import { useState } from "react";
import { Building2, Users, GraduationCap, Briefcase, Layers } from "lucide-react";
import { UserManagementTable } from "./management/UserManagementTable";
import { CollegeManagement } from "./management/CollegeManagement";
import { BatchManagement } from "../../../../batches/BatchManagement";
import { StudentManagement } from "../../../../students/StudentManagement";

import { TrainerManagement } from "../../../../admin/trainers/TrainerManagement";
import { FacultyManagement } from "../../../../admin/FacultyManagement";

export const ManagementView = () => {
  const [mgmtTab, setMgmtTab] = useState<"colleges" | "students" | "trainers" | "faculty" | "batches">("colleges");

  const tabs = [
    { id: "colleges", label: "Colleges", icon: Building2 },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "trainers", label: "Trainers", icon: Briefcase },
    { id: "faculty", label: "Faculty", icon: Users },
    { id: "batches", label: "Batches", icon: Layers },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-card border border-border p-1 w-full overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMgmtTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                mgmtTab === tab.id
                  ? "bg-primary text-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <Icon className="w-3 h-3" /> {tab.label}
            </button>
          )
        })}
      </div>

      <div className="min-h-[400px]">
        {mgmtTab === "colleges" && <CollegeManagement />}
        {mgmtTab === "students" && <StudentManagement />}
        {mgmtTab === "trainers" && <TrainerManagement />}
        {mgmtTab === "faculty" && <FacultyManagement />}
        {mgmtTab === "batches" && <BatchManagement />}
      </div>
    </div>
  );
};
