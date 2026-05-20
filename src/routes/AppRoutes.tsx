import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "../layouts/AppShell";
import { Dashboard } from "../dashboard/Dashboard";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { LandingPage } from "../pages/landing/LandingPage";

import { AuthLayout } from "../pages/auth/AuthLayout";
import { Login } from "../pages/auth/Login";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { VerifyEmail } from "../pages/auth/VerifyEmail";
import { VerifyOTP } from "../pages/auth/VerifyOTP";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { RoleGuard } from "../components/auth/RoleGuard";

import { CodingWorkspace } from "../coding/workspace/CodingWorkspace";
import { ProblemDetail } from "../coding/problems/ProblemDetail";
import { ContestDetail } from "../coding/contests/ContestDetail";
import { ContestLobby } from "../coding/contests/ContestLobby";
import { LiveContestArena } from "../coding/contests/LiveContestArena";
import { ContestLeaderboard } from "../coding/contests/ContestLeaderboard";
import { CodingAnalytics } from "../coding/analytics/CodingAnalytics";
import { AIMentor } from "../ai/AIMentor";
import { GlobalAnalytics } from "../analytics/GlobalAnalytics";

import { PracticeIDE } from "../components/ide/PracticeIDE";
import { DiscussionBoard } from "../discussions/DiscussionBoard";
import { ThreadDetail } from "../discussions/ThreadDetail";

import { CourseList } from "../courses/CourseList";
import { SettingsPage } from "../settings/SettingsPage";
import { ManageCourses } from "../faculty/ManageCourses";
import { StudentsList } from "../faculty/StudentsList";

import { AdminSettings } from "../admin/AdminSettings";
import { FacultyManagement } from "../admin/FacultyManagement";
import { CollegeManagement } from "../admin/colleges/CollegeManagement";
import { CollegeDetail } from "../admin/colleges/CollegeDetail";
import { BatchManagement } from "../batches/BatchManagement";
import { BatchDetail } from "../batches/BatchDetail";
import { StudentDetail } from "../students/StudentDetail";
import { TrainerDetail } from "../admin/trainers/TrainerDetail";
import { FacultyDetail } from "../admin/faculty/FacultyDetail";

import { AcceptInvite } from "../pages/auth/AcceptInvite";

import { InviteManagement } from "../admin/invites/InviteManagement";
import { DomainManagement } from "../admin/domains/DomainManagement";
import { CodingAutomation } from "../admin/coding-automation/CodingAutomation";
import { AnnouncementManagement } from "../admin/announcements/AnnouncementManagement";
import { NotificationsPage } from "../pages/notifications/NotificationsPage";
import { GamificationPage } from "../pages/gamification/GamificationPage";

import { CWManagement } from "../cw/admin/CWManagement";
import { MyCW } from "../cw/student/MyCW";
import { CWSolver } from "../cw/student/CWSolver";
import { CWReviews } from "../cw/trainer/CWReviews";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="invite/:token" element={<AcceptInvite />} />
        <Route path="invite" element={<AcceptInvite />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Coding Routes */}
          <Route path="/coding" element={<Navigate to="/coding/problems" replace />} />
          <Route path="/coding/problems" element={<RoleGuard allowedRoles={["student", "faculty", "trainer"]}><ProblemDetail /></RoleGuard>} />
          <Route path="/coding/practice" element={<RoleGuard allowedRoles={["student", "trainer"]}><PracticeIDE /></RoleGuard>} />
          <Route path="/coding/workspace" element={<CodingWorkspace />} />
          <Route path="/coding/contests" element={<ContestDetail />} />
          <Route path="/coding/contests/lobby/:id" element={<ContestLobby />} />
          <Route path="/coding/contests/live/:id" element={<LiveContestArena />} />
          <Route path="/coding/contests/leaderboard" element={<ContestLeaderboard />} />
          <Route path="/coding/analytics" element={<CodingAnalytics />} />
          
          <Route path="/analytics" element={<GlobalAnalytics />} />
          
          {/* AI Mentor */}
          <Route path="/mentor" element={<AIMentor />} />
          
          {/* Other Routes */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/gamification" element={<RoleGuard allowedRoles={["student"]}><GamificationPage /></RoleGuard>} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/leaderboard" element={<RoleGuard allowedRoles={["student"]}><Leaderboard /></RoleGuard>} />
          <Route path="/discussions" element={<DiscussionBoard />} />
          <Route path="/discussions/:threadId" element={<ThreadDetail />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Student CW routes */}
          <Route path="/student/cw" element={<RoleGuard allowedRoles={["student"]}><MyCW /></RoleGuard>} />
          <Route path="/student/cw/:id" element={<RoleGuard allowedRoles={["student"]}><CWSolver /></RoleGuard>} />

          {/* Faculty/Admin Routes */}
          <Route element={<RoleGuard allowedRoles={["admin", "faculty", "trainer"]} />}>
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/batches" element={<BatchManagement />} />
            <Route path="/batches/:id" element={<BatchDetail />} />
            <Route path="/trainer/cw" element={<CWReviews />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={["admin"]} />}>
            <Route path="/faculty-mgmt" element={<FacultyManagement />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
            <Route path="/admin/cw" element={<CWManagement />} />
            <Route path="/admin/invites" element={<InviteManagement />} />
            <Route path="/admin/domains" element={<DomainManagement />} />
            <Route path="/admin/coding-automation" element={<CodingAutomation />} />
            <Route path="/admin/announcements" element={<AnnouncementManagement />} />
            <Route path="/admin/colleges" element={<CollegeManagement />} />
            <Route path="/admin/colleges/:id" element={<CollegeDetail />} />
            <Route path="/admin/students/:id" element={<StudentDetail />} />
            <Route path="/admin/trainers/:id" element={<TrainerDetail />} />
            <Route path="/admin/faculty/:id" element={<FacultyDetail />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
      </Route>
    </Routes>
  );
};


