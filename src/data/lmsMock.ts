export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  tags: string[];
  thumbnail: string;
  lastAccessed: string;
}

export const lmsMockData = {
  courses: [
    {
      id: "course_1",
      title: "Advanced Data Structures & Algorithms",
      description: "Master complex data structures and algorithmic patterns for competitive programming and technical interviews.",
      instructor: "Dr. Emily Chen",
      progress: 78,
      tags: ["Algorithms", "Python", "C++"],
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=300",
      lastAccessed: "2 hours ago"
    },
    {
      id: "course_2",
      title: "Modern React & Server Components",
      description: "Deep dive into React 18, RSC, Next.js architecture, and advanced state management patterns.",
      instructor: "Marcus Wright",
      progress: 34,
      tags: ["React", "TypeScript", "Frontend"],
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300",
      lastAccessed: "1 day ago"
    },
    {
      id: "course_3",
      title: "System Design for Enterprise",
      description: "Learn to design scalable, highly available systems for millions of users.",
      instructor: "Sarah Connor",
      progress: 0,
      tags: ["System Design", "Architecture", "Backend"],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=300",
      lastAccessed: "Not started"
    },
    {
      id: "course_4",
      title: "Machine Learning Foundations",
      description: "Mathematical foundations of ML, neural networks, and deep learning basics.",
      instructor: "Dr. Emily Chen",
      progress: 100,
      tags: ["AI", "Python", "Math"],
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=300",
      lastAccessed: "2 weeks ago"
    }
  ],
  students: [
    { id: "s1", name: "Alex Mercer", email: "alex@urvah.edu", enrolled: 4, completionRate: 85, lastActive: "Just now", gpa: 3.8 },
    { id: "s2", name: "David Kim", email: "david@urvah.edu", enrolled: 3, completionRate: 92, lastActive: "1 hr ago", gpa: 4.0 },
    { id: "s3", name: "Sarah Chen", email: "sarah@urvah.edu", enrolled: 5, completionRate: 64, lastActive: "2 days ago", gpa: 3.2 },
    { id: "s4", name: "Jessica Wong", email: "jessica@urvah.edu", enrolled: 2, completionRate: 45, lastActive: "5 mins ago", gpa: 3.5 }
  ]
};
