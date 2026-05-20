import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface LMSCardProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
}

export const LMSCard = ({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
  footer
}: LMSCardProps) => {
  return (
    <div className={cn("border border-border bg-card flex flex-col relative overflow-hidden group hover:border-border/80 transition-colors", className)}>
      {(title || action || Icon) && (
        <div className={cn("p-6 pb-4 flex justify-between items-start border-b border-border/50 bg-white/[0.01]", headerClassName)}>
          <div className="flex gap-3">
             {Icon && (
                <div className="w-10 h-10 rounded border border-border flex items-center justify-center bg-foreground/5 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
             )}
            <div>
              {title && <h3 className="text-sm font-bold uppercase tracking-widest text-foreground leading-tight">{title}</h3>}
              {description && <p className="text-xs font-mono text-muted-foreground mt-1">{description}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={cn("p-6 flex-1", bodyClassName)}>
        {children}
      </div>
      {footer && (
        <div className="bg-white/[0.02] border-t border-border/50 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};
