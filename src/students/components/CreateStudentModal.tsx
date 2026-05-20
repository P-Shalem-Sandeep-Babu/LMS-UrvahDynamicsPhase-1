import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Student } from "../../types/student";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: Partial<Student>) => void;
}

export const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    userName: "",
    rollNo: "",
    personalMail: "",
    collegeMail: "",
    phone: "",
    branch: "",
    year: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wider">Add New Student</DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs">
            Manually enter operative details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
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
               <label className="text-xs font-mono text-muted-foreground uppercase">Username</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.userName} 
                 onChange={e => setFormData({...formData, userName: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Roll No.</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.rollNo} 
                 onChange={e => setFormData({...formData, rollNo: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Phone</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.phone} 
                 onChange={e => setFormData({...formData, phone: e.target.value})} 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Personal Email</label>
               <Input 
                 type="email"
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.personalMail} 
                 onChange={e => setFormData({...formData, personalMail: e.target.value})} 
                 required 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">College Email</label>
               <Input 
                 type="email"
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.collegeMail} 
                 onChange={e => setFormData({...formData, collegeMail: e.target.value})} 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Branch</label>
               <Input 
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.branch} 
                 onChange={e => setFormData({...formData, branch: e.target.value})} 
               />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-xs font-mono text-muted-foreground uppercase">Year</label>
               <Input 
                 type="number"
                 className="bg-transparent border-border focus-visible:ring-primary/50" 
                 value={formData.year} 
                 onChange={e => setFormData({...formData, year: Number(e.target.value)})} 
               />
             </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-black hover:bg-primary/90 font-bold">
              Add Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
