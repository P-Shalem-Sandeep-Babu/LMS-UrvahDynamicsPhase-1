import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Announcement, AnnouncementCategory, AnnouncementAudienceType } from "../../types/announcement";
import { AnnouncementCard } from "./AnnouncementCard";
import { useAuth } from "../../context/AuthContext";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement?: Announcement | null;
  onSave: (announcement: Partial<Announcement>) => void;
}

const CATEGORIES: AnnouncementCategory[] = ["General", "Assignments", "Coding", "Contests", "Deadlines"];

export const AnnouncementModal = ({ isOpen, onClose, announcement, onSave }: AnnouncementModalProps) => {
  const { user } = useAuth();
  
  let allowedAudiences: AnnouncementAudienceType[] = ["global", "college", "batch", "trainer"];
  if (user?.role === "trainer") {
    allowedAudiences = ["batch"];
  } else if (user?.role === "faculty") {
    allowedAudiences = ["college", "batch"];
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory>("General");
  const [audienceType, setAudienceType] = useState<AnnouncementAudienceType>(allowedAudiences[0] || "global");
  const [audienceId, setAudienceId] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setContent(announcement.content);
      setCategory(announcement.category);
      setAudienceType(announcement.audiences[0]?.type || allowedAudiences[0] || "global");
      setAudienceId(announcement.audiences[0]?.id || "");
      setPinned(announcement.pinned);
    } else {
      setTitle("");
      setContent("");
      setCategory("General");
      setAudienceType(allowedAudiences[0] || "global");
      setAudienceId("");
      setPinned(false);
    }
  }, [announcement, isOpen, allowedAudiences[0]]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      content,
      category,
      pinned,
      audiences: [{ type: audienceType, id: audienceType !== "global" ? audienceId : undefined }]
    });
  };

  const previewAnnouncement: Announcement = {
    id: "preview",
    title: title || "Announcement Title",
    content: content || "Announcement content will appear here...",
    category: category,
    audiences: [{ type: audienceType, id: audienceType !== "global" ? audienceId : undefined }],
    createdBy: "You",
    createdAt: new Date().toISOString(),
    pinned: pinned,
    active: true
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] bg-card border-border text-foreground p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black uppercase tracking-widest text-primary">
            {announcement ? "Edit Announcement" : "Create Broadcast"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border/50">
          <form onSubmit={handleSubmit} className="p-6 space-y-4 border-r border-border/50">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Title</label>
              <Input 
                placeholder="Announcement Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-foreground/5 border-border text-foreground focus-visible:ring-primary/50 font-mono rounded-none"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Content</label>
              <textarea 
                placeholder="Write your announcement content here..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 bg-foreground/5 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 p-3 font-mono text-sm resize-none rounded-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                  className="w-full flex h-10 items-center justify-between border border-border bg-foreground/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-mono"
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Audience</label>
                <select 
                  value={audienceType}
                  onChange={(e) => setAudienceType(e.target.value as AnnouncementAudienceType)}
                  className="w-full flex h-10 items-center justify-between border border-border bg-foreground/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-mono"
                >
                  {allowedAudiences.map(a => <option key={a} value={a} className="text-black capitalize">{a}</option>)}
                </select>
              </div>
            </div>

            {audienceType !== "global" && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Target ID</label>
                <Input 
                  placeholder={`e.g. ${audienceType}_1`} 
                  value={audienceId}
                  onChange={(e) => setAudienceId(e.target.value)}
                  className="bg-foreground/5 border-border text-foreground focus-visible:ring-primary/50 font-mono rounded-none"
                  required
                />
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 pb-2">
               <input 
                 type="checkbox" 
                 id="pinned" 
                 checked={pinned} 
                 onChange={(e) => setPinned(e.target.checked)}
                 className="w-4 h-4 rounded-sm border-border bg-foreground/5 text-primary focus:ring-primary/50 accent-primary"
               />
               <label htmlFor="pinned" className="text-xs font-mono text-foreground/70 uppercase tracking-widest cursor-pointer">Pin to top</label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-foreground/5">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-black font-bold uppercase tracking-wider">
                {announcement ? "Save Changes" : "Create Broadcast"}
              </Button>
            </div>
          </form>

          <div className="p-6 bg-background flex flex-col items-center justify-center">
            <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold mb-4 w-full text-center">Live Preview</h3>
            <div className="w-full pointer-events-none">
              <AnnouncementCard announcement={previewAnnouncement} />
            </div>
            {audienceType !== "global" && !audienceId && (
              <p className="text-red-500 text-[10px] font-mono mt-4 text-center">Warning: Missing Target ID for audience type "{audienceType}".</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
