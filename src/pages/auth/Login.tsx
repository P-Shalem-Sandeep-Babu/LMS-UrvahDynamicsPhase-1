import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ArrowRight, ShieldCheck, Github, Globe, Sparkles, X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../../components/ui/input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Interactive SSO simulation
  const [ssoType, setSsoType] = useState<"GitHub" | "Google" | null>(null);
  const [ssoStage, setSsoStage] = useState<"connecting" | "select-identity" | "redirecting">("connecting");
  
  const navigate = useNavigate();
  const { switchRole } = useAuth(); // Using mock auth

  // Email format frontend validation regex
  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Frontend validation checks
    if (!validateEmail(email)) {
      setError("ENTER VALID EMAIL MATRIX ADDRESS (e.g., user@urvah.edu)");
      return;
    }

    if (password.length < 6) {
      setError("PASSPHRASE MUST EXCEED 5 CHARACTER BOUNDS");
      return;
    }

    setIsLoading(true);

    // Mock login delay
    setTimeout(() => {
      let role: any = null;
      let targetPath = "/dashboard";
      const normalizedEmail = email.toLowerCase().trim();

      if (normalizedEmail === "admin@gmail.com" && password === "adminpass123") {
        role = "admin";
      } else if (normalizedEmail === "trainer@gmail.com" && password === "trainerpass123") {
        role = "trainer";
      } else if (normalizedEmail === "faculty@gmail.com" && password === "facultypass123") {
        role = "faculty";
      } else if (normalizedEmail === "student@gmail.com" && password === "studentpass123") {
        role = "student";
      }

      if (role) {
        // Mock successful login
        switchRole(role); 
        navigate(targetPath);
      } else {
        setError("AUTHENTICATION TERMINATED: INVALID NODE CREDENTIALS SEQUENCE.");
      }
      setIsLoading(false);
    }, 1200);
  };

  // Triggers interactive SSO flow in a popup overlay
  const handleSsoClick = (identityProvider: "Google" | "GitHub") => {
    setSsoType(identityProvider);
    setSsoStage("connecting");
    
    // Simulate connection delay before profile select
    setTimeout(() => {
      setSsoStage("select-identity");
    }, 1200);
  };

  // Perform interactive Google/GitHub proxy login linking to selected identity
  const handleSelectSsoIdentity = (role: "admin" | "student" | "faculty" | "trainer") => {
    setSsoStage("redirecting");
    
    setTimeout(() => {
      switchRole(role);
      
      // Role-aware redirect paths
      let destination = "/dashboard";
      
      navigate(destination);
      setSsoType(null); // Clear overlay
    }, 1200);
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Initialize Session</h2>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Provide credentials to access your dashboard.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-widest leading-relaxed"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Secure Password</label>
              <Link to="/auth/forgot-password" className="text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors font-bold">
                Forgot Matrix?
              </Link>
            </div>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
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
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
          <span className="bg-background px-4 text-muted-foreground">Or authenticate via</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleSsoClick("GitHub")}
          className="flex items-center justify-center gap-2 h-10 bg-foreground/5 border border-border text-text-xs font-bold uppercase tracking-widest hover:bg-foreground/10 transition-colors py-2"
        >
          <Github className="w-4 h-4 text-foreground" /> GitHub
        </button>
        <button 
          onClick={() => handleSsoClick("Google")}
          className="flex items-center justify-center gap-2 h-10 bg-foreground/5 border border-border text-text-xs font-bold uppercase tracking-widest hover:bg-foreground/10 transition-colors py-2"
        >
          <Globe className="w-4 h-4 text-primary" /> Google
        </button>
      </div>

      <p className="text-center text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest mt-8">
        This account must be created through an admin invitation.
      </p>

      {/* Reusable Visual Modal Overlay for SSO authentication placeholder */}
      <AnimatePresence>
        {ssoType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-card border border-border p-6 space-y-6 relative"
            >
              <button 
                onClick={() => setSsoType(null)} 
                className="absolute top-4 right-4 text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {ssoStage === "connecting" && (
                <div className="text-center py-8 space-y-4">
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin absolute" />
                    {ssoType === "Google" ? <Globe className="w-6 h-6 text-primary" /> : <Github className="w-6 h-6 text-foreground" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest italic text-foreground mb-2">SSO Secure Connection</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      Establishing handshake with {ssoType} core network nodes...
                    </p>
                  </div>
                </div>
              )}

              {ssoStage === "select-identity" && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-green-500 italic">Auth Token Acquired</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
                      Choose connected Identity profile to bridge link:
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      { role: "admin", name: "Sarah Connor (Security Admin)", email: "admin@gmail.com", desc: "Access full operations & audit controls" },
                      { role: "student", name: "Alex Johnson (Elite Learner)", email: "student@gmail.com", desc: "Interact with AI mentors & contest IDE" },
                      { role: "faculty", name: "Dr. Emily Chen (College Lead)", email: "faculty@gmail.com", desc: "Manage courses, batches & assessments" },
                      { role: "trainer", name: "Marcus Wright (Code Master)", email: "trainer@gmail.com", desc: "Develop algorithm problems & supervise" }
                    ].map((prof) => (
                      <button
                        key={prof.role}
                        onClick={() => handleSelectSsoIdentity(prof.role as any)}
                        className="w-full text-left p-3 bg-foreground/5 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all font-mono group"
                      >
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{prof.name}</span>
                          <span className="text-[8px] uppercase tracking-widest px-1 bg-foreground/10 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary">{prof.role}</span>
                        </div>
                        <p className="text-[9px] text-muted-foreground/80 mt-1">{prof.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {ssoStage === "redirecting" && (
                <div className="text-center py-8 space-y-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest italic text-foreground mb-2">Linking Node Routing</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
                      Preparing personalized console environment...
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
