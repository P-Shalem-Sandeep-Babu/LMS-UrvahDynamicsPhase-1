import { AppNotification } from "../types/notification";

export const mockNotifications: AppNotification[] = [
  {
    id: "notif_1",
    userId: "student_1",
    title: "New Assignment Posted",
    message: "Trainer uploaded 'React Hooks Deep Dive'.",
    category: "Assignments",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    link: "/dashboard"
  },
  {
    id: "notif_2",
    userId: "student_1",
    title: "Coding Challenge Available",
    message: "Daily Coding Challenge 'Two Sum Variants' is now unlocked.",
    category: "Coding",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    link: "/coding/workspace"
  },
  {
    id: "notif_3",
    userId: "student_1",
    title: "Deadline Approaching",
    message: "Your submission for 'UI Component Library' is due in 12 hours.",
    category: "Deadlines",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "notif_4",
    userId: "student_1",
    title: "System Maintenance",
    message: "Expect some downtime on Saturday night.",
    category: "Announcements",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "notif_5",
    userId: "student_1",
    title: "Batch Update",
    message: "You have been added to 'Frontend Masters Batch B'.",
    category: "BatchUpdates",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  }
];
