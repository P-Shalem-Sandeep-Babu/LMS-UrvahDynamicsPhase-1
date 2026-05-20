import { Announcement } from "../types/announcement";

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann_1",
    title: "System Maintenance Scheduled",
    content: "We will be performing scheduled maintenance this weekend. Expect some downtime on Saturday night from 12 AM to 4 AM.",
    category: "General",
    audiences: [{ type: "global" }],
    createdBy: "admin_u1",
    createdAt: "2026-05-18T10:00:00Z",
    pinned: true,
    active: true
  },
  {
    id: "ann_2",
    title: "Global Coding Contest #42 Registration",
    content: "Registration is now open for the upcoming coding contest. Make sure to sign up before Friday!",
    category: "Contests",
    audiences: [{ type: "global" }],
    createdBy: "admin_u1",
    createdAt: "2026-05-17T08:30:00Z",
    pinned: false,
    active: true
  },
  {
    id: "ann_3",
    title: "React Assignment Deadline Extended",
    content: "The deadline for the React Hooks deep dive assignment has been extended by 2 days.",
    category: "Deadlines",
    audiences: [{ type: "batch", id: "batch_1" }],
    createdBy: "trainer_t1",
    createdAt: "2026-05-16T14:15:00Z",
    pinned: false,
    active: true
  }
];
