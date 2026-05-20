import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { mockColleges } from "../../../data/mockColleges";
import { CollegeDomain } from "../../../types/domain";

interface EditDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: CollegeDomain | null;
  onEdit: (domainId: string, domainName: string, collegeId: string, status: "active"|"inactive") => void;
}

export const EditDomainModal = ({ isOpen, onClose, domain, onEdit }: EditDomainModalProps) => {
  const [domainName, setDomainName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [status, setStatus] = useState<"active"|"inactive">("active");

  useEffect(() => {
    if (domain) {
      setDomainName(domain.domain);
      setCollegeId(domain.collegeId);
      setStatus(domain.status);
    }
  }, [domain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain && domainName && collegeId) {
      onEdit(domain.id, domainName, collegeId, status);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-widest text-primary">Edit Domain Mapping</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Domain Name</label>
            <Input 
              placeholder="e.g. urvah.edu" 
              value={domainName} 
              onChange={(e) => setDomainName(e.target.value)}
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
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value as "active"|"inactive")}
              className="w-full flex h-10 w-full items-center justify-between border border-border bg-foreground/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none font-mono"
              required
            >
              <option value="active" className="text-black">Active</option>
              <option value="inactive" className="text-black">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-foreground/5">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-black font-bold uppercase tracking-wider">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
