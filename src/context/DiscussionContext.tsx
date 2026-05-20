import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Author {
  name: string;
  avatar: string;
  role: "student" | "faculty" | "trainer" | "admin";
}

export interface ThreadReply {
  id: string;
  author: Author;
  content: string;
  votes: number;
  createdAt: string;
}

export interface ThreadComment {
  id: string;
  author: Author;
  content: string;
  votes: number;
  createdAt: string;
  isAccepted?: boolean;
  replies: ThreadReply[];
}

export interface DiscussionThread {
  id: string;
  title: string;
  preview: string;
  content?: string;
  author: Author;
  votes: number;
  replies: number;
  tags: string[];
  category: "general" | "coding" | "qna" | "announcements" | "resources" | "batch";
  createdAt: string;
  isSolved?: boolean;
  pinned?: boolean;
  comments?: ThreadComment[]; // For detailed view
}

interface DiscussionContextType {
  threads: DiscussionThread[];
  addThread: (thread: Omit<DiscussionThread, "id" | "createdAt" | "votes" | "replies">) => void;
  deleteThread: (id: string) => void;
  pinThread: (id: string, pinStatus: boolean) => void;
  upvoteThread: (id: string) => void;
  downvoteThread: (id: string) => void;
  addComment: (threadId: string, comment: string, author: Author) => void;
  addReply: (threadId: string, commentId: string, reply: string, author: Author) => void;
  acceptComment: (threadId: string, commentId: string) => void;
}

const mockThreads: DiscussionThread[] = [
  {
    id: "t_101",
    title: "How to perfectly balance a Binary Search Tree in O(N)?",
    preview: "I'm working on the advanced data structures homework and I'm struggling to understand the Day-Stout-Warren algorithm.",
    content: "I'm working on the advanced data structures homework and I'm struggling to understand the Day-Stout-Warren algorithm. Can someone explain the DSW algorithm in simple terms?\n\nI understand we first need to convert the tree into a backbone (vine) using right rotations, but the second phase where we do left rotations to make it perfectly balanced is confusing to me. \n\nHere is my code for the right rotation phase:\n```python\ndef tree_to_vine(root):\n    tail = root\n    rest = tail.right\n    while rest is not None:\n        if rest.left is None:\n            tail = rest\n            rest = rest.right\n        else:\n            temp = rest.left\n            rest.left = temp.right\n            temp.right = rest\n            rest = temp\n            tail.right = temp\n```\nIt seems to work, but the second phase falls apart. Help appreciated!",
    author: { name: "alex_mercer", avatar: "https://i.pravatar.cc/150?u=alex", role: "student" },
    votes: 42,
    replies: 2,
    tags: ["algorithms", "trees", "data-structures"],
    category: "coding",
    createdAt: "2 hours ago",
    isSolved: true,
    comments: [
      {
        id: "c_1",
        author: { name: "dr_chen", avatar: "https://i.pravatar.cc/150?u=chen", role: "faculty" },
        content: "Great question! The Day-Stout-Warren (DSW) algorithm is indeed tricky during the second phase.\n\nOnce you have your vine (a completely right-skewed tree), you essentially need to perform a series of left rotations. \n\nThe process works by determining the number of leaves `L` in the bottommost level of the perfectly balanced tree. You first perform `L` left rotations starting from the top of the vine. After that, you perform passes of left rotations, halving the number of rotations each time until the tree is balanced.\n\nThe math for calculating `L` involves finding the largest complete binary tree size less than or equal to `N`.",
        votes: 18,
        createdAt: "1 hour ago",
        isAccepted: true,
        replies: [
          {
            id: "c_1_1",
            author: { name: "alex_mercer", avatar: "https://i.pravatar.cc/150?u=alex", role: "student" },
            content: "Ah, that makes sense! I was messing up the math for `L`, leading to null pointer exceptions later in the rotations. Thank you Dr. Chen!",
            votes: 3,
            createdAt: "45 mins ago"
          }
        ]
      },
      {
        id: "c_2",
        author: { name: "david_kim", avatar: "https://i.pravatar.cc/150?u=david", role: "student" },
        content: "Just to add to what Dr. Chen said, make sure you keep track of the parent node during those left rotations. Since the structure is completely linear at the start of phase 2, it's easy to accidentally orphan nodes.",
        votes: 5,
        createdAt: "30 mins ago",
        isAccepted: false,
        replies: []
      }
    ]
  },
  {
    id: "t_102",
    title: "Need help with React useEffect infinitely looping",
    preview: "I'm trying to fetch data from the API when component mounts, but it keeps fetching endlessly. Here is my code snippet...",
    author: { name: "sarah_c", avatar: "https://i.pravatar.cc/150?u=sarah", role: "student" },
    votes: 12,
    replies: 0,
    tags: ["react", "hooks", "frontend"],
    category: "qna",
    createdAt: "4 hours ago",
    isSolved: false
  },
  {
    id: "t_103",
    title: "[Announcement] Midterm Project Repository Guidelines",
    preview: "Attention all students, please ensure your GitHub repositories conform to the updated naming conventions before Friday. Failure to do so will result in automated test failures.",
    author: { name: "dr_chen", avatar: "https://i.pravatar.cc/150?u=chen", role: "faculty" },
    votes: 156,
    replies: 0,
    tags: ["announcement", "guidelines", "git"],
    category: "announcements",
    createdAt: "1 day ago",
    pinned: true,
  },
  {
    id: "t_104",
    title: "Best resources for learning Dynamic Programming?",
    preview: "DP always trips me up during contests. What are the best visual resources or platforms to really understand the intuition behind state transitions?",
    author: { name: "david_kim", avatar: "https://i.pravatar.cc/150?u=david", role: "student" },
    votes: 89,
    replies: 0,
    tags: ["dynamic-programming", "resources", "contest-prep"],
    category: "resources",
    createdAt: "2 days ago",
  }
];

