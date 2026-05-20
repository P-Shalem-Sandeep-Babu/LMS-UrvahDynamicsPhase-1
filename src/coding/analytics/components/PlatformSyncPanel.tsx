import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  RefreshCw, 
  CheckCircle, 
  HelpCircle, 
  ExternalLink, 
  Key, 
  AlertCircle, 
  Check, 
  Database,
  Link2,
  Unlink
} from "lucide-react";
import { CodingPlatformProfile, CodingPlatformId } from "../../../types/codingPlatform";
import { synchronizeProfileFromPlatform, getConnectedProfiles, saveConnectedProfiles } from "../../../services/codingPlatformService";

interface PlatformSyncPanelProps {
  profiles: CodingPlatformProfile[];
  onProfilesUpdated: () => void;
}

export const PlatformSyncPanel: React.FC<PlatformSyncPanelProps> = ({ profiles, onProfilesUpdated }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({
    leetcode: "",
    codeforces: "",
    hackerrank: "",
    codechef: ""
  });
  
  const [syncingPool, setSyncingPool] = useState<Record<string, boolean>>({});
  const [editingPool, setEditingPool] = useState<Record<string, boolean>>({});
  const [syncError, setSyncError] = useState<string | null>(null);

  const handleInputChange = (platformId: CodingPlatformId, val: string) => {
    setInputs(prev => ({ ...prev, [platformId]: val }));
  };

  const handleConnect = async (platformId: CodingPlatformId) => {
    const handle = inputs[platformId].trim();
    if (!handle) return;

    setSyncingPool(prev => ({ ...prev, [platformId]: true }));
    setSyncError(null);
    try {
      await synchronizeProfileFromPlatform(platformId, handle);
      setInputs(prev => ({ ...prev, [platformId]: "" }));
      setEditingPool(prev => ({ ...prev, [platformId]: false }));
      onProfilesUpdated();
    } catch (e: any) {
      setSyncError(e.message || "Failed to establish sync connection");
    } finally {
      setSyncingPool(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const handleSyncNow = async (platformId: CodingPlatformId, existingHandle: string) => {
    setSyncingPool(prev => ({ ...prev, [platformId]: true }));
    setSyncError(null);
    try {
      await synchronizeProfileFromPlatform(platformId, existingHandle);
      onProfilesUpdated();
    } catch (e: any) {
      setSyncError(e.message || "Failed to update profile telemetry");
    } finally {
      setSyncingPool(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const handleUnlink = (platformId: CodingPlatformId) => {
    const updated = profiles.map(p => {
      if (p.id === platformId) {
        return {
          ...p,
          isConnected: false,
          handle: "",
          lastSyncedAt: undefined
        };
      }
      return p;
    });
    saveConnectedProfiles(updated);
    onProfilesUpdated();
  };

  // Human read sync time helper
  const formatTime = (isoString?: string) => {
    if (!isoString) return "Never";
    const diff = Date.now() - new Date(isoString).getTime();
    if (diff < 60000) return "Just now";
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(isoString).toLocaleDateString();
  };

  const platformGridInfo = [
    {
      id: "leetcode" as CodingPlatformId,
      color: "from-green-600/10 to-transparent border-green-500/20",
      accentText: "text-green-400",
      accentBg: "bg-green-500/20",
      platformUrl: "https://leetcode.com/"
    },
    {
      id: "codeforces" as CodingPlatformId,
      color: "from-blue-600/10 to-transparent border-blue-500/20",
      accentText: "text-blue-400",
      accentBg: "bg-blue-500/20",
      platformUrl: "https://codeforces.com/"
    },
    {
      id: "hackerrank" as CodingPlatformId,
      color: "from-green-600/10 to-transparent border-green-500/20",
      accentText: "text-green-400",
      accentBg: "bg-green-500/20",
      platformUrl: "https://hackerrank.com/"
    },
    {
      id: "codechef" as CodingPlatformId,
      color: "from-red-600/10 to-transparent border-red-500/20",
      accentText: "text-red-400",
      accentBg: "bg-red-500/20",
      platformUrl: "https://codechef.com/"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Alert Banner representing state integration design */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-md flex gap-3 items-start">
        <Database className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs font-mono text-foreground/80 leading-relaxed">
          <p className="font-bold text-primary uppercase tracking-wider text-[11px] mb-1">Architecture Note: Public API Wrapper</p>
          <p>These integration modules are structures of native competitive REST models. Connect your handles below to sync problems count and ratings. The frontend queries public web endpoints in the background.</p>
        </div>
      </div>

      {syncError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400 flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{syncError}</span>
        </div>
      )}

      {/* Roster of competitive grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platformGridInfo.map(grid => {
          const profile = profiles.find(p => p.id === grid.id);
          if (!profile) return null;
          
          const isSyncing = syncingPool[grid.id];
          const isEditing = editingPool[grid.id] || !profile.isConnected;

          return (
            <div 
              key={profile.id} 
              className={`border bg-background border-border rounded-xl p-5 hover:border-border/80 transition-all overflow-hidden relative flex flex-col justify-between`}
            >
              {/* Corner ambient visual */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${grid.color} rounded-full blur-3xl pointer-events-none`} />

              <div>
                {/* Platform Headline */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${grid.accentBg} border border-border/50 flex items-center justify-center font-bold font-mono text-sm capitalize ${grid.accentText}`}>
                      {profile.id.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-foreground tracking-tight">{profile.name}</h4>
                      <a 
                        href={grid.platformUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[9px] font-mono text-muted-foreground/80 hover:text-primary transition-colors flex items-center gap-1 uppercase"
                      >
                        Official Site <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {profile.isConnected ? (
                    <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-sm font-bold font-mono uppercase flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Active Sync
                    </span>
                  ) : (
                    <span className="text-[9px] bg-foreground/5 text-muted-foreground/80 border border-border px-2 py-0.5 rounded-sm font-mono uppercase">
                      Unlinked
                    </span>
                  )}
                </div>

                {/* Handle Connect Input or Connection Data container */}
                {isEditing ? (
                  <div className="flex flex-col gap-2 relative z-10 mb-4">
                    <label className="text-[9px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Connect Competitive Handle</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder={`Enter ${profile.name} Username...`}
                        value={inputs[grid.id]}
                        onChange={(e) => handleInputChange(grid.id, e.target.value)}
                        className="flex-1 bg-background border border-border rounded text-xs text-foreground font-mono px-3 py-2 focus:outline-none focus:border-primary/55"
                      />
                      <button
                        onClick={() => handleConnect(grid.id)}
                        disabled={isSyncing || !inputs[grid.id].trim()}
                        className="px-4 py-2 bg-primary text-black font-extrabold text-xs uppercase tracking-wider rounded font-mono hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                      >
                        {isSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Link2 className="w-3.5 h-3.5" />} Sync
                      </button>
                    </div>
                    {profile.isConnected && (
                      <button 
                        onClick={() => setEditingPool(prev => ({ ...prev, [grid.id]: false }))}
                        className="text-left text-[9px] font-mono text-muted-foreground/60 hover:text-foreground transition-colors"
                      >
                        &larr; Keep existing handle: <strong className="text-foreground">{profile.handle}</strong>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 relative z-10 mb-4">
                    <div className="bg-background/40 border border-border/50 p-3 rounded flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-muted-foreground/80 uppercase block mb-0.5">Connected Username</span>
                        <a 
                          href={profile.profileUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-mono font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          @{profile.handle} <ExternalLink className="w-3 h-3 text-muted-foreground/80" />
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingPool(prev => ({ ...prev, [grid.id]: true }))}
                          className="p-1 px-2 border border-border bg-foreground/5 rounded text-[10px] font-mono text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors uppercase"
                        >
                          Modify Hand
                        </button>
                        <button
                          title="Unlink profile"
                          onClick={() => handleUnlink(grid.id)}
                          className="p-1 border border-red-500/20 bg-red-500/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <Unlink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground">
                      <div>
                        Sync Time: <strong className="text-foreground/80">{formatTime(profile.lastSyncedAt)}</strong>
                      </div>
                      <div className="text-right">
                        Rating Index: <strong className="text-primary">{profile.stats?.rating ? profile.stats.rating : "NA"}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* platform detailed sub statistics values */}
              {profile.isConnected && profile.stats && (
                <div className="mt-4 pt-3.5 border-t border-border/50 relative z-10 flex items-center justify-between">
                  <div className="flex gap-4 text-[11px] font-mono">
                    <div>
                      <span className="text-muted-foreground/80 block text-[9px] uppercase">Solved</span>
                      <strong className="text-sm text-foreground font-bold">{profile.stats.totalSolved}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground/80 block text-[9px] uppercase">Streak</span>
                      <strong className="text-sm text-yellow-400 font-bold">{profile.stats.streak} Days</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground/80 block text-[9px] uppercase">Platform Rank</span>
                      <strong className="text-sm text-foreground/80 font-bold font-mono">{profile.stats.rank}</strong>
                    </div>
                  </div>

                  <button
                    disabled={isSyncing}
                    onClick={() => handleSyncNow(grid.id, profile.handle)}
                    className="p-2 border border-white/15 bg-white/[0.02] hover:bg-foreground/5 hover:border-border text-foreground rounded-md transition-all flex items-center justify-center disabled:opacity-30"
                    title="Simulate Real-time Synchronization"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-primary" : ""}`} />
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
