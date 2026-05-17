import {
  LayoutDashboard,
  BookOpen,
  Code,
  LineChart,
  Users,
  Settings,
  MessageSquare,
  ClipboardList,
  GraduationCap,
  Bell,
  Shield,
  Activity,
  Award,
  BrainCircuit
} from "lucide-react";
import { Role } from "../data/mock";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: Role[];
}

export const navigationContext: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "student", "faculty", "trainer"] },
  { title: "System Oracle", href: "/mentor", icon: BrainCircuit, roles: ["student"] },
  { title: "Algorithm Vault", href: "/coding/problems", icon: Code, roles: ["student", "faculty", "trainer"] },
  { title: "Tournaments", href: "/coding/contests", icon: Award, roles: ["student"] },
  { title: "Analytics", href: "/analytics", icon: LineChart, roles: ["admin", "faculty", "trainer"] },
  { title: "Coding Analytics", href: "/coding/analytics", icon: LineChart, roles: ["student"] },
  { title: "Students", href: "/students", icon: Users, roles: ["admin", "faculty", "trainer"] },
  { title: "Peer Review", href: "/peer-review", icon: ClipboardList, roles: ["student", "faculty"] },
  { title: "Discussions", href: "/discussions", icon: MessageSquare, roles: ["student", "faculty", "trainer"] },
  { title: "System Health", href: "/monitoring", icon: Activity, roles: ["admin"] },
  { title: "Faculty Management", href: "/faculty-mgmt", icon: GraduationCap, roles: ["admin"] },
  { title: "Leaderboard", href: "/leaderboard", icon: Award, roles: ["student"] },
  { title: "Admin Panel", href: "/admin-settings", icon: Shield, roles: ["admin"] },
  { title: "Settings", href: "/settings", icon: Settings, roles: ["admin", "student", "faculty", "trainer"] },
];

export const getNavigationByRole = (role: Role) => {
  return navigationContext.filter(item => item.roles.includes(role));
};
