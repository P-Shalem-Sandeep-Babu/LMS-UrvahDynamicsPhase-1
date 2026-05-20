import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ElementType;
}

export const LMSInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon: Icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">{label}</label>}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/80">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "flex h-10 w-full bg-card border border-border px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              Icon && "pl-10",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-[10px] font-mono text-red-500">{error}</span>}
      </div>
    );
  }
);
LMSInput.displayName = "LMSInput";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const LMSTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[80px] w-full bg-card border border-border px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-[10px] font-mono text-red-500">{error}</span>}
      </div>
    );
  }
);
LMSTextarea.displayName = "LMSTextarea";
