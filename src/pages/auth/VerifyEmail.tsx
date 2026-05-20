import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export const VerifyEmail = () => {
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="space-y-8 text-center flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 relative"
      >
         <div className="absolute top-0 right-0 w-2 h-2 bg-primary animate-ping" />
         <span className="text-3xl font-black text-primary">@</span>
      </motion.div>

      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Verify Identity</h2>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
          We've sent a verification protocol to your email. Please click the link to activate your access.
        </p>
      </div>

      <div className="w-full max-w-xs border border-border bg-foreground/5 p-4 mt-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 mb-2">Didn't receive it?</p>
        <button 
          disabled={countdown > 0}
          className="w-full py-2 bg-foreground/10 text-[10px] font-mono uppercase text-foreground hover:bg-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {countdown > 0 ? `Resend available in ${countdown}s` : "Resend Protocol"}
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-border w-full">
         <button 
           onClick={() => navigate("/auth/login")} // Mock advance
           className="text-[10px] font-mono text-muted-foreground/60 hover:text-foreground uppercase tracking-widest underline decoration-white/20 underline-offset-4"
         >
           [Dev Only: Simulate Email Verification & Continue]
         </button>
      </div>
    </div>
  );
};
