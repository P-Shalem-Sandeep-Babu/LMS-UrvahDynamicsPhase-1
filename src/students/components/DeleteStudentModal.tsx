import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Student } from "../../types/student";

interface DeleteStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({ student, isOpen, onClose, onConfirm }) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent id="delete-student-modal" className="sm:max-w-[440px] bg-card border border-red-500/20 text-foreground">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-full bg-red-900/20 border border-red-500/40 flex items-center justify-center text-red-500 animate-pulse">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-xl font-black uppercase tracking-wider text-red-500">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs">
            This action is irreversible and will purge all telemetry.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg my-3 flex flex-col gap-1.5 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground/80">OPERATIVE NAME:</span>
            <span className="font-bold text-foreground">{student.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground/80">ROLL NO / ID:</span>
            <span className="text-foreground">{student.rollNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground/80">EMAIL REF:</span>
            <span className="text-foreground truncate max-w-[200px]">{student.collegeMail}</span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground text-center leading-relaxed font-mono px-2">
          Deleting this record will wipe their attendance sheets, historical coding scores, and contest records from the administrative datastore.
        </p>

        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-foreground/5 text-xs font-mono uppercase tracking-widest text-foreground/70 hover:text-foreground h-9 rounded-sm flex-1 md:flex-none">
            Retain Record
          </Button>
          <Button 
            type="button" 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="bg-red-600 hover:bg-red-700 text-foreground font-bold text-xs font-mono uppercase tracking-widest h-9 rounded-sm flex-1 md:flex-none gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" /> Purge Operative
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
