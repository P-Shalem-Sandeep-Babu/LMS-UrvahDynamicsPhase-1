import { 
  CodingPlatformProfile, 
  PlatformLeaderboardEntry, 
  PlatformSubmission, 
  TopicProgressEntry, 
  PracticeHeatmapCell 
} from "../types/codingPlatform";

// Key for storage persistence
const STORAGE_PROFILES_KEY = "lms_connected_coding_profiles";
const STORAGE_SUBMISSIONS_KEY = "lms_coding_submissions_history";

const defaultProfiles: CodingPlatformProfile[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    logo: "/styles/icons/leetcode.png",
    handle: "binary_coderX",
    isConnected: true,
    profileUrl: "https://leetcode.com/binary_coderX",
    lastSyncedAt: new Date(Date.now() - 3600000 * 2.5).toISOString(), // 2.5 hours ago
    stats: {
      rank: "Guardian",
      rating: 2185,
      totalSolved: 482,
      difficultyAnalytics: {
        easy: 180,
        medium: 240,
        hard: 62,
        totalEasy: 650,
        totalMedium: 1400,
        totalHard: 550
      },
      streak: 24,
      percentile: 98.4,
      globalRank: 14201,
      contestsCount: 18,
      ratingImprovement: 75
    }
  },
  {
    id: "codeforces",
    name: "Codeforces",
    logo: "/styles/icons/codeforces.png",
    handle: "",
    isConnected: false,
    profileUrl: "https://codeforces.com/profile/",
    stats: {
      rank: "Pupil",
      rating: 1320,
      totalSolved: 114,
      difficultyAnalytics: {
        easy: 75,
        medium: 32,
        hard: 7,
        totalEasy: 800,
        totalMedium: 1200,
        totalHard: 1000
      },
      streak: 0,
      percentile: 65.0,
      globalRank: 44102,
      contestsCount: 4,
      ratingImprovement: -12
    }
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    logo: "/styles/icons/hackerrank.png",
    handle: "babuss_p05",
    isConnected: true,
    profileUrl: "https://hackerrank.com/babuss_p05",
    lastSyncedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    stats: {
      rank: "6-Star Coder",
      rating: 1890,
      totalSolved: 324,
      difficultyAnalytics: {
        easy: 200,
        medium: 104,
        hard: 20,
        totalEasy: 500,
        totalMedium: 800,
        totalHard: 400
      },
      streak: 12,
      percentile: 94.2,
      globalRank: 8905,
      contestsCount: 12,
      ratingImprovement: 110
    }
  },
  {
    id: "codechef",
    name: "CodeChef",
    logo: "/styles/icons/codechef.png",
    handle: "",
    isConnected: false,
    profileUrl: "https://codechef.com/users/",
    stats: {
      rank: "1-Star",
      rating: 1140,
      totalSolved: 45,
      difficultyAnalytics: {
        easy: 30,
        medium: 12,
        hard: 3,
        totalEasy: 600,
        totalMedium: 1000,
        totalHard: 800
      },
      streak: 0,
      percentile: 45.1,
      globalRank: 78104,
      contestsCount: 1,
      ratingImprovement: 0
    }
  }
];

