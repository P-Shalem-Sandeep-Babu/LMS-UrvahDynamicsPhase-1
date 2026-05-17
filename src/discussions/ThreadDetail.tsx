import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MessageSquare, ArrowUp, ArrowDown, Share2, Bookmark, MoreHorizontal, CheckCircle2, CornerDownRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const ThreadDetail = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [replyText, setReplyText] = useState("");

  const thread = {
    id: threadId || "t_101",
    title: "How to perfectly balance a Binary Search Tree in O(N)?",
    content: "I'm working on the advanced data structures homework and I'm struggling to understand the Day-Stout-Warren algorithm. Can someone explain the DSW algorithm in simple terms?\n\nI understand we first need to convert the tree into a backbone (vine) using right rotations, but the second phase where we do left rotations to make it perfectly balanced is confusing to me. \n\nHere is my code for the right rotation phase:\n```python\ndef tree_to_vine(root):\n    tail = root\n    rest = tail.right\n    while rest is not None:\n        if rest.left is None:\n            tail = rest\n            rest = rest.right\n        else:\n            temp = rest.left\n            rest.left = temp.right\n            temp.right = rest\n            rest = temp\n            tail.right = temp\n```\nIt seems to work, but the second phase falls apart. Help appreciated!",
    author: { name: "alex_mercer", avatar: "https://i.pravatar.cc/150?u=alex", role: "student" },
    votes: 42,
    replies: 3,
    tags: ["algorithms", "trees", "data-structures"],
    category: "coding",
    createdAt: "2 hours ago",
    isSolved: true
  };

  const comments = [
    {
      id: "c_1",
      author: { name: "dr_chen", avatar: "https://i.pravatar.cc/150?u=chen", role: "faculty" },
      content: "Great question! The Day-Stout-Warren (DSW) algorithm is indeed tricky during the second phase.\n\nOnce you have your vine (a completely right-skewed tree), you essentially need to perform a series of left rotations. \n\nThe process works by determining the number of leaves `L` in the bottommost level of the perfectly balanced tree. You first perform `L` left rotations starting from the top of the vine. After that, you perform passes of left rotations, halving the number of rotations each time until the tree is balanced.\n\nThe math for calculating `L` involves finding the largest complete binary tree size less than or equal to `N`.",
      votes: 18,
      createdAt: "1 hour ago",
      isAccepted: true,
      replies: [
        {
          id: "c_1_1",
          author: { name: "alex_mercer", avatar: "https://i.pravatar.cc/150?u=alex", role: "student" },
          content: "Ah, that makes sense! I was messing up the math for `L`, leading to null pointer exceptions later in the rotations. Thank you Dr. Chen!",
          votes: 3,
          createdAt: "45 mins ago"
        }
      ]
    },
    {
      id: "c_2",
      author: { name: "david_kim", avatar: "https://i.pravatar.cc/150?u=david", role: "student" },
      content: "Just to add to what Dr. Chen said, make sure you keep track of the parent node during those left rotations. Since the structure is completely linear at the start of phase 2, it's easy to accidentally orphan nodes.",
      votes: 5,
      createdAt: "30 mins ago",
      isAccepted: false,
      replies: []
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12">
      <button 
        onClick={() => navigate("/discussions")}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors w-fit border border-white/5 bg-[#080808] px-4 py-2 hover:bg-white/5"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Matrix
      </button>

      {/* Main Post */}
      <div className="border border-white/10 bg-[#080808] flex">
        {/* Voting Sidebar */}
        <div className="w-16 flex flex-col items-center py-4 px-2 border-r border-white/5 bg-white/[0.01]">
            <button className="p-1 hover:text-primary transition-colors text-primary bg-primary/10 rounded-sm">
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="font-mono text-sm font-bold text-white my-1">{thread.votes}</span>
            <button className="p-1 hover:text-red-500 transition-colors text-white/40 hover:bg-white/5 rounded-sm">
              <ArrowDown className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-4">
             <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                <span className={`w-1.5 h-1.5 rounded-full ${thread.category === 'coding' ? 'bg-primary' : thread.category === 'qna' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                <span className="text-[9px] uppercase tracking-widest text-white/60 font-mono">
                  {thread.category}
                </span>
             </div>
             {thread.isSolved && (
                <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded-sm text-[9px] uppercase tracking-widest font-mono font-bold">
                   Solved
                </div>
             )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {thread.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
             <img src={thread.author.avatar} alt="Author" className="w-10 h-10 rounded-sm border border-white/20" />
             <div className="flex flex-col">
               <span className="text-sm font-bold text-white">@{thread.author.name}</span>
               <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  <span className={thread.author.role === 'faculty' ? 'text-purple-400' : 'text-blue-400'}>{thread.author.role}</span>
                  <span>•</span>
                  <span>{thread.createdAt}</span>
               </div>
             </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8 font-mono text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
            {thread.content}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-white/5">
             <div className="flex gap-2">
                {thread.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 border border-primary/20 rounded-sm">
                    {tag}
                  </span>
                ))}
             </div>

             <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white px-3 py-1.5 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 rounded-sm">
                   <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white px-3 py-1.5 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 rounded-sm">
                   <Bookmark className="w-3.5 h-3.5" /> Save
                </button>
                <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                   <MoreHorizontal className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col gap-4 mt-4">
         <h3 className="text-sm font-black uppercase tracking-widest text-white/80 flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Thread Responses ({thread.replies})
         </h3>

         {/* Reply Editor */}
         <div className="border border-white/10 bg-[#080808] p-4 flex flex-col gap-4">
            <textarea 
               value={replyText}
               onChange={(e) => setReplyText(e.target.value)}
               placeholder="Write your response, format with Markdown..."
               className="w-full bg-[#050505] border border-white/10 text-white text-sm font-mono p-4 min-h-[120px] focus:outline-none focus:border-primary/50 transition-colors custom-scrollbar"
            />
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                 Supports Markdown formatting
               </span>
               <button className="bg-primary text-primary-foreground px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
                 Post Response
               </button>
            </div>
         </div>

         {/* Comment List */}
         <div className="flex flex-col gap-4">
            {comments.map(comment => (
               <div key={comment.id} className={`border flex flex-col ${comment.isAccepted ? 'border-green-500/30 bg-green-500/[0.02]' : 'border-white/10 bg-[#080808]'}`}>
                  <div className="flex">
                    <div className="w-12 flex flex-col items-center py-4 px-2 border-r border-white/5 bg-white/[0.01]">
                        <button className="p-1 hover:text-primary transition-colors text-white/40 hover:bg-white/5 rounded-sm">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white my-1">{comment.votes}</span>
                        <button className="p-1 hover:text-red-500 transition-colors text-white/40 hover:bg-white/5 rounded-sm">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                       {comment.isAccepted && (
                          <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-widest mb-3 font-mono">
                             <CheckCircle2 className="w-3.5 h-3.5" /> Accepted Solution
                          </div>
                       )}
                       
                       <div className="flex items-center gap-3 mb-4">
                         <img src={comment.author.avatar} alt="Author" className="w-8 h-8 rounded-sm shrink-0 border border-white/20" />
                         <div className="flex flex-col">
                           <span className="text-xs font-bold text-white">@{comment.author.name}</span>
                           <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{comment.author.role} • {comment.createdAt}</span>
                         </div>
                       </div>
                       
                       <div className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
                          {comment.content}
                       </div>

                       <div className="flex mt-4 gap-4">
                          <button className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1">
                             <MessageSquare className="w-3 h-3" /> Reply
                          </button>
                       </div>
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                     <div className="flex flex-col gap-2 mt-2 py-4 pr-4 pl-12 border-t border-white/5 bg-white/[0.01]">
                        {comment.replies.map(reply => (
                           <div key={reply.id} className="flex gap-4">
                              <CornerDownRight className="w-4 h-4 text-white/20 mt-1 shrink-0" />
                              <div className="flex-1 flex flex-col border border-white/5 p-4 bg-[#0a0a0a]">
                                 <div className="flex items-center justify-between mb-3">
                                   <div className="flex items-center gap-2">
                                     <img src={reply.author.avatar} alt="Author" className="w-6 h-6 rounded-sm shrink-0" />
                                     <span className="text-xs font-bold text-white">@{reply.author.name}</span>
                                     <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">• {reply.createdAt}</span>
                                   </div>
                                 </div>
                                 <div className="font-mono text-xs leading-relaxed text-white/70 whitespace-pre-wrap">
                                    {reply.content}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
