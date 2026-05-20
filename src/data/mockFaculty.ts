import { Faculty } from "../types/faculty";

export const mockFaculty: Faculty[] = [
  {
    id: "fac_1",
    name: "Dr. Alan Turing",
    email: "alan.turing@urvah.edu",
    phone: "+1 555-0101",
    department: "Computer Science",
    assignedColleges: ["col_1", "col_2"],
    assignedBatches: ["batch_1", "batch_2", "batch_3"],
    workloadHours: 24,
    studentsMonitored: 340,
    contestsMonitored: 5,
    status: "active"
  },
  {
    id: "fac_2",
    name: "Dr. Grace Hopper",
    email: "grace.h@urvah.edu",
    phone: "+1 555-0202",
    department: "Software Engineering",
    assignedColleges: ["col_1"],
    assignedBatches: ["batch_1"],
    workloadHours: 12,
    studentsMonitored: 120,
    contestsMonitored: 2,
    status: "active"
  },
  {
    id: "fac_3",
    name: "Prof. John von Neumann",
    email: "john.v@texash.edu",
    phone: "+1 555-0303",
    department: "Mathematics",
    assignedColleges: ["col_2"],
    assignedBatches: [],
    workloadHours: 0,
    studentsMonitored: 0,
    contestsMonitored: 0,
    status: "inactive"
  },
  {
    id: "fac_4",
    name: "Dr. Margaret Hamilton",
    email: "margaret.h@stanford.edu",
    phone: "+1 555-0404",
    department: "Information Technology",
    assignedColleges: ["col_3"],
    assignedBatches: ["batch_5"],
    workloadHours: 18,
    studentsMonitored: 80,
    contestsMonitored: 1,
    status: "on_leave"
  }
];
