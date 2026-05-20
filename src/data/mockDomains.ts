import { CollegeDomain } from "../types/domain";

export const mockDomains: CollegeDomain[] = [
  {
    id: "dom_1",
    domain: "urvah.edu",
    collegeId: "col_1", // URVAH Engineering College
    status: "active",
    activeUsersCount: 450
  },
  {
    id: "dom_2",
    domain: "texash.edu",
    collegeId: "col_2", // Texas H. Institute
    status: "active",
    activeUsersCount: 210
  },
  {
    id: "dom_3",
    domain: "stanford.edu",
    collegeId: "col_3", // Stanford University
    status: "active",
    activeUsersCount: 380
  },
  {
    id: "dom_4",
    domain: "mit.edu",
    collegeId: "col_3", // mapped to same for testing/example
    status: "inactive",
    activeUsersCount: 0
  }
];
