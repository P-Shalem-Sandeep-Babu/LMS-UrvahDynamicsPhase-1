import { motion } from "motion/react";
import { MessageSquare, ThumbsUp, MessageCircle, Clock } from "lucide-react";

const activeDiscussions = [
  { id: 1, topic: "Need help optimizing DP solution for Knapsack", author: "Alex C.", time: "2h ago", likes: 14, replies: 5, tags: ["dp", "optimization"] },
  { id: 2, topic: "Understanding system design trade-offs", author: "Maria G.", time: "5h ago", likes: 32, replies: 12, tags: ["system-design"] },
  { id: 3, topic: "Is Dijkstra always better than Bellman-Ford?", author: "David K.", time: "1d ago", likes: 8, replies: 4, tags: ["graphs", "algorithms"] },
];

export const DiscussionForumWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card p-6 relative h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" /> Active Discussions
        </h2>
        <button className="text-[10px] font-mono hover:text-foreground transition-colors text-muted-foreground border border-border px-3 py-1 hover:bg-foreground/5">
          NEW POST
        </button>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {activeDiscussions.map((post) => (
          <div key={post.id} className="p-4 border border-border/50 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group cursor-pointer flex flex-col gap-3">
             <div className="flex flex-col gap-1">
               <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                 {post.topic}
               </h3>
               <div className="flex gap-2 items-center">
                  {post.tags.map(tag => (
                     <span key={tag} className="text-[8px] font-mono uppercase tracking-widest text-primary/70 bg-primary/10 px-1.5 py-0.5 border border-primary/20">
                        {tag}
                     </span>
                  ))}
               </div>
             </div>
             
             <div className="flex justify-between items-center pt-2 border-t border-border/50">
               <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/80">
                 <span className="text-muted-foreground">{post.author}</span>
                 <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/80">
                  <span className="flex items-center gap-1.5 hover:text-foreground"><ThumbsUp className="w-3 h-3" /> {post.likes}</span>
                  <span className="flex items-center gap-1.5 hover:text-foreground"><MessageCircle className="w-3 h-3" /> {post.replies}</span>
               </div>
             </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-3 border border-dashed border-border/80 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors text-center">
         Browse All Forums
      </button>
    </motion.div>
  );
};
