import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { mockColleges } from "../../data/mockColleges";
import { getStoredTrainers, getStoredFaculty } from "../../utils/batchState";

interface CreateBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateBatchModal: React.FC<CreateBatchModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const trainers = getStoredTrainers();
  const faculty = getStoredFaculty();

  useEffect(() => {
    if (isOpen) {
      setName("");
      setCollegeId(mockColleges[0]?.id || "");
      // default dates: today and today + 6 months
      const today = new Date();
      setStartDate(today.toISOString().split("T")[0]);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() + 6);
      setEndDate(sixMonthsAgo.toISOString().split("T")[0]);
      setTrainerId("");
      setFacultyId("");
    }
  }, [isOpen]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedCollege = mockColleges.find(c => c.id === collegeId) || mockColleges[0];
    const selectedTrainer = trainers.find(t => t.id === trainerId);
    const selectedFaculty = faculty.find(f => f.id === facultyId);

    const newBatchData = {
      name: name.trim(),
      collegeId: selectedCollege?.id || "col_1",
      collegeName: selectedCollege?.name || "Urvah Engineering College",
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      trainerId: selectedTrainer?.id || undefined,
      trainerName: selectedTrainer?.name || undefined,
      facultyId: selectedFaculty?.id || undefined,
      facultyName: selectedFaculty?.name || undefined,
      studentCount: 0,
      codingActivity: 0,
      assignmentProgress: 0,
      status: "active" as const,
    };

    onSubmit(newBatchData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-border text-foreground sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="uppercase font-mono italic tracking-tight text-foreground">Create New Batch</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
            Define a brand new training cohort in the system logs.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4 py-2">
          <div className="grid gap-2">
            <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Batch Name</label>
            <Input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., DSA Core Cohort A" 
              className="bg-foreground/5 border-border text-foreground placeholder-white/30 rounded-none h-10 font-mono text-xs focus-visible:ring-primary/40 focus-visible:border-primary/40" 
            />
          </div>

          <div className="grid gap-2">
            <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Institution College</label>
            <select
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              className="w-full bg-muted border border-border text-foreground rounded-none h-10 px-3 font-mono text-xs focus-visible:ring-primary/40"
            >
              {mockColleges.map((c) => (
                <option key={c.id} value={c.id} className="bg-background text-foreground">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Start Date</label>
              <Input 
                type="date" 
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-foreground/5 border-border text-foreground rounded-none h-10 font-mono text-xs focus-visible:ring-primary/40" 
              />
            </div>
            <div className="grid gap-2">
              <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">End Date</label>
              <Input 
                type="date" 
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-foreground/5 border-border text-foreground rounded-none h-10 font-mono text-xs focus-visible:ring-primary/40" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Lead Trainer</label>
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
              <label className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">College Faculty</label>
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
          </div>

          <DialogFooter className="pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={onClose} className="font-mono text-xs uppercase tracking-wider rounded-none">Cancel</Button>
            <Button 
              type="submit"
              className="bg-primary text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-foreground transition-all rounded-none px-6"
            >
              Create Batch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
