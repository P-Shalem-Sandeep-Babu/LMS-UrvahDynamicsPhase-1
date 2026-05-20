import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Announcement } from "../../types/announcement";

interface DeleteAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: Announcement | null;
  onDelete: (id: string) => void;
}

export const DeleteAnnouncementModal = ({ isOpen, onClose, announcement, onDelete }: DeleteAnnouncementModalProps) => {
  if (!announcement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-red-500/20 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-widest text-red-500">Delete Announcement</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs font-mono pt-4">
            Are you sure you want to delete <span className="font-bold text-foreground">"{announcement.title}"</span>? This action cannot be undone and will remove it from all users' feeds.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-foreground/5">
            Cancel
          </Button>
          <Button type="button" onClick={() => onDelete(announcement.id)} className="bg-red-500 text-foreground font-bold uppercase tracking-wider hover:bg-red-600">
            Delete Broadcast
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
