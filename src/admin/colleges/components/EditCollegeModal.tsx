import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { College } from "../../../types/college";

interface EditCollegeModalProps {
  college: College | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<College>) => void;
}

export const EditCollegeModal: React.FC<EditCollegeModalProps> = ({ college, isOpen, onClose, onSubmit }) => {
  if (!college) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-border text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit College Details</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make changes to {college.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-xs font-mono text-muted-foreground uppercase">College Name</label>
            <Input defaultValue={college.name} className="bg-foreground/5 border-border" />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-mono text-muted-foreground uppercase">Email Domain</label>
            <Input defaultValue={college.emailDomain} className="bg-foreground/5 border-border" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            className="bg-primary text-black hover:bg-primary/90"
            onClick={() => {
              // Mock submit
              onSubmit({});
              onClose();
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
