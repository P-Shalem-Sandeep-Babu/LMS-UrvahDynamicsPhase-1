import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Settings, User, Bell, Shield, Paintbrush, Monitor, LogOut } from "lucide-react";

export const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Identity", icon: User },
    { id: "notifications", label: "Signal Preferences", icon: Bell },
    { id: "appearance", label: "UI Matrix", icon: Paintbrush },
    { id: "security", label: "Access Control", icon: Shield },
  ];

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12">
      <div className="border-b border-border pb-6 mb-2">
         <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
           <Settings className="w-8 h-8 md:w-10 md:h-10 text-primary" /> System Config
         </h1>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
           User Preferences & Environmental Settings
         </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Sidebar */}
         <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
            {tabs.map(tab => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors font-mono border-l-2 ${
                        isActive 
                           ? "border-primary bg-primary/5 text-primary"
                           : "border-transparent text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                     }`}
                  >
                     <Icon className="w-4 h-4" />
                     {tab.label}
                  </button>
               )
            })}
            
            <div className="mt-8 border-t border-border pt-4">
               <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors font-mono border-l-2 border-transparent"
               >
                  <LogOut className="w-4 h-4" />
                  Terminate Session
               </button>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 border border-border bg-card p-6 md:p-10 min-h-[500px]">
            {activeTab === "profile" && (
               <div className="flex flex-col gap-8 max-w-xl">
                  <div className="flex items-center gap-6">
                     <img src={user?.avatar} alt={user?.name} className="w-24 h-24 border border-border/80 object-cover" />
                     <div className="flex flex-col gap-2">
                        <button className="border border-border/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors">
                           Change Avatar
                        </button>
                        <button className="text-[10px] font-mono text-red-500 uppercase tracking-widest hover:underline">
                           Remove
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">Display Name</label>
                        <input 
                           type="text" 
                           defaultValue={user?.name}
                           className="bg-background border border-border px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">Email Address (Immutable)</label>
                        <input 
                           type="email" 
                           defaultValue={user?.email}
                           disabled
                           className="bg-background border border-border/50 px-4 py-3 text-sm font-mono text-muted-foreground cursor-not-allowed"
                        />
                     </div>

                     {user?.rollNo && (
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">Roll Number</label>
                           <input 
                              type="text" 
                              defaultValue={user.rollNo}
                              disabled
                              className="bg-background border border-border/50 px-4 py-3 text-sm font-mono text-muted-foreground cursor-not-allowed"
                           />
                        </div>
                     )}

                     {user?.contact && (
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">Contact Number</label>
                           <input 
                              type="text" 
                              defaultValue={user.contact}
                              className="bg-background border border-border px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                           />
                        </div>
                     )}

                     {user?.branch && (
                        <div className="flex flex-col gap-2 md:col-span-2">
                           <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">Branch / Department</label>
                           <input 
                              type="text" 
                              defaultValue={user.branch}
                              disabled
                              className="bg-background border border-border/50 px-4 py-3 text-sm font-mono text-muted-foreground cursor-not-allowed"
                           />
                        </div>
                     )}

                     {user?.college && (
                        <div className="flex flex-col gap-2 md:col-span-2">
                           <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">College / Institution</label>
                           <input 
                              type="text" 
                              defaultValue={user.college}
                              disabled
                              className="bg-background border border-border/50 px-4 py-3 text-sm font-mono text-muted-foreground cursor-not-allowed"
                           />
                        </div>
                     )}
                     
                     <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-mono">Bio</label>
                        <textarea 
                           defaultValue={user?.bio}
                           rows={3}
                           className="bg-background border border-border px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                        />
                     </div>
                     
                     <div className="flex flex-col gap-2 md:col-span-2 mt-4">
                        <button className="bg-primary text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors w-fit">
                           Update Identity
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === "appearance" && (
               <div className="flex flex-col gap-6 max-w-xl">
                  <div className="flex flex-col gap-4">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-2 pb-2 border-b border-border">Theme Matrix</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center gap-3 p-4 border-2 border-primary bg-primary/5 rounded-sm">
                           <div className="w-full h-20 bg-background border border-border relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-16 h-16 bg-primary/20 blur-xl"></div>
                              <div className="absolute top-2 left-2 right-2 h-2 bg-foreground/10"></div>
                              <div className="absolute top-6 left-2 w-8 h-8 bg-foreground/5"></div>
                           </div>
                           <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Cyberpunk Dark (Active)</span>
                        </button>
                        <button className="flex flex-col items-center gap-3 p-4 border border-border hover:border-border bg-background rounded-sm transition-colors opacity-50 cursor-not-allowed">
                           <div className="w-full h-20 bg-foreground border border-black/10 relative overflow-hidden">
                              <div className="absolute top-2 left-2 right-2 h-2 bg-background/10"></div>
                              <div className="absolute top-6 left-2 w-8 h-8 bg-background/5"></div>
                           </div>
                           <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80">Light Mode (Locked)</span>
                        </button>
                     </div>
                  </div>
               </div>
            )}
            
            {(activeTab === "notifications" || activeTab === "security") && (
               <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Monitor className="w-12 h-12 text-white/10 mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Module Offline</h3>
                  <p className="text-sm font-mono text-muted-foreground max-w-sm">
                    This configuration module is currently unavailable in the preview environment.
                  </p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
