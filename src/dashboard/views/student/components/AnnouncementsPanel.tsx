import { motion } from "motion/react";
import { Megaphone, Pin, Calendar, ArrowRight } from "lucide-react";
import { mockAnnouncements } from "../../../../data/mockAnnouncements";
import { AnnouncementCard } from "../../../../components/announcements/AnnouncementCard";

export const AnnouncementsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card p-6 relative flex flex-col gap-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-blue-500" /> Announcements
        </h2>
        <button className="text-[10px] font-mono hover:text-foreground transition-colors text-muted-foreground">
          MARK ALL READ
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {mockAnnouncements.slice(0, 3).map((item) => (
          <AnnouncementCard key={item.id} announcement={item} />
        ))}
      </div>
    </motion.div>
  );
};

