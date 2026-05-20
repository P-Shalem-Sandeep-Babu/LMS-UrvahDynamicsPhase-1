import { GamificationProfile, Badge, Achievement, XPEvent, LeaderboardUser } from "../types/gamification";

export const mockBadges: Badge[] = [
  {
    id: "badge_1",
    name: "First Blood",
    description: "Solve your first coding challenge.",
    icon: "Target",
    earnedAt: "2026-05-10T10:00:00Z",
    isEquipped: true,
  },
  {
    id: "badge_2",
    name: "Streak Master",
    description: "Maintain a 7-day login and coding streak.",
    icon: "Flame",
    earnedAt: "2026-05-17T12:00:00Z",
  },
  {
    id: "badge_3",
    name: "Algorithm Ace",
    description: "Complete 50 intermediate algorithm problems.",
    icon: "Brain",
  },
  {
    id: "badge_4",
    name: "Flawless Victor",
    description: "Pass all test cases on the first try 10 times.",
    icon: "Shield",
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: "ach_1",
    title: "100 Days of Code",
    description: "Commit to coding for 100 days.",
    progress: 42,
    maxProgress: 100,
    isCompleted: false,
    xpReward: 5000,
  },
  {
    id: "ach_2",
    title: "Bug Squasher",
    description: "Successfully debug and submit 10 failed challenges.",
    progress: 10,
    maxProgress: 10,
    isCompleted: true,
    xpReward: 1000,
  },
  {
    id: "ach_3",
    title: "Speed Demon",
    description: "Submit a correct solution in under 5 minutes.",
    progress: 0,
    maxProgress: 1,
    isCompleted: false,
    xpReward: 500,
  }
];

export const mockXPHistory: XPEvent[] = [
  { id: "xp_1", reason: "Daily Login Streak", xpAmount: 50, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "xp_2", reason: "Completed Two Sum Variants", xpAmount: 150, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "xp_3", reason: "Achievement Unlocked: Bug Squasher", xpAmount: 1000, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: "xp_4", reason: "Submitted Assignment early", xpAmount: 200, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
];

export const mockProfile: GamificationProfile = {
  xp: 8450,
  xpToNextRank: 10000,
  rank: "Intermediate",
  currentStreak: 12,
  longestStreak: 21,
  badges: mockBadges,
  achievements: mockAchievements,
};

export const mockLeaderboard: LeaderboardUser[] = [
  { id: "u_1", name: "Alex Chen", rank: "Elite Solver", xp: 45200, badges: ["badge_1", "badge_4"] },
  { id: "u_2", name: "Sarah Smith", rank: "Pro Coder", xp: 32100, badges: ["badge_3", "badge_2"] },
  { id: "u_3", name: "You (Cadet)", rank: "Intermediate", xp: 8450, badges: ["badge_1"] },
  { id: "u_4", name: "Mike Johnson", rank: "Intermediate", xp: 7200, badges: [] },
  { id: "u_5", name: "Emma Wilson", rank: "Beginner", xp: 2500, badges: ["badge_1"] },
];
