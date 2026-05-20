import React from "react";
import { Users, BookOpen, Activity, GraduationCap } from "lucide-react";
import { Trainer } from "../../../types/trainer";

interface TrainerAnalyticsWidgetProps {
  trainers: Trainer[];
}

export const TrainerAnalyticsWidget: React.FC<TrainerAnalyticsWidgetProps> = ({ trainers }) => {
  const activeTrainers = trainers.filter(t => t.status === "active").length;
  const totalStudents = trainers.reduce((acc, t) => acc + t.activeStudents, 0);
  const avgEngagement = trainers.reduce((acc, t) => acc + t.codingEngagement, 0) / (trainers.length || 1);
  const totalBatches = trainers.reduce((acc, t) => acc + t.assignedBatches.length, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest">Active Trainers</p>
          <p className="text-xl font-bold">{activeTrainers} / {trainers.length}</p>
        </div>
      </div>
      
      <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest">Active Batches</p>
          <p className="text-xl font-bold">{totalBatches}</p>
        </div>
      </div>
      
      <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest">Students Monitored</p>
          <p className="text-xl font-bold">{totalStudents}</p>
        </div>
      </div>
      
      <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest">Avg Engagement</p>
          <p className="text-xl font-bold">{avgEngagement.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
};
