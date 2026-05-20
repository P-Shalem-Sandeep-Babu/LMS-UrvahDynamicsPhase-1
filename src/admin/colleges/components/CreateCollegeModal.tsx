import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { College } from "../../../types/college";

interface CreateCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<College>) => void;
}

export const CreateCollegeModal: React.FC<CreateCollegeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-border text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New College</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Register a new institution to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-xs font-mono text-muted-foreground uppercase">College Name</label>
            <Input placeholder="e.g. Urvah Engineering College" className="bg-foreground/5 border-border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-mono text-muted-foreground uppercase">College Code</label>
              <Input placeholder="e.g. UEC" className="bg-foreground/5 border-border" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-mono text-muted-foreground uppercase">Email Domain</label>
              <Input placeholder="e.g. @urvah.edu" className="bg-foreground/5 border-border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-mono text-muted-foreground uppercase">Faculty Count</label>
              <Input type="number" placeholder="0" className="bg-foreground/5 border-border" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-mono text-muted-foreground uppercase">Trainer Count</label>
              <Input type="number" placeholder="0" className="bg-foreground/5 border-border" />
            </div>
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
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
