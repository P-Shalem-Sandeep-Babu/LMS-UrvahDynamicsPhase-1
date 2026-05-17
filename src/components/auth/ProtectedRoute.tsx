import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuth();

  // In a real app, you'd check auth state.
  // For mock, if there's no user (or specific conditions), redirect.
  // Since we default to a student, it will always pass, but this is the structure.

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
