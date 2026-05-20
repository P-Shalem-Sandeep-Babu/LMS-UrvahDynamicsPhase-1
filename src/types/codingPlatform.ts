export type CodingPlatformId = "leetcode" | "codeforces" | "codechef" | "hackerrank";

export interface PlatformDifficultyStats {
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

export interface PlatformStats {
  rank: string;
  rating: number;
  totalSolved: number;
  difficultyAnalytics: PlatformDifficultyStats;
  streak: number;
  percentile: number;
  globalRank: number;
  contestsCount: number;
  ratingImprovement: number;
}

export interface CodingPlatformProfile {
  id: CodingPlatformId;
  name: string;
  logo: string; // url or placeholder
  handle: string;
  isConnected: boolean;
  profileUrl: string;
  syncToken?: string;
  lastSyncedAt?: string;
  stats?: PlatformStats;
}

export interface PracticeHeatmapCell {
  date: string; // YYYY-MM-DD
  count: number;
  platformDeltas: Record<CodingPlatformId, number>;
}

export interface PlatformLeaderboardEntry {
  rank: number;
  studentName: string;
  avatar?: string;
  isCurrentUser?: boolean;
  leetcodeSolved: number;
  codeforcesRating: number;
  codechefStars: number; // e.g., 3 star
  hackerrankSolved: number;
  totalSolved: number;
  dailyStreak: number;
  recentImprovement: number; // delta rank points
}

export interface PlatformSubmission {
  id: string;
  platform: CodingPlatformId;
  problemName: string;
  problemUrl: string;
  language: string;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
  submittedAt: string; // ISO or human read duration
  runtime?: string;
  memory?: string;
  codeSnippet?: string; // Optional code view
}

export interface TopicProgressEntry {
  topic: string;
  solved: number;
  total: number;
  accuracy: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}
