import React from "react";
import { NotificationCategory } from "../../types/notification";

interface NotificationTabsProps {
  categories: { label: string; value: NotificationCategory | "All" }[];
  activeCategory: string;
  onSelect: (category: string) => void;
  unreadCounts: Record<string, number>;
}

export const NotificationTabs = ({ categories, activeCategory, onSelect, unreadCounts }: NotificationTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-none border flex items-center gap-2 ${
            activeCategory === cat.value
              ? 'bg-primary text-black border-primary'
              : 'bg-card text-muted-foreground border-border hover:border-border hover:text-foreground'
          }`}
        >
          {cat.label}
          {unreadCounts[cat.value] > 0 && (
            <span className={`px-1.5 py-0.5 text-[9px] rounded-full ${
              activeCategory === cat.value ? 'bg-background/20 text-black' : 'bg-primary/20 text-primary'
            }`}>
              {unreadCounts[cat.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
