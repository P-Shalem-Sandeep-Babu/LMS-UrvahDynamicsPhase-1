export interface CollegeDomain {
  id: string;
  domain: string;
  collegeId: string;
  status: "active" | "inactive";
  activeUsersCount: number;
}
