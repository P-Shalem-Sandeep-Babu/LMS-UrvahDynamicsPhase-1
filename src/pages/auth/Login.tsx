import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../../components/ui/input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { switchRole } = useAuth(); // Using mock auth

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mock login delay
    setTimeout(() => {
      let role: any = null;
      if (email.toLowerCase() === "admin@gmail.com" && password === "adminpass123") role = "admin";
      else if (email.toLowerCase() === "trainer@gmail.com" && password === "trainerpass123") role = "trainer";
      else if (email.toLowerCase() === "faculty@gmail.com" && password === "facultypass123") role = "faculty";
      else if (email.toLowerCase() === "student@gmail.com" && password === "studentpass123") role = "student";

      if (role) {
        // Mock successful login
        switchRole(role); 
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Initialize Session</h2>
        <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Provide credentials to access your dashboard.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">Secure Password</label>
              <Link to="/auth/forgot-password" className="text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors font-bold">
                Forgot Matrix?
              </Link>
            </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
          ) : (
            <>Establish Connection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
          <span className="bg-[#050505] px-4 text-white/50">Or authenticate via</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 h-10 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
           GitHub
        </button>
        <button className="flex items-center justify-center gap-2 h-10 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
           Google
        </button>
      </div>

      <p className="text-center text-[10px] font-mono text-white/40 uppercase tracking-widest mt-8">
        New to the network? <Link to="/auth/signup" className="text-white hover:text-primary transition-colors font-bold border-b border-white/20 pb-0.5 ml-1">Request Access</Link>
      </p>
    </div>
  );
};
