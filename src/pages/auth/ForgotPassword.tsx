import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, Mail, ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { Input } from "../../components/ui/input";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("ENTER VALID SECURE EMAIL SUITE ADDRESS");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Matrix Recovery</h2>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Enter your email to receive recovery instructions.</p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Email Address</label>
            <Input 
              type="email" 
              placeholder="user@urvah.edu" 
              className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-foreground text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Dispatching...</>
            ) : (
              <>Send Recovery Protocol <Mail className="w-4 h-4" /></>
            )}
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-green-500/30 bg-green-500/5 p-6 text-center space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
             <Mail className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-green-500">Signal Dispatched</h3>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            If an account connects for <span className="text-foreground font-bold">{email}</span>, you will receive a security reset link shortly.
          </p>

          {/* Interactive Simulation Sandbox to test Reset Password Page directly easily */}
          <div className="pt-4 border-t border-border mt-6 text-left space-y-3">
            <span className="text-[9px] font-mono font-black text-primary uppercase tracking-widest block">
              Sandbox Dispatch Emulator
            </span>
            <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-mono">
              In this preview container sandbox, follow the generated email-reset link below to restyle credentials:
            </p>
            <Link 
              to={`/auth/reset-password?token=sandbox-reset-token-for-${encodeURIComponent(email)}`}
              className="flex items-center justify-between p-3 bg-white/[0.03] hover:bg-primary/10 border border-border hover:border-primary/30 rounded-none font-mono text-[10px] text-foreground hover:text-primary transition-all group"
            >
              <span className="truncate pr-2">Verify Reset: token=sandbox-reset-{email.split("@")[0]}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground/80 group-hover:text-primary group-hover:translate-x-1 shrink-0 transition-all" />
            </Link>
          </div>
        </motion.div>
      )}

      <div className="text-center pt-4">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest hover:text-foreground transition-colors">
          <ArrowLeft className="w-3 h-3" /> Abort and Return
        </Link>
      </div>
    </div>
  );
};
