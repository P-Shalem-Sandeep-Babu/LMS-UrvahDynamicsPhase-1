import React, { useState, useEffect } from "react";
import { BookOpen, Users, Code, Activity } from "lucide-react";
import { getStoredBatches } from "../../utils/batchState";

export const BatchStatsWidget: React.FC = () => {
  const [batches, setBatches] = useState(() => getStoredBatches());

  useEffect(() => {
    const handleUpdate = () => {
      setBatches(getStoredBatches());
    };
    window.addEventListener("urvah_batches_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_batches_update", handleUpdate);
    };
  }, []);

  const totalBatches = batches.length;
  const activeBatches = batches.filter(b => b.status === "active").length;
  const totalStudents = batches.reduce((acc, curr) => acc + curr.studentCount, 0);
  const avgActivity = Math.round(batches.reduce((acc, curr) => acc + curr.codingActivity, 0) / (totalBatches || 1));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total Batches</span>
        </div>
        <div className="text-3xl font-black">{totalBatches}</div>
      </div>
      
      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Active Batches</span>
        </div>
        <div className="text-3xl font-black text-green-400">{activeBatches}</div>
      </div>

      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Mapped Students</span>
        </div>
        <div className="text-3xl font-black">{totalStudents.toLocaleString()}</div>
      </div>

      <div className="glass-panel border-border p-5 rounded-xl flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <Code className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Avg Code Activity</span>
        </div>
        <div className="text-3xl font-black text-primary">{avgActivity}%</div>
      </div>
    </div>
  );
};
