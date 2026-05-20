export interface Batch {
  id: string;
  name: string;
  collegeId: string;
  collegeName: string;
  trainerId?: string;
  trainerName?: string;
  facultyId?: string;
  facultyName?: string;
  studentCount: number;
  codingActivity: number; // percentage
  assignmentProgress: number; // percentage
  status: "active" | "completed" | "upcoming";
  startDate: string;
  endDate: string;
}

export interface BatchAnalytics {
  activeStudents: number;
  averageScore: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  codingSheetsSolved: number;
}
