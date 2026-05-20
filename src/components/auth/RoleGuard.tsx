import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../data/mock";
import { Permission, hasPermission, hasRole } from "../../config/roles";

interface RoleGuardProps {
  children?: ReactNode;
  allowedRoles?: Role[];
  requiredPermissions?: Permission[];
  redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requiredPermissions,
  redirectTo = "/dashboard",
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check roles
  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasRole(user.role, allowedRoles)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Check permissions
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((perm) =>
      hasPermission(user.role, perm)
    );
    if (!hasAllPermissions) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children ? children : <Outlet />}</>;
};
