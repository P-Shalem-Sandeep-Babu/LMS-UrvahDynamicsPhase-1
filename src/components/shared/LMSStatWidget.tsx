import React from "react";
import { cn } from "../../lib/utils";

interface LMSStatWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ElementType;
  className?: string;
  highlightColor?: string; // Tailwind color class or hex
}

export const LMSStatWidget = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  className,
  highlightColor = "var(--color-primary)"
}: LMSStatWidgetProps) => {
  return (
    <div className={cn("border border-border bg-card p-5 flex flex-col justify-between relative overflow-hidden group", className)}>
      <div 
        className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500"
        style={{ color: highlightColor }}
      >
        {Icon && <Icon className="w-16 h-16" />}
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" style={{ color: highlightColor }} />}
          {title}
        </span>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-end gap-3 mb-1">
          <span className="text-3xl font-black font-mono text-foreground tracking-tight">{value}</span>
          {trendValue && (
            <span 
              className={cn(
                "text-[10px] font-mono font-bold mb-1.5",
                trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
              )}
            >
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
            </span>
          )}
        </div>
        
        {subtitle && (
          <span className="text-[10px] font-mono text-muted-foreground/80 block">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
