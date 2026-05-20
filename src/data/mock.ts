export type Role = "admin" | "student" | "faculty" | "trainer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  rollNo?: string;
  branch?: string;
  college?: string;
  contact?: string;
  bio?: string;
  joinDate?: string;
}

export const mockUsers: Record<Role, User> = {
  admin: {
    id: "admin_01",
    name: "Sarah Connor",
    email: "admin@gmail.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin_01",
    contact: "+1 555-0101",
    bio: "System Administrator overseeing all platforms and integrations.",
    joinDate: "2024-01-15"
  },
  student: {
    id: "stu_01",
    name: "Alex Johnson",
    email: "student@gmail.com",
    role: "student",
    avatar: "https://i.pravatar.cc/150?u=stu_01",
    rollNo: "R21001",
    branch: "Computer Science and Engineering",
    college: "Tech Institute of Excellence",
    contact: "+1 555-0102",
    bio: "Passionate about algorithms and web development.",
    joinDate: "2024-08-01"
  },
  faculty: {
    id: "fac_01",
    name: "Dr. Emily Chen",
    email: "faculty@gmail.com",
    role: "faculty",
    avatar: "https://i.pravatar.cc/150?u=fac_01",
    college: "Tech Institute of Excellence",
    branch: "Computer Science and Engineering",
    contact: "+1 555-0103",
    bio: "Professor of Distributed Systems.",
    joinDate: "2020-05-10"
  },
  trainer: {
    id: "trn_01",
    name: "Marcus Wright",
    email: "trainer@gmail.com",
    role: "trainer",
    avatar: "https://i.pravatar.cc/150?u=trn_01",
    contact: "+1 555-0104",
    bio: "Lead Corporate Trainer specializing in Full Stack Engineering.",
    joinDate: "2022-11-20"
  }
};

export const currentUser = mockUsers.student; // Defaulting to student for initial view

export const notifications = [
  { id: 1, title: "New Assignment Graded", desc: "Advanced Algorithms", time: "2 hrs ago", read: false },
  { id: 2, title: "Project Assessment completed", desc: "Your React project review is ready.", time: "5 hrs ago", read: false },
  { id: 3, title: "New Course Material", desc: "Week 4 resources are now available.", time: "1 day ago", read: true },
];

export const courseProgress = [
  { name: 'Week 1', completed: 100 },
  { name: 'Week 2', completed: 85 },
  { name: 'Week 3', completed: 40 },
  { name: 'Week 4', completed: 0 },
];
