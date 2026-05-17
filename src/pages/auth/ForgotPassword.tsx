import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Input } from "../../components/ui/input";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Matrix Recovery</h2>
        <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Enter your email to receive recovery instructions.</p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">Email Address</label>
            <Input 
              type="email" 
              placeholder="user@urvah.edu" 
              className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-white text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:shadow-[0_0_20px_rgba(242,125,38,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Dispathing...</>
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
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
             <Mail className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-green-500">Signal Dispatched</h3>
          <p className="text-xs font-mono text-white/50">
            If an account exists for {email}, you will receive a reset link shortly.
          </p>
        </motion.div>
      )}

      <div className="text-center pt-4">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-white transition-colors">
          <ArrowLeft className="w-3 h-3" /> Abort and Return
        </Link>
      </div>
    </div>
  );
};
