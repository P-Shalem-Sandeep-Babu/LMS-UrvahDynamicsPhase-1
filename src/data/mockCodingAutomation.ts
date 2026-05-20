import { ScheduledChallenge, AutomationConfig } from "../types/coding-automation";

export const mockAutomationConfig: AutomationConfig = {
  isEnabled: true,
  scheduleTime: "03:00 AM",
  maxQueueDays: 7
};

export const mockScheduledChallenges: ScheduledChallenge[] = [
  {
    id: "chal_1",
    title: "Two Sum Variants",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    scheduledDate: "2026-05-18T03:00:00Z",
    status: "published"
  },
  {
    id: "chal_2",
    title: "LRU Cache Implementation",
    difficulty: "Medium",
    topic: "Design",
    scheduledDate: "2026-05-19T03:00:00Z",
    status: "pending"
  },
  {
    id: "chal_3",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Linked Lists",
    scheduledDate: "2026-05-20T03:00:00Z",
    status: "pending"
  },
  {
    id: "chal_4",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    topic: "Trees",
    scheduledDate: "2026-05-21T03:00:00Z",
    status: "pending"
  },
  {
    id: "chal_5",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    scheduledDate: "2026-05-17T03:00:00Z",
    status: "published"
  }
];