const initialSubmissions: PlatformSubmission[] = [
  {
    id: "sub_1",
    platform: "leetcode",
    problemName: "Container With Most Water",
    problemUrl: "https://leetcode.com/problems/container-with-most-water/",
    language: "C++",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 0.5).toISOString(), // 30 mins ago
    runtime: "48 ms",
    memory: "27.4 MB",
    codeSnippet: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int max_water = 0;
        int left = 0;
        int right = height.size() - 1;
        while (left < right) {
            int current_water = min(height[left], height[right]) * (right - left);
            max_water = max(max_water, current_water);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return max_water;
    }
};`
  },
  {
    id: "sub_2",
    platform: "leetcode",
    problemName: "Median of Two Sorted Arrays",
    problemUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    language: "Python3",
    status: "Wrong Answer",
    submittedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(), // 1.5 hours ago
    runtime: "N/A",
    memory: "N/A",
    codeSnippet: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Buggy O(m+n) naive merge where indices exceed
        merged = nums1 + nums2
        merged.sort()
        n = len(merged)
        return merged[n // 2] # Doesn't handle even lengths correctly`
  },
  {
    id: "sub_3",
    platform: "leetcode",
    problemName: "Median of Two Sorted Arrays",
    problemUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    language: "Python3",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 1.6).toISOString(), // 1.6 hours ago
    runtime: "76 ms",
    memory: "14.2 MB",
    codeSnippet: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total = len(nums1) + len(nums2)
        half = total // 2
        
        if len(B) < len(A):
            A, B = B, A
            
        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2 # A
            j = half - i - 2 # B
            
            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")
            
            if Aleft <= Bright and Bleft <= Aright:
                # odd
                if total % 2:
                    return min(Aright, Bright)
                # even
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1`
  },
  {
    id: "sub_4",
    platform: "hackerrank",
    problemName: "Array Manipulation (1D Range Queries)",
    problemUrl: "https://www.hackerrank.com/challenges/crush/problem",
    language: "Java",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    runtime: "280 ms",
    memory: "42.8 MB",
    codeSnippet: `public static long arrayManipulation(int n, List<List<Integer>> queries) {
    long[] differenceArray = new long[n + 2];
    for (List<Integer> query : queries) {
        int a = query.get(0);
        int b = query.get(1);
        long k = query.get(2);
        differenceArray[a] += k;
        differenceArray[b + 1] -= k;
    }
    long maxVal = 0;
    long currentSum = 0;
    for (int i = 1; i <= n; i++) {
        currentSum += differenceArray[i];
        if (currentSum > maxVal) {
            maxVal = currentSum;
        }
    }
    return maxVal;
}`
  },
  {
    id: "sub_5",
    platform: "leetcode",
    problemName: "Longest Palindromic Substring",
    problemUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    language: "C++",
    status: "Time Limit Exceeded",
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    runtime: "TLE",
    memory: "256 MB",
    codeSnippet: `// Naive O(N^3) palindrome check causing Time Limit Exceeded
class Solution {
public:
    string longestPalindrome(string s) {
        string res = "";
        for(int i=0; i<s.length(); ++i) {
            for(int j=i; j<s.length(); ++j) {
                string sub = s.substr(i, j-i+1);
                if(isPal(sub) && sub.length() > res.length()) {
                    res = sub;
                }
            }
        }
        return res;
    }
    bool isPal(string t) {
        string r = t;
        reverse(r.begin(), r.end());
        return r == t;
    }
};`
  },
  {
    id: "sub_6",
    platform: "leetcode",
    problemName: "Longest Palindromic Substring",
    problemUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    language: "C++",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 47.8).toISOString(), // 2 days ago
    runtime: "12 ms",
    memory: "7.1 MB",
    codeSnippet: `// O(N^2) Expand around center algorithm
class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substr(start, end - start + 1);
    }
