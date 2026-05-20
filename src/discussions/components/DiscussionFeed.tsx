import { useState } from "react";
import { DiscussionCard } from "./DiscussionCard";
import { Search, Plus, Filter, MessageSquare } from "lucide-react";
import { useDiscussion } from "../../context/DiscussionContext";
import { NewDiscussionModal } from "./NewDiscussionModal";

export const DiscussionFeed = ({ activeCategory }: { activeCategory: string }) => {
  const { threads } = useDiscussion();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredThreads = threads.filter(t => {
    const matchesCat = activeCategory === "all" || t.category === activeCategory;
    const matchesQuery = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.votes - a.votes; // Default sort by votes
  });

  return (
    <div className="flex-1 flex flex-col gap-6 relative">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Search discussions, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
               <Filter className="w-3 h-3" /> Filters
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none bg-primary text-primary-foreground px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_15px_var(--color-primary)] hover:shadow-[0_0_25px_var(--color-primary)] flex items-center justify-center gap-2"
            >
               <Plus className="w-3 h-3" /> New Topic
            </button>
         </div>
      </div>

      {/* Feed List */}
      <div className="flex flex-col gap-4">
        {filteredThreads.length > 0 ? (
          filteredThreads.map(thread => (
            <div key={thread.id}>
               <DiscussionCard thread={thread} />
            </div>
          ))
        ) : (
          <div className="border border-border bg-card p-12 flex flex-col items-center justify-center text-center">
             <MessageSquare className="w-12 h-12 text-white/10 mb-4" />
             <h3 className="text-lg font-bold text-foreground mb-2">No Discussions Found</h3>
             <p className="text-sm font-mono text-muted-foreground mb-6">
               Try adjusting your search or filters to find what you're looking for.
             </p>
             <button 
               onClick={() => setSearchQuery("")}
               className="border border-border/80 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors"
             >
               Clear Filters
             </button>
          </div>
        )}
      </div>

      <NewDiscussionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
