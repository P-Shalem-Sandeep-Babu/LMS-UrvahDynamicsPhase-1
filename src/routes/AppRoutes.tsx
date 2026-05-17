import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "../layouts/AppShell";
import { Dashboard } from "../dashboard/Dashboard";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { LandingPage } from "../pages/landing/LandingPage";

import { AuthLayout } from "../pages/auth/AuthLayout";
import { Login } from "../pages/auth/Login";
import { Signup } from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { VerifyEmail } from "../pages/auth/VerifyEmail";
import { VerifyOTP } from "../pages/auth/VerifyOTP";
import { RoleSelection } from "../pages/auth/RoleSelection";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

import { CodingWorkspace } from "../coding/workspace/CodingWorkspace";
import { ProblemDetail } from "../coding/problems/ProblemDetail";
import { ContestDetail } from "../coding/contests/ContestDetail";
import { ContestLeaderboard } from "../coding/contests/ContestLeaderboard";
import { CodingAnalytics } from "../coding/analytics/CodingAnalytics";
import { AIMentor } from "../ai/AIMentor";
import { GlobalAnalytics } from "../analytics/GlobalAnalytics";

import { DiscussionBoard } from "../discussions/DiscussionBoard";
import { ThreadDetail } from "../discussions/ThreadDetail";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="role-selection" element={<RoleSelection />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Coding Routes */}
          <Route path="/coding" element={<Navigate to="/coding/problems" replace />} />
          <Route path="/coding/problems" element={<ProblemDetail />} />
          <Route path="/coding/workspace" element={<CodingWorkspace />} />
          <Route path="/coding/contests" element={<ContestDetail />} />
          <Route path="/coding/contests/leaderboard" element={<ContestLeaderboard />} />
          <Route path="/coding/analytics" element={<CodingAnalytics />} />
          
          <Route path="/analytics" element={<GlobalAnalytics />} />
          
          {/* AI Mentor */}
          <Route path="/mentor" element={<AIMentor />} />
          
          {/* Other Routes */}
          <Route path="/courses" element={<PlaceholderPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/peer-review" element={<PlaceholderPage />} />
          <Route path="/discussions" element={<DiscussionBoard />} />
          <Route path="/discussions/:threadId" element={<ThreadDetail />} />
          <Route path="/settings" element={<PlaceholderPage />} />
          
          {/* Faculty/Admin Routes */}
          <Route path="/manage-courses" element={<PlaceholderPage />} />
          <Route path="/analytics" element={<PlaceholderPage />} />
          <Route path="/students" element={<PlaceholderPage />} />
          <Route path="/monitoring" element={<PlaceholderPage />} />
          <Route path="/faculty-mgmt" element={<PlaceholderPage />} />
          <Route path="/admin-settings" element={<PlaceholderPage />} />

          {/* Catch-all */}
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
