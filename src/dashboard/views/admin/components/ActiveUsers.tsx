import { motion } from "motion/react";
import { Users } from "lucide-react";

export const ActiveUsers = () => {
  const users = [
    {
      name: "John Doe",
      role: "Student",
      location: "US-East",
      status: "Compiling",
    },
    {
      name: "Prof. Smith",
      role: "Faculty",
      location: "Europe-West",
      status: "Evaluating",
    },
    {
      name: "Jane Roe",
      role: "Trainer",
      location: "Asia-South",
      status: "Idle",
    },
    {
      name: "Alice Lee",
      role: "Student",
      location: "US-West",
      status: "Active",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden flex-1"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
          <Users className="w-3 h-3" /> Live Demographics
        </h2>
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>

      <div className="space-y-4">
        {users.map((u, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0"
          >
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-tight">
                {u.name}
              </p>
              <div className="flex gap-2 text-[10px] font-mono text-white/40">
                <span>{u.role}</span>
                <span>&bull;</span>
                <span>{u.location}</span>
              </div>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary">
              {u.status}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
