import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, ArrowRight } from "lucide-react";
import { Input } from "../../components/ui/input";

export const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent pasting multiple chars in one go here (simplify)
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/auth/reset-password"); // After OTP, let them reset
      }, 1500);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Access Code</h2>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
          Enter the 6-digit cryptographic sequence sent to your device.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex gap-2 justify-between">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 bg-foreground/5 border border-border text-center text-xl font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          ))}
        </div>

        <button 
          type="submit" 
          disabled={isLoading || otp.join('').length < 6}
          className="w-full h-12 bg-foreground text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
          ) : (
            <>Verify Sequence <ArrowRight className="w-4 h-4 group-hover:translate-x-1" /></>
          )}
        </button>
      </form>
    </div>
  );
};
