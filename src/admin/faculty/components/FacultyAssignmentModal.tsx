import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Faculty } from "../../../types/faculty";
import { Link2, Unlink, Globe, Settings, ShieldAlert, CheckCircle, RefreshCw, Layers } from "lucide-react";
import { mockColleges } from "../../../data/mockColleges";
import { mockBatches } from "../../../data/mockBatches";
import { 
  getStoredFaculty, 
  saveStoredFaculty, 
  generateDomainMappingProposals, 
  applyDomainBasedMapping, 
  resetToManualAssignment,
  DomainMappingProposal
} from "../../../services/facultyService";

interface FacultyAssignmentModalProps {
  faculty: Faculty | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const FacultyAssignmentModal: React.FC<FacultyAssignmentModalProps> = ({ 
  faculty, 
  isOpen, 
  onClose,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<"manual" | "domain">("manual");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [proposals, setProposals] = useState<DomainMappingProposal[]>([]);
  const [mappingSuccess, setMappingSuccess] = useState("");

  useEffect(() => {
    if (faculty && isOpen) {
      // Refresh current faculty state from local storage directory
      const allFaculty = getStoredFaculty();
      const current = allFaculty.find(f => f.id === faculty.id) || faculty;
      
      setSelectedColleges(current.assignedColleges || []);
      setSelectedBatches(current.assignedBatches || []);
      setProposals(generateDomainMappingProposals(current));
      setMappingSuccess("");
    }
  }, [faculty, isOpen]);

  if (!faculty) return null;

  const handleSaveManualAssignment = () => {
    const updated = resetToManualAssignment(faculty.id, selectedColleges, selectedBatches);
    if (updated) {
      setMappingSuccess("Manual assignment overrides saved successfully!");
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleApplyDomainMapping = () => {
    const updated = applyDomainBasedMapping(faculty.id);
    if (updated) {
      setSelectedColleges(updated.assignedColleges || []);
      setSelectedBatches(updated.assignedBatches || []);
      setProposals(generateDomainMappingProposals(updated));
      setMappingSuccess("Domain-based mapping synchronized! Colleges and active batches aligned automatically.");
      if (onSuccess) onSuccess();
    }
  };

  const emailDomain = faculty.email.split("@")[1] || "N/A";
  const matchedCount = proposals.filter(p => p.matchesFacultyEmail).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] bg-card border border-border text-foreground p-0 overflow-hidden">
        
        {/* Head Bar */}
        <div className="p-6 border-b border-border bg-white/[0.01]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Faculty Workspace Assignment Portal
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-mono text-xs mt-1.5 flex items-center gap-4">
              <span>Faculty: <strong className="text-foreground">{faculty.name}</strong></span>
              <span>•</span>
              <span>Dept: <code className="text-primary">{faculty.department}</code></span>
              <span>•</span>
              <span>Domain: <strong className="text-yellow-400 font-bold">@{emailDomain}</strong></span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-border bg-background">
          <button 
            onClick={() => setActiveTab("manual")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${activeTab === "manual" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <Settings className="w-4 h-4" /> Manual Assignment Override
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("domain")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${activeTab === "domain" ? "border-primary text-primary bg-white/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <Globe className="w-4 h-4" /> Domain-Based Automated Mapping
          </button>
        </div>

        {/* Action feedback banner */}
        {mappingSuccess && (
          <div className="bg-green-500/15 border-b border-green-500/20 text-green-400 text-xs p-3 font-mono flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-green-500" /> {mappingSuccess}
          </div>
        )}

        {/* body pane */}
        <div className="min-h-[350px] max-h-[450px] overflow-y-auto">
          
          {/* TAB 1: MANUAL OVERRIDE */}
          {activeTab === "manual" && (
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              {/* Colleges Selection Panel */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold uppercase tracking-wider text-xs font-mono text-white/55">
                    Assigned Colleges ({selectedColleges.length})
                  </h3>
                </div>
                
                <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
                  {mockColleges.map(college => {
                    const isAssigned = selectedColleges.includes(college.id);
                    return (
                      <div key={college.id} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${isAssigned ? 'bg-primary/5 border-primary/20' : 'bg-card border-border/50'}`}>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-foreground">{college.name}</span>
                          <span className="text-[9px] text-muted-foreground/80 font-mono uppercase tracking-widest">Domain: {college.emailDomain || "N/A"}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`h-7 uppercase text-[9px] tracking-wider font-extrabold ${isAssigned ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-primary hover:text-primary hover:bg-primary/10'}`}
                          onClick={() => {
                            setSelectedColleges(prev => {
                              if (isAssigned) {
                                const collegeId = college.id;
                                const remainColleges = prev.filter(c => c !== collegeId);
                                const collegeBatches = mockBatches.filter(b => b.collegeId === collegeId).map(b => b.id);
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

              {/* Batches Selection Panel */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-extrabold uppercase tracking-wider text-xs font-mono text-white/55">
                  Assigned Batches ({selectedBatches.length})
                </h3>
                
                {selectedColleges.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                    <ShieldAlert className="w-8 h-8 text-white/20 mb-2" />
                    <span className="text-[11px] text-muted-foreground/80 font-mono leading-relaxed">Select colleges in the manual override segment to allocate custom batch monitors.</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
                    {mockBatches
                      .filter(batch => selectedColleges.includes(batch.collegeId))
                      .map(batch => {
                        const isAssigned = selectedBatches.includes(batch.id);
                        return (
                          <div key={batch.id} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${isAssigned ? 'bg-primary/5 border-primary/20' : 'bg-card border-border/50'}`}>
                            <div className="flex flex-col">
                              <span className="font-bold text-xs text-foreground">{batch.name}</span>
                              <span className="text-[9px] text-muted-foreground/80 font-mono">
                                {mockColleges.find(c => c.id === batch.collegeId)?.name}
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`h-7 uppercase text-[9px] tracking-wider font-extrabold ${isAssigned ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-primary hover:text-primary hover:bg-primary/10'}`}
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

          {/* TAB 2: DOMAIN-BASED SHIELD */}
          {activeTab === "domain" && (
            <div className="p-6 flex flex-col gap-4">
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 flex gap-3 text-primary">
                <Globe className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                <div className="text-xs flex flex-col gap-1 leading-relaxed text-foreground">
                  <span className="font-black text-primary uppercase font-mono tracking-wider">Domain Mapping Intelligence</span>
                  <span>Aligns colleges with shared domain extensions directly. The faculty member's email domain <strong className="text-primary">@{emailDomain}</strong> is mapped against existing institutes.</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#0d0d0d] p-3 rounded border border-border/50 font-mono text-xs">
                <span className="text-muted-foreground">Faculty Corporate Domain:</span>
                <span className="font-black text-primary uppercase tracking-widest">@{emailDomain}</span>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                <h4 className="font-bold uppercase tracking-wider text-xs font-mono text-muted-foreground mb-1">Domain Matches available in directory</h4>
                
                {proposals.map(prop => (
                  <div key={prop.collegeId} className={`border p-3.5 rounded-lg flex justify-between items-center transition-all ${prop.matchesFacultyEmail ? 'bg-primary/[0.03] border-primary/30' : 'bg-card border-border/50 opacity-55'}`}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-foreground">{prop.collegeName}</span>
                        {prop.matchesFacultyEmail && (
                          <span className="text-[8px] bg-primary/10 text-primary border border-primary/20 uppercase font-mono tracking-widest font-black px-1.5 py-0.5 rounded">
                            Identified Match
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground/80 font-mono">Matches Domain: <strong className="text-foreground">{prop.collegeDomain}</strong></span>
                    </div>

                    <div className="text-right">
                      {prop.status === "assigned" ? (
                        <span className="text-[11px] font-mono text-green-400 font-bold uppercase flex items-center gap-1">
                          ● Managed
                        </span>
                      ) : prop.matchesFacultyEmail ? (
                        <span className="text-[11px] font-mono text-primary font-bold uppercase flex items-center gap-1">
                          ● Synced Queue
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-muted-foreground/60 font-bold uppercase">
                          No Match
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {matchedCount > 0 && (
                <div className="flex justify-end mt-4 pt-4 border-t border-border/50">
                  <Button 
                    onClick={handleApplyDomainMapping}
                    className="bg-primary text-black font-extrabold uppercase text-xs tracking-wider font-mono gap-1.5 h-10 px-6 rounded-md hover:bg-primary/90"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" /> Synchronize All Matches ({matchedCount})
                  </Button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Foot Buttons */}
        <div className="p-6 border-t border-border flex justify-between gap-3 bg-card">
          <span className="text-[10px] text-muted-foreground/60 font-mono self-center">
            * Changes instantly propagate to student records.
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground text-xs uppercase tracking-wider font-mono">
              Close Portal
            </Button>
            {activeTab === "manual" && (
              <Button onClick={handleSaveManualAssignment} className="bg-primary text-black hover:bg-primary/95 font-bold text-xs uppercase tracking-wider font-mono px-5">
                Save Manual Override
              </Button>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};
