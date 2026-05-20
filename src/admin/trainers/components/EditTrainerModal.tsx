import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Trainer } from "../../../types/trainer";

interface EditTrainerModalProps {
  trainer: Trainer | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trainerData: Partial<Trainer>) => void;
}

export const EditTrainerModal: React.FC<EditTrainerModalProps> = ({ trainer, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Trainer>>({});

  useEffect(() => {
    if (trainer) {
      setFormData(trainer);
    }
  }, [trainer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!trainer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wider">Edit Trainer Info</DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs">
            Modify details for {trainer.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-4">
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Full Name</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.name || ''} 
                 onChange={e => setFormData({...formData, name: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Email Address</label>
               <Input 
                 type="email"
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.email || ''} 
                 onChange={e => setFormData({...formData, email: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Phone Number</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.phone || ''} 
                 onChange={e => setFormData({...formData, phone: e.target.value})} 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Status</label>
               <select 
                 className="w-full bg-card border border-border rounded-md p-2 text-foreground h-10 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" 
                 value={formData.status || 'active'} 
                 onChange={e => setFormData({...formData, status: e.target.value as "active" | "inactive"})}
               >
                 <option value="active">Active</option>
                 <option value="inactive">Inactive</option>
               </select>
             </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-black hover:bg-primary/90 font-bold">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
