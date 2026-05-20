import {
  LayoutDashboard,
  BookOpen,
  Code,
  LineChart,
  Users,
  Settings,
  MessageSquare,
  GraduationCap,
  Bell,
  Shield,
  Award,
  BrainCircuit,
  Building2,
  Terminal
} from "lucide-react";
import { Role } from "../data/mock";

import { Permission, hasPermission } from "../config/roles";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: Role[];
  permissions?: Permission[];
}

export const navigationContext: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "student", "faculty", "trainer"] },
  { title: "CW Management", href: "/admin/cw", icon: BookOpen, roles: ["admin"] },
  { title: "My CW", href: "/student/cw", icon: BookOpen, roles: ["student"] },
  { title: "CW Reviews", href: "/trainer/cw", icon: BookOpen, roles: ["trainer"] },
  { title: "Practice IDE", href: "/coding/practice", icon: Terminal, roles: ["student", "trainer"] },
  { title: "Algorithm Vault", href: "/coding/problems", icon: Code, roles: ["student", "faculty", "trainer"] },
  { title: "Tournaments", href: "/coding/contests", icon: Award, roles: ["student"] },
  { title: "Combat Profile", href: "/gamification", icon: Award, roles: ["student"] },
  { title: "Analytics", href: "/analytics", icon: LineChart, roles: ["admin", "faculty", "trainer"], permissions: [Permission.VIEW_GLOBAL_ANALYTICS] },
  { title: "Coding Analytics", href: "/coding/analytics", icon: LineChart, roles: ["student"], permissions: [Permission.VIEW_OWN_ANALYTICS] },
  { title: "Batches", href: "/batches", icon: Users, roles: ["admin", "faculty", "trainer"], permissions: [Permission.MANAGE_BATCHES] },
  { title: "Colleges", href: "/admin/colleges", icon: Building2, roles: ["admin"], permissions: [Permission.MANAGE_COLLEGES] },
  { title: "Discussions", href: "/discussions", icon: MessageSquare, roles: ["student", "faculty", "trainer"] },
  { title: "Leaderboard", href: "/leaderboard", icon: Award, roles: ["student"] },
  { title: "Admin Panel", href: "/admin-settings", icon: Shield, roles: ["admin"], permissions: [Permission.MANAGE_GLOBAL_SETTINGS] }
];

export const getNavigationByRole = (role: Role) => {
  return navigationContext.filter(item => {
    // Check if the role matches
    if (!item.roles.includes(role)) {
      return false;
    }
    // Check permissions if specified
    if (item.permissions && item.permissions.length > 0) {
      if (!item.permissions.every(perm => hasPermission(role, perm))) {
        return false;
      }
    }
    return true;
  });
};
