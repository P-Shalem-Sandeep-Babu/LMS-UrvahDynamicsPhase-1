import React, { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface DashboardWrapperProps {
  children: ReactNode;
  headerTitle: string;
  headerDescription: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  children,
  headerTitle,
  headerDescription,
  icon,
  actions,
}) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 pb-4 animate-in fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
            {icon && <span className="text-primary">{icon}</span>}
            {headerTitle}
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
            {headerDescription}
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold ml-2">
              {user.role} view
            </span>
          </p>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Main content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};
