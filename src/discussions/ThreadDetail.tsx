import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MessageSquare, ArrowUp, ArrowDown, Share2, Bookmark, MoreHorizontal, CheckCircle2, CornerDownRight, Lock, Pin, Bold, Italic, Code, Link as LinkIcon, AtSign, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDiscussion } from "../context/DiscussionContext";
import { useAuth } from "../context/AuthContext";

export const ThreadDetail = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const { threads, addComment, upvoteThread, downvoteThread, acceptComment, pinThread } = useDiscussion();
  const { user } = useAuth();
  const [replyText, setReplyText] = useState("");

  const thread = threads.find(t => t.id === threadId);

  if (!thread) {
    return (
      <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12 pt-6">
        <button 
          onClick={() => navigate("/discussions")}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors w-fit border border-border/50 bg-card px-4 py-2 hover:bg-foreground/5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Matrix
        </button>
        <div className="text-foreground">Thread not found.</div>
      </div>
    );
  }

  const comments = thread.comments || [];

  const handlePostResponse = () => {
    if (!replyText.trim()) return;
    const author = {
      name: user?.name || "CurrentUser",
      avatar: user?.avatar || "https://i.pravatar.cc/150?u=current",
      role: user?.role as "student" | "faculty" | "trainer" | "admin"
    };
    addComment(thread.id, replyText, author);
    setReplyText("");
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12 pt-6">
      <button 
        onClick={() => navigate("/discussions")}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors w-fit border border-border/50 bg-card px-4 py-2 hover:bg-foreground/5"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Matrix
      </button>

      {/* Main Post */}
      <div className="border border-border bg-card flex">
        {/* Voting Sidebar */}
        <div className="w-16 flex flex-col items-center py-4 px-2 border-r border-border/50 bg-white/[0.01]">
            <button 
              className="p-1 hover:text-primary transition-colors text-muted-foreground/80 hover:bg-foreground/5 rounded-sm"
              onClick={() => upvoteThread(thread.id)}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="font-mono text-sm font-bold text-foreground my-1">{thread.votes}</span>
            <button 
              className="p-1 hover:text-red-500 transition-colors text-muted-foreground/80 hover:bg-foreground/5 rounded-sm"
              onClick={() => downvoteThread(thread.id)}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-4">
             <div className="flex items-center gap-1.5 bg-foreground/5 px-2 py-1 rounded-sm border border-border">
                <span className={`w-1.5 h-1.5 rounded-full ${thread.category === 'coding' ? 'bg-primary' : thread.category === 'qna' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">
                  {thread.category}
                </span>
             </div>
             {thread.isSolved && (
                <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded-sm text-[9px] uppercase tracking-widest font-mono font-bold">
                   Solved
                </div>
             )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
            {thread.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
             <img src={thread.author.avatar} alt="Author" className="w-10 h-10 rounded-sm border border-border/80" />
             <div className="flex flex-col">
               <span className="text-sm font-bold text-foreground">@{thread.author.name}</span>
               <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  <span className={thread.author.role === 'faculty' ? 'text-purple-400' : 'text-blue-400'}>{thread.author.role}</span>
                  <span>•</span>
                  <span>{thread.createdAt}</span>
               </div>
             </div>
          </div>

          <div className="mb-8 font-mono text-sm leading-relaxed text-foreground/80 overflow-auto">
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const {children, className, node, ref, ...rest} = props
                  const match = /language-(\w+)/.exec(className || '')
                  // @ts-ignore
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={vscDarkPlus}
                      customStyle={{ background: '#050505', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  ) : (
                    <code {...rest} className="bg-foreground/10 px-1 py-0.5 rounded-sm">
                      {children}
                    </code>
                  )
                }
              }}
            >
              {thread.content || thread.preview}
            </Markdown>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-border/50">
             <div className="flex gap-2">
                {thread.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 border border-primary/20 rounded-sm">
                    {tag}
                  </span>
                ))}
             </div>

             <div className="flex items-center gap-2">
                {(user?.role === "faculty" || user?.role === "admin" || user?.role === "trainer") && (
                  <button 
                    onClick={() => pinThread(thread.id, !thread.pinned)}
                    className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 transition-colors border rounded-sm ${thread.pinned ? 'text-purple-400 border-purple-400/50 bg-purple-400/20' : 'text-purple-400/50 border-purple-400/20 bg-purple-400/5 hover:text-purple-300 hover:bg-purple-400/10'}`}>
                     <Pin className="w-3.5 h-3.5" /> {thread.pinned ? 'Unpin' : 'Pin Thread'}
                  </button>
                )}
                <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#f59e0b] hover:text-[#fbbf24] px-3 py-1.5 hover:bg-[#f59e0b]/10 transition-colors border border-[#f59e0b]/20 rounded-sm bg-[#f59e0b]/5">
                   <Lock className="w-3.5 h-3.5" /> Lock
                </button>
                <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground px-3 py-1.5 hover:bg-foreground/5 transition-colors border border-transparent hover:border-border rounded-sm">
                   <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground px-3 py-1.5 hover:bg-foreground/5 transition-colors border border-transparent hover:border-border rounded-sm">
                   <Bookmark className="w-3.5 h-3.5" /> Save
                </button>
                <button className="p-1.5 text-muted-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors">
                   <MoreHorizontal className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col gap-4 mt-4">
         <h3 className="text-sm font-black uppercase tracking-widest text-foreground/80 flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Thread Responses ({thread.replies})
         </h3>

         {/* Reply Editor */}
         <div className="border border-border bg-card p-4 flex flex-col gap-4">
            <div className="flex border-b border-border pb-2 mb-2 gap-2">
               <button className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-sm transition-colors border border-transparent" title="Bold">
                 <Bold className="w-4 h-4" />
               </button>
               <button className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-sm transition-colors border border-transparent" title="Italic">
                 <Italic className="w-4 h-4" />
               </button>
               <button className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-sm transition-colors border border-transparent" title="Code">
                 <Code className="w-4 h-4" />
               </button>
               <button className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-sm transition-colors border border-transparent" title="Link">
                 <LinkIcon className="w-4 h-4" />
               </button>
               <button className="p-1.5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-sm transition-colors border border-transparent ml-auto" title="@mention">
                 <AtSign className="w-4 h-4" />
               </button>
            </div>
            <textarea 
               value={replyText}
               onChange={(e) => setReplyText(e.target.value)}
               placeholder="Write your response, format with Markdown..."
               className="w-full bg-background border border-border text-foreground text-sm font-mono p-4 min-h-[120px] focus:outline-none focus:border-primary/50 transition-colors custom-scrollbar"
            />
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                 Supports Markdown formatting
               </span>
               <button 
                 onClick={handlePostResponse}
                 className="bg-primary text-primary-foreground px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-2">
                 <Send className="w-3 h-3" /> Post Response
               </button>
            </div>
         </div>

         {/* Comment List */}
         <div className="flex flex-col gap-4">
            {comments.map(comment => (
               <div key={comment.id} className={`border flex flex-col ${comment.isAccepted ? 'border-green-500/30 bg-green-500/[0.02]' : 'border-border bg-card'}`}>
                  <div className="flex">
                    <div className="w-12 flex flex-col items-center py-4 px-2 border-r border-border/50 bg-white/[0.01]">
                        <button className="p-1 hover:text-primary transition-colors text-muted-foreground/80 hover:bg-foreground/5 rounded-sm">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="font-mono text-xs font-bold text-foreground my-1">{comment.votes}</span>
                        <button className="p-1 hover:text-red-500 transition-colors text-muted-foreground/80 hover:bg-foreground/5 rounded-sm">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col min-w-0">
                       <div className="flex items-center justify-between mb-3">
                         {comment.isAccepted ? (
                            <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-widest font-mono">
                               <CheckCircle2 className="w-3.5 h-3.5" /> Accepted Solution
                            </div>
                         ) : (
                            (user?.role === "faculty" || user?.name === thread.author.name) && !thread.isSolved ? (
                              <button 
                                onClick={() => acceptComment(thread.id, comment.id)}
                                className="flex items-center gap-1.5 text-muted-foreground/60 hover:text-green-500 transition-colors text-[10px] font-bold uppercase tracking-widest font-mono border border-border hover:border-green-500/30 px-2 py-1 rounded-sm"
                              >
                                 <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Solution
                              </button>
                            ) : <div />
                         )}
                       </div>
                       
                       <div className="flex items-center gap-3 mb-4">
                         <img src={comment.author.avatar} alt="Author" className="w-8 h-8 rounded-sm shrink-0 border border-border/80" />
                         <div className="flex flex-col">
                           <span className="text-xs font-bold text-foreground">@{comment.author.name}</span>
                           <span className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest">{comment.author.role} • {comment.createdAt}</span>
                         </div>
                       </div>
                       
                       <div className="font-mono text-sm leading-relaxed text-foreground/70 overflow-auto">
                          <Markdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code(props) {
                                const {children, className, node, ref, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
                                // @ts-ignore
                                return match ? (
                                  <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={vscDarkPlus}
                                    customStyle={{ background: '#050505', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}
                                  />
                                ) : (
                                  <code {...rest} className="bg-foreground/10 px-1 py-0.5 rounded-sm">
                                    {children}
                                  </code>
                                )
                              }
                            }}
                          >
                            {comment.content}
                          </Markdown>
                       </div>

                       <div className="flex mt-4 gap-4">
                          <button className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                             <MessageSquare className="w-3 h-3" /> Reply
                          </button>
                       </div>
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                     <div className="flex flex-col gap-2 mt-2 py-4 pr-4 pl-12 border-t border-border/50 bg-white/[0.01]">
                        {comment.replies.map(reply => (
                           <div key={reply.id} className="flex gap-4">
                              <CornerDownRight className="w-4 h-4 text-white/20 mt-1 shrink-0" />
                              <div className="flex-1 flex flex-col border border-border/50 p-4 bg-card min-w-0">
                                 <div className="flex items-center justify-between mb-3">
                                   <div className="flex items-center gap-2">
                                     <img src={reply.author.avatar} alt="Author" className="w-6 h-6 rounded-sm shrink-0" />
                                     <span className="text-xs font-bold text-foreground">@{reply.author.name}</span>
                                     <span className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest">• {reply.createdAt}</span>
                                   </div>
                                 </div>
                                 <div className="font-mono text-xs leading-relaxed text-foreground/70 overflow-auto">
                                    <Markdown 
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        code(props) {
                                          const {children, className, node, ref, ...rest} = props
                                          const match = /language-(\w+)/.exec(className || '')
                                          // @ts-ignore
                                          return match ? (
                                            <SyntaxHighlighter
                                              {...rest}
                                              PreTag="div"
                                              children={String(children).replace(/\n$/, '')}
                                              language={match[1]}
                                              style={vscDarkPlus}
                                              customStyle={{ background: '#050505', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}
                                            />
                                          ) : (
                                            <code {...rest} className="bg-foreground/10 px-1 py-0.5 rounded-sm">
                                              {children}
                                            </code>
                                          )
                                        }
                                      }}
                                    >
                                      {reply.content}
                                    </Markdown>
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
