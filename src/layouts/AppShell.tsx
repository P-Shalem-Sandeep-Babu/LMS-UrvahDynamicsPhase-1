import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AIFloatingWidget } from "../ai/components/AIFloatingWidget";
import { LiveToastManager } from "../components/realtime/LiveToastManager";

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 lg:pl-64 transition-all duration-300 w-full min-h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-8 overflow-auto custom-scrollbar flex flex-col justify-between">
            <div className="w-full max-w-7xl mx-auto flex-1 pb-10">
              <Outlet />
            </div>
            {/* Footer Meta Bar */}
            <footer className="h-8 bg-[#0a0a0b] border-t border-white/5 flex items-center justify-between px-10 font-mono text-[8px] text-white/20 uppercase tracking-[0.2em] mt-auto">
               <div>System Status: All Engines Operational</div>
               <div className="flex gap-8">
                 <span>Architecture: Modular / Vite / TS</span>
                 <span className="text-white/40">&copy; 2024 Urvah Dynamics Pvt Ltd. All Rights Reserved</span>
               </div>
            </footer>
          </main>
        </div>
      </div>
      <AIFloatingWidget />
      <LiveToastManager />
    </div>
  );
};

