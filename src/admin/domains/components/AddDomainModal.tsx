import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { mockColleges } from "../../../data/mockColleges";

interface AddDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (domain: string, collegeId: string) => void;
}

export const AddDomainModal = ({ isOpen, onClose, onAdd }: AddDomainModalProps) => {
  const [domain, setDomain] = useState("");
  const [collegeId, setCollegeId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain && collegeId) {
      onAdd(domain, collegeId);
      setDomain("");
      setCollegeId("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-widest text-primary">Add Domain Mapping</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Domain Name</label>
            <Input 
              placeholder="e.g. urvah.edu" 
              value={domain} 
              onChange={(e) => setDomain(e.target.value)}
              className="bg-foreground/5 border-border text-foreground focus-visible:ring-primary/50 rounded-none font-mono"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Linked College</label>
            <select 
              value={collegeId} 
              onChange={(e) => setCollegeId(e.target.value)}
              className="w-full flex h-10 w-full items-center justify-between border border-border bg-foreground/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none font-mono"
              required
            >
              <option value="" disabled className="text-black">Select a college...</option>
              {mockColleges.map(c => (
                <option key={c.id} value={c.id} className="text-black">{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-foreground/5">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-black font-bold uppercase tracking-wider">
              Add Domain
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
