import React, { useState, useMemo } from "react";
import { 
  GitCommit, 
  Search, 
  Code2, 
  ExternalLink, 
  X, 
  Terminal, 
  Clock, 
  Database,
  Filter,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  Copy
} from "lucide-react";
import { PlatformSubmission, CodingPlatformId } from "../../../types/codingPlatform";
import { getSubmissionsHistory } from "../../../services/codingPlatformService";

interface SubmissionHistoryUIProps {
  submissions: PlatformSubmission[];
}

export const SubmissionHistoryUI: React.FC<SubmissionHistoryUIProps> = ({ submissions }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  
  // Interactive Modal viewer
  const [inspectSub, setInspectSub] = useState<PlatformSubmission | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter lists
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchSearch = sub.problemName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || sub.status.toLowerCase() === statusFilter.toLowerCase();
      const matchPlatform = platformFilter === "all" || sub.platform === platformFilter;
      return matchSearch && matchStatus && matchPlatform;
    });
  }, [submissions, search, statusFilter, platformFilter]);

  const handleCopyCode = (snippet?: string) => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="border border-border bg-card p-6 rounded-xl flex flex-col gap-5">
      
      {/* Search and control filter ribbon */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center border-b border-border/50 pb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-foreground flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-primary" /> Multi-Platform Submission Ledger
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
            Browse and debug code solutions synced from connected profiles.
          </p>
        </div>

        {/* Filters and Search box */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full xl:w-auto">
          
          {/* Search box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Filter by problem name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded px-9 py-1.5 text-xs text-foreground font-mono placeholder:text-white/35 focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* Platform filter selector */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-background border border-border rounded px-2.5 py-1.5 text-xs text-white/85 font-mono focus:outline-none focus:border-primary/55"
          >
            <option value="all">All Platforms</option>
            <option value="leetcode">LeetCode</option>
            <option value="codeforces">Codeforces</option>
            <option value="hackerrank">HackerRank</option>
            <option value="codechef">CodeChef</option>
          </select>

          {/* Status filter selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded px-2.5 py-1.5 text-xs text-white/85 font-mono focus:outline-none focus:border-primary/55"
          >
            <option value="all">All Statuses</option>
            <option value="accepted">Accepted</option>
            <option value="wrong answer">Wrong Answer</option>
            <option value="time limit exceeded">Time Limit Exceeded</option>
            <option value="runtime error">Runtime Error</option>
          </select>

        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="py-14 text-center font-mono text-muted-foreground/60 text-xs flex flex-col items-center gap-2">
          <Terminal className="w-8 h-8 text-white/15" />
          No parsed submissions found matching criteria. Link accounts or modify search filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-white/[0.01] text-[9px] uppercase font-mono tracking-wider text-muted-foreground select-none">
                <th className="p-3">Platform</th>
                <th className="p-3">Problem / Context</th>
                <th className="p-3">Language</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Runtime</th>
                <th className="p-3 text-center">Memory</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {filteredSubmissions.map((sub, idx) => {
                
                // Color codes for statuses
                const statusClass = sub.status === "Accepted" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                    sub.status === "Wrong Answer" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                    sub.status === "Time Limit Exceeded" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                                           "bg-purple-500/10 text-purple-400 border-purple-500/20";

                // Human timestamp parse
                const parseTime = (iso?: string) => {
                  if (!iso) return "-";
                  const date = new Date(iso);
                  const diff = Date.now() - date.getTime();
                  if (diff < 60000) return "Just now";
                  const mins = Math.floor(diff / 60000);
                  if (mins < 60) return `${mins}m ago`;
                  const hours = Math.floor(mins / 60);
                  if (hours < 24) return `${hours}h ago`;
                  return date.toLocaleDateString();
                };

                return (
                  <tr key={sub.id} className="hover:bg-white/[0.01] transition-colors">
                    
                    {/* Platform logo label */}
                    <td className="p-3 uppercase font-bold text-[10px] tracking-wider">
                      <span className={
                        sub.platform === "leetcode" ? "text-green-500" :
                        sub.platform === "codeforces" ? "text-blue-400" :
                        sub.platform === "hackerrank" ? "text-green-500" :
                                                         "text-red-400"
                      }>
                        ● {sub.platform}
                      </span>
                    </td>

                    {/* Problem title */}
                    <td className="p-3 font-semibold text-foreground max-w-[260px] truncate">
                      <a 
                        href={sub.problemUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:text-primary hover:underline flex items-center gap-1 inline-flex"
                      >
                        {sub.problemName} <ExternalLink className="w-3 h-3 text-muted-foreground/60" />
                      </a>
                    </td>

                    {/* Language tag */}
                    <td className="p-3">
                      <span className="bg-foreground/5 border border-border text-muted-foreground px-2 py-0.5 rounded-sm text-[10px]">
                        {sub.language}
                      </span>
                    </td>

                    {/* Solution Status */}
                    <td className="p-3">
                      <span className={`border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>
                        {sub.status}
                      </span>
                    </td>

                    {/* Performance metrics */}
                    <td className="p-3 text-center text-foreground/70">{sub.runtime || "N/A"}</td>
                    <td className="p-3 text-center text-foreground/70">{sub.memory || "N/A"}</td>

                    {/* Date/Time */}
                    <td className="p-3 text-muted-foreground/80">{parseTime(sub.submittedAt)}</td>

                    {/* inspect actions control */}
                    <td className="p-3 text-right">
                      {sub.codeSnippet ? (
                        <button
                          onClick={() => setInspectSub(sub)}
                          className="px-2.5 py-1 border border-white/15 hover:border-primary/45 hover:text-primary transition-all text-[10px] font-bold uppercase text-foreground font-mono rounded bg-background"
                        >
                          Inspect Code
                        </button>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/60 font-light italic">No code logged</span>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Code Inspector Dialog overlay modal */}
      {inspectSub && (
        <div className="fixed inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in select-text">
          <div className="bg-background border border-border rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            
            {/* Modal Ribbon Header */}
            <div className="p-4 bg-white/[0.01] border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="text-sm font-black text-foreground">{inspectSub.problemName}</h4>
                  <p className="text-[10px] font-mono text-muted-foreground/80 uppercase">
                    Platform: <strong className="text-foreground">{inspectSub.platform}</strong> &bull; Language: <strong className="text-primary">{inspectSub.language}</strong>
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setInspectSub(null)}
                className="p-1 border border-border hover:border-border/80 hover:text-foreground transition-colors text-muted-foreground/80 bg-foreground/5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Performance KPIs ticker */}
            <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-border/50 text-center p-3 text-xs bg-background/40 font-mono">
              <div>
                <span className="text-[9px] text-[#777] block uppercase">Execution Status</span>
                <strong className={`font-extrabold uppercase ${inspectSub.status === "Accepted" ? "text-green-400" : "text-red-400"}`}>{inspectSub.status}</strong>
              </div>
              <div>
                <span className="text-[9px] text-[#777] block uppercase">Simulated Runtime</span>
                <strong className="text-foreground">{inspectSub.runtime || "N/A"}</strong>
              </div>
              <div>
                <span className="text-[9px] text-[#777] block uppercase text-cyan-400 font-bold">Memory Index</span>
                <strong className="text-foreground">{inspectSub.memory || "N/A"}</strong>
              </div>
            </div>

            {/* Code canvas panel block */}
            <div className="flex-1 overflow-y-auto p-4 bg-background relative">
              <button 
                onClick={() => handleCopyCode(inspectSub.codeSnippet)}
                className="absolute right-6 top-6 p-2 border border-border bg-foreground/5 text-muted-foreground hover:text-foreground rounded hover:bg-foreground/10 transition-colors uppercase text-[10px] flex items-center gap-1.5 font-mono z-10"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedCode ? "Copied!" : "Copy Code"}
              </button>

              <div className="font-mono text-[11px] leading-relaxed select-text overflow-x-auto text-[#fff] bg-[#000] p-4 border border-border/50 rounded">
                <pre className="whitespace-pre">{inspectSub.codeSnippet}</pre>
              </div>
            </div>

            {/* Footer comments */}
            <div className="p-3 border-t border-border text-center bg-white/[0.005] text-[10px] font-mono text-muted-foreground/80">
              Synchronized on-demand. Source logs are preserved for automatic AI code optimization modules.
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
