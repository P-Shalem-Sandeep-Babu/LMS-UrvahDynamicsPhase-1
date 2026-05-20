import React from "react";
import { Zap } from "lucide-react";
import { XPEvent } from "../../types/gamification";

interface XPWidgetProps {
  history: XPEvent[];
}

export const XPWidget = ({ history }: XPWidgetProps) => {
  return (
    <div className="border border-border bg-card p-6 h-full flex flex-col">
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> XP History
        </h3>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
        {history.map((event) => (
          <div key={event.id} className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-foreground/80">{event.reason}</span>
              <span className="text-[9px] font-mono uppercase text-muted-foreground/80 tracking-widest">
                {new Date(event.createdAt).toLocaleDateString()} {new Date(event.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
            <span className="text-sm font-black italic text-primary shrink-0">
              +{event.xpAmount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
