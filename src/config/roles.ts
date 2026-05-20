import { Role } from "../data/mock";

// Define the core permissions of our application
export enum Permission {
  // Admin permissions
  MANAGE_USERS = "manage:users",
  MANAGE_ROLES = "manage:roles",
  MANAGE_COLLEGES = "manage:colleges",
  MANAGE_GLOBAL_SETTINGS = "manage:global_settings",
  
  // Faculty/Trainer permissions
  MANAGE_BATCHES = "manage:batches",
  MANAGE_COURSES = "manage:courses",
  EVALUATE_STUDENTS = "evaluate:students",
  
  // Trainer specific
  MANAGE_CONTESTS = "manage:contests",
  CREATE_PROBLEMS = "create:problems",
  
  // Student permissions
  VIEW_COURSES = "view:courses",
  PARTICIPATE_CONTESTS = "participate:contests",
  PRACTICE_PROBLEMS = "practice:problems",
  VIEW_OWN_ANALYTICS = "view:own_analytics",
  
  // Shared
  VIEW_GLOBAL_ANALYTICS = "view:global_analytics",
  PARTICIPATE_DISCUSSIONS = "participate:discussions",
}

// Map each role to their allowed permissions
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    Permission.MANAGE_USERS,
    Permission.MANAGE_ROLES,
    Permission.MANAGE_COLLEGES,
    Permission.MANAGE_GLOBAL_SETTINGS,
    Permission.VIEW_GLOBAL_ANALYTICS,
    Permission.VIEW_COURSES,
  ],
  faculty: [
    Permission.MANAGE_BATCHES,
    Permission.MANAGE_COURSES,
    Permission.EVALUATE_STUDENTS,
    Permission.VIEW_GLOBAL_ANALYTICS,
    Permission.PARTICIPATE_DISCUSSIONS,
  ],
  trainer: [
    Permission.MANAGE_BATCHES,
    Permission.MANAGE_CONTESTS,
    Permission.CREATE_PROBLEMS,
    Permission.EVALUATE_STUDENTS,
    Permission.VIEW_GLOBAL_ANALYTICS,
    Permission.PARTICIPATE_DISCUSSIONS,
  ],
  student: [
    Permission.VIEW_COURSES,
    Permission.PARTICIPATE_CONTESTS,
    Permission.PRACTICE_PROBLEMS,
    Permission.VIEW_OWN_ANALYTICS,
    Permission.PARTICIPATE_DISCUSSIONS,
  ],
};

/**
 * Checks if a user has a specific permission based on their role
 */
export const hasPermission = (userRole: Role, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
};

/**
 * Checks if a user role is included in an array of allowed roles
 */
export const hasRole = (userRole: Role, allowedRoles: Role[]): boolean => {
  return allowedRoles.includes(userRole);
};
