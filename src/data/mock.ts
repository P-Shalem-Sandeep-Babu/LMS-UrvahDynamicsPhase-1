export type Role = "admin" | "student" | "faculty" | "trainer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export const mockUsers: Record<Role, User> = {
  admin: {
    id: "admin_01",
    name: "Sarah Connor",
    email: "admin@gmail.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin_01"
  },
  student: {
    id: "stu_01",
    name: "Alex Johnson",
    email: "student@gmail.com",
    role: "student",
    avatar: "https://i.pravatar.cc/150?u=stu_01"
  },
  faculty: {
    id: "fac_01",
    name: "Dr. Emily Chen",
    email: "faculty@gmail.com",
    role: "faculty",
    avatar: "https://i.pravatar.cc/150?u=fac_01"
  },
  trainer: {
    id: "trn_01",
    name: "Marcus Wright",
    email: "trainer@gmail.com",
    role: "trainer",
    avatar: "https://i.pravatar.cc/150?u=trn_01"
  }
};

export const currentUser = mockUsers.student; // Defaulting to student for initial view

export const notifications = [
  { id: 1, title: "New Assignment Graded", desc: "Advanced Algorithms", time: "2 hrs ago", read: false },
  { id: 2, title: "AI Peer Review completed", desc: "Your React project review is ready.", time: "5 hrs ago", read: false },
  { id: 3, title: "System Maintenance", desc: "Scheduled downtime on Saturday 2 AM.", time: "1 day ago", read: true },
];

export const courseProgress = [
  { name: 'Week 1', completed: 100 },
  { name: 'Week 2', completed: 85 },
  { name: 'Week 3', completed: 40 },
  { name: 'Week 4', completed: 0 },
];
