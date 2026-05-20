import React from "react";

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge = ({ count }: NotificationBadgeProps) => {
  if (count === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-bold px-1.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full animate-in fade-in zoom-in">
      {count > 99 ? '99+' : count}
    </span>
  );
};
