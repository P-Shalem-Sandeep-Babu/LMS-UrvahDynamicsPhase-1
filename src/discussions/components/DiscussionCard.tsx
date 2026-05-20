import { motion } from "motion/react";
import { MessageSquare, ArrowUp, ArrowDown, User, Clock, Tag, Pin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DiscussionThread, useDiscussion } from "../../context/DiscussionContext";

export const DiscussionCard = ({ thread }: { thread: DiscussionThread }) => {
  const navigate = useNavigate();
  const { upvoteThread, downvoteThread } = useDiscussion();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card hover:bg-white/[0.02] hover:border-border/80 transition-all cursor-pointer flex"
      onClick={() => navigate(`/discussions/${thread.id}`)}
    >
      {/* Voting Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 px-2 border-r border-border/50 bg-white/[0.01]">
         <button 
           className="p-1 hover:text-primary transition-colors text-muted-foreground/80 hover:bg-foreground/5 rounded-sm" 
           onClick={(e) => { e.stopPropagation(); upvoteThread(thread.id); }}
         >
            <ArrowUp className="w-5 h-5" />
         </button>
         <span className="font-mono text-sm font-bold text-foreground my-1">{thread.votes}</span>
         <button 
           className="p-1 hover:text-red-500 transition-colors text-muted-foreground/80 hover:bg-foreground/5 rounded-sm" 
           onClick={(e) => { e.stopPropagation(); downvoteThread(thread.id); }}
         >
            <ArrowDown className="w-5 h-5" />
         </button>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1 flex flex-col min-w-0">
         <div className="flex items-center gap-2 mb-2">
           <div className="flex items-center gap-1.5 bg-foreground/5 px-2 py-1 rounded-sm border border-border">
              <span className={`w-1.5 h-1.5 rounded-full ${thread.category === 'coding' ? 'bg-primary' : thread.category === 'qna' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">
                {thread.category}
              </span>
           </div>
           {thread.pinned && (
              <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-sm text-[9px] uppercase tracking-widest font-mono font-bold flex items-center gap-1">
                 <Pin className="w-2.5 h-2.5" /> Pinned
              </div>
           )}
           {thread.isSolved && (
              <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded-sm text-[9px] uppercase tracking-widest font-mono font-bold">
                 Solved
              </div>
           )}
         </div>

         <h3 className="text-lg font-bold text-foreground mb-2 leading-tight truncate">
           {thread.title}
         </h3>
         
         <p className="text-sm font-mono text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
           {thread.preview}
         </p>

         <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-border/50">
            <div className="flex gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>
               {thread.tags.map(tag => (
                 <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 border border-primary/20 rounded-sm hover:bg-primary/20 transition-colors cursor-pointer">
                   <Tag className="w-3 h-3" /> {tag}
                 </span>
               ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/80">
               <div className="flex items-center gap-1.5 group">
                  <img src={thread.author.avatar} alt={thread.author.name} className="w-5 h-5 rounded-sm" />
                  <span className="group-hover:text-foreground transition-colors">@{thread.author.name}</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{thread.createdAt}</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{thread.replies} Replies</span>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
