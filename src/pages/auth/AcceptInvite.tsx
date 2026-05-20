import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ArrowRight, CheckCircle2, XCircle, Key, ShieldCheck, Ticket } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../context/AuthContext";

export const AcceptInvite = () => {
  const { token: urlToken } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  
  const [token, setToken] = useState(urlToken || "");
  const [status, setStatus] = useState<"idle" | "verifying" | "valid" | "invalid" | "expired" | "success">("idle");
  const [roleAssigned, setRoleAssigned] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation rules
  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_]/.test(password)
  };

  const strengthCount = Object.values(checks).filter(Boolean).length;
  
  const getStrengthLabel = () => {
    if (password.length === 0) return { text: "No Password Specified", color: "text-muted-foreground/60", barColor: "bg-foreground/10" };
    if (strengthCount <= 1) return { text: "CRITICAL WEAKNESS", color: "text-red-500", barColor: "bg-red-500/50" };
    if (strengthCount <= 3) return { text: "MODERATE INTEGRITY", color: "text-yellow-500", barColor: "bg-yellow-500/60" };
    return { text: "STANDARDIZED SECURE PROTOCOL", color: "text-green-500", barColor: "bg-primary" };
  };

  const verifyToken = async (tokenToVerify: string) => {
    if (!tokenToVerify) {
      setStatus("idle");
      return;
    }
    
    setStatus("verifying");
    setError("");
    
    // Simulate server-side verification delay
    await new Promise(res => setTimeout(res, 1200));
    
    if (tokenToVerify === "mock-expired-token") {
      setStatus("expired");
      return;
    }
    
    if (tokenToVerify === "mock-invalid-token") {
      setStatus("invalid");
      return;
    }
    
    // Valid mock tokens
    const mockTokens: Record<string, { email: string, role: string }> = {
      "invite-student-123": { email: "newstudent@urvah.edu", role: "student" },
      "invite-faculty-123": { email: "newfaculty@urvah.edu", role: "faculty" },
      "invite-trainer-123": { email: "newtrainer@urvah.edu", role: "trainer" },
      "invite-admin-123": { email: "newadmin@urvah.edu", role: "admin" }
    };

    const invite = mockTokens[tokenToVerify];
    if (invite) {
      setRoleAssigned(invite.role);
      setEmail(invite.email);
      setStatus("valid");
    } else {
      // Allow dynamic custom tokens generated via Admin invites panel if they are not specifically invalid
      // Let's grab invite tokens stored in localStorage to make them function globally across multiple client frames!
      try {
        const storedInvitesRaw = localStorage.getItem("urvah_invite_tokens");
        if (storedInvitesRaw) {
          const stored = JSON.parse(storedInvitesRaw);
          const matched = stored.find((item: any) => item.token === tokenToVerify);
          if (matched) {
            if (matched.status === "expired") {
              setStatus("expired");
              return;
            }
            setRoleAssigned(matched.role);
            setEmail(matched.email);
            setStatus("valid");
            return;
          }
        }
      } catch (err) {
        console.error("Local storage token extraction failed", err);
      }

      // Default fallback
      setRoleAssigned("student");
      setEmail("invited.user@urvah.edu");
      setStatus("valid");
    }
  };

  // Auto verify if token is present in url on load
  useEffect(() => {
    if (urlToken) {
      verifyToken(urlToken);
    } else {
      setStatus("idle");
    }
  }, [urlToken]);

  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Please key in a valid invitation code");
      return;
    }
    verifyToken(token.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Final security checks
    if (!checks.length || !checks.hasUpper || !checks.hasNumber || !checks.hasSpecial) {
      setError("Password fails to meet core system requirements.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Entered password sequences do not match.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate account configuration sequence
      await new Promise(res => setTimeout(res, 1800));
      
      // Mark token as accepted in simulated storage
      try {
        const storedInvitesRaw = localStorage.getItem("urvah_invite_tokens");
        if (storedInvitesRaw) {
          const stored = JSON.parse(storedInvitesRaw);
          const updated = stored.map((item: any) => 
            item.token === token ? { ...item, status: "accepted" } : item
          );
          localStorage.setItem("urvah_invite_tokens", JSON.stringify(updated));
        }
      } catch (err) {
        console.error(err);
      }

      setStatus("success");
    } catch (err) {
      setError("Network fault during provisioning. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    switchRole(roleAssigned as any);
    navigate("/dashboard");
  };

  if (status === "verifying") {
    return (
      <div className="space-y-6 text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest mb-2 font-mono">Verifying Invitation</h2>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Running cryptographic verification handshake...</p>
        </div>
      </div>
    );
  }

  if (status === "invalid" || status === "expired") {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black uppercase tracking-widest text-red-500 mb-2">
            {status === "expired" ? "Invitation Expired" : "Invalid Token"}
          </h2>
          <p className="text-xs font-mono text-center text-muted-foreground mb-6 leading-relaxed">
            {status === "expired" 
              ? "This secure invitation node has lapsed its lifetime boundary. Ask your administrator to dispatch a new signal." 
              : "This credential token is unknown to our gateway registry, or has already terminated."}
          </p>
          <div className="flex flex-col gap-3 justify-center">
            <button 
              onClick={() => {
                setToken("");
                setStatus("idle");
              }}
              className="px-6 h-10 bg-foreground/5 border border-border text-xs font-bold uppercase tracking-widest hover:bg-foreground/10 transition-colors font-mono"
            >
              Try Another Token
            </button>
            <button 
              onClick={() => navigate("/auth/login")}
              className="text-[10px] uppercase font-bold text-muted-foreground/80 hover:text-foreground transition-colors"
            >
              Go to Login Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-green-500/10 border border-green-500/20 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-black uppercase tracking-widest text-green-500 mb-2">Node Authorized</h2>
          <p className="text-xs font-mono text-center text-muted-foreground mb-6 leading-relaxed">
            Your secure account role <span className="text-primary font-bold">{roleAssigned.toUpperCase()}</span> has been initialized.
          </p>
          <button 
            onClick={handleGoToDashboard}
            className="px-6 py-2 w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Enter Workspace <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // IDLE: User needs to input token manually (Temporary Token Input UI)
  if (status === "idle") {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Accept Invitation</h2>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Connect to Urvah’s distributed core nodes.</p>
        </div>

        <form onSubmit={handleManualTokenSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Ticket className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Dispatch Token</span>
            </div>
            
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-mono mt-1">
              Insert the secure dispatch code sent by your system representative (e.g. <code className="text-primary bg-primary/10 px-1 font-sans rounded">invite-student-123</code>).
            </p>

            <Input 
              type="text" 
              placeholder="e.g. invite-student-123" 
              className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-foreground hover:shadow-[0_0_20px_rgba(255,120,40,0.3)] transition-all font-mono"
          >
            Identify Token <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mt-8">
          Or return to the <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate("/auth/login")}>Main Gateway</span>.
        </p>
      </div>
    );
  }

  // VALID: Show Password Creation layout with strong strength gauges
  const strengthInfo = getStrengthLabel();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Configure Protocol</h2>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Establish password security criteria.</p>
      </div>

      {/* Invitation Credentials Info Banner */}
      <div className="p-4 bg-white/[0.02] border border-border relative">
        <div className="absolute top-2 right-2 flex items-center gap-1.5 text-primary">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[9px] font-black tracking-widest uppercase bg-primary/10 px-1.5 py-0.5 rounded">Verified Invitation</span>
        </div>
        
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block mb-1">Provisioning Target</label>
        <span className="text-sm font-bold text-foreground block truncate">{email}</span>
        <span className="inline-block text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 mt-2 rounded">
          Access Role: {roleAssigned}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Create Matrix Passphrase</label>
              <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ${strengthInfo.color}`}>
                {strengthInfo.text}
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

            {/* Strength bar block */}
            <div className="w-full h-1 bg-foreground/5 overflow-hidden flex gap-1 mt-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`h-full flex-1 transition-all duration-300 ${
                    step <= strengthCount ? strengthInfo.barColor : "bg-foreground/10"
                  }`}
                />
              ))}
            </div>

            {/* Criteria bullets */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2">
              {[
                { checked: checks.length, label: "MINIMUM 8 CHARACTERS" },
                { checked: checks.hasUpper, label: "CAPITAL LETTER CRITICAL" },
                { checked: checks.hasNumber, label: "NUMERICAL SEQUENCE" },
                { checked: checks.hasSpecial, label: "SYMBOL / CHIP REQUIRED" },
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
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Re-enter Matrix Sequence</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-foreground/5 border-border text-foreground rounded-none focus-visible:ring-0 focus-visible:border-primary/50 font-mono transition-all h-12"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-[9px] text-red-500 font-mono uppercase tracking-widest mt-1">Sequences do not match</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || password !== confirmPassword || strengthCount < 4}
          className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Provisioning Matrix...</>
          ) : (
            <>Lock In Matrix Credentials <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </form>
    </div>
  );
};
