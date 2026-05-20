import { motion } from "motion/react";
import { ShieldAlert, AlertTriangle, ShieldCheck } from "lucide-react";

export const SecurityAlerts = () => {
  const alerts = [
    {
      type: "critical",
      msg: "Multiple failed auth vectors detected from node 192.168.1.104",
      time: "2m ago",
    },
    {
      type: "warning",
      msg: "Rate limit exceeded on compiler API endpoint /v1/execute",
      time: "15m ago",
    },
    {
      type: "info",
      msg: "Routine database snapshot completed successfully",
      time: "1h ago",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <ShieldAlert className="w-3 h-3" /> Security Feed
        </h2>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`p-4 border bg-white/[0.02] flex items-start gap-4 ${
              alert.type === "critical"
                ? "border-red-500/30"
                : alert.type === "warning"
                  ? "border-yellow-500/30"
                  : "border-border"
            }`}
          >
            <div className="mt-0.5">
              {alert.type === "critical" && (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
              {alert.type === "warning" && (
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              )}
              {alert.type === "info" && (
                <ShieldCheck className="w-4 h-4 text-green-500" />
              )}
            </div>
            <div>
              <p className="text-xs font-mono text-foreground/80 leading-relaxed mb-1">
                {alert.msg}
              </p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                {alert.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
