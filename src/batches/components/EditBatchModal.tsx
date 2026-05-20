import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Batch } from "../../types/batch";
import { getStoredTrainers, getStoredFaculty } from "../../utils/batchState";

interface EditBatchModalProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Batch>) => void;
}

export const EditBatchModal: React.FC<EditBatchModalProps> = ({ batch, isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [status, setStatus] = useState<Batch["status"]>("active");

  const trainers = getStoredTrainers();
  const faculty = getStoredFaculty();

  useEffect(() => {
    if (batch && isOpen) {
      setName(batch.name || "");
      setTrainerId(batch.trainerId || "");
      setFacultyId(batch.facultyId || "");
      setStatus(batch.status || "active");
    }
  }, [batch, isOpen]);

  if (!batch) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedTrainer = trainers.find(t => t.id === trainerId);
    const selectedFaculty = faculty.find(f => f.id === facultyId);

    const updatedData: Partial<Batch> = {
      name: name.trim() || batch.name,
      trainerId: trainerId || undefined,
      trainerName: selectedTrainer ? selectedTrainer.name : undefined,
      facultyId: facultyId || undefined,
      facultyName: selectedFaculty ? selectedFaculty.name : undefined,
      status,
    };

    onSubmit(updatedData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-border text-foreground sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="uppercase font-mono italic text-foreground flex items-center gap-2">Edit Batch Configuration</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
            Adjust assignees and metadata logs for {batch.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-4 py-2">
          <div className="grid gap-2">
            <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Batch Name</label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter batch name..." 
              required
              className="bg-foreground/5 border-border text-foreground rounded-none h-10 font-mono text-xs focus-visible:ring-primary/40" 
            />
          </div>

          <div className="grid gap-2">
            <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Lead Trainer Assignment</label>
            <select
              value={trainerId}
              onChange={(e) => setTrainerId(e.target.value)}
              className="w-full bg-muted border border-border text-foreground rounded-none h-10 px-3 font-mono text-xs focus-visible:ring-primary/40"
            >
              <option value="">-- No Trainer Assigned --</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.id} className="bg-background text-foreground">
                  {t.name} (Trainer)
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">College Faculty Member</label>
            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-full bg-muted border border-border text-foreground rounded-none h-10 px-3 font-mono text-xs focus-visible:ring-primary/40"
            >
              <option value="">-- No Faculty Assigned --</option>
              {faculty.map((f) => (
                <option key={f.id} value={f.id} className="bg-background text-foreground">
                  {f.name} (Faculty)
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 text-foreground">
            <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Batch Lifecyle Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-muted border border-border text-foreground rounded-none h-10 px-3 font-mono text-xs focus-visible:ring-primary/40"
            >
              <option value="active" className="bg-background text-foreground">Active (In Session)</option>
              <option value="upcoming" className="bg-background text-foreground">Upcoming (Registration)</option>
              <option value="completed" className="bg-background text-foreground">Completed (Graduated)</option>
            </select>
          </div>

          <DialogFooter className="pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={onClose} className="font-mono text-xs uppercase tracking-wider rounded-none">Cancel</Button>
            <Button 
              type="submit"
              className="bg-primary text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-foreground transition-all rounded-none px-6"
            >
              Save Allocation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
