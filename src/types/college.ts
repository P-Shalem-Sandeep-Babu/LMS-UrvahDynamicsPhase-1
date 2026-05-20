export interface College {
  id: string;
  name: string;
  code: string;
  emailDomain: string;
  numStudents: number;
  numTrainers: number;
  numFaculty: number;
  numBatches: number;
  codingActivityScore: number;
  weeklyActivityScore: number;
  status: "active" | "inactive" | "onboarding";
  createdAt: string;
  metrics: CollegeAnalytics;
}

export interface CollegeAnalytics {
  activeStudents: number;
  activeTrainers: number;
  codingCompletionPercentage: number;
  contestParticipation: number;
  weeklyEngagement: number; // percentage
}
