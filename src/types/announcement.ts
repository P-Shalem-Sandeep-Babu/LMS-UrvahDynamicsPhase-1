export type AnnouncementCategory = "General" | "Assignments" | "Coding" | "Contests" | "Deadlines";
export type AnnouncementAudienceType = "global" | "college" | "batch" | "trainer";

export interface AnnouncementAudience {
  type: AnnouncementAudienceType;
  id?: string; // id of college, batch, etc. (optional for global)
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  audiences: AnnouncementAudience[];
  createdBy: string;
  createdAt: string;
  pinned: boolean;
  active: boolean;
}
