import { motion } from "motion/react";
import { List } from "lucide-react";

export const PlatformActivity = () => {
  const activities = [
    {
      id: "EVT-8921",
      event: "New course generated via AI",
      user: "Trainer Alpha",
      time: "10:24 AM",
      status: "Success",
    },
    {
      id: "EVT-8922",
      event: "Bulk student import initiated",
      user: "Admin User",
      time: "09:41 AM",
      status: "Processing",
    },
    {
      id: "EVT-8923",
      event: "Daily Contest published",
      user: "System Scheduler",
      time: "08:00 AM",
      status: "Success",
    },
    {
      id: "EVT-8924",
      event: "Compiler container spin-up failure",
      user: "System Node 4",
      time: "07:15 AM",
      status: "Failed",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 bg-[#080808] p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
          <List className="w-3 h-3" /> Raw Event Stream
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <th className="pb-3 font-medium px-4">Event ID</th>
              <th className="pb-3 font-medium px-4">Description</th>
              <th className="pb-3 font-medium px-4">Actor</th>
              <th className="pb-3 font-medium px-4">Timestamp</th>
              <th className="pb-3 font-medium px-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-xs font-mono text-white/70">
            {activities.map((act, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-4">{act.id}</td>
                <td className="py-4 px-4 text-white">{act.event}</td>
                <td className="py-4 px-4">{act.user}</td>
                <td className="py-4 px-4">{act.time}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 text-[8px] uppercase tracking-widest font-bold ${
                      act.status === "Success"
                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                        : act.status === "Processing"
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                  >
                    {act.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
