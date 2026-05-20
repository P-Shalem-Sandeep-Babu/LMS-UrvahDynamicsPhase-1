import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { getNavigationByRole } from '../utils/navigation';
import { motion } from 'motion/react';
import { BrainCircuit } from 'lucide-react';
import { LMS_CONFIG } from '../config/constants';

export const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navItems = getNavigationByRole(user.role);

  return (
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-card border-r border-border z-40 transition-all duration-300">
      <div className="p-8 flex items-center">
        <NavLink to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
           <div className="w-8 h-8 font-bold bg-primary rounded-sm flex items-center justify-center text-black text-xl">
             {LMS_CONFIG.APP_NAME.charAt(0)}
           </div>
           <span className="text-lg font-bold tracking-tighter uppercase italic text-foreground">
             {LMS_CONFIG.APP_NAME}
           </span>
        </NavLink>
      </div>
      
      <div className="flex-1 overflow-y-auto pt-2 pb-6 px-4 custom-scrollbar">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-4 py-2">Navigation</div>
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                  isActive 
                    ? "bg-foreground/5 border-r-2 border-primary text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="relative z-10">{item.title}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
      
      <div className="p-6 border-t border-border/50 bg-transparent">
         <div className="px-1 py-1 text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest mb-3">
            AI Assistant
         </div>
         <NavLink to="/mentor" className="flex items-center gap-3 bg-foreground/5 p-3 rounded-none border border-border group hover:bg-foreground/10 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-primary to-[#00cc44] flex items-center justify-center">
               <BrainCircuit className="w-4 h-4 text-black animate-pulse" />
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-bold text-foreground">Ask Urvah AI</span>
               <span className="text-[10px] text-muted-foreground/80 uppercase tracking-tighter">System Oracle</span>
            </div>
         </NavLink>
      </div>
    </aside>
  );
};

