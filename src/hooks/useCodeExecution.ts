import { useState } from "react";
import { executeCode, ExecutionResult } from "../services/compilerMock";

export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const runCode = async (code: string, language: string, stdin: string) => {
    setIsRunning(true);
    setResult(null);
    try {
      const execResult = await executeCode(code, language, stdin, false);
      setResult(execResult);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async (code: string, language: string) => {
    setIsSubmitting(true);
    setResult(null);
    try {
      const execResult = await executeCode(code, language, "", true);
      setResult(execResult);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetResult = () => setResult(null);

  return {
    runCode,
    submitCode,
    resetResult,
    isRunning,
    isSubmitting,
    result
  };
};
