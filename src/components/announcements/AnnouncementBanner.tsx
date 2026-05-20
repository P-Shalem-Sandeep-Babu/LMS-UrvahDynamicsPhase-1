import React from "react";
import { Megaphone, X } from "lucide-react";

interface AnnouncementBannerProps {
  message: string;
  onDismiss: () => void;
  type?: "info" | "warning" | "error";
}

export const AnnouncementBanner = ({ message, onDismiss, type = "info" }: AnnouncementBannerProps) => {
  const getBannerStyles = () => {
    switch (type) {
      case "warning": return "bg-yellow-500 text-black";
      case "error": return "bg-red-500 text-foreground";
      default: return "bg-primary text-black";
    }
  };

  return (
    <div className={`w-full py-2 px-4 flex items-center justify-between ${getBannerStyles()}`}>
      <div className="flex items-center gap-2 max-w-[1200px] mx-auto w-full">
        <Megaphone className="w-4 h-4 flex-shrink-0" />
        <p className="text-xs font-bold uppercase tracking-widest truncate">{message}</p>
        <button onClick={onDismiss} className="ml-auto opacity-70 hover:opacity-100 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
