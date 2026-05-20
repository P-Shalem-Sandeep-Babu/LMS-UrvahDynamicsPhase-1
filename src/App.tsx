/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { TestAssignmentProvider } from "./context/TestAssignmentContext";
import { DiscussionProvider } from "./context/DiscussionContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SessionTimeoutModal } from "./components/auth/SessionTimeoutModal";
import { ToastContainer } from "./components/notifications/ToastContainer";
import { AchievementCelebration } from "./components/gamification/AchievementCelebration";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="urvah-theme">
      <AuthProvider>
        <TestAssignmentProvider>
          <DiscussionProvider>
            <NotificationProvider>
              <BrowserRouter>
                <AppRoutes />
                <SessionTimeoutModal />
                <ToastContainer />
                <AchievementCelebration />
              </BrowserRouter>
            </NotificationProvider>
          </DiscussionProvider>
        </TestAssignmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
