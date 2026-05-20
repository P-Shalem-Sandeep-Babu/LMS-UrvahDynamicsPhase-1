import { Trainer } from "../types/trainer";

export const mockTrainers: Trainer[] = [
  {
    id: "trn_1",
    name: "John Doe",
    email: "john.doe@urvah.edu",
    phone: "+1 555-1010",
    assignedColleges: ["col_1"],
    assignedBatches: ["batch_1", "batch_2"],
    activeStudents: 145,
    codingEngagement: 85,
    assignmentCompletion: 78,
    weeklyActivity: 32,
    status: "active"
  },
  {
    id: "trn_2",
    name: "Jane Smith",
    email: "jane.smith@texash.edu",
    phone: "+1 555-2020",
    assignedColleges: ["col_2", "col_3"],
    assignedBatches: ["batch_3", "batch_5"],
    activeStudents: 310,
    codingEngagement: 62,
    assignmentCompletion: 54,
    weeklyActivity: 40,
    status: "active"
  },
  {
    id: "trn_3",
    name: "Robert Johnson",
    email: "robert.j@stanford.edu",
    phone: "+1 555-3030",
    assignedColleges: ["col_3"],
    assignedBatches: [],
    activeStudents: 0,
    codingEngagement: 0,
    assignmentCompletion: 0,
    weeklyActivity: 10,
    status: "inactive"
  }
];
