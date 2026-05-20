import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type TestType = "MCQ" | "Coding" | "Assignment";

export interface MCQQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of correct answer (0-3)
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  templateCode: string;
  testCases: { input: string; output: string }[];
}

export interface TestAssignment {
  id: string;
  title: string;
  description: string;
  type: TestType;
  duration: number; // in minutes (0 means untimed/general)
  deadline: string; // ISO DateTime YYYY-MM-DDTHH:mm
  totalMarks: number;
  targetBatch: string;
  questions?: MCQQuestion[];
  codingQuestion?: CodingQuestion;
  createdAt: string;
}

export interface MCQAnswer {
  questionId: string;
  selectedOption: number; // -1 if skipped/unanswered
  isBookmarked: boolean;
}

export interface Attempt {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  testId: string;
  testTitle: string;
  type: TestType;
  score: number;
  totalMarks: number;
  submittedAt: string;
  answers?: MCQAnswer[];
  codeSubmitted?: string;
  assignmentText?: string;
  fileNameAttached?: string;
  status: "Passed" | "Failed" | "Pending Review" | "Graded";
  feedback?: string;
  executionTime?: number; // ms
  memory?: number; // MB
}

interface TestAssignmentContextType {
  assessments: TestAssignment[];
  attempts: Attempt[];
  addAssessment: (assessment: Omit<TestAssignment, "id" | "createdAt">) => void;
  deleteAssessment: (id: string) => void;
  submitAttempt: (attempt: Omit<Attempt, "id" | "submittedAt">) => void;
  gradeAttempt: (attemptId: string, score: number, feedback: string) => void;
  getLeaderboard: (testId?: string) => { name: string; avatar: string; score: number; date: string; rank: number }[];
  getAnalytics: (testId: string) => {
    avgScore: number;
    highestScore: number;
    totalAttempts: number;
    passRate: number; // %
    distribution: { scoreRange: string; count: number }[];
  };
}

const TestAssignmentContext = createContext<TestAssignmentContextType | undefined>(undefined);

