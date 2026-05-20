export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedColleges: string[];
  assignedBatches: string[];
  activeStudents: number;
  codingEngagement: number; // percentage
  assignmentCompletion: number; // percentage
  weeklyActivity: number; // hours
  status: "active" | "inactive";
}
