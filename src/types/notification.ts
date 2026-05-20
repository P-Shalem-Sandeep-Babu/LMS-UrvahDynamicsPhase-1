export type NotificationCategory = "Assignments" | "Coding" | "Deadlines" | "Contests" | "Announcements" | "BatchUpdates";

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
