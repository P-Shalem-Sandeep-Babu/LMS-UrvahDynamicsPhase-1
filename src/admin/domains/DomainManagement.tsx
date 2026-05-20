import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Globe, ArrowLeft, Building2, MoreVertical, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { mockDomains } from "../../data/mockDomains";
import { mockColleges } from "../../data/mockColleges";
import { CollegeDomain } from "../../types/domain";
import { AddDomainModal } from "./components/AddDomainModal";
import { EditDomainModal } from "./components/EditDomainModal";
import { DeleteDomainModal } from "./components/DeleteDomainModal";

export const DomainManagement = () => {
  const [domains, setDomains] = useState<CollegeDomain[]>(mockDomains);
  const [search, setSearch] = useState("");
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const [editDomain, setEditDomain] = useState<CollegeDomain | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [deleteDomain, setDeleteDomain] = useState<CollegeDomain | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // For testing auto-mapping
  const [testEmail, setTestEmail] = useState("");
  const [testResult, setTestResult] = useState<any>(null);

  const filteredDomains = domains.filter(d => 
    d.domain.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (domainName: string, collegeId: string) => {
    const newDomain: CollegeDomain = {
      id: `dom_${Date.now()}`,
      domain: domainName,
      collegeId,
      status: "active",
      activeUsersCount: 0
    };
    setDomains([...domains, newDomain]);
    setIsAddOpen(false);
  };

  const handleEdit = (domainId: string, domainName: string, collegeId: string, status: "active"|"inactive") => {
    setDomains(domains.map(d => d.id === domainId ? { ...d, domain: domainName, collegeId, status } : d));
    setIsEditOpen(false);
    setEditDomain(null);
  };

  const handleDelete = (domainId: string) => {
    setDomains(domains.filter(d => d.id !== domainId));
    setIsDeleteOpen(false);
    setDeleteDomain(null);
  };

  const getCollegeName = (collegeId: string) => {
    return mockColleges.find(c => c.id === collegeId)?.name || "Unknown College";
  };

  const testMapping = () => {
    if (!testEmail) {
      setTestResult(null);
      return;
    }
    const emailParts = testEmail.split("@");
    if (emailParts.length !== 2) {
      setTestResult({ error: "Invalid email format" });
      return;
    }
    const domainPart = emailParts[1].toLowerCase();
    const mappedDomain = domains.find(d => d.domain.toLowerCase() === domainPart && d.status === "active");
    if (mappedDomain) {
      setTestResult({
        success: true,
        domain: mappedDomain.domain,
        college: getCollegeName(mappedDomain.collegeId)
      });
    } else {
      setTestResult({ error: "No active mapping found for this domain" });
    }
  };

  const openEdit = (domain: CollegeDomain) => {
    setEditDomain(domain);
    setIsEditOpen(true);
  };

  const openDelete = (domain: CollegeDomain) => {
    setDeleteDomain(domain);
    setIsDeleteOpen(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 pb-12 animate-in fade-in">
      <Link to="/admin-settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-xs font-mono uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Settings
      </Link>

      <div className="border-b border-border pb-6">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Globe className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Domain Mapping
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           Manage email domain to college routing and auto-assignment
         </p>
      </div>

      {/* Auto-mapping tester panel */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
           <CheckCircle2 className="w-5 h-5 text-primary" /> Test Auto-Mapping
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
           <div className="w-full md:w-96 space-y-2">
             <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">User Email</label>
             <Input 
               placeholder="student@urvah.edu" 
               value={testEmail}
               onChange={(e) => setTestEmail(e.target.value)}
               className="bg-foreground/5 border-border text-foreground focus-visible:ring-primary/50"
             />
           </div>
           <Button onClick={testMapping} className="bg-foreground/10 hover:bg-foreground/20 text-foreground">
             Test Mapper
           </Button>
        </div>
        {testResult && (
          <div className="mt-4 p-4 border border-border bg-foreground/5 rounded-lg text-sm font-mono">
             {testResult.error ? (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" /> {testResult.error}
                </div>
             ) : (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" /> 
                  Mapped to <span className="text-foreground font-bold">{testResult.college}</span> via <span className="text-primary">{testResult.domain}</span>
                </div>
             )}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 border border-border rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input 
            type="text" 
            placeholder="Search domains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border-border text-foreground pl-10 focus-visible:ring-primary/50"
          />
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="bg-primary text-black font-bold text-xs uppercase tracking-wider h-9 w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" /> Add Domain
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map(domain => (
          <div key={domain.id} className="bg-card border border-border p-5 group hover:border-primary/30 transition-all flex flex-col h-full rounded-xl">
             <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-foreground/5 rounded-lg flex items-center justify-center text-primary border border-border">
                     <Globe className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg text-foreground font-mono tracking-tight">{domain.domain}</h3>
                     <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${domain.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-foreground/5 text-muted-foreground/80 border-border'}`}>
                        {domain.status}
                     </Badge>
                   </div>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-foreground/10" onClick={() => openEdit(domain)}>
                     <Edit className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/50 hover:text-red-500 hover:bg-red-500/10" onClick={() => openDelete(domain)}>
                     <Trash2 className="w-4 h-4" />
                   </Button>
                </div>
             </div>
             
             <div className="mt-auto space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs font-mono">
                   <span className="text-muted-foreground/80 uppercase tracking-widest">Target College</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                   <Building2 className="w-4 h-4 text-primary" />
                   <span className="truncate">{getCollegeName(domain.collegeId)}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/80 pt-2">
                   <span className="uppercase tracking-widest">Active Users</span>
                   <span className="text-foreground font-bold">{domain.activeUsersCount} users</span>
                </div>
             </div>
          </div>
        ))}
        {filteredDomains.length === 0 && (
           <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 text-center text-muted-foreground/80 font-mono text-sm border border-border rounded-xl bg-foreground/5 border-dashed">
             No domains found matching your criteria.
           </div>
        )}
      </div>

      <AddDomainModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      <EditDomainModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} domain={editDomain} onEdit={handleEdit} />
      <DeleteDomainModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} domain={deleteDomain} onDelete={handleDelete} />
    </div>
  );
};
