import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Trainer } from "../../../types/trainer";
import { AlertTriangle } from "lucide-react";

interface DeleteTrainerModalProps {
  trainer: Trainer | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteTrainerModal: React.FC<DeleteTrainerModalProps> = ({ trainer, isOpen, onClose, onConfirm }) => {
  if (!trainer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Remove Trainer
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs mt-2">
            Are you sure you want to remove <strong className="text-foreground">{trainer.name}</strong>? 
            This action will disconnect their active assignments. You may want to set them to 
            "Inactive" first instead.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="mt-6">
          <Button variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground">
            Cancel
          </Button>
          <Button onClick={() => { onConfirm(); onClose(); }} className="bg-red-500 text-foreground hover:bg-red-600 font-bold">
            Yes, Remove Trainer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
