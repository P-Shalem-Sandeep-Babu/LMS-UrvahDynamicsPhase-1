export type GamificationRank = "Beginner" | "Intermediate" | "Pro Coder" | "Elite Solver";

export interface GamificationProfile {
  xp: number;
  xpToNextRank: number;
  rank: GamificationRank;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  achievements: Achievement[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  isEquipped?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  xpReward: number;
}

export interface XPEvent {
  id: string;
  reason: string;
  xpAmount: number;
  createdAt: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  rank: GamificationRank;
  xp: number;
  badges: string[];
}
