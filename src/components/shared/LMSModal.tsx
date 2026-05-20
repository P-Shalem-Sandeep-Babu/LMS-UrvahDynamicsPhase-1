import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface LMSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export const LMSModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = "sm:max-w-md",
}: LMSModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidth} bg-card border-border glass-panel rounded-none shadow-2xl overflow-hidden p-0 gap-0`}>
        <DialogHeader className="p-6 border-b border-border/50 bg-white/[0.02]">
          <DialogTitle className="text-lg font-bold uppercase tracking-widest text-foreground italic">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
        {footer && (
          <div className="p-6 border-t border-border/50 bg-white/[0.01] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
