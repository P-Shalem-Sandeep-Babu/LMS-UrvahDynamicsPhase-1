/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { SessionTimeoutModal } from "./components/auth/SessionTimeoutModal";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="urvah-theme">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <SessionTimeoutModal />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
