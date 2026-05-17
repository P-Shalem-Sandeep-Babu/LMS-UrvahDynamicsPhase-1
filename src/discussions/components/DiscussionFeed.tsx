import { useState } from "react";
import { DiscussionCard, DiscussionThread } from "./DiscussionCard";
import { Search, Plus, Filter, MessageSquare } from "lucide-react";

const mockThreads: DiscussionThread[] = [
  {
    id: "t_101",
    title: "How to perfectly balance a Binary Search Tree in O(N)?",
    preview: "I'm working on the advanced data structures homework and I'm struggling to understand the Day-Stout-Warren algorithm. Can someone explain the DSW algorithm in simple terms?",
    author: { name: "alex_mercer", avatar: "https://i.pravatar.cc/150?u=alex", role: "student" },
    votes: 42,
    replies: 15,
    tags: ["algorithms", "trees", "data-structures"],
    category: "coding",
    createdAt: "2 hours ago",
    isSolved: true
  },
  {
    id: "t_102",
    title: "Need help with React useEffect infinitely looping",
    preview: "I'm trying to fetch data from the API when component mounts, but it keeps fetching endlessly. Here is my code snippet...",
    author: { name: "sarah_c", avatar: "https://i.pravatar.cc/150?u=sarah", role: "student" },
    votes: 12,
    replies: 8,
    tags: ["react", "hooks", "frontend"],
    category: "qna",
    createdAt: "4 hours ago",
    isSolved: false
  },
  {
    id: "t_103",
    title: "[Announcement] Midterm Project Repository Guidelines",
    preview: "Attention all students, please ensure your GitHub repositories conform to the updated naming conventions before Friday. Failure to do so will result in automated test failures.",
    author: { name: "dr_chen", avatar: "https://i.pravatar.cc/150?u=chen", role: "faculty" },
    votes: 156,
    replies: 45,
    tags: ["announcement", "guidelines", "git"],
    category: "announcements",
    createdAt: "1 day ago",
  },
  {
    id: "t_104",
    title: "Best resources for learning Dynamic Programming?",
    preview: "DP always trips me up during contests. What are the best visual resources or platforms to really understand the intuition behind state transitions?",
    author: { name: "david_kim", avatar: "https://i.pravatar.cc/150?u=david", role: "student" },
    votes: 89,
    replies: 34,
    tags: ["dynamic-programming", "resources", "contest-prep"],
    category: "general",
    createdAt: "2 days ago",
  }
];

export const DiscussionFeed = ({ activeCategory }: { activeCategory: string }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = mockThreads.filter(t => {
    const matchesCat = activeCategory === "all" || t.category === activeCategory;
    const matchesQuery = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search discussions, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080808] border border-white/10 text-white text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-white/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
               <Filter className="w-3 h-3" /> Filters
            </button>
            <button className="flex-1 md:flex-none bg-primary text-primary-foreground px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_15px_var(--color-primary)] hover:shadow-[0_0_25px_var(--color-primary)] flex items-center justify-center gap-2">
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
          <div className="border border-white/10 bg-[#080808] p-12 flex flex-col items-center justify-center text-center">
             <MessageSquare className="w-12 h-12 text-white/10 mb-4" />
             <h3 className="text-lg font-bold text-white mb-2">No Discussions Found</h3>
             <p className="text-sm font-mono text-white/50 mb-6">
               Try adjusting your search or filters to find what you're looking for.
             </p>
             <button className="border border-white/20 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors">
               Clear Filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
