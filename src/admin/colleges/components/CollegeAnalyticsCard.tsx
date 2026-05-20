import React from "react";
import { LucideIcon } from "lucide-react";

interface CollegeAnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "primary" | "green" | "blue" | "amber" | "rose";
}

export const CollegeAnalyticsCard: React.FC<CollegeAnalyticsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  color = "primary" 
}) => {
  const colorMap = {
    primary: "text-primary bg-primary/10 border-primary/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    amber: "text-green-400 bg-green-500/10 border-green-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  const styleParts = colorMap[color].split(" ");

  return (
    <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group hover:border-border/80 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg border ${styleParts[1]} ${styleParts[2]} ${styleParts[0]}`}>
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <span className={`text-[10px] font-mono px-2 py-1 rounded bg-foreground/5 ${trendUp ? "text-green-400" : "text-rose-400"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      
      <div>
        <h4 className="text-3xl font-black mb-1">{value}</h4>
        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80">{title}</span>
      </div>
    </div>
  );
};
