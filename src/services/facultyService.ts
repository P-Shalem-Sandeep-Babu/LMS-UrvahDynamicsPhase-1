import { Faculty } from "../types/faculty";
import { mockFaculty } from "../data/mockFaculty";
import { mockColleges } from "../data/mockColleges";
import { mockBatches } from "../data/mockBatches";

const FACULTY_STORAGE_KEY = "lms_faculty_data";
const FACULTY_REPORTS_KEY = "lms_faculty_reports";

export interface StudentProgressMetric {
  id: string;
  name: string;
  batchName: string;
  completionRate: number;      // percent
  activeCodingHours: number;    // hours
  solvedCount: number;         // solved problems
  averageGrade: number;        // percent
  lastSubmissionTime: string;
}

export interface ContestHistoryLog {
  id: string;
  title: string;
  batchName: string;
  startDate: string;
  participantsCount: number;
  averageScore: number;        // percent
  topPerformerName: string;
  status: "completed" | "active" | "scheduled";
}

export interface FacultyWeeklyProgress {
  id: string;
  weekStarting: string;
  gradingHours: number;
  oneOnOneSessions: number;
  activeContestsCreated: number;
  monitoredStudentActivityRate: number; // percent
  milestonesReached: string[];
  challengesDetected: string[];
  departmentNotes: string;
}

export interface DomainMappingProposal {
  collegeId: string;
  collegeName: string;
  collegeDomain: string;
  matchesFacultyEmail: boolean;
  status: "unassigned" | "mapping_available" | "assigned";
}

export const getStoredFaculty = (): Faculty[] => {
  const stored = localStorage.getItem(FACULTY_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(FACULTY_STORAGE_KEY, JSON.stringify(mockFaculty));
    return mockFaculty;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockFaculty;
  }
};

export const saveStoredFaculty = (facultyList: Faculty[]): void => {
  localStorage.setItem(FACULTY_STORAGE_KEY, JSON.stringify(facultyList));
  window.dispatchEvent(new Event("storage_faculty_updated"));
};

// Automate domain-based mapping of colleges to faculty based on email patterns
export const generateDomainMappingProposals = (faculty: Faculty): DomainMappingProposal[] => {
  const emailLower = faculty.email.toLowerCase();
  
  return mockColleges.map((college) => {
    const domainLower = (college.emailDomain || "").toLowerCase();
    const isDomainMatch = domainLower && emailLower.endsWith(domainLower);
    const isCurrentlyAssigned = (faculty.assignedColleges || []).includes(college.id);
    
    let status: "unassigned" | "mapping_available" | "assigned" = "unassigned";
    if (isCurrentlyAssigned) {
      status = "assigned";
    } else if (isDomainMatch) {
      status = "mapping_available";
    }
    
    return {
      collegeId: college.id,
      collegeName: college.name,
      collegeDomain: college.emailDomain || "N/A",
      matchesFacultyEmail: !!isDomainMatch,
      status
    };
  });
};

// Run automated domain mapping sync - automatically map all domain-matching colleges & their active batches
export const applyDomainBasedMapping = (facultyId: string): Faculty | null => {
  const list = getStoredFaculty();
  const index = list.findIndex(f => f.id === facultyId);
  if (index === -1) return null;

  const faculty = list[index];
  const proposals = generateDomainMappingProposals(faculty);
  
  // Find all colleges that match by domain
  const matchingColleges = proposals.filter(p => p.matchesFacultyEmail);
  const collegeIdsToAssign = matchingColleges.map(p => p.collegeId);
  
  // Also collect and assign all batches associated with these colleges
  const relevantBatchIds = mockBatches
    .filter(b => collegeIdsToAssign.includes(b.collegeId))
    .map(b => b.id);

  // Apply domain alignments
  const updatedColleges = Array.from(new Set([...(faculty.assignedColleges || []), ...collegeIdsToAssign]));
  const updatedBatches = Array.from(new Set([...(faculty.assignedBatches || []), ...relevantBatchIds]));

  // Recalculate workloads & student counters
  const studentCount = mockBatches
    .filter(b => updatedBatches.includes(b.id))
    .reduce((sum, b) => sum + b.studentCount, 0);

  const updatedFaculty: Faculty = {
    ...faculty,
    assignedColleges: updatedColleges,
    assignedBatches: updatedBatches,
    studentsMonitored: studentCount,
    workloadHours: updatedBatches.length * 6, // 6 hrs workload per active student batch
  };

  list[index] = updatedFaculty;
  saveStoredFaculty(list);
  return updatedFaculty;
};

