export interface ScheduledChallenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  scheduledDate: string; // ISO format
  status: "pending" | "published" | "failed";
}

export interface AutomationConfig {
  isEnabled: boolean;
  scheduleTime: string; // "03:00 AM"
  maxQueueDays: number;
}