private:
    int expandAroundCenter(string s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s[L] == s[R]) {
            L--;
            R++;
        }
        return R - L - 1;
    }
};`
  },
  {
    id: "sub_7",
    platform: "hackerrank",
    problemName: "Binary Search Tree : Lowest Common Ancestor",
    problemUrl: "https://www.hackerrank.com/challenges/binary-search-tree-lowest-common-ancestor/problem",
    language: "Python3",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    runtime: "140 ms",
    memory: "18.3 MB",
    codeSnippet: `def lca(root, v1, v2):
    # Decisive Tree traversal based on BST node ordering
    if root is None:
        return None
    if root.info > v1 and root.info > v2:
        return lca(root.left, v1, v2)
    if root.info < v1 and root.info < v2:
        return lca(root.right, v1, v2)
    return root`
  },
  {
    id: "sub_8",
    platform: "codeforces",
    problemName: "1850D - Balanced Round",
    problemUrl: "https://codeforces.com/problemset/problem/1850/D",
    language: "Kotlin",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
    runtime: "187 ms",
    memory: "12.4 MB"
  },
  {
    id: "sub_9",
    platform: "codechef",
    problemName: "GIFTSRC - Gift Search",
    problemUrl: "https://www.codechef.com/problems/GIFTSRC",
    language: "Java",
    status: "Accepted",
    submittedAt: new Date(Date.now() - 3600000 * 150).toISOString(), // 6 days ago
    runtime: "110 ms",
    memory: "25.1 MB"
  },
  {
    id: "sub_10",
    platform: "leetcode",
    problemName: "Merge k Sorted Lists",
    problemUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    language: "C++",
    status: "Runtime Error",
    submittedAt: new Date(Date.now() - 3600000 * 200).toISOString(), // 8 days ago
    runtime: "N/A",
    memory: "N/A",
    codeSnippet: `// Caused segmentation fault due to null node indexing
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        // Failing to check for empty list node items
        while(lists[0] != nullptr) {
            curr->next = lists[0];
            lists[0] = lists[0]->next;
        }
        return dummy->next;
    }
};`
  }
];

export const getClassLeaderboard = (): PlatformLeaderboardEntry[] => {
  return [
    {
      rank: 1,
      studentName: "Aditya Hegde",
      leetcodeSolved: 512,
      codeforcesRating: 1845,
      codechefStars: 5,
      hackerrankSolved: 412,
      totalSolved: 924,
      dailyStreak: 45,
      recentImprovement: 120
    },
    {
      rank: 2,
      studentName: "Sai Kiran (You)",
      avatar: "currentUser",
      isCurrentUser: true,
      leetcodeSolved: 482,
      codeforcesRating: 0, // Not connected
      codechefStars: 0,    // Not connected
      hackerrankSolved: 324,
      totalSolved: 806,
      dailyStreak: 24,
      recentImprovement: 75
    },
    {
      rank: 3,
      studentName: "Priyanka Shenoy",
      leetcodeSolved: 380,
      codeforcesRating: 1610,
      codechefStars: 4,
      hackerrankSolved: 290,
      totalSolved: 830,
      dailyStreak: 18,
      recentImprovement: 90
    },
    {
      rank: 4,
      studentName: "Manoj Deshpande",
      leetcodeSolved: 410,
      codeforcesRating: 1490,
      codechefStars: 3,
      hackerrankSolved: 210,
      totalSolved: 770,
      dailyStreak: 30,
      recentImprovement: 45
    },
    {
      rank: 5,
      studentName: "Ananya Rao",
      leetcodeSolved: 290,
      codeforcesRating: 1530,
      codechefStars: 4,
      hackerrankSolved: 310,
      totalSolved: 750,
      dailyStreak: 15,
      recentImprovement: 60
    },
    {
      rank: 6,
      studentName: "Vikram Sen",
      leetcodeSolved: 320,
      codeforcesRating: 1210,
      codechefStars: 2,
      hackerrankSolved: 240,
      totalSolved: 680,
      dailyStreak: 0,
      recentImprovement: -15
    },
    {
      rank: 7,
      studentName: "Rohan Kulkarni",
      leetcodeSolved: 240,
      codeforcesRating: 1350,
      codechefStars: 2,
      hackerrankSolved: 190,
      totalSolved: 580,
      dailyStreak: 8,
      recentImprovement: 30
    }
  ];
};

export const getTopicProgressData = (): TopicProgressEntry[] => {
  return [
    {
      topic: "Arrays & Sorting",
      solved: 145,
      total: 200,
      accuracy: 88,
      difficultyBreakdown: { easy: 80, medium: 55, hard: 10 }
    },
    {
      topic: "Strings & Regex",
      solved: 94,
      total: 120,
      accuracy: 82,
      difficultyBreakdown: { easy: 50, medium: 38, hard: 6 }
    },
    {
      topic: "Data Structures (Stack/Queue/List)",
      solved: 112,
      total: 150,
      accuracy: 84,
      difficultyBreakdown: { easy: 60, medium: 44, hard: 8 }
    },
    {
      topic: "Trees & Graphs",
      solved: 68,
      total: 110,
      accuracy: 71,
      difficultyBreakdown: { easy: 24, medium: 32, hard: 12 }
    },
    {
      topic: "Dynamic Programming",
      solved: 34,
      total: 90,
      accuracy: 48,
      difficultyBreakdown: { easy: 10, medium: 18, hard: 6 }
    },
    {
      topic: "Number Theory & Prime Math",
      solved: 51,
      total: 80,
      accuracy: 64,
      difficultyBreakdown: { easy: 26, medium: 21, hard: 4 }
    }
  ];
};

// Heatmap generator for last 6 months
export const getPlatformHeatmap = (profiles: CodingPlatformProfile[]): PracticeHeatmapCell[] => {
  const cells: PracticeHeatmapCell[] = [];
  const now = new Date();
  
  // Create last 182 days (26 weeks)
  for (let i = 181; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 3600000);
    const dateStr = d.toISOString().split("T")[0];
    
    // Base random count
    let count = 0;
    const platformDeltas: Record<"leetcode" | "codeforces" | "codechef" | "hackerrank", number> = {
      leetcode: 0,
      codeforces: 0,
      codechef: 0,
      hackerrank: 0
    };

    // Only generate commits if connected
    profiles.forEach(p => {
      if (p.isConnected) {
        const prob = p.id === "leetcode" ? 0.35 : p.id === "hackerrank" ? 0.25 : 0.15;
        if (Math.random() < prob) {
          const delta = Math.floor(Math.random() * 3) + 1;
          platformDeltas[p.id] = delta;
          count += delta;
        }
      }
    });

    // Submissions are higher mid-week, lower on weekends
    const day = d.getDay();
    if (day === 0 || day === 6) {
      count = Math.max(0, count - 1);
    }

    cells.push({
      date: dateStr,
      count,
      platformDeltas
    });
  }

  return cells;
};

// Retrieve connected profiles from local storage or returns baseline defaults
export const getConnectedProfiles = (): CodingPlatformProfile[] => {
  const stored = localStorage.getItem(STORAGE_PROFILES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse connected profiles", e);
    }
  }
  return defaultProfiles;
};

// Persist the profiles state
export const saveConnectedProfiles = (profiles: CodingPlatformProfile[]) => {
  localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
  // Fire storage updated event for instant reactivity
  window.dispatchEvent(new Event("storage_coding_profiles_updated"));
};

// Get Submissions list
export const getSubmissionsHistory = (): PlatformSubmission[] => {
  const stored = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse submissions history", e);
    }
  }
  return initialSubmissions;
};

// Save a new submission or full list
export const saveSubmissionsHistory = (subs: PlatformSubmission[]) => {
  localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(subs));
  window.dispatchEvent(new Event("storage_coding_submissions_updated"));
};

// Mock sync behavior
export const synchronizeProfileFromPlatform = async (
  platformId: "leetcode" | "codeforces" | "codechef" | "hackerrank",
  handle: string
): Promise<CodingPlatformProfile> => {
  // Simulate network latency (Future API fetch trigger point)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const allProfiles = getConnectedProfiles();
  const index = allProfiles.findIndex(p => p.id === platformId);
  if (index === -1) {
    throw new Error("Invalid platform mapping index");
  }

  const currentProf = allProfiles[index];
  
  // Custom mock values to simulate updated sync telemetry
  const deltaSolved = Math.floor(Math.random() * 12) + 3;
  const ratingShift = Math.floor(Math.random() * 30) + 10;
  
  const originalEasy = currentProf.stats?.difficultyAnalytics.easy || 10;
  const originalMedium = currentProf.stats?.difficultyAnalytics.medium || 10;
  const originalHard = currentProf.stats?.difficultyAnalytics.hard || 10;

  const addedEasy = Math.floor(deltaSolved * 0.4);
  const addedMedium = Math.floor(deltaSolved * 0.5);
  const addedHard = deltaSolved - addedEasy - addedMedium;

  const updatedProfile: CodingPlatformProfile = {
    ...currentProf,
    handle: handle,
    isConnected: !!handle,
    lastSyncedAt: new Date().toISOString(),
    profileUrl: platformId === "leetcode" ? `https://leetcode.com/${handle}` :
                platformId === "codeforces" ? `https://codeforces.com/profile/${handle}` :
                platformId === "codechef" ? `https://codechef.com/users/${handle}` :
                `https://hackerrank.com/${handle}`,
    stats: currentProf.stats ? {
      ...currentProf.stats,
      totalSolved: currentProf.stats.totalSolved + deltaSolved,
      rating: currentProf.stats.rating > 0 ? currentProf.stats.rating + ratingShift : (platformId === "codeforces" ? 1350 : platformId === "codechef" ? 1210 : 0),
      streak: currentProf.stats.streak === 0 ? 1 : currentProf.stats.streak + 1,
      ratingImprovement: ratingShift,
      difficultyAnalytics: {
        ...currentProf.stats.difficultyAnalytics,
        easy: originalEasy + addedEasy,
        medium: originalMedium + addedMedium,
        hard: originalHard + addedHard
      }
    } : undefined
  };

  // Add a new mock submission reflecting this sync to the submission history
  if (handle) {
    const historicalSubmissions = getSubmissionsHistory();
    const mockProblems = {
      leetcode: [
        { name: "3Sum Closest", url: "https://leetcode.com/problems/3sum-closest/" },
        { name: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
        { name: "Unique Paths II", url: "https://leetcode.com/problems/unique-paths-ii/" }
      ],
      codeforces: [
        { name: "1721B - Deadly Laser", url: "https://codeforces.com/problemset/problem/1721/B" },
        { name: "1632C - Strange Test", url: "https://codeforces.com/problemset/problem/1632/C" }
      ],
      codechef: [
        { name: "AVG_VAL - Average Value Query", url: "https://www.codechef.com/problems/AVG_VAL" },
        { name: "STRLEN - Extreme Strings", url: "https://www.codechef.com/problems/STRLEN" }
      ],
      hackerrank: [
        { name: "Self Balancing Tree (AVL AVL Tree Rotations)", url: "https://www.hackerrank.com/challenges/self-balancing-tree/problem" },
        { name: "Kingdom Division (Tree DP)", url: "https://www.hackerrank.com/challenges/kingdom-division/problem" }
      ]
    };

    const problemPool = mockProblems[platformId];
    const pickedProblem = problemPool[Math.floor(Math.random() * problemPool.length)];

    const newSub: PlatformSubmission = {
      id: `synced_sub_${Date.now()}`,
      platform: platformId,
      problemName: pickedProblem.name,
      problemUrl: pickedProblem.url,
      language: platformId === "leetcode" ? "C++" : platformId === "codeforces" ? "GNU C++20" : platformId === "codechef" ? "Java" : "Python3",
      status: "Accepted",
      submittedAt: new Date().toISOString(),
      runtime: `${Math.floor(Math.random() * 110) + 12} ms`,
      memory: `${(Math.random() * 15 + 10).toFixed(1)} MB`,
      codeSnippet: `// Synchronized successfully via Platform API (Mock Core V1)
// Platform: ${platformId.toUpperCase()}
// Handle: ${handle}
// Synchronized At: ${new Date().toLocaleDateString()}`
    };

    saveSubmissionsHistory([newSub, ...historicalSubmissions]);
  }

  // Update lists and save
  const updatedProfiles = allProfiles.map(p => p.id === platformId ? updatedProfile : p);
  saveConnectedProfiles(updatedProfiles);

  return updatedProfile;
};