// Remove domain alignments to trigger clean manual status overrides
export const resetToManualAssignment = (
  facultyId: string, 
  colleges: string[], 
  batches: string[]
): Faculty | null => {
  const list = getStoredFaculty();
  const index = list.findIndex(f => f.id === facultyId);
  if (index === -1) return null;

  const faculty = list[index];
  
  const studentCount = mockBatches
    .filter(b => batches.includes(b.id))
    .reduce((sum, b) => sum + b.studentCount, 0);

  const updatedFaculty: Faculty = {
    ...faculty,
    assignedColleges: colleges,
    assignedBatches: batches,
    studentsMonitored: studentCount,
    workloadHours: batches.length * 5, // manual override 5 workload hours per batch
  };

  list[index] = updatedFaculty;
  saveStoredFaculty(list);
  return updatedFaculty;
};

// Get interactive metrics regarding monitored student activity
export const getStudentsMonitoredProgress = (facultyId: string): StudentProgressMetric[] => {
  const faculty = getStoredFaculty().find(f => f.id === facultyId);
  if (!faculty) return [];

  const defaultMetrics: StudentProgressMetric[] = [
    {
      id: "std_pr_1",
      name: "Siddharth Sharma",
      batchName: "UEC Full Stack 2026",
      completionRate: 94,
      activeCodingHours: 32,
      solvedCount: 45,
      averageGrade: 91,
      lastSubmissionTime: "2026-05-20T10:15:00Z"
    },
    {
      id: "std_pr_2",
      name: "Ananya Iyer",
      batchName: "UEC Full Stack 2026",
      completionRate: 88,
      activeCodingHours: 28,
      solvedCount: 38,
      averageGrade: 85,
      lastSubmissionTime: "2026-05-20T09:40:00Z"
    },
    {
      id: "std_pr_3",
      name: "Rohan Das",
      batchName: "UEC Full Stack 2026",
      completionRate: 45,
      activeCodingHours: 12,
      solvedCount: 15,
      averageGrade: 62,
      lastSubmissionTime: "2026-05-18T16:22:00Z"
    },
    {
      id: "std_pr_4",
      name: "Tanvi Rao",
      batchName: "FSA React Bootcamp",
      completionRate: 98,
      activeCodingHours: 42,
      solvedCount: 52,
      averageGrade: 96,
      lastSubmissionTime: "2026-05-20T11:05:00Z"
    },
    {
      id: "std_pr_5",
      name: "Vikram Malhotra",
      batchName: "FSA React Bootcamp",
      completionRate: 72,
      activeCodingHours: 20,
      solvedCount: 26,
      averageGrade: 78,
      lastSubmissionTime: "2026-05-19T15:10:00Z"
    }
  ];

  // Map to assigned batches to return only those relevant to this specific faculty member
  const assignedBatchNames = mockBatches
    .filter(b => (faculty.assignedBatches || []).includes(b.id))
    .map(b => b.name);

  if (assignedBatchNames.length === 0) {
    return [];
  }

  return defaultMetrics.filter(m => assignedBatchNames.includes(m.batchName));
};

// Tracking data regarding past & live coding contests under faculty watch
export const getContestsMonitoredHistory = (facultyId: string): ContestHistoryLog[] => {
  const faculty = getStoredFaculty().find(f => f.id === facultyId);
  if (!faculty) return [];

  const defaultLogs: ContestHistoryLog[] = [
    {
      id: "cnt_l_1",
      title: "Full-Stack Express CRUD Sprint",
      batchName: "UEC Full Stack 2026",
      startDate: "2026-05-18T09:00:00Z",
      participantsCount: 42,
      averageScore: 82,
      topPerformerName: "Ananya Iyer (100 pts)",
      status: "completed"
    },
    {
      id: "cnt_l_2",
      title: "Binary Tree Mastery Challenge",
      batchName: "TNI DSA Mastery",
      startDate: "2026-05-15T15:00:00Z",
      participantsCount: 56,
      averageScore: 74,
      topPerformerName: "Devendra Patil (98 pts)",
      status: "completed"
    },
    {
      id: "cnt_l_3",
      title: "React Functional Hooks Assessment",
      batchName: "FSA React Bootcamp",
      startDate: "2026-05-21T10:00:00Z",
      participantsCount: 24,
      averageScore: 0,
      topPerformerName: "N/A",
      status: "scheduled"
    },
    {
      id: "cnt_l_4",
      title: "Sorting and Binary Searches Exam",
      batchName: "UEC Full Stack 2026",
      startDate: "2026-05-20T14:00:00Z",
      participantsCount: 45,
      averageScore: 78,
      topPerformerName: "Siddharth Sharma (99 pts)",
      status: "active"
    }
  ];

  const assignedBatchNames = mockBatches
    .filter(b => (faculty.assignedBatches || []).includes(b.id))
    .map(b => b.name);

  if (assignedBatchNames.length === 0) {
    return [];
  }

  return defaultLogs.filter(cl => assignedBatchNames.includes(cl.batchName));
};

