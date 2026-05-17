import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, ArrowRight, Check } from "lucide-react";
import { Input } from "../../components/ui/input";

export const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength logic
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };
  const strength = calculateStrength(formData.password);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/auth/verify-email");
      }, 1500);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Request Access</h2>
        <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Register for the Urvah Dynamics platform.</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        <div className={`h-1 flex-1 ${step >= 1 ? 'bg-primary' : 'bg-white/10'} transition-colors`} />
        <div className={`h-1 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-white/10'} transition-colors`} />
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">Full Identity</label>
              <Input 
                type="text" 
                placeholder="John Doe" 
                className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">Email Address</label>
              <Input 
                type="email" 
                placeholder="john@example.com" 
                className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">Secure Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {/* Password Strength Meter */}
            <div className="space-y-2 pt-2">
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map(level => (
                  <div 
                    key={level} 
                    className={`flex-1 ${
                      strength >= level 
                        ? level <= 2 ? 'bg-yellow-500' : level === 3 ? 'bg-primary' : 'bg-green-500'
                        : 'bg-white/10'
                    } transition-colors`}
                  />
                ))}
              </div>
              <p className="text-[10px] font-mono text-white/40 uppercase text-right">
                {strength === 0 && 'Awaiting Input'}
                {strength > 0 && strength <= 2 && 'Weak Encryption'}
                {strength === 3 && 'Standard Encryption'}
                {strength === 4 && 'Maximum Encryption'}
              </p>
            </div>
          </motion.div>
        )}

        <button 
          type="submit" 
          disabled={isLoading || (step === 2 && strength < 2)}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          ) : step === 1 ? (
            <>Next Phase <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
          ) : (
            <>Initialize Account <Check className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="text-center text-[10px] font-mono text-white/40 uppercase tracking-widest mt-8">
        Already have access? <Link to="/auth/login" className="text-white hover:text-primary transition-colors font-bold border-b border-white/20 pb-0.5 ml-1">Authenticate</Link>
      </p>
    </div>
  );
};
