import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { CollegeDomain } from "../../../types/domain";

interface DeleteDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: CollegeDomain | null;
  onDelete: (domainId: string) => void;
}

export const DeleteDomainModal = ({ isOpen, onClose, domain, onDelete }: DeleteDomainModalProps) => {
  if (!domain) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-red-500/20 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-widest text-red-500">Delete Domain Mapping</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs font-mono pt-4">
            Are you sure you want to delete the mapping for <span className="font-bold text-foreground">{domain.domain}</span>? This action cannot be undone and will prevent new users from this domain from being auto-mapped.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-foreground/5">
            Cancel
          </Button>
          <Button type="button" onClick={() => onDelete(domain.id)} className="bg-red-500 text-foreground font-bold uppercase tracking-wider hover:bg-red-600">
            Delete Mapping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
