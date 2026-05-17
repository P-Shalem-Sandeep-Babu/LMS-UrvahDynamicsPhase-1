import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "../../components/ui/input";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/30">
           <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter italic mb-2">Matrix Restored</h2>
          <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-8">
            Your access credentials have been successfully updated.
          </p>
        </div>
        <button 
          onClick={() => navigate("/auth/login")}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all"
        >
          Return to Gateway
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
         <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">New Protocol</h2>
         <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Establish a new secure password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">New Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">Confirm Sequence</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-[10px] text-red-500 font-mono uppercase tracking-widest mt-1">Sequences do not match</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !password || password !== confirmPassword || password.length < 8}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Committing...</>
          ) : (
            <>Commit Changes</>
          )}
        </button>
      </form>
    </div>
  );
};
