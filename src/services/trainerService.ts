import { Trainer } from "../types/trainer";
import { mockTrainers } from "../data/mockTrainers";
import { mockBatches } from "../data/mockBatches";
import { mockColleges } from "../data/mockColleges";

const TRAINING_REPORTS_KEY = "lms_trainer_reports";
const TRAINERS_STORAGE_KEY = "lms_trainers_data";
const REPLACEMENT_HISTORY_KEY = "lms_trainer_replacements";

export interface ReplacementLog {
  id: string;
  date: string;
  collegeId?: string;
  collegeName?: string;
  batchId?: string;
  batchName?: string;
  oldTrainerId: string;
  oldTrainerName: string;
  newTrainerId: string;
  newTrainerName: string;
  transferProgress: boolean;
  status: "completed" | "scheduled" | "failed";
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: "problem_assigned" | "code_review" | "contest_created" | "support_ticket" | "feedback";
  studentName?: string;
  batchName: string;
  description: string;
  score?: number;
}

export interface WeeklyReport {
  id: string;
  weekStarting: string;
  hoursWorked: number;
  sessionsConducted: number;
  engagementScore: number;
  assignmentCompletionRate: number;
  criticalIssuesResolved: number;
  highlights: string[];
  challenges: string[];
  recommendations: string[];
  facultyFeedback: string;
}

export interface PerformanceTrend {
  week: string;
  engagement: number;
  completion: number;
  activeParticipation: number;
}

export const getStoredTrainers = (): Trainer[] => {
  const stored = localStorage.getItem(TRAINERS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(mockTrainers));
    return mockTrainers;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockTrainers;
  }
};

export const saveStoredTrainers = (trainers: Trainer[]): void => {
  localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(trainers));
  // Fire storage event for cross tab or component synchronization
  window.dispatchEvent(new Event("storage_trainers_updated"));
};