// Initial Mock Seed Data
const defaultAssessments: TestAssignment[] = [
  {
    id: "ASM-MCQ-01",
    title: "React Hooks & Context Mastery",
    description: "Evaluate your understanding of asynchronous updates, hooks internals, custom hooks creation, and high-performance context rendering optimizations. Follow standard strict time limits.",
    type: "MCQ",
    duration: 15,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 5 days from now
    totalMarks: 50,
    targetBatch: "FS-Cohort Alpha",
    questions: [
      {
        id: "q1",
        text: "What does calling `useState` inside a loop trigger in standard React rendering?",
        options: [
          "It triggers a standard compilation warning but compiles safely.",
          "It violates the official hooks state ordering rules, resulting in shifted component state or runtime exceptions.",
          "It forces React to optimize loop elements via dynamic binding key injection.",
          "It spawns independent fiber nodes for each execution loop index."
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        text: "Which of the following is an effective way to prevent intermediate context value changes from re-rendering deep descendant consumer child components?",
        options: [
          "Splitting the context into multiple contexts or utilizing a specialized memoized intermediate component.",
          "Re-defining the Context object on every sub-render call.",
          "Setting `pure=true` on the Provider container component.",
          "Wrapping the Context hook in standard dynamic `useCallback` containers."
        ],
        correctAnswer: 0
      },
      {
        id: "q3",
        text: "What primary mechanism prevents infinite cycles when calling state setters within a `useEffect` layout block?",
        options: [
          "Declaring explicit static dependency arrays representing strict primitives or stable functions.",
          "Strict dependency array omissions triggering standard frame rate caps.",
          "Using React async routing wrappers over state modifications.",
          "Invoking the standard layout cleanup return trigger in every execution cycle."
        ],
        correctAnswer: 0
      },
      {
        id: "q4",
        text: "How does `useTransition` help maintain a responsive user interface during complex element re-order rendering?",
        options: [
          "It redirects React rendering onto standard Web Workers processes.",
          "It yields React render loops back to browser paint events by marking state transitions as non-blocking search streams.",
          "It converts target canvas renders to standard WebGL visual layers.",
          "It pauses rendering operations when the browser tab goes into background focus."
        ],
        correctAnswer: 1
      },
      {
        id: "q5",
        text: "In standard React 19, which tag is officially deprecated or replaced in favor of standard `<Context>` providers using direct object reference?",
        options: [
          "`<Context.Consumer>` blocks",
          "`<Context.Provider>` wrappers",
          "`<Context.Portal>` elements",
          "`<Context.Ref>` instances"
        ],
        correctAnswer: 1
      }
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "ASM-COD-02",
    title: "Dynamic Programming Maximum Subarray",
    description: "Implement a highly optimized O(N) solution to find the contiguous subarray within a one-dimensional array of numbers which has the largest sum.",
    type: "Coding",
    duration: 30, // 30 minutes
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 2 days from now
    totalMarks: 100,
    targetBatch: "All Batches",
    codingQuestion: {
      id: "dp_max_sub",
      title: "Kadane's Algorithm Subarray Max",
      description: "Write a function `maxSubArray(nums: number[]): number` that takes an array of integers and returns the greatest sum. You must implement a solution in O(N) time with O(1) space complexity to yield Cadets marks.\n\nInput: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`\nOutput: `6` (Subarray `[4, -1, 2, 1]` has sum 6)",
      templateCode: "function maxSubArray(nums: number[]): number {\n  // Write yourKadane's algorithm here\n  let maxSoFar = nums[0];\n  let maxEndingHere = nums[0];\n  \n  for (let i = 1; i < nums.length; i++) {\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  \n  return maxSoFar;\n}",
      testCases: [
        { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
        { input: "[1]", output: "1" },
        { input: "[5,4,-1,7,8]", output: "23" }
      ]
    },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "ASM-GEN-03",
    title: "Microservices & Distributed Auth Architecture",
    description: "Model a secure single-sign-on OAuth state engine for a microservice fleet spanning 3 VPC subnets. Attach your system topology schema diagrams and brief markdown answers.",
    type: "Assignment",
    duration: 0, // No timer
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 10 days
    totalMarks: 100,
    targetBatch: "FS-Cohort Beta",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "ASM-GEN-04",
    title: "SQL Performance Tuning (Overdue Sample)",
    description: "Write tuning suggestions for a recursive CTE query that retrieves student statistics from partitioned billing records.",
    type: "Assignment",
    duration: 0,
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Overdue yesterday
    totalMarks: 100,
    targetBatch: "All Batches",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultAttempts: Attempt[] = [
  {
    id: "att-01",
    userId: "stu_other_01",
    userName: "Clara Oswald",
    userAvatar: "https://i.pravatar.cc/150?u=clara",
    testId: "ASM-MCQ-01",
    testTitle: "React Hooks & Context Mastery",
    type: "MCQ",
    score: 40,
    totalMarks: 50,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Graded",
    feedback: "Exceptional concept understanding! Missing some optimization nuances regarding callback bindings."
  },
  {
    id: "att-02",
    userId: "stu_other_02",
    userName: "Bruce Wayne",
    userAvatar: "https://i.pravatar.cc/150?u=batman",
    testId: "ASM-MCQ-01",
    testTitle: "React Hooks & Context Mastery",
    type: "MCQ",
    score: 50,
    totalMarks: 50,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Graded",
    feedback: "Flawless score Cadet. High logic proficiency."
  },
  {
    id: "att-03",
    userId: "stu_other_03",
    userName: "James Logan",
    userAvatar: "https://i.pravatar.cc/150?u=logan",
    testId: "ASM-MCQ-01",
    testTitle: "React Hooks & Context Mastery",
    type: "MCQ",
    score: 30,
    totalMarks: 50,
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: "Graded",
    feedback: "Good attempt. Watch out for Context render rules loops."
  },
  {
    id: "att-04",
    userId: "stu_other_02",
    userName: "Bruce Wayne",
    userAvatar: "https://i.pravatar.cc/150?u=batman",
    testId: "ASM-COD-02",
    testTitle: "Dynamic Programming Maximum Subarray",
    type: "Coding",
    score: 100,
    totalMarks: 100,
    submittedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    codeSubmitted: "function maxSubArray(nums: number[]): number {\n  let maxSoFar = nums[0];\n  let maxEndingHere = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}",
    status: "Graded",
    feedback: "Perfect O(N) space and Kadane's complexity.",
    executionTime: 8,
    memory: 24.1
  },
  {
    id: "att-05",
    userId: "stu_other_01",
    userName: "Clara Oswald",
    userAvatar: "https://i.pravatar.cc/150?u=clara",
    testId: "ASM-COD-02",
    testTitle: "Dynamic Programming Maximum Subarray",
    type: "Coding",
    score: 80,
    totalMarks: 100,
    submittedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    codeSubmitted: "function maxSubArray(nums: number[]): number {\n  // suboptimal O(N^2) double loop solution\n  let maximum = -Infinity;\n  for(let i=0; i<nums.length; i++) {\n    let curr = 0;\n    for(let j=i; j<nums.length; j++) {\n      curr += nums[j];\n      maximum = Math.max(maximum, curr);\n    }\n  }\n  return maximum;\n}",
    status: "Graded",
    feedback: "Functionally correct, but suboptimal space/time limits. Focus on kadane runtime reduction next.",
    executionTime: 185,
    memory: 45.3
  },
  {
    id: "att-06",
    userId: "stu_other_03",
    userName: "James Logan",
    userAvatar: "https://i.pravatar.cc/150?u=logan",
    testId: "ASM-GEN-03",
    testTitle: "Microservices & Distributed Auth Architecture",
    type: "Assignment",
    score: 0,
    totalMarks: 100,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignmentText: "I suggest placing OAuth authentication layer at API Gateway scope in VPC Subnet A. This intercepts unauthenticated users fast and decrypts credentials into JWT containers.",
    fileNameAttached: "vpc-topology-schematics.pdf",
    status: "Pending Review"
  }
];

export const TestAssignmentProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  const [assessments, setAssessments] = useState<TestAssignment[]>(() => {
    const saved = localStorage.getItem("ide_assessments_db");
    return saved ? JSON.parse(saved) : defaultAssessments;
  });

  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const saved = localStorage.getItem("ide_attempts_db");
    return saved ? JSON.parse(saved) : defaultAttempts;
  });

  useEffect(() => {
    localStorage.setItem("ide_assessments_db", JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem("ide_attempts_db", JSON.stringify(attempts));
  }, [attempts]);

  const addAssessment = (assessment: Omit<TestAssignment, "id" | "createdAt">) => {
    const newId = `ASM-${assessment.type === 'MCQ' ? 'MCQ' : assessment.type === 'Coding' ? 'COD' : 'GEN'}-${Math.floor(100 + Math.random() * 900)}`;
    const newAss: TestAssignment = {
      ...assessment,
      id: newId,
      createdAt: new Date().toISOString()
    };
    setAssessments(prev => [newAss, ...prev]);
  };

  const deleteAssessment = (id: string) => {
    setAssessments(prev => prev.filter(ass => ass.id !== id));
    setAttempts(prev => prev.filter(att => att.testId !== id));
  };

  const submitAttempt = (attempt: Omit<Attempt, "id" | "submittedAt">) => {
    // Generate fresh attempt
    const newAttempt: Attempt = {
      ...attempt,
      id: `att-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toISOString()
    };
    
    // Auto-grade MCQ if applicable
    if (attempt.type === "MCQ" && attempt.answers) {
      const ass = assessments.find(a => a.id === attempt.testId);
      if (ass && ass.questions) {
        let correctCount = 0;
        attempt.answers.forEach(ans => {
          const q = ass.questions?.find(qi => qi.id === ans.questionId);
          if (q && q.correctAnswer === ans.selectedOption) {
            correctCount++;
          }
        });
        const finalScore = Math.round((correctCount / ass.questions.length) * ass.totalMarks);
        newAttempt.score = finalScore;
        newAttempt.status = "Graded";
        newAttempt.feedback = `Automatically graded: ${correctCount} of ${ass.questions.length} questions correct.`;
      }
    } else if (attempt.type === "Coding") {
      // Auto-grade coding challenge instantly or mock some parameters
      newAttempt.status = "Graded";
      // Let's assume CAD-cases match successfully
      newAttempt.score = attempt.score > 0 ? attempt.score : 100; // Kadane algorithm succeeds
      newAttempt.executionTime = Math.floor(5 + Math.random() * 25);
      newAttempt.memory = parseFloat((20 + Math.random() * 10).toFixed(1));
      newAttempt.feedback = "All preset check cases executed with green outputs. Perfect compilation.";
    } else if (attempt.type === "Assignment") {
      newAttempt.status = "Pending Review";
    }

    setAttempts(prev => [newAttempt, ...prev]);
  };

  const gradeAttempt = (attemptId: string, score: number, feedback: string) => {
    setAttempts(prev => prev.map(att => {
      if (att.id === attemptId) {
        return {
          ...att,
          score,
          feedback,
          status: "Graded"
        };
      }
      return att;
    }));
  };

  // Dynamic ranking list for the active assessment
  const getLeaderboard = (testId?: string) => {
    let filtered = attempts;
    if (testId) {
      filtered = attempts.filter(att => att.testId === testId);
    }
    
    // Group by student to take their best score
    const studentBestScores: Record<string, { name: string; avatar: string; score: number; date: string }> = {};
    
    filtered.forEach(att => {
      const key = `${att.userId}-${att.testId}`;
      if (!studentBestScores[key] || studentBestScores[key].score < att.score) {
        studentBestScores[key] = {
          name: att.userName,
          avatar: att.userAvatar,
          score: att.score,
          date: new Date(att.submittedAt).toLocaleDateString()
        };
      }
    });

    const list = Object.values(studentBestScores).sort((a, b) => b.score - a.score);
    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
  };

  // Result Analytics calculator helper
  const getAnalytics = (testId: string) => {
    const testAttempts = attempts.filter(att => att.testId === testId);
    const ass = assessments.find(a => a.id === testId);
    if (!ass) {
      return { avgScore: 0, highestScore: 0, totalAttempts: 0, passRate: 0, distribution: [] };
    }

    const totalAttempts = testAttempts.length;
    if (totalAttempts === 0) {
      return {
        avgScore: 0,
        highestScore: 0,
        totalAttempts: 0,
        passRate: 0,
        distribution: [
          { scoreRange: "0-20%", count: 0 },
          { scoreRange: "21-40%", count: 0 },
          { scoreRange: "41-60%", count: 0 },
          { scoreRange: "61-80%", count: 0 },
          { scoreRange: "81-100%", count: 0 },
        ]
      };
    }

    const scores = testAttempts.map(att => att.score);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts);
    const highestScore = Math.max(...scores);
    
    // assume 50% is standard pass threshold
    const passThreshold = ass.totalMarks * 0.5;
    const passedCount = testAttempts.filter(att => att.score >= passThreshold).length;
    const passRate = Math.round((passedCount / totalAttempts) * 100);

    // Distribution
    const ranges = {
      "0-20%": 0,
      "21-40%": 0,
      "41-60%": 0,
      "61-80%": 0,
      "81-100%": 0
    };

    testAttempts.forEach(att => {
      const pct = (att.score / ass.totalMarks) * 100;
      if (pct <= 20) ranges["0-20%"]++;
      else if (pct <= 40) ranges["21-40%"]++;
      else if (pct <= 60) ranges["41-60%"]++;
      else if (pct <= 80) ranges["61-80%"]++;
      else ranges["81-100%"]++;
    });

    const distribution = Object.entries(ranges).map(([k, v]) => ({
      scoreRange: k,
      count: v
    }));

    return {
      avgScore,
      highestScore,
      totalAttempts,
      passRate,
      distribution
    };
  };

  return (
    <TestAssignmentContext.Provider value={{
      assessments,
      attempts,
      addAssessment,
      deleteAssessment,
      submitAttempt,
      gradeAttempt,
      getLeaderboard,
      getAnalytics
    }}>
      {children}
    </TestAssignmentContext.Provider>
  );
};

export const useTestAssignment = () => {
  const context = useContext(TestAssignmentContext);
  if (!context) {
    throw new Error("useTestAssignment must be used within TestAssignmentProvider");
  }
  return context;
};
