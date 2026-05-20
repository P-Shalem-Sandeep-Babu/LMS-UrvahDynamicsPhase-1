import { useState } from "react";
import { Code2, Trophy, Briefcase, AlertTriangle } from "lucide-react";
import { CodingAnalytics } from "./analytics/CodingAnalytics";
import { ContestAnalytics } from "./analytics/ContestAnalytics";
import { PlacementReadiness } from "./analytics/PlacementReadiness";
import { WeakStudentDetection } from "./analytics/WeakStudentDetection";

export const AnalyticsView = () => {
  const [analyticsTab, setAnalyticsTab] = useState<"coding" | "contest" | "placement" | "weak">("coding");

  const tabs = [
    { id: "coding", label: "App & Web Analytics", icon: Code2 },
    { id: "contest", label: "Contest Metrics", icon: Trophy },
    { id: "placement", label: "Placement Readiness", icon: Briefcase },
    { id: "weak", label: "Weakness Detection", icon: AlertTriangle },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-card border border-border p-1 w-full overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAnalyticsTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                analyticsTab === tab.id
                  ? "bg-primary text-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <Icon className="w-3 h-3" /> {tab.label}
            </button>
          )
        })}
      </div>

      <div className="min-h-[400px]">
        {analyticsTab === "coding" && <CodingAnalytics />}
        {analyticsTab === "contest" && <ContestAnalytics />}
        {analyticsTab === "placement" && <PlacementReadiness />}
        {analyticsTab === "weak" && <WeakStudentDetection />}
      </div>
    </div>
  );
};
