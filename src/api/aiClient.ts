export interface AILoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AIResponse<T> {
  data: T;
  confidenceScore: number;
  generatedAt: string;
}

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const aiClient = {
  // Mock endpoint for Weak Student Prediction
  async predictWeakStudents(): Promise<AIResponse<any>> {
    await delay(1000);
    return {
      data: [
        { id: "stu_1", name: "Alex Mercer", riskLevel: "High", reason: "Consistent low scores in Dynamic Programming" },
        { id: "stu_2", name: "Sarah Connor", riskLevel: "Medium", reason: "Declining attendance in recent weeks" }
      ],
      confidenceScore: 0.85,
      generatedAt: new Date().toISOString()
    };
  },

  // Mock endpoint for Coding Recommendations
  async getCodingRecommendations(studentId: string): Promise<AIResponse<any>> {
    await delay(800);
    return {
      data: [
        { topic: "Graph Traversal", suggestedResource: "BFS & DFS Deep Dive", reason: "Missed 3 graph questions in recent contest" },
        { topic: "Dynamic Programming", suggestedResource: "Memoization 101", reason: "Slow execution time on overlapping subproblems" }
      ],
      confidenceScore: 0.92,
      generatedAt: new Date().toISOString()
    };
  },

  // Mock endpoint for Performance Insights
  async getPerformanceInsights(entityId: string, role: string): Promise<AIResponse<any>> {
    await delay(900);
    return {
      data: {
        trend: "Improving",
        keyStrengths: ["Data Structures", "Speed"],
        areasForImprovement: ["Advanced Math", "System Design"],
        summary: "Overall trajectory is positive, but consistent practice in identified weak areas is recommended."
      },
      confidenceScore: 0.88,
      generatedAt: new Date().toISOString()
    };
  },

  // Mock endpoint for Attendance Insights
  async getAttendanceInsights(batchId: string): Promise<AIResponse<any>> {
    await delay(700);
    return {
      data: {
        riskCategory: "Low",
        predictedDropouts: 2,
        insights: "Attendance patterns are stable. Friday morning sessions show 15% lower turnout."
      },
      confidenceScore: 0.78,
      generatedAt: new Date().toISOString()
    };
  },

  // Mock endpoint for AI-Generated Coding Sheets
  async generateCodingSheet(topic: string, difficulty: string): Promise<AIResponse<any>> {
    await delay(1200);
    return {
      data: {
        title: `AI Curated: ${topic} (${difficulty})`,
        problems: [
          { name: "Optimal Path Finder", type: "Algorithmic", expectedTime: "30m" },
          { name: "Data Stream Median", type: "Data Structure", expectedTime: "45m" }
        ],
        conceptFocus: "Space-time tradeoff optimization"
      },
      confidenceScore: 0.95,
      generatedAt: new Date().toISOString()
    };
  },

  // Mock endpoint for Chatbot Assistant
  async sendChatbotQuery(query: string, context?: any): Promise<AIResponse<string>> {
    await delay(1000);
    return {
      data: `I'm your AI Assistant. I see you asked: "${query}". While I'm currently running in simulation mode, my architecture is ready to be hooked up to a real LLM backend.`,
      confidenceScore: 0.99,
      generatedAt: new Date().toISOString()
    };
  }
};
