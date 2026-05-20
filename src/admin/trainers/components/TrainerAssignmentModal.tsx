import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Trainer } from "../../../types/trainer";
import { Link2, Unlink, RefreshCw, ChevronRight, CheckCircle2, AlertTriangle, Shield, History, ArrowRight } from "lucide-react";
import { mockColleges } from "../../../data/mockColleges";
import { mockBatches } from "../../../data/mockBatches";
import { 
  getStoredTrainers, 
  saveStoredTrainers, 
  executeTrainerReplacement, 
  getReplacementLogs, 
  ReplacementLog 
} from "../../../services/trainerService";

interface TrainerAssignmentModalProps {
  trainer: Trainer | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TrainerAssignmentModal: React.FC<TrainerAssignmentModalProps> = ({ 
  trainer, 
  isOpen, 
  onClose,
  onSuccess 
}) => {
  const [activeTab, setActiveTab] = useState<"assignments" | "replace" | "history">("assignments");
  
  // Assignment state
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  
  // Replacement state
  const [replaceTargetType, setReplaceTargetType] = useState<"batch" | "college">("batch");
  const [selectedColOrBatchId, setSelectedColOrBatchId] = useState<string>("");
  const [newTrainerId, setNewTrainerId] = useState<string>("");
  const [transferProgress, setTransferProgress] = useState(true);
  const [replaceSuccessMsg, setReplaceSuccessMsg] = useState("");
  const [replaceErrorMsg, setReplaceErrorMsg] = useState("");

  const [allTrainers, setAllTrainers] = useState<Trainer[]>([]);
  const [replacementLogs, setReplacementLogs] = useState<ReplacementLog[]>([]);

  // Load state when open
  useEffect(() => {
    if (isOpen) {
      setAllTrainers(getStoredTrainers());
      setReplacementLogs(getReplacementLogs());
    }
  }, [isOpen]);

  useEffect(() => {
    if (trainer) {
      // Find latest trainer data from core trainers list
      const freshTrainer = getStoredTrainers().find(t => t.id === trainer.id) || trainer;
      setSelectedColleges(freshTrainer.assignedColleges || []);
      setSelectedBatches(freshTrainer.assignedBatches || []);
      setReplaceSuccessMsg("");
      setReplaceErrorMsg("");
      setSelectedColOrBatchId("");
      setNewTrainerId("");
    }
  }, [trainer, isOpen]);

  if (!trainer) return null;

  const currentTrainerFull = allTrainers.find(t => t.id === trainer.id) || trainer;

  // Handle saving colleges and batches changes
  const handleSaveAssignments = () => {
    const updatedTrainers = getStoredTrainers().map(t => {
      if (t.id === trainer.id) {
        // Calculate new Student headcount roughly
        const batchesInColleges = mockBatches.filter(b => selectedBatches.includes(b.id));
        const activeStudentsCount = batchesInColleges.reduce((sum, b) => sum + b.studentCount, 0);

        return {
          ...t,
          assignedColleges: selectedColleges,
          assignedBatches: selectedBatches,
          activeStudents: activeStudentsCount
        };
      }
      return t;
    });

    saveStoredTrainers(updatedTrainers);
    if (onSuccess) onSuccess();
    onClose();
  };

  // Handle Replacement Handover Form Submit
  const handleTrainerReplacement = (e: React.FormEvent) => {
    e.preventDefault();
    setReplaceSuccessMsg("");
    setReplaceErrorMsg("");

    if (!selectedColOrBatchId) {
      setReplaceErrorMsg("Please select a college or batch to replace.");
      return;
    }
    if (!newTrainerId) {
      setReplaceErrorMsg("Please select a replacement trainer.");
      return;
    }
    if (newTrainerId === trainer.id) {
      setReplaceErrorMsg("Cannot replace a trainer with themselves.");
      return;
    }

    const result = executeTrainerReplacement(
      replaceTargetType,
      selectedColOrBatchId,
      trainer.id,
      newTrainerId,
      transferProgress
    );

    if (result) {
      setReplaceSuccessMsg("Trainer replaced successfully! Handovers and records updated.");
      // Refresh list
      setAllTrainers(getStoredTrainers());
      setReplacementLogs(getReplacementLogs());
      
      // Update local values
      const refreshedSource = getStoredTrainers().find(t => t.id === trainer.id);
      if (refreshedSource) {
        setSelectedColleges(refreshedSource.assignedColleges);
        setSelectedBatches(refreshedSource.assignedBatches);
      }
      setSelectedColOrBatchId("");
      setNewTrainerId("");
      
      if (onSuccess) onSuccess();
    } else {
      setReplaceErrorMsg("An error occurred executing trainer replacement.");
    }
  };

  const otherActiveTrainers = allTrainers.filter(t => t.id !== trainer.id && t.status === "active");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] bg-card border border-border text-foreground p-0 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-border bg-white/[0.01]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary animate-spin-slow" />
              Trainer Assignment & Replacement Hub
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-mono text-xs mt-1.5 flex items-center gap-3">
              <span>Trainer: <strong className="text-foreground font-bold">{currentTrainerFull.name}</strong></span>
              <span>•</span>
              <span>ID: <code className="text-primary">{currentTrainerFull.id}</code></span>
              <span>•</span>
              <span className="flex items-center gap-1">Status: 
                <span className={`w-2 h-2 rounded-full ${currentTrainerFull.status === "active" ? "bg-green-500" : "bg-red-500"}`} />
                {currentTrainerFull.status}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border bg-background">
          <button 
            onClick={() => setActiveTab("assignments")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all ${activeTab === "assignments" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Manage Assignments
          </button>
          <button 
            onClick={() => setActiveTab("replace")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all ${activeTab === "replace" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Trainer Replacement & Handover
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all ${activeTab === "history" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Handover Logs ({replacementLogs.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="min-h-[380px] max-h-[480px] overflow-y-auto">
          
          {/* TAB 1: MANAGE ASSIGNMENTS */}
          {activeTab === "assignments" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-white/10">
              
              {/* Colleges Panel */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground">
                    Colleges Assigned ({selectedColleges.length})
                  </h3>
                </div>
                
                <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
                  {mockColleges.map(college => {
                    const isAssigned = selectedColleges.includes(college.id);
                    return (
                      <div key={college.id} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${isAssigned ? 'bg-primary/5 border-primary/20' : 'bg-card border-border/50'}`}>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs">{college.name}</span>
                          <span className="text-[9px] text-muted-foreground/80 font-mono tracking-wider">{college.code} • {college.numBatches} Batches</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`h-7 uppercase tracking-wider text-[9px] font-bold ${isAssigned ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-primary hover:text-primary hover:bg-primary/10'}`}
                          onClick={() => {
                            setSelectedColleges(prev => {
                              if (isAssigned) {
                                // also unassign any batches inside that college
                                const remainColleges = prev.filter(c => c !== college.id);
                                const collegeBatches = mockBatches.filter(b => b.collegeId === college.id).map(b => b.id);
                                setSelectedBatches(bPrev => bPrev.filter(bId => !collegeBatches.includes(bId)));
                                return remainColleges;
                              } else {
                                return [...prev, college.id];
                              }
                            });
                          }}
                        >
                          {isAssigned ? <><Unlink className="w-3 h-3 mr-1" /> Remove</> : <><Link2 className="w-3 h-3 mr-1" /> Add</>}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Batches Panel */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground">
                  Batches Assigned ({selectedBatches.length})
                </h3>
                
                {selectedColleges.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                    <AlertTriangle className="w-8 h-8 text-muted-foreground/60 mb-2" />
                    <span className="text-xs text-muted-foreground/80 font-mono">Select at least one college first to configure batch assignments.</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
                    {mockBatches
                      .filter(batch => selectedColleges.includes(batch.collegeId))
                      .map(batch => {
                        const isAssigned = selectedBatches.includes(batch.id);
                        return (
                          <div key={batch.id} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${isAssigned ? 'bg-primary/5 border-primary/20' : 'bg-card border-border/50'}`}>
                            <div className="flex flex-col">
                              <span className="font-bold text-xs">{batch.name}</span>
                              <span className="text-[9px] text-muted-foreground/80 font-mono">
                                {mockColleges.find(c => c.id === batch.collegeId)?.name}
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`h-7 uppercase tracking-wider text-[9px] font-bold ${isAssigned ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-primary hover:text-primary hover:bg-primary/10'}`}
                              onClick={() => {
                                setSelectedBatches(prev => isAssigned ? prev.filter(b => b !== batch.id) : [...prev, batch.id]);
                              }}
                            >
                              {isAssigned ? <><Unlink className="w-3 h-3 mr-1" /> Remove</> : <><Link2 className="w-3 h-3 mr-1" /> Add</>}
                            </Button>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TRAINER REPLACEMENT WORKFLOW */}
          {activeTab === "replace" && (
            <div className="p-6 flex flex-col gap-5">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3 text-yellow-500">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div className="text-xs flex flex-col gap-1">
                  <span className="font-bold uppercase tracking-wider">Trainer Replacement & Handovers</span>
                  <span>Use this panel to gracefully hot-swap {currentTrainerFull.name} with an alternative trainer for specific colleges or batches. Student submission scoring, metrics, and rosters are seamlessly transferred.</span>
                </div>
              </div>

              {replaceSuccessMsg && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {replaceSuccessMsg}
                </div>
              )}

              {replaceErrorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg p-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {replaceErrorMsg}
                </div>
              )}

              <form onSubmit={handleTrainerReplacement} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Level */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase font-bold">Replacement Level</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReplaceTargetType("batch");
                          setSelectedColOrBatchId("");
                        }}
                        className={`py-2 px-3 border text-center text-xs font-bold uppercase tracking-wider transition-colors ${replaceTargetType === "batch" ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground"}`}
                      >
                        Single Batch
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplaceTargetType("college");
                          setSelectedColOrBatchId("");
                        }}
                        className={`py-2 px-3 border text-center text-xs font-bold uppercase tracking-wider transition-colors ${replaceTargetType === "college" ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground"}`}
                      >
                        Entire College
                      </button>
                    </div>
                  </div>

                  {/* Select target college/batch of current trainer */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase font-bold">
                      {replaceTargetType === "batch" ? "Select Assigned Batch" : "Select Assigned College"}
                    </label>
                    <select
                      className="bg-transparent border border-border text-foreground text-xs p-2 h-10 w-full rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      value={selectedColOrBatchId}
                      onChange={e => setSelectedColOrBatchId(e.target.value)}
                      required
                    >
                      <option value="" className="text-black bg-foreground">-- Select Element To Relinquish --</option>
                      
                      {replaceTargetType === "batch" ? (
                        mockBatches
                          .filter(batch => (currentTrainerFull.assignedBatches || []).includes(batch.id))
                          .map(batch => (
                            <option key={batch.id} value={batch.id} className="text-black bg-foreground">
                              {batch.name} ({batch.studentCount} students)
                            </option>
                          ))
                      ) : (
                        mockColleges
                          .filter(college => (currentTrainerFull.assignedColleges || []).includes(college.id))
                          .map(college => (
                            <option key={college.id} value={college.id} className="text-black bg-foreground">
                              {college.name} ({college.code})
                            </option>
                          ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {/* Swap Target Trainer */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase font-bold">New Subsitute Trainer</label>
                    <select
                      className="bg-transparent border border-border text-foreground text-xs p-2 h-10 w-full rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      value={newTrainerId}
                      onChange={e => setNewTrainerId(e.target.value)}
                      required
                    >
                      <option value="" className="text-black bg-foreground">-- Select Transferee Trainer --</option>
                      {otherActiveTrainers.map(oth => (
                        <option key={oth.id} value={oth.id} className="text-black bg-foreground">
                          {oth.name} ({oth.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Transfer setting */}
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-3 cursor-pointer p-2 border border-border/50 bg-white/[0.01] rounded hover:bg-white/[0.03] transition-colors h-10">
                      <input 
                        type="checkbox" 
                        checked={transferProgress} 
                        onChange={e => setTransferProgress(e.target.checked)} 
                        className="w-4 h-4 rounded text-primary focus:ring-primary border-border/80 bg-transparent"
                      />
                      <span className="text-xs font-mono text-foreground/80">Transfer Student Progress & Statistics Logs</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button 
                    type="submit" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold uppercase tracking-wider text-xs gap-2 px-6"
                  >
                    Confirm Replacement Hot-Swap <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: REPLACEMENT LOGS HISTORY */}
          {activeTab === "history" && (
            <div className="p-6 flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Active Handover Log Records
              </h3>
              
              {replacementLogs.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground/80 font-mono text-xs border border-border/50 bg-card rounded">
                  No replacement records found.
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto">
                  {replacementLogs.map(log => (
                    <div key={log.id} className="border border-border p-3 bg-white/[0.02] rounded-lg text-xs leading-relaxed font-mono">
                      <div className="flex justify-between items-start mb-1.5 pb-1.5 border-b border-border/50">
                        <span className="font-bold text-primary uppercase text-[10px]">
                          {log.batchId ? "Batch Handover" : "College Handover"}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">
                          {new Date(log.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>
                          Scope: <strong className="text-foreground">{log.batchName || log.collegeName}</strong>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80 mt-1">
                          <span className="text-red-400">{log.oldTrainerName}</span>
                          <span className="text-muted-foreground/80">→</span>
                          <span className="text-green-400">{log.newTrainerName}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground/80 mt-1 flex justify-between">
                          <span>Progress Transferred: {log.transferProgress ? "YES" : "NO"}</span>
                          <span className="text-green-500 uppercase font-black">● {log.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border flex justify-between gap-3 bg-card">
          <span className="text-[10px] text-muted-foreground/60 font-mono self-center">
            * Changes instantly reflect in simulation state.
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground text-xs uppercase tracking-wider font-mono">
              Close Hub
            </Button>
            {activeTab === "assignments" && (
              <Button onClick={handleSaveAssignments} className="bg-primary text-black hover:bg-primary/90 font-bold text-xs uppercase tracking-wider font-mono">
                Save Assignments
              </Button>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};
