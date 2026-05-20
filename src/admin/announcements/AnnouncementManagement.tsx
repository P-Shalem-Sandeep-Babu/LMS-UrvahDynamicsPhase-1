import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Megaphone } from "lucide-react";
import { AnnouncementList } from "../../components/announcements/AnnouncementList";

export const AnnouncementManagement = () => {
  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 pb-12 animate-in fade-in">
      <Link to="/admin-settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-xs font-mono uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Settings
      </Link>

      <div className="border-b border-border pb-6">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Announcements
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Manage global and targeted system broadcasts
         </p>
      </div>

      <AnnouncementList canManage={true} />
    </div>
  );
};

