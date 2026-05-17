import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

const activities = [
  {
    id: 1,
    time: "14:02",
    title: "User Registration Spike",
    desc: "152 new accounts verified in us-east-1",
  },
  {
    id: 2,
    time: "12:45",
    title: "AI Model Retrained",
    desc: "Evaluation sync completed. Lambda architecture engaged.",
  },
  {
    id: 3,
    time: "09:30",
    title: "Database Index Rebuild",
    desc: "Optimized read paths for course catalogue.",
  },
  {
    id: 4,
    time: "08:15",
    title: "Server Restart Commenced",
    desc: "Automated patch application for security vulnerability.",
  }
];

export const RecentActivity = () => {
  return (
    <div className="border border-white/10 bg-[#050505] p-6 lg:col-span-1 xl:col-span-1 rounded-none relative h-full">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xs uppercase tracking-widest text-white/50">System Logs / Alerts</h2>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 items-start group">
            <div className="text-[8px] font-mono text-white/30 pt-1 w-12 shrink-0">{activity.time}</div>
            <div className="w-px h-full bg-white/10 relative">
              <div className="absolute top-1 -left-1 w-2 h-2 rounded-none bg-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
              {index !== activities.length - 1 && <div className="absolute top-4 left-0 w-px h-16 bg-white/10"></div>}
            </div>
            <div className="pb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-white/80">{activity.title}</div>
              <div className="text-[10px] text-white/40 mt-1 font-mono leading-relaxed">{activity.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

