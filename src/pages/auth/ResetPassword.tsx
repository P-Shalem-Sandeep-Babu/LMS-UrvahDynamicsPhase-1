import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Input } from "../../components/ui/input";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const tokenVal = searchParams.get("token") || "";

  const [token, setToken] = useState(tokenVal);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load token from url search parameter if changed
  useEffect(() => {
    if (tokenVal) {
      setToken(tokenVal);
    }
  }, [tokenVal]);

  // Passphrase strength parameters
  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_]/.test(password)
  };

  const strengthCount = Object.values(checks).filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0) return { text: "Protocol Pending", color: "text-muted-foreground/60", barColor: "bg-foreground/10" };
    if (strengthCount <= 1) return { text: "CRITICAL UNSURE STATE", color: "text-red-500", barColor: "bg-red-500/50" };
    if (strengthCount <= 3) return { text: "MODERATE STATE", color: "text-yellow-500", barColor: "bg-yellow-500/60" };
    return { text: "STANDARDIZED INTEGRITY SECURED", color: "text-green-500", barColor: "bg-primary" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("RESET ABORTED: SECURE RESET SECURITY DISPATCH KEY EXPIRED OR NULL.");
      return;
    }

    if (strengthCount < 4) {
      setError("CREATION DISMISSED: PASSCODE DOES NOT PASS ALGORITHM COMPLEXITY BULLETS.");
      return;
    }

    if (password !== confirmPassword) {
      setError("PASSPHRASE CHECK FAILED: MISMATCH IDENTIFIED.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
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
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
            Your access credentials have been successfully updated in database registries.
          </p>
        </div>
        <button 
          onClick={() => navigate("/auth/login")}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-foreground transition-all font-mono"
        >
          Return to Gateway
        </button>
      </motion.div>
    );
  }

  const sLabelInfo = getStrengthLabel();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
         <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">New Protocol</h2>
         <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Establish a new secure password.</p>
      </div>

      {token ? (
        <div className="p-3 bg-primary/5 border border-primary/20 flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">Recovery Token Ready: {token.substring(0, 24)}...</span>
        </div>
      ) : (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-2 text-[10px] font-mono text-yellow-500 uppercase tracking-wider leading-relaxed">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span>No security token linked.</span>
            <p className="text-muted-foreground/80 mt-1">Please provide a custom token value below to continue authorization.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest leading-relaxed">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!tokenVal && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Secure Reset Token</label>
              <Input 
                type="text" 
                placeholder="Paste temporary sandbox token here..." 
                className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">New Password</label>
              <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ${sLabelInfo.color}`}>
                {sLabelInfo.text}
              </span>
            </div>
            
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Micro component progress strength bars */}
            <div className="w-full h-1 bg-foreground/5 overflow-hidden flex gap-1 mt-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`h-full flex-1 transition-all duration-300 ${
                    step <= strengthCount ? sLabelInfo.barColor : "bg-foreground/10"
                  }`}
                />
              ))}
            </div>

            {/* Conditions indicators list */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2">
              {[
                { checked: checks.length, label: "MINIMUM 8 CHARACTERS" },
                { checked: checks.hasUpper, label: "CAPITAL LETTER INJECTED" },
                { checked: checks.hasNumber, label: "CHIP NUMERICAL KEY" },
                { checked: checks.hasSpecial, label: "SPECIAL MATH GLYPH" },
              ].map((rule, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    rule.checked ? "bg-green-500" : "bg-foreground/20"
                  }`} />
                  <span className={rule.checked ? "text-foreground/80" : "text-muted-foreground/60"}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Confirm Sequence</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
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
          disabled={isLoading || !token.trim() || !password || password !== confirmPassword || strengthCount < 4}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Committing Passphrase...</>
          ) : (
            <>Commit Matrix Reset</>
          )}
        </button>
      </form>
    </div>
  );
};
