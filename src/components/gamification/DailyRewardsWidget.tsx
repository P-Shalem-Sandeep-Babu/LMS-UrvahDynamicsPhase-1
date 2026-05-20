import React, { useState } from "react";
import { Gift, CheckCircle2 } from "lucide-react";

export const DailyRewardsWidget = () => {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    // Simulate achievement celebration event
    const event = new CustomEvent("achievement-unlocked", { 
      detail: { title: "Daily Quest Completed", icon: "Gift", xp: 50 } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="border border-border bg-card p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
      <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Gift className="w-4 h-4 text-primary" /> Daily Rewards
        </h3>
        <span className="text-[9px] font-mono uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10">Resets in 12h</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">Login Reward</h4>
          <p className="text-[10px] font-mono text-muted-foreground">Claim your daily 50 XP bonus to maintain your rank.</p>
        </div>
        
        <button
          onClick={handleClaim}
          disabled={claimed}
          className={`flex items-center gap-2 px-6 py-2 border text-[10px] uppercase font-bold tracking-widest transition-colors ${
            claimed 
              ? "border-primary/20 bg-primary/10 text-primary cursor-not-allowed" 
              : "border-primary text-black bg-primary hover:bg-primary/90 shadow-[0_0_15px_var(--color-primary)] hover:shadow-[0_0_25px_var(--color-primary)]"
          }`}
        >
          {claimed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
            </>
          ) : (
            "Claim 50 XP"
          )}
        </button>
      </div>
    </div>
  );
};
