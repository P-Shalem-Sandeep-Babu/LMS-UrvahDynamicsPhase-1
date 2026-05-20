import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Plus, Search, Mail, ShieldAlert, CheckCircle2, XCircle, ArrowLeft, RefreshCw, X, ShieldCheck, Clock, Key, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

import { InviteToken } from "../../types/auth";

const initialMockInvites: InviteToken[] = [
  {
    id: "inv_1",
    email: "newfaculty@urvah.edu",
    role: "faculty",
    token: "invite-faculty-123",
    status: "pending",
    createdAt: "2026-05-18T00:00:00Z",
    expiresAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "inv_2",
    email: "newtrainer@urvah.edu",
    role: "trainer",
    token: "invite-trainer-123",
    status: "pending",
    createdAt: "2026-05-17T00:00:00Z",
    expiresAt: "2026-05-24T00:00:00Z",
  },
  {
    id: "inv_3",
    email: "oldstudent@urvah.edu",
    role: "student",
    token: "mock-expired-token",
    status: "expired",
    createdAt: "2026-05-01T00:00:00Z",
    expiresAt: "2026-05-08T00:00:00Z",
  },
  {
    id: "inv_4",
    email: "alreadysetup@urvah.edu",
    role: "student",
    token: "mock-accepted-token",
    status: "accepted",
    createdAt: "2026-05-10T00:00:00Z",
    expiresAt: "2026-05-17T00:00:00Z",
  }
];

