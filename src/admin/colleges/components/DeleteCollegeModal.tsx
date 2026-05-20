import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { College } from "../../../types/college";
import { AlertTriangle } from "lucide-react";

interface DeleteCollegeModalProps {
  college: College | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteCollegeModal: React.FC<DeleteCollegeModalProps> = ({ college, isOpen, onClose, onConfirm }) => {
  if (!college) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-red-500/20 text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 text-red-500 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <DialogTitle>Delete College</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground pt-3">
            Are you sure you want to remove <span className="font-bold text-foreground">{college.name}</span> from the system? This action cannot be undone. All associated data will be marked as inactive.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-foreground border border-red-500/50"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
