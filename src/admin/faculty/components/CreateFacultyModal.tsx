import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Faculty } from "../../../types/faculty";

interface CreateFacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (facultyData: Partial<Faculty>) => void;
}

export const CreateFacultyModal: React.FC<CreateFacultyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Faculty>>({
    name: "",
    email: "",
    phone: "",
    department: "",
    status: "active",
    assignedColleges: [],
    assignedBatches: [],
    workloadHours: 0,
    studentsMonitored: 0,
    contestsMonitored: 0
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
          <DialogTitle className="text-xl font-bold uppercase tracking-wider">Add New Faculty</DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs">
            Create a new faculty profile.
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
               <label className="text-xs font-mono text-muted-foreground uppercase">Department</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.department} 
                 onChange={e => setFormData({...formData, department: e.target.value})} 
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
