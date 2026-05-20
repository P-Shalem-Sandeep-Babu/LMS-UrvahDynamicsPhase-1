export interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  assignedColleges: string[];
  assignedBatches: string[];
  workloadHours: number;
  studentsMonitored: number;
  contestsMonitored: number;
  status: "active" | "inactive" | "on_leave";
}
