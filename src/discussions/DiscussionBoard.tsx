import { useState } from "react";
import { DiscussionSidebar } from "./components/DiscussionSidebar";
import { DiscussionFeed } from "./components/DiscussionFeed";
import { MessageSquare } from "lucide-react";

export const DiscussionBoard = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-6 mb-2">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Global Matrix
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Peer-to-Peer Communication & Knowledge Exchange Subsystem
         </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
         <DiscussionSidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
         <DiscussionFeed activeCategory={activeCategory} />
      </div>
    </div>
  );
};