export const getReplacementLogs = (): ReplacementLog[] => {
  const stored = localStorage.getItem(REPLACEMENT_HISTORY_KEY);
  if (!stored) {
    const defaultLogs: ReplacementLog[] = [
      {
        id: "rep_1",
        date: "2026-05-15T14:30:00Z",
        collegeId: "col_1",
        collegeName: "Urvah Engineering College",
        batchId: "batch_1",
        batchName: "UEC Full Stack 2026",
        oldTrainerId: "trn_3",
        oldTrainerName: "Robert Johnson",
        newTrainerId: "trn_1",
        newTrainerName: "John Doe",
        transferProgress: true,
        status: "completed",
      }
    ];
    localStorage.setItem(REPLACEMENT_HISTORY_KEY, JSON.stringify(defaultLogs));
    return defaultLogs;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const addReplacementLog = (log: Omit<ReplacementLog, "id">): void => {
  const logs = getReplacementLogs();
  const newLog: ReplacementLog = {
    ...log,
    id: `rep_${Date.now()}`,
  };
  localStorage.setItem(REPLACEMENT_HISTORY_KEY, JSON.stringify([newLog, ...logs]));
};

export const executeTrainerReplacement = (
  type: "batch" | "college",
  targetId: string,
  sourceTrainerId: string,
  targetTrainerId: string,
  transferProgress: boolean
): boolean => {
  const trainers = getStoredTrainers();
  const sourceTrainer = trainers.find(t => t.id === sourceTrainerId);
  const targetTrainer = trainers.find(t => t.id === targetTrainerId);

  if (!sourceTrainer || !targetTrainer) return false;

  if (type === "batch") {
    const batch = mockBatches.find(b => b.id === targetId);
    if (!batch) return false;

    // Remove batch from source trainer
    sourceTrainer.assignedBatches = sourceTrainer.assignedBatches.filter(id => id !== targetId);
    // Add batch to target trainer
    if (!targetTrainer.assignedBatches.includes(targetId)) {
      targetTrainer.assignedBatches.push(targetId);
    }

    // Adjust college assignment if needed
    if (!targetTrainer.assignedColleges.includes(batch.collegeId)) {
      targetTrainer.assignedColleges.push(batch.collegeId);
    }

    // Keep active students headcount accurate
    sourceTrainer.activeStudents = Math.max(0, sourceTrainer.activeStudents - batch.studentCount);
    targetTrainer.activeStudents += batch.studentCount;

    addReplacementLog({
      date: new Date().toISOString(),
      batchId: batch.id,
      batchName: batch.name,
      collegeId: batch.collegeId,
      collegeName: batch.collegeName || "Unknown College",
      oldTrainerId: sourceTrainer.id,
      oldTrainerName: sourceTrainer.name,
      newTrainerId: targetTrainer.id,
      newTrainerName: targetTrainer.name,
      transferProgress,
      status: "completed",
    });

  } else {
    // College replacement
    const college = mockColleges.find(c => c.id === targetId);
    if (!college) return false;

    // Find all batches in this college currently assigned to source trainer
    const collegeBatchesToSwap = mockBatches.filter(b => b.collegeId === targetId && sourceTrainer.assignedBatches.includes(b.id));

    // Remove college and all of these batches from source trainer
    sourceTrainer.assignedColleges = sourceTrainer.assignedColleges.filter(id => id !== targetId);
    sourceTrainer.assignedBatches = sourceTrainer.assignedBatches.filter(bId => !collegeBatchesToSwap.some(cb => cb.id === bId));

    // Add college to target trainer
    if (!targetTrainer.assignedColleges.includes(targetId)) {
      targetTrainer.assignedColleges.push(targetId);
    }
    // Add those batches to target trainer
    collegeBatchesToSwap.forEach(cb => {
      if (!targetTrainer.assignedBatches.includes(cb.id)) {
        targetTrainer.assignedBatches.push(cb.id);
      }
    });

    // Update active user statistics
    const swappedStudentsCount = collegeBatchesToSwap.reduce((acc, b) => acc + b.studentCount, 0);
    sourceTrainer.activeStudents = Math.max(0, sourceTrainer.activeStudents - swappedStudentsCount);
    targetTrainer.activeStudents += swappedStudentsCount;

    addReplacementLog({
      date: new Date().toISOString(),
      collegeId: college.id,
      collegeName: college.name,
      oldTrainerId: sourceTrainer.id,
      oldTrainerName: sourceTrainer.name,
      newTrainerId: targetTrainer.id,
      newTrainerName: targetTrainer.name,
      transferProgress,
      status: "completed",
    });
  }

  saveStoredTrainers(trainers);
  return true;
};

// Mock Coding Activity Track Log
export const getTrainerCodingActivities = (trainerId: string): ActivityLog[] => {
  // Generate reliable coding action events for trainers
  const pool: Omit<ActivityLog, "id">[] = [
    {
      timestamp: "2026-05-20T09:12:00Z",
      type: "problem_assigned",
      batchName: "UEC Full Stack 2026",
      description: "Assigned daily practice challenge: 'Merge Intervals' to batch students.",
    },
    {
      timestamp: "2026-05-19T14:45:00Z",
      type: "code_review",
      studentName: "Aditya Roy",
      batchName: "UEC Full Stack 2026",
      description: "Approved optimize solution to 'Sliding Window Largest Substring' with detailed feedback on space efficiency.",
      score: 95
    },
    {
      timestamp: "2026-05-18T10:00:00Z",
      type: "contest_created",
      batchName: "TNI DSA Mastery",
      description: "Launched assessment contest 'Binary Tree Deep Dive' containing 4 Medium difficulty challenges.",
    },
    {
      timestamp: "2026-05-17T16:30:00Z",
      type: "code_review",
      studentName: "Meera Nair",
      batchName: "TNI DSA Mastery",
      description: "Requested revisions on 'Graphs Breadth First Search' for failing boundary edge cases.",
      score: 70
    },
    {
      timestamp: "2026-05-17T11:15:00Z",
      type: "support_ticket",
      studentName: "Devendra Patil",
      batchName: "UEC Full Stack 2026",
      description: "Resolved stack overflow debugging request regarding structural recursion pointers.",
    },
    {
      timestamp: "2026-05-16T15:20:00Z",
      type: "feedback",
      studentName: "Sanjay Kumar",
      batchName: "GIT Web Dev Alpha",
      description: "Submitted high praise for live CSS Grid conceptual coding walkthrough session feedback.",
      score: 100
    }
  ];

  // If inactive trainer, return less activity
  if (trainerId === "trn_3") {
    return [
      {
        id: "act_99",
        timestamp: "2026-05-02T10:00:00Z",
        type: "feedback",
        batchName: "Global Web Dev Alpha",
        description: "Trainer account set to inactive. Conducted final hand-off alignment meeting.",
      }
    ];
  }

  return pool.map((item, index) => ({
    ...item,
    id: `act_${trainerId}_${index}`,
    // Make timestamp variation based on index so it behaves realistically
    timestamp: new Date(Date.now() - index * 6 * 3600 * 1000).toISOString(),
  }));
};

// Get trainer-specific weekly report list
export const getTrainerWeeklyReports = (trainerId: string): WeeklyReport[] => {
  const reports: WeeklyReport[] = [
    {
      id: "rep_w1",
      weekStarting: "2026-05-11",
      hoursWorked: 38,
      sessionsConducted: 9,
      engagementScore: 84,
      assignmentCompletionRate: 79,
      criticalIssuesResolved: 4,
      highlights: [
        "Led interactive live coding solving sessions on Dynamic Programming.",
        "Onboarded three lagging students onto consistent daily challenge tracking.",
        "Collaborated with college coordinator on curriculum progression report."
      ],
      challenges: [
        "Unstable internet access caused latency issues during the Wednesday evening live lab.",
        "Slow turnaround response times from department faculty regarding core grading permissions."
      ],
      recommendations: [
        "Incorporate quick asynchronous code walkthrough video nuggets to bolster difficult DP problems.",
        "Procure unified review channels for prompt grader syncing."
      ],
      facultyFeedback: "Excellent proactive communication on DP hurdles. Excellent trainer support!"
    },
    {
      id: "rep_w2",
      weekStarting: "2026-05-04",
      hoursWorked: 35,
      sessionsConducted: 8,
      engagementScore: 82,
      assignmentCompletionRate: 75,
      criticalIssuesResolved: 2,
      highlights: [
        "Conducted a comprehensive mock test preparation and walkthrough.",
        "Successfully corrected intermediate recursion mental models with high engagement ratings."
      ],
      challenges: [
        "Several students missed the mock assessment due to internal semester laboratory reviews."
      ],
      recommendations: [
        "Coordinate and schedule assessment sessions away from overlapping college assessment weeks."
      ],
      facultyFeedback: "Satisfactory overall. Students were well equipped for the recursion test."
    }
  ];

  // Adjust for lower scoring/new/inactive trainer
  if (trainerId === "trn_2") {
    return [
      {
        ...reports[0],
        id: "rep_w2_1",
        engagementScore: 62,
        assignmentCompletionRate: 54,
        criticalIssuesResolved: 1,
        highlights: ["Conducted basic introduction to HTML semantics workshops"],
        challenges: ["Low motivation and tracking turn-around among several batches"],
        facultyFeedback: "Trainer remains dedicated, but need higher structural intervention to push engagement."
      }
    ];
  }

  if (trainerId === "trn_3") {
    return [];
  }

  return reports;
};

// Generates weekly trends for recharts
export const getPerformanceTrend = (trainerId: string): PerformanceTrend[] => {
  const isTrn2 = trainerId === "trn_2";
  const factor = isTrn2 ? 0.75 : 1.0;
  
  if (trainerId === "trn_3") {
    return [
      { week: "Wk 1", engagement: 0, completion: 0, activeParticipation: 0 },
      { week: "Wk 2", engagement: 0, completion: 0, activeParticipation: 0 },
      { week: "Wk 3", engagement: 0, completion: 0, activeParticipation: 0 },
      { week: "Wk 4", engagement: 0, completion: 0, activeParticipation: 0 }
    ];
  }

  return [
    { week: "Week 1", engagement: Math.round(75 * factor), completion: Math.round(65 * factor), activeParticipation: Math.round(70 * factor) },
    { week: "Week 2", engagement: Math.round(80 * factor), completion: Math.round(70 * factor), activeParticipation: Math.round(72 * factor) },
    { week: "Week 3", engagement: Math.round(85 * factor), completion: Math.round(75 * factor), activeParticipation: Math.round(78 * factor) },
    { week: "Week 4", engagement: Math.round(88 * factor), completion: Math.round(78 * factor), activeParticipation: Math.round(85 * factor) }
  ];
};

// Batch performance comparisons for a specific trainer
export interface BatchPerformanceComparison {
  batchId: string;
  batchName: string;
  collegeName: string;
  studentCount: number;
  codingActivity: number;          // percent
  assignmentProgress: number;      // percent
  averageRating: number;           // feedback star out of 5
  attendanceRate: number;          // percent
}

export const getBatchPerformanceComparisons = (trainerId: string): BatchPerformanceComparison[] => {
  if (trainerId === "trn_1") {
    return [
      {
        batchId: "batch_1",
        batchName: "UEC Full Stack 2026",
        collegeName: "Urvah Engineering College",
        studentCount: 45,
        codingActivity: 85,
        assignmentProgress: 75,
        averageRating: 4.8,
        attendanceRate: 92
      },
      {
        batchId: "batch_4",
        batchName: "FSA React Bootcamp",
        collegeName: "Future Skills Academy",
        studentCount: 25,
        codingActivity: 30,
        assignmentProgress: 20,
        averageRating: 4.2,
        attendanceRate: 85
      }
    ];
  }
  
  if (trainerId === "trn_2") {
    return [
      {
        batchId: "batch_2",
        batchName: "TNI DSA Mastery",
        collegeName: "Tech Nexus Institute",
        studentCount: 60,
        codingActivity: 62,
        assignmentProgress: 45,
        averageRating: 4.0,
        attendanceRate: 78
      }
    ];
  }

  return [];
};
