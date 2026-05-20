import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Trainer } from "../../../types/trainer";

interface CreateTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trainerData: Partial<Trainer>) => void;
}

export const CreateTrainerModal: React.FC<CreateTrainerModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Trainer>>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    assignedColleges: [],
    assignedBatches: [],
    activeStudents: 0,
    codingEngagement: 0,
    assignmentCompletion: 0,
    weeklyActivity: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wider">Add New Trainer</DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs">
            Create a new trainer profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-4">
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Full Name</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.name} 
                 onChange={e => setFormData({...formData, name: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Email Address</label>
               <Input 
                 type="email"
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.email} 
                 onChange={e => setFormData({...formData, email: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Phone Number</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.phone} 
                 onChange={e => setFormData({...formData, phone: e.target.value})} 
               />
             </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-black hover:bg-primary/90 font-bold">
              Create Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
