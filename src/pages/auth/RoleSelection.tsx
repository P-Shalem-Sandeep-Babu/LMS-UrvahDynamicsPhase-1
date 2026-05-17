import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2, ShieldCheck, User, Users, GraduationCap, Code } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../data/mock";

const roles: { id: Role; title: string; desc: string; icon: any; color: string }[] = [
  { id: "student", title: "Student", desc: "Access courses, assignments, and peer reviews.", icon: User, color: "text-blue-400" },
  { id: "faculty", title: "Faculty", desc: "Manage cohorts, grade submissions, and moderate.", icon: GraduationCap, color: "text-yellow-400" },
  { id: "trainer", title: "Trainer", desc: "Create content, run coding bootcamps, mentor.", icon: Code, color: "text-green-400" },
  { id: "admin", title: "Admin", desc: "Full ecosystem control and analytics access.", icon: ShieldCheck, color: "text-red-400" },
];

export const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleComplete = () => {
    if (!selectedRole) return;
    setIsLoading(true);
    setTimeout(() => {
      switchRole(selectedRole);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="space-y-8 w-full max-w-md mx-auto">
      <div>
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 mb-4">
           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Initialization Protocol</span>
         </div>
         <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Select Designation</h2>
         <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Assign your primary role within the ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedRole(role.id)}
            className={`relative flex flex-col items-start p-4 border text-left transition-all ${
              selectedRole === role.id 
                ? "bg-white/10 border-primary" 
                : "bg-white/[0.02] border-white/10 hover:border-white/30"
            }`}
          >
            {selectedRole === role.id && (
               <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-primary">
                  <ShieldCheck className="w-4 h-4 text-black" />
               </div>
            )}
            <role.icon className={`w-6 h-6 mb-3 ${selectedRole === role.id ? "text-primary" : role.color}`} />
            <h3 className={`text-sm font-bold uppercase tracking-widest mb-1 ${selectedRole === role.id ? "text-white" : "text-white/80"}`}>
              {role.title}
            </h3>
            <p className="text-[10px] font-mono text-white/40 leading-relaxed">
              {role.desc}
            </p>
          </motion.button>
        ))}
      </div>

      <button 
        onClick={handleComplete}
        disabled={!selectedRole || isLoading}
        className="w-full h-12 bg-primary text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Finalizing...</>
        ) : (
          <>Complete Initialization</>
        )}
      </button>
    </div>
  );
};
