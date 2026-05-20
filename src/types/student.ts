export interface Student {
  id: string;
  name: string;
  userName: string;
  rollNo: string;
  personalMail: string;
  collegeMail: string;
  phone: string;
  collegeId: string;
  branch: string;
  year: number;
  batchId: string;
  codingScore: number;
  assignmentProgress: number; // percentage
  contestParticipation: number;
  streakScore: number;
  inviteStatus?: "applied" | "pending" | "accepted" | "expired";
  inviteSentDate?: string;
  attendanceRate?: number;
  attendanceLog?: { date: string; status: "present" | "absent" | "late" }[];
  activityTimeline?: {
    id: string;
    type: "submission" | "contest" | "attendance" | "invite" | "course";
    title: string;
    timestamp: string;
    details?: string;
    statusClass?: string;
  }[];
}