export const InviteManagement = () => {
  // Use persistent state synced with localStorage for simulated end-to-end flow!
  const [invites, setInvites] = useState<InviteToken[]>(() => {
    try {
      const stored = localStorage.getItem("urvah_invite_tokens");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem("urvah_invite_tokens", JSON.stringify(initialMockInvites));
    return initialMockInvites;
  });

  const [search, setSearch] = useState("");
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // Modal active state triggers
  const [isOpen, setIsOpen] = useState(false);
  const [provisionMethod, setProvisionMethod] = useState<"email" | "direct">("email");
  
  // Create state properties
  const [pEmail, setPEmail] = useState("");
  const [pRole, setPRole] = useState<"student" | "faculty" | "trainer" | "admin">("student");
  const [customTokenEnabled, setCustomTokenEnabled] = useState(false);
  const [pToken, setPToken] = useState("");
  const [pExpiresDays, setPExpiresDays] = useState("7");
  
  // Direct provision fields
  const [pFullName, setPFullName] = useState("");
  const [pTempPassword, setPTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Success screen inside modal
  const [successInfo, setSuccessInfo] = useState<{
    method: "email" | "direct";
    email: string;
    role: string;
    token?: string;
    tempPass?: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState("");

  const filteredInvites = invites.filter(inv => 
    inv.email.toLowerCase().includes(search.toLowerCase()) || 
    inv.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyLink = (token: string) => {
    const inviteUrl = `${window.location.origin}/auth/invite/${token}`;
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(token);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handleGenerateClick = () => {
    setErrorMsg("");
    setPEmail("");
    setPRole("student");
    setCustomTokenEnabled(false);
    setPToken("");
    setPExpiresDays("7");
    setPFullName("");
    setPTempPassword(generateRandomPassword());
    setSuccessInfo(null);
    setIsOpen(true);
  };

  const generateRandomPassword = () => {
    const length = 10;
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Force compliance with custom password rules
    return pass + "A1!";
  };

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateEmail(pEmail)) {
      setErrorMsg("Please enter a valid target email address.");
      return;
    }

    if (provisionMethod === "direct" && !pFullName.trim()) {
      setErrorMsg("Full Name is required for direct account creation.");
      return;
    }

    if (provisionMethod === "direct" && pTempPassword.length < 8) {
      setErrorMsg("Temporary password must contain 8 characters minimum.");
      return;
    }

    // Verify duplication
    if (invites.some(inv => inv.email.toLowerCase() === pEmail.toLowerCase() && inv.status === "pending")) {
      setErrorMsg("An active pending invite already exists for this email address.");
      return;
    }

    // Prepare token value
    let finalToken = pToken.trim();
    if (!finalToken || !customTokenEnabled) {
      finalToken = `invite-${pRole}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const createdTime = new Date().toISOString();
    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + parseInt(pExpiresDays));

    const newInvite: InviteToken = {
      id: `inv_${Date.now()}`,
      email: pEmail.trim().toLowerCase(),
      role: pRole,
      token: finalToken,
      status: provisionMethod === "direct" ? "accepted" : "pending",
      createdAt: createdTime,
      expiresAt: expiryTime.toISOString()
    };

    const updatedInvites = [newInvite, ...invites];
    setInvites(updatedInvites);
    localStorage.setItem("urvah_invite_tokens", JSON.stringify(updatedInvites));

    // Seed mock accounts in Auth context sandbox if required, but adding invites state is already sufficient
    setSuccessInfo({
      method: provisionMethod,
      email: pEmail.trim().toLowerCase(),
      role: pRole,
      token: finalToken,
      tempPass: provisionMethod === "direct" ? pTempPassword : undefined
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12 animate-in fade-in relative">
      <Link to="/admin-settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-xs font-mono uppercase tracking-wider mb-2">
        <ArrowLeft className="w-4 h-4" /> Back to Settings
      </Link>

      <div className="border-b border-border pb-6">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Mail className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Invites
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Provision accounts securely via invite tokens
         </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 border border-border rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input 
            type="text" 
            placeholder="Search by email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border-border text-foreground pl-10 focus-visible:ring-primary/50"
          />
        </div>

        <Button 
          onClick={handleGenerateClick}
          className="bg-primary text-black font-bold text-xs uppercase tracking-wider h-9 w-full md:w-auto hover:brightness-110"
        >
          <Plus className="w-4 h-4 mr-2" /> Generate Invite
        </Button>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-foreground/5">
                <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Invitee Email</th>
                <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Assigned Role</th>
                <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">Status</th>
                <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">ExpiresAt</th>
                <th className="p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInvites.map((invite) => (
                <tr key={invite.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground/60" />
                      <span className="font-bold text-sm tracking-wide">{invite.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-primary">{invite.role}</span>
                  </td>
                  <td className="p-4">
                    <Badge className={
                      invite.status === "accepted" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                      invite.status === "expired" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }>
                      {invite.status === "accepted" && <CheckCircle2 className="w-3 h-3 mr-1 inline animate-pulse" />}
                      {invite.status === "expired" && <XCircle className="w-3 h-3 mr-1 inline" />}
                      {invite.status === "pending" && <RefreshCw className="w-3 h-3 mr-1 inline animate-spin-slow" />}
                      {invite.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(invite.expiresAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {invite.status === 'pending' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyLink(invite.token)}
                        className={`h-8 text-xs font-mono uppercase tracking-widest ${isCopied === invite.token ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'border-border text-foreground hover:bg-foreground/10'}`}
                      >
                        {isCopied === invite.token ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <Copy className="w-3 h-3 mr-2" />}
                        {isCopied === invite.token ? 'Copied' : 'Copy Link'}
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-mono uppercase tracking-widest opacity-50 cursor-not-allowed">
                        <ShieldAlert className="w-3 h-3 mr-2" /> Unavailable
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInvites.length === 0 && (
            <div className="p-8 text-center text-muted-foreground/80 font-mono text-sm">
              No invites found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Provisioning Drawer Modal popup block - keeps UI clean but adds features */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Modal header */}
            <div className="flex justify-between items-center bg-[#0d0d0d] px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-foreground uppercase font-sans">Account Provisioning Control</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80">Secure dispatch administrative module</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground/80 hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal content body */}
            <div className="p-6">
              {!successInfo ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-400/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest">
                      {errorMsg}
                    </div>
                  )}

                  {/* Provision model selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Provisioning Method</label>
                    <div className="grid grid-cols-2 gap-3 bg-foreground/5 p-1 rounded-sm border border-border/50">
                      <button
                        type="button"
                        onClick={() => setProvisionMethod("email")}
                        className={`py-1.5 text-center text-xs font-bold uppercase tracking-widest transition-all ${provisionMethod === "email" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Email Invite Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setProvisionMethod("direct")}
                        className={`py-1.5 text-center text-xs font-bold uppercase tracking-widest transition-all ${provisionMethod === "direct" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Direct Account
                      </button>
                    </div>
                  </div>

                  {/* Shared user fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 block">Target Email</label>
                      <Input
                        type="email"
                        placeholder="user@urvah.edu"
                        value={pEmail}
                        onChange={(e) => setPEmail(e.target.value)}
                        required
                        className="bg-[#0c0c0c] border-border text-foreground rounded-none h-10 font-mono text-xs focus-visible:ring-primary/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/77 block">Assign Access Role</label>
                      <select
                        value={pRole}
                        onChange={(e: any) => setPRole(e.target.value)}
                        className="w-full bg-[#0c0c0c] border border-border text-foreground rounded-none h-10 px-3 font-mono text-xs focus-visible:ring-primary/50 text-[10px] uppercase tracking-widest"
                      >
                        <option value="student">STUDENT (Elite Learner)</option>
                        <option value="faculty">FACULTY (Instructor)</option>
                        <option value="trainer">TRAINER (Code Coach)</option>
                        <option value="admin">ADMIN (Systems Operator)</option>
                      </select>
                    </div>
                  </div>

                  {/* Direct account spec fields */}
                  {provisionMethod === "direct" && (
                    <div className="space-y-4 pt-2 border-t border-border/50">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 block">Full Name</label>
                        <Input
                          type="text"
                          placeholder="e.g. Marcus Aurelius"
                          value={pFullName}
                          onChange={(e) => setPFullName(e.target.value)}
                          required
                          className="bg-[#0c0c0c] border-border text-foreground rounded-none h-10 text-xs focus-visible:ring-primary/50"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Temporary Passphrase</label>
                          <button
                            type="button"
                            onClick={() => setPTempPassword(generateRandomPassword())}
                            className="text-[9px] font-mono uppercase tracking-widest text-primary hover:underline"
                          >
                            Regenerate
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={pTempPassword}
                            onChange={(e) => setPTempPassword(e.target.value)}
                            required
                            className="bg-[#0c0c0c] border-border text-foreground rounded-none h-10 font-mono text-xs pr-10 focus-visible:ring-primary/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/80 hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Token Setup parameters */}
                  <div className="space-y-3 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="customToken"
                        checked={customTokenEnabled}
                        onChange={(e) => setCustomTokenEnabled(e.target.checked)}
                        className="rounded border-border bg-[#0c0c0c] text-primary focus:ring-0"
                      />
                      <label htmlFor="customToken" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground cursor-pointer user-select-none">
                        Setup Custom Temporary Token manually
                      </label>
                    </div>

                    {customTokenEnabled && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 block">Custom Temporary Token Input</label>
                        <Input
                          type="text"
                          placeholder="e.g. token-vip-faculty-999"
                          value={pToken}
                          onChange={(e) => setPToken(e.target.value.replace(/\s+/g, ""))}
                          className="bg-[#0c0c0c] border-border text-foreground rounded-none h-10 font-mono text-xs"
                          required
                        />
                        <p className="text-[9px] font-mono text-muted-foreground/60 lowercase italic">
                          Users can manually input this token on the `/auth/invite` page to register.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Expiration limit config */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Token Lifetime expiration limit</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "1", lbl: "24 Hours" },
                        { val: "7", lbl: "7 Days" },
                        { val: "30", lbl: "30 Days" }
                      ].map((exp) => (
                        <button
                          key={exp.val}
                          type="button"
                          onClick={() => setPExpiresDays(exp.val)}
                          className={`py-1 bg-[#0c0c0c] border text-[10px] font-mono tracking-widest uppercase transition-colors ${pExpiresDays === exp.val ? "border-primary text-primary" : "border-border text-muted-foreground/80 hover:text-foreground/80"}`}
                        >
                          {exp.lbl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action submit button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-11 bg-primary text-black font-black uppercase text-xs tracking-widest hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      {provisionMethod === "email" ? (
                        <>Dispatch Invitation Security Token <Mail className="w-4 h-4" /></>
                      ) : (
                        <>Provision Matrix Member Immediately <ShieldCheck className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success banner and credentials cards! User-friendly copy functionality */
                <div className="space-y-6">
                  <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-md text-center space-y-3">
                    <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-500">
                      <ShieldCheck className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-green-500">
                        {successInfo.method === "email" ? "DISPATCH SUCCESSFUL" : "ACCOUNT PROVISIONED"}
                      </h4>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
                        Secure database record committed.
                      </p>
                    </div>
                  </div>

                  <div className="bg-foreground/5 border border-border p-4 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-muted-foreground/80 uppercase tracking-widest block">Access Domain Link</span>
                      <span className="text-foreground font-bold text-xs block">{successInfo.email}</span>
                      <span className="inline-block text-[8px] font-mono uppercase bg-primary/15 text-primary px-1.5 py-0.5 rounded">
                        Role: {successInfo.role.toUpperCase()}
                      </span>
                    </div>

                    {successInfo.method === "email" ? (
                      <div className="space-y-3 pt-3 border-t border-border/50 font-mono text-xs">
                        <div>
                          <span className="text-[9px] text-muted-foreground/80 uppercase tracking-widest block mb-1">Temporary Token Security setup key</span>
                          <code className="bg-background text-primary px-2 py-1 rounded text-xs block font-mono border border-border/50">{successInfo.token}</code>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => handleCopyLink(successInfo.token || "")}
                            className="bg-foreground/10 text-foreground hover:bg-foreground/20 px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-widest inline-flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5" /> Copy Acceptance URL Link
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-3 border-t border-border/50 font-mono text-xs">
                        <div className="p-3 bg-background flex flex-col gap-1 border border-border/50 font-mono text-[11px]">
                          <span className="text-muted-foreground/80 text-[9px] uppercase tracking-widest">Immediate credentials</span>
                          <span className="text-foreground">Email: <b className="text-foregroundSelect block select-all bg-foreground/5 px-1">{successInfo.email}</b></span>
                          <span className="text-foreground">Temporary Passphrase: <b className="text-primary block select-all bg-foreground/5 px-1">{successInfo.tempPass}</b></span>
                        </div>
                        <p className="text-[9px] text-white/45 italic leading-relaxed">
                          Your profile is fully ready! Access with these credentials directly in the Login screen.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 bg-foreground/5 border border-white/15 hover:bg-foreground/10 text-foreground font-bold uppercase text-[10px] tracking-widest"
                  >
                    Finish and Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
