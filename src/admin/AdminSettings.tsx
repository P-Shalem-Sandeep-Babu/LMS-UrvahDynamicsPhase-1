import { Shield, Settings, Database, Key, Server, Users, Mail, Globe, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminSettings = () => {
  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12">
      <div className="border-b border-border pb-6 mb-2">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Admin Control
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Global Configuration and Access Control
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Link to="/admin/invites" className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer block">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Mail className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Invitation Management</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Provision secure registration tokens for faculty, trainers, and students.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Manage Invites <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </Link>

         <Link to="/admin/domains" className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer block">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Globe className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Domain Mapping</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Manage email domain to college routing and auto-assignment rules.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Manage Domains <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </Link>

         <Link to="/admin/coding-automation" className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer block">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Settings className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Coding Automation</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Manage automated daily coding challenge queue and scheduling.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Configure Queue <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </Link>

         <Link to="/admin/announcements" className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer block">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Megaphone className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Announcements</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Manage global and targeted system broadcasts for all users.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Manage Broadcasts <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </Link>

         <div className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Database className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Database Indexing</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Rebuild search indexes and optimize query performance for large datasets.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Configure <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </div>
         
         <div className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Key className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Access Tokens</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Manage API keys and long-lived access tokens for external service integrations.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Configure <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </div>

         <div className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Server className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Microservices</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Check health and restart individual microservices backing the LMS architecture.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Configure <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </div>

         <div className="border border-border bg-card p-6 hover:border-primary/30 transition-colors group cursor-pointer">
             <div className="w-12 h-12 bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <Users className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2">Global IAM</h3>
             <p className="text-xs font-mono text-muted-foreground mb-6">Manage roles, permissions, and security policies for all user segments globally.</p>
             <div className="text-[10px] uppercase font-bold tracking-widest font-mono text-primary flex items-center gap-2">
                Configure <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
             </div>
         </div>
      </div>
    </div>
  );
};