const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);

export const DiscussionProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<DiscussionThread[]>(mockThreads);

  const addThread = (threadData: Omit<DiscussionThread, "id" | "createdAt" | "votes" | "replies">) => {
    const newThread: DiscussionThread = {
      ...threadData,
      id: `t_${Date.now()}`,
      createdAt: "Just now",
      votes: 0,
      replies: 0,
      comments: [],
    };
    setThreads([newThread, ...threads]);
  };

  const deleteThread = (id: string) => {
    setThreads(threads.filter(t => t.id !== id));
  };

  const pinThread = (id: string, pinStatus: boolean) => {
    setThreads(threads.map(t => t.id === id ? { ...t, pinned: pinStatus } : t));
  };

  const upvoteThread = (id: string) => {
    setThreads(threads.map(t => t.id === id ? { ...t, votes: t.votes + 1 } : t));
  };

  const downvoteThread = (id: string) => {
    setThreads(threads.map(t => t.id === id ? { ...t, votes: Math.max(0, t.votes - 1) } : t));
  };

  const addComment = (threadId: string, content: string, author: Author) => {
    setThreads(threads.map(t => {
      if (t.id === threadId) {
        const newComment: ThreadComment = {
          id: `c_${Date.now()}`,
          author,
          content,
          votes: 0,
          createdAt: "Just now",
          replies: []
        };
        return {
          ...t,
          replies: t.replies + 1,
          comments: [...(t.comments || []), newComment]
        };
      }
      return t;
    }));
  };

  const addReply = (threadId: string, commentId: string, content: string, author: Author) => {
    setThreads(threads.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: t.replies + 1,
          comments: t.comments?.map(c => {
            if (c.id === commentId) {
              const newReply: ThreadReply = {
                id: `r_${Date.now()}`,
                author,
                content,
                votes: 0,
                createdAt: "Just now"
              };
              return {
                ...c,
                replies: [...c.replies, newReply]
              };
            }
            return c;
          })
        };
      }
      return t;
    }));
  };

  const acceptComment = (threadId: string, commentId: string) => {
    setThreads(threads.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          isSolved: true,
          comments: t.comments?.map(c => 
            c.id === commentId ? { ...c, isAccepted: true } : { ...c, isAccepted: false }
          )
        };
      }
      return t;
    }));
  };

  return (
    <DiscussionContext.Provider value={{ 
      threads, addThread, deleteThread, pinThread, 
      upvoteThread, downvoteThread, addComment, addReply, acceptComment 
    }}>
      {children}
    </DiscussionContext.Provider>
  );
};

export const useDiscussion = () => {
  const context = useContext(DiscussionContext);
  if (context === undefined) {
    throw new Error("useDiscussion must be used within a DiscussionProvider");
  }
  return context;
};
