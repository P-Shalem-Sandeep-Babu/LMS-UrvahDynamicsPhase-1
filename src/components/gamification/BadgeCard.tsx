import React from "react";
import { Badge } from "../../types/gamification";
import { Target, Flame, Brain, Shield, Award } from "lucide-react";

interface BadgeCardProps {
  badge: Badge;
}

export const BadgeCard = ({ badge }: BadgeCardProps) => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case "Target": return <Target {...props} />;
      case "Flame": return <Flame {...props} />;
      case "Brain": return <Brain {...props} />;
      case "Shield": return <Shield {...props} />;
      default: return <Award {...props} />;
    }
  };

  const isUnlocked = !!badge.earnedAt;

  return (
    <div className={`p-4 border flex flex-col gap-3 transition-colors ${
      isUnlocked ? 'border-primary/20 bg-primary/5 hover:border-primary/40' : 'border-border/50 bg-background grayscale opacity-60'
    }`}>
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
          isUnlocked ? 'bg-primary/20 text-primary border-primary/30' : 'bg-foreground/5 text-muted-foreground/80 border-border'
        }`}>
          {getIcon(badge.icon)}
        </div>
        {badge.isEquipped && (
          <span className="text-[8px] uppercase tracking-widest font-bold bg-primary text-black px-1.5 py-0.5 rounded-sm">
            Equipped
          </span>
        )}
      </div>
      
      <div>
        <h4 className={`text-sm font-bold tracking-tight mb-1 ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
          {badge.name}
        </h4>
        <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
          {badge.description}
        </p>
      </div>

      <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between text-[9px] uppercase font-mono tracking-widest">
        {isUnlocked ? (
          <span className="text-primary font-bold">Earned</span>
        ) : (
          <span className="text-muted-foreground/60">Locked</span>
        )}
        {badge.earnedAt && (
          <span className="text-muted-foreground/60">{new Date(badge.earnedAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};
