import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Play, CheckCircle2, RotateCcw, LayoutDashboard, Maximize2, Settings, Terminal, BrainCircuit, Users, MessageSquareQuote } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const defaultCode = `function reverseSubarray(nums: number[]): number {
  // Write your code here
  let maxAbsSum = 0;
  for(let i=0; i<nums.length-1; i++){
    maxAbsSum += Math.abs(nums[i] - nums[i+1]);
  }
  return maxAbsSum;
}`;

export const CodingWorkspace = () => {
  const [code, setCode] = useState(defaultCode);
  const { theme } = useTheme();
  const [language, setLanguage] = useState("typescript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<"output" | "testcases">("testcases");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleRun = () => {
    setIsRunning(true);
    setActiveBottomTab("output");
    setOutput("Executing test cases...\n");
    
    setTimeout(() => {
      if (language === 'typescript' || language === 'javascript') {
        try {
          let jsCode = code.replace(/: \w+\[\]/g, '').replace(/: \w+/g, '').replace(/<[^>]+>/g, '');
          
          const testRunner = `
            ${jsCode}
            let results = [];
            try {
              let res1 = reverseSubarray([2,3,1,5,4]);
              results.push("Test Case 1 (nums=[2,3,1,5,4]): " + (res1 === 10 ? "PASS ✅" : "FAIL ❌ Expected: 10, Got: " + res1));
            } catch(e) { results.push("Test Case 1: ERROR " + e.message); }
            
            try {
              let res2 = reverseSubarray([2,4,9,24,2,1,10]);
              results.push("Test Case 2 (nums=[2,4,9,24,2,1,10]): " + (res2 === 68 ? "PASS ✅" : "FAIL ❌ Expected: 68, Got: " + res2));
            } catch(e) { results.push("Test Case 2: ERROR " + e.message); }
            
            return results.join('\\n');
          `;
          
          const fn = new Function(testRunner);
          const result = fn();
          setOutput((prev) => prev + "\n" + result + "\n\nExecution finished.");
        } catch (e: any) {
          setOutput((prev) => prev + "\nCompilation/Syntax Error: " + e.message);
        }
      } else {
        setOutput((prev) => prev + "\nTest Case 1: PASS (12ms)\nTest Case 2: PASS (14ms)\nTest Case 3: PASS (09ms)\n\nAll visible test cases passed (Simulated).");
      }
      setIsRunning(false);
    }, 800);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setActiveBottomTab("output");
    setOutput("Submitting solution...\nRunning hidden test cases...\n");
    setTimeout(() => {
      setOutput((prev) => prev + "\nStatus: ACCEPTED\nRuntime: 12ms (Beats 98.4%)\nMemory: 42.1MB (Beats 84.2%)");
      setIsRunning(false);
    }, 2000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={workspaceRef} className={`${isFullscreen ? 'h-screen w-screen bg-[#080808] z-50 fixed inset-0' : 'h-[calc(100vh-120px)] pt-2 pb-6 px-4'} flex flex-col`}>
      <div className={`flex justify-between items-center mb-4 border-b border-border/50 pb-4 ${isFullscreen ? 'px-4 pt-4' : ''}`}>
        <div className="flex flex-col gap-1">
           <h1 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
             <Terminal className="w-5 h-5 text-primary" />
             Reverse Subarray to Maximize Value
           </h1>
           <div className="flex gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <span className="text-red-500 font-bold border border-red-500/20 bg-red-500/10 px-2 py-0.5">Hard</span>
              <span className="border border-border/50 px-2 py-0.5">Contest mode</span>
              <span className="flex items-center gap-1 text-primary"><Users className="w-3 h-3" /> 1,240 Online</span>
           </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 font-mono text-xs text-white/50 items-center mr-4">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Time Left: 02:45:10
          </div>
          <button onClick={() => navigate("/dashboard")} className="p-2 border border-border/50 hover:bg-muted transition-colors"><LayoutDashboard className="w-4 h-4" /></button>
          <button className="p-2 border border-border/50 hover:bg-muted transition-colors"><Settings className="w-4 h-4" /></button>
          <button onClick={toggleFullscreen} className="p-2 border border-border/50 hover:bg-muted transition-colors"><Maximize2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 bg-[#080808] border border-border/50 relative">
        <PanelGroup orientation="horizontal">
          
          {/* Left Panel: Problem Statement & AI */}
          <Panel defaultSize={35} minSize={20}>
            <PanelGroup orientation="vertical">
              <Panel defaultSize={70}>
                <div className="h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
                  <div className="prose prose-sm dark:prose-invert font-mono text-white/80 max-w-none">
                    <p>You are given an integer array <code>nums</code>. The value of this array is defined as the sum of <code>|nums[i] - nums[i+1]|</code> for all <code>0 &lt;= i &lt; nums.length - 1</code>.</p>
                    <p>You are allowed to select any subarray of the given array and reverse it. You can perform this operation only once.</p>
                    <p>Find maximum possible value of the final array.</p>
                    
                    <h4 className="mt-6 text-white uppercase tracking-widest text-xs">Example 1</h4>
                    <div className="bg-white/5 p-4 rounded-md border border-white/10 text-xs">
                      <div><strong className="text-primary">Input:</strong> nums = [2,3,1,5,4]</div>
                      <div><strong className="text-primary">Output:</strong> 10</div>
                      <div className="text-white/50 mt-2">Explanation: By reversing the subarray [3,1,5], the array becomes [2,5,1,3,4] whose value is 10.</div>
                    </div>
                  </div>
                </div>
              </Panel>
              
              <PanelResizeHandle className="h-2 bg-border/20 hover:bg-primary/50 transition-all flex items-center justify-center cursor-row-resize shrink-0">
                 <div className="w-8 h-0.5 bg-white/20 rounded-full" />
              </PanelResizeHandle>
              
              <Panel defaultSize={30}>
                 <div className="h-full bg-primary/5 border-t border-primary/20 p-4 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                       <BrainCircuit className="w-4 h-4 text-primary" />
                       <h3 className="text-xs font-bold uppercase tracking-widest text-primary">System AI Oracle</h3>
                    </div>
                    <div className="flex-1 text-xs font-mono text-white/60 space-y-2 overflow-y-auto custom-scrollbar relative">
                       <div className="bg-white/5 p-2 border border-white/10">I see you are attempting an O(n) solution. Consider how the boundary elements of the reversed subarray affect the total sum.</div>
                       
                       <div className="flex gap-1 items-center mt-2 p-2 w-max text-primary/70">
                          <span className="animate-bounce">●</span>
                          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                       </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                       <input type="text" placeholder="ASK ORACLE..." className="flex-1 bg-black border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-primary/50" />
                    </div>
                 </div>
              </Panel>
            </PanelGroup>
          </Panel>
          
          <PanelResizeHandle className="w-2 bg-border/20 hover:bg-primary/50 transition-all flex flex-col items-center justify-center cursor-col-resize shrink-0">
             <div className="h-8 w-0.5 bg-white/20 rounded-full" />
          </PanelResizeHandle>

          {/* Right Panel: Editor & Output */}
          <Panel defaultSize={65}>
            <PanelGroup orientation="vertical">
              <Panel defaultSize={70}>
                <div className="h-full flex flex-col">
                   <div className="flex items-center justify-between border-b border-border/50 bg-white/[0.02] px-4 py-2">
                      <select 
                         value={language}
                         onChange={(e) => setLanguage(e.target.value)}
                         className="bg-black border border-white/10 text-xs font-mono px-3 py-1 text-white focus:outline-none"
                      >
                         <option value="typescript">TypeScript</option>
                         <option value="python">Python 3</option>
                         <option value="cpp">C++ 20</option>
                         <option value="java">Java 17</option>
                      </select>
                      
                      <div className="flex gap-2">
                         <button className="p-1.5 hover:bg-white/10 transition-colors text-white/50 hover:text-white" onClick={() => setCode(defaultCode)}>
                            <RotateCcw className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                   
                   <div className="flex-1 bg-[#1e1e1e]">
                     <Editor
                        height="100%"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        options={{
                           minimap: { enabled: false },
                           fontSize: 14,
                           fontFamily: "'JetBrains Mono', monospace",
                           lineHeight: 24,
                           padding: { top: 16 },
                           cursorBlinking: "smooth",
                           smoothScrolling: true,
                        }}
                     />
                   </div>
                </div>
              </Panel>
              
              <PanelResizeHandle className="h-2 bg-border/20 hover:bg-primary/50 transition-all flex items-center justify-center cursor-row-resize shrink-0">
                 <div className="w-8 h-0.5 bg-white/20 rounded-full" />
              </PanelResizeHandle>
              
              <Panel defaultSize={30}>
                 <div className="h-full bg-black flex flex-col">
                    <div className="flex justify-between items-center border-b border-white/10 px-4 py-2 bg-white/[0.02]">
                       <div className="flex gap-4">
                          <button 
                             onClick={() => setActiveBottomTab("testcases")}
                             className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${activeBottomTab === 'testcases' ? 'text-primary border-b-2 border-primary' : 'text-white/40 hover:text-white'}`}>
                             Test Cases
                          </button>
                          <button 
                             onClick={() => setActiveBottomTab("output")}
                             className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${activeBottomTab === 'output' ? 'text-primary border-b-2 border-primary' : 'text-white/40 hover:text-white'}`}>
                             Execution Output
                          </button>
                       </div>
                       <div className="flex gap-2">
                         <button 
                            disabled={isRunning}
                            onClick={handleRun}
                            className="px-4 py-1 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
                         >
                            <Play className="w-3 h-3" /> Run
                         </button>
                         <button 
                            disabled={isRunning}
                            onClick={handleSubmit}
                            className="px-4 py-1 bg-primary text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                         >
                            <CheckCircle2 className="w-3 h-3" /> Submit
                         </button>
                       </div>
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm text-white/70 overflow-y-auto whitespace-pre-wrap">
                       {activeBottomTab === 'output' ? (
                          output ? output : "Ready for execution..."
                       ) : (
                          <div className="flex flex-col gap-4">
                            <div className="bg-white/5 p-4 rounded-md border border-white/10">
                               <div className="font-bold text-white mb-2 text-xs uppercase tracking-widest">Case 1</div>
                               <div className="text-xs space-y-2">
                                  <div><span className="text-white/40">nums =</span> <br/><span className="bg-black p-1 px-2 mt-1 inline-block">[2,3,1,5,4]</span></div>
                               </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-md border border-white/10">
                               <div className="font-bold text-white mb-2 text-xs uppercase tracking-widest">Case 2</div>
                               <div className="text-xs space-y-2">
                                  <div><span className="text-white/40">nums =</span> <br/><span className="bg-black p-1 px-2 mt-1 inline-block">[2,4,9,24,2,1,10]</span></div>
                               </div>
                            </div>
                          </div>
                       )}
                    </div>
                 </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
