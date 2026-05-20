import React, { useState } from "react";
import { Clock, CalendarDays, Zap, Settings2 } from "lucide-react";
import { AutomationConfig } from "../../../types/coding-automation";
import { Button } from "../../../components/ui/button";

interface CodingScheduleWidgetProps {
  config: AutomationConfig;
  onToggle: () => void;
}

export const CodingScheduleWidget = ({ config, onToggle }: CodingScheduleWidgetProps) => {
  return (
    <div className="bg-card border border-border p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${config.isEnabled ? 'bg-primary/10 text-primary border-primary/20' : 'bg-foreground/5 text-muted-foreground/80 border-border'}`}>
               <Zap className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-bold text-lg text-foreground font-mono tracking-tight">Daily Delivery</h3>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${config.isEnabled ? 'text-green-500' : 'text-muted-foreground/80'}`}>
                 {config.isEnabled ? 'Active' : 'Paused'}
               </span>
             </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-foreground/10">
            <Settings2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground/80 uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> Publish Time</span>
            <span className="text-foreground font-bold">{config.scheduleTime}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground/80 uppercase tracking-widest flex items-center gap-2"><CalendarDays className="w-3 h-3" /> Max Queue</span>
            <span className="text-foreground font-bold">{config.maxQueueDays} Days</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <Button 
          onClick={onToggle}
          className={`w-full text-xs font-bold uppercase tracking-wider ${config.isEnabled ? 'bg-foreground/10 hover:bg-red-500/20 hover:text-red-500 text-foreground' : 'bg-primary hover:brightness-110 text-black'}`}
        >
          {config.isEnabled ? 'Pause Automation' : 'Resume Automation'}
        </Button>
      </div>
    </div>
  );
};
