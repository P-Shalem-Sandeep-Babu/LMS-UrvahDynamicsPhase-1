export interface ExecutionResult {
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compile Error" | "Runtime Error";
  executionTime: number; // ms
  memory: number; // MB
  passed: number;
  total: number;
  stdout: string;
  stderr: string;
}

export const executeCode = async (
  code: string,
  language: string,
  stdin: string,
  isSubmit: boolean = false
): Promise<ExecutionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!code.trim()) {
    return {
      status: "Compile Error",
      executionTime: 0,
      memory: 0,
      passed: 0,
      total: 10,
      stdout: "",
      stderr: "SyntaxError: Unexpected end of input\n    at internal/compile"
    };
  }

  if (isSubmit) {
    // 80% passing chance for mock
    const pass = Math.random() > 0.2;
    if (pass) {
      return {
        status: "Accepted",
        executionTime: Math.floor(Math.random() * 50) + 10,
        memory: Math.floor(Math.random() * 15) + 5,
        passed: 10,
        total: 10,
        stdout: "Output verified successfully.",
        stderr: ""
      };
    } else {
      return {
        status: "Wrong Answer",
        executionTime: Math.floor(Math.random() * 50) + 10,
        memory: Math.floor(Math.random() * 15) + 5,
        passed: Math.floor(Math.random() * 9),
        total: 10,
        stdout: "Output: 42\nExpected: 43",
        stderr: ""
      };
    }
  }

  // Run only
  return {
    status: "Accepted",
    executionTime: Math.floor(Math.random() * 20) + 5,
    memory: Math.floor(Math.random() * 10) + 4,
    passed: 1,
    total: 1,
    stdout: "Sample Output:\nExecution finished.\n" + (stdin ? `Received input: ${stdin}` : ""),
    stderr: ""
  };
};