// Periodic weekly faculty progress reports
export const getFacultyWeeklyReports = (facultyId: string): FacultyWeeklyProgress[] => {
  // Return tailored timeline for faculty members
  const reports: FacultyWeeklyProgress[] = [
    {
      id: "fac_w_1",
      weekStarting: "2026-05-11",
      gradingHours: 12,
      oneOnOneSessions: 4,
      activeContestsCreated: 2,
      monitoredStudentActivityRate: 88,
      milestonesReached: [
        "Finished grading 'Dynamic Routing Projects' with thorough, modular code suggestions.",
        "Created an assessment contest on Express middleware implementation details.",
        "Addressed lag indicators for 5 students through video check ins."
      ],
      challengesDetected: [
        "Certain students faced local database connection problems during practice exercises.",
        "Overlaps between college internal labs resulted in slow assessment submissions."
      ],
      departmentNotes: "Highly proactive grading. Student engagement maintains an exceptional standard."
    },
    {
      id: "fac_w_2",
      weekStarting: "2026-05-04",
      gradingHours: 15,
      oneOnOneSessions: 6,
      activeContestsCreated: 1,
      monitoredStudentActivityRate: 84,
      milestonesReached: [
        "Delivered full-system mock assessments in preparation for core certification.",
        "Synthesized dynamic review feedback criteria on UI layout projects."
      ],
      challengesDetected: [
        "High absenteeism in Friday evening doubt hours sessions."
      ],
      departmentNotes: "Pristine alignment with domain mapping timelines."
    }
  ];

  if (facultyId === "fac_3") {
    return [];
  }

  return reports;
};

// Batch insights compared under faculty member's supervision
export interface FacultyBatchInsight {
  batchId: string;
  batchName: string;
  collegeName: string;
  activeStudents: number;
  avgSubmissionSpeed: string; // "Fast" | "Moderate" | "Slow"
  completionIndex: number;    // percent
  attendanceIndex: number;    // percent
  topPerformer: string;
  stagnantCoders: number;
}

export const getFacultyBatchInsights = (facultyId: string): FacultyBatchInsight[] => {
  const faculty = getStoredFaculty().find(f => f.id === facultyId);
  if (!faculty) return [];

  const insightPool: FacultyBatchInsight[] = [
    {
      batchId: "batch_1",
      batchName: "UEC Full Stack 2026",
      collegeName: "Urvah Engineering College",
      activeStudents: 45,
      avgSubmissionSpeed: "Fast",
      completionIndex: 82,
      attendanceIndex: 94,
      topPerformer: "Ananya Iyer",
      stagnantCoders: 2
    },
    {
      batchId: "batch_2",
      batchName: "TNI DSA Mastery",
      collegeName: "Tech Nexus Institute",
      activeStudents: 60,
      avgSubmissionSpeed: "Moderate",
      completionIndex: 74,
      attendanceIndex: 89,
      topPerformer: "Devendra Patil",
      stagnantCoders: 5
    },
    {
      batchId: "batch_3",
      batchName: "GIT Web Dev Alpha",
      collegeName: "Global Institute of Tech",
      activeStudents: 35,
      avgSubmissionSpeed: "Fast",
      completionIndex: 79,
      attendanceIndex: 91,
      topPerformer: "Rohit Roy",
      stagnantCoders: 1
    },
    {
      batchId: "batch_4",
      batchName: "FSA React Bootcamp",
      collegeName: "Future Skills Academy",
      activeStudents: 25,
      avgSubmissionSpeed: "Slow",
      completionIndex: 58,
      attendanceIndex: 75,
      topPerformer: "Tanvi Rao",
      stagnantCoders: 4
    }
  ];

  const assignedBatchIds = faculty.assignedBatches || [];
  return insightPool.filter(insight => assignedBatchIds.includes(insight.batchId));
};
