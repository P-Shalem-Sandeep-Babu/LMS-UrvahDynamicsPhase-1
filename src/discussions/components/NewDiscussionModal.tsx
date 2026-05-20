import { useState } from "react";
import { X, LayoutTemplate, Tag as TagIcon } from "lucide-react";
import { useDiscussion } from "../../context/DiscussionContext";
import { useAuth } from "../../context/AuthContext";

export const NewDiscussionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { addThread } = useDiscussion();
  const { user } = useAuth();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"general" | "coding" | "qna" | "announcements" | "resources" | "batch">("coding");
  const [tags, setTags] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const parsedTags = tags.split(",").map(t => t.trim()).filter(Boolean);

    addThread({
      title,
      preview: content.slice(0, 150) + (content.length > 150 ? "..." : ""),
      content,
      category,
      tags: parsedTags.length > 0 ? parsedTags : ["general"],
      author: {
        name: user?.name || "CurrentUser",
        avatar: user?.avatar || "https://i.pravatar.cc/150?u=current",
        role: user?.role as any || "student"
      }
    });

    setTitle("");
    setContent("");
    setCategory("coding");
    setTags("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
      <div className="bg-card border border-border w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
             <LayoutTemplate className="w-5 h-5 text-primary" /> New Discussion Topic
          </h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 md:p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Topic Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., How to implement Dijkstra's Algorithm?"
              className="w-full bg-background border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
             <div className="flex flex-col gap-2 flex-1">
               <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Category</label>
               <select 
                 value={category}
                 onChange={(e) => setCategory(e.target.value as any)}
                 className="w-full bg-background border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
               >
                 <option value="coding">Algorithm & Coding</option>
                 <option value="qna">Questions & Help</option>
                 <option value="resources">Resource Sharing</option>
                 <option value="batch">Batch Discussion</option>
                 <option value="general">General</option>
                 {(user?.role === "faculty" || user?.role === "admin" || user?.role === "trainer") && (
                   <option value="announcements">Announcement</option>
                 )}
               </select>
             </div>
             
             <div className="flex flex-col gap-2 flex-1">
               <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                 <TagIcon className="w-3 h-3" /> Tags (comma separated)
               </label>
               <input 
                 type="text" 
                 value={tags}
                 onChange={(e) => setTags(e.target.value)}
                 placeholder="e.g. algorithms, graph, python"
                 className="w-full bg-background border border-border text-foreground text-sm font-mono px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
               />
             </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Content (Markdown Supported)</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your question or share your knowledge..."
              className="w-full bg-background border border-border text-foreground text-sm font-mono p-4 min-h-[200px] focus:outline-none focus:border-primary/50 transition-colors custom-scrollbar"
            />
          </div>
        </form>

        <div className="p-4 md:p-6 border-t border-border flex justify-end gap-4 mt-auto bg-card">
           <button 
             type="button"
             onClick={onClose}
             className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
           >
             Cancel
           </button>
           <button 
             onClick={handleSubmit}
             disabled={!title.trim() || !content.trim()}
             className="bg-primary text-primary-foreground px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
           >
             Create Topic
           </button>
        </div>
      </div>
    </div>
  );
};
