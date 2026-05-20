import { College } from "../types/college";

export const mockColleges: College[] = [
  {
    id: "col_1",
    name: "Urvah Engineering College",
    code: "UEC",
    emailDomain: "@urvah.edu",
    numStudents: 1250,
    numTrainers: 15,
    numFaculty: 45,
    numBatches: 24,
    codingActivityScore: 88,
    weeklyActivityScore: 92,
    status: "active",
    createdAt: "2023-01-15T00:00:00Z",
    metrics: {
      activeStudents: 1100,
      activeTrainers: 12,
      codingCompletionPercentage: 85,
      contestParticipation: 60,
      weeklyEngagement: 92,
    }
  },
  {
    id: "col_2",
    name: "Tech Nexus Institute",
    code: "TNI",
    emailDomain: "@technexus.ac.in",
    numStudents: 850,
    numTrainers: 8,
    numFaculty: 22,
    numBatches: 12,
    codingActivityScore: 75,
    weeklyActivityScore: 68,
    status: "active",
    createdAt: "2023-05-22T00:00:00Z",
    metrics: {
      activeStudents: 600,
      activeTrainers: 7,
      codingCompletionPercentage: 70,
      contestParticipation: 45,
      weeklyEngagement: 68,
    }
  },
  {
    id: "col_3",
    name: "Global Institute of Technology",
    code: "GIT",
    emailDomain: "@git.edu.in",
    numStudents: 2100,
    numTrainers: 25,
    numFaculty: 60,
    numBatches: 38,
    codingActivityScore: 95,
    weeklyActivityScore: 98,
    status: "active",
    createdAt: "2022-11-10T00:00:00Z",
    metrics: {
      activeStudents: 1950,
      activeTrainers: 24,
      codingCompletionPercentage: 92,
      contestParticipation: 80,
      weeklyEngagement: 98,
    }
  },
  {
    id: "col_4",
    name: "Future Skills Academy",
    code: "FSA",
    emailDomain: "@fsa.org",
    numStudents: 450,
    numTrainers: 5,
    numFaculty: 12,
    numBatches: 6,
    codingActivityScore: 40,
    weeklyActivityScore: 35,
    status: "onboarding",
    createdAt: "2024-02-01T00:00:00Z",
    metrics: {
      activeStudents: 150,
      activeTrainers: 4,
      codingCompletionPercentage: 30,
      contestParticipation: 15,
      weeklyEngagement: 35,
    }
  }
];
