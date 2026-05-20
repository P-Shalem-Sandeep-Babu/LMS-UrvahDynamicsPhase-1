import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  LayoutDashboard, 
  Maximize2, 
  Terminal, 
  Info, 
  Code, 
  Save, 
  Download, 
  Copy, 
  Lightbulb, 
  Users, 
  Activity, 
  BarChart, 
  Clock,
  Keyboard,
  BookOpen,
  Command,
  Check,
  HelpCircle,
  ExternalLink,
  Plus,
  Sun,
  Moon,
  Trash2,
  FileCode,
  History,
  Eye
} from "lucide-react";
import { LANGUAGES } from "../../constants/languages";
import { getTemplate } from "../../utils/codeTemplates";
import { useCodeExecution } from "../../hooks/useCodeExecution";
import { useAuth } from "../../context/AuthContext";

// Dynamic Interactive Coding Cheat Sheet database for all practice languages
const LANGUAGES_CHEAT_SHEET: Record<string, {
  title: string;
  basics: { concept: string; code: string; desc: string }[];
  structures: { name: string; code: string; desc: string }[];
  tricks: { name: string; code: string; desc: string }[];
}> = {
  python: {
    title: "Python 3 Core Reference",
    basics: [
      { concept: "Fast I/O Parsing", code: "import sys\n# Reads all lines from standard input instantly\ninput_data = sys.stdin.read().split()\n", desc: "Read entire data stream efficiently for competitive programming problems." },
      { concept: "List Comprehension", code: "even_squares = [x**2 for x in nums if x % 2 == 0]", desc: "Concise way to map and filter lists in a single highly optimized line." },
      { concept: "Multiple Inputs", code: "a, b, c = map(int, input().split())", desc: "Convert space-separated string inputs into multiple separate integer variables." }
    ],
    structures: [
      { name: "Dictionary (Hash Map)", code: "freq = {}\nfor x in nums:\n    freq[x] = freq.get(x, 0) + 1", desc: "Store key-value frequencies with standard Average O(1) time complexity." },
      { name: "Deque (Double-ended Queue)", code: "from collections import deque\nq = deque([1, 2, 3])\nq.append(4)      # O(1) push right\nq.popleft()     # O(1) pop left", desc: "Use for standard Breadth-First-Search (BFS) queue structures." },
      { name: "List Slicing & Reversal", code: "reversed_arr = arr[::-1]\nsub_segment = arr[start:end:step]", desc: "Advanced slicing parameters to sub-segment or reverse lists quickly." }
    ],
    tricks: [
      { name: "Lambda Sorting", code: "points.sort(key=lambda x: (x[0], -x[1]))", desc: "Sort multi-dimensional array by element-1 ascending, then element-2 descending." },
      { name: "Safe Zip Parallel Iterate", code: "for val1, val2 in zip(list1, list2):\n    print(val1, val2)", desc: "Iterate over two sequences in parallel safely." }
    ]
  },
  cpp: {
    title: "C++ Solid Modern STL reference",
    basics: [
      { concept: "Fast I/O Block", code: "ios_base::sync_with_stdio(false);\ncin.tie(NULL);", desc: "Unlink standard C++ iostreams from C functions to maximize speed." },
      { concept: "Standard Dynamic Vector", code: "vector<int> vec;\nvec.push_back(10); // O(1)\nint size = vec.size();", desc: "Standard contiguous storage matrix that grows dynamically." }
    ],
    structures: [
      { name: "Unordered Map (Hash Map)", code: "unordered_map<string, int> lookup;\nlookup[\"hello\"] = 5;\nif (lookup.find(\"hello\") != lookup.end()) {\n    // element found\n}", desc: "Access dynamic key/value properties in Average O(1) lookup time." },
      { name: "Binary Heap (Max Queue)", code: "priority_queue<int> max_heap;\n// Min Heap variant\npriority_queue<int, vector<int>, greater<int>> min_heap;", desc: "Self-sorting tree heap to get lowest/highest element in log(N) time." }
    ],
    tricks: [
      { name: "Intro-sorting STL", code: "sort(nums.begin(), nums.end());\nsort(nums.rbegin(), nums.rend()); // desc", desc: "Sort collections elements instantly in guaranteed O(N log N) bounds." },
      { name: "Value Lower Bound", code: "auto it = lower_bound(nums.begin(), nums.end(), target);\nif (it != nums.end()) {\n    int index = distance(nums.begin(), it);\n}", desc: "Binary search first position where value is >= target." }
    ]
  },
  c: {
    title: "C Standard Library Fundamentals",
    basics: [
      { concept: "Interactive Scan I/O", code: "int integer_val;\nscanf(\"%d\", &integer_val);\nprintf(\"Value read: %d\\n\", integer_val);", desc: "Standard formatted reading and console stdout operations." },
      { concept: "String Manipulation", code: "char text[100] = \"Hello\";\nint len = strlen(text);\nint isEqual = strcmp(text, \"Hello\"); // returns 0", desc: "Standard C style character buffers and string helpers." }
    ],
    structures: [
      { name: "Heap Alloc Buffer", code: "int *buffer = (int*)malloc(100 * sizeof(int));\nif (buffer != NULL) {\n    // safety operations\n}\nfree(buffer); // avoid leaks", desc: "Reserve dynamic memory directly from OS heap. Always free when done." },
      { name: "Linked Node Definition", code: "struct Node {\n    int val;\n    struct Node* next;\n};", desc: "A standard custom record node for building customized pointer-based chains." }
    ],
    tricks: [
      { name: "Count Table Length", code: "int count = sizeof(arr) / sizeof(arr[0]);", desc: "Determine static stack array cell count size natively." },
      { name: "Native Sorting Qsort", code: "int compare(const void* a, const void* b) {\n    return (*(int*)a - *(int*)b);\n}\n// Invoke\nqsort(arr, size_n, sizeof(int), compare);", desc: "Apply built-in QuickSort on raw memory arrays quickly." }
    ]
  },
  java: {
    title: "Java Modern SE API Companion",
    basics: [
      { concept: "Optimized IO Stream", code: "BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));\nStringTokenizer tokenizer = new StringTokenizer(reader.readLine());\nint val = Integer.parseInt(tokenizer.nextToken());", desc: "Read massive volumes of data streams bypassing slow Scanner constraints." },
      { concept: "Standard Dynamic ArrayList", code: "ArrayList<Integer> list = new ArrayList<>();\nlist.add(10);\nint val = list.get(0);\nint total = list.size();", desc: "A generic-based array index tracker handling resizing operations automatically." }
    ],
    structures: [
      { name: "HashMap Lookups", code: "HashMap<String, Integer> lookup = new HashMap<>();\nlookup.put(\"A\", 100);\nif (lookup.containsKey(\"A\")) {\n    int val = lookup.get(\"A\");\n}", desc: "Key-value mapping engine built on internal array hash structures." },
      { name: "Queue with LinkedList", code: "Queue<Integer> bfsQueue = new LinkedList<>();\nbfsQueue.offer(10); // push\nint element = bfsQueue.poll(); // pop O(1)", desc: "Maintain strict FIFO logic stream natively." }
    ],
    tricks: [
      { name: "Quick Sorting Api", code: "Arrays.sort(numericalArray);\nCollections.sort(genericArrayList);", desc: "Extremely optimized Arrays.sort / TimSort logic sorting tools." },
      { name: "Map Counter Tactic", code: "counter.put(key, counter.getOrDefault(key, 0) + 1);", desc: "Clean frequency increments without non-existent checking lines." }
    ]
  }
};

interface VirtualFile {
  name: string;
  content: string;
  language: string;
}

interface SubmissionRecord {
  id: string;
  timestamp: string;
  language: string;
  filename: string;
  status: string;
  executionTime: number;
  memory: number;
  passed: number;
  total: number;
  code: string;
}

export const PracticeIDE = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"workspace" | "overview">("workspace");
  const [language, setLanguage] = useState("python");
  const [stdin, setStdin] = useState("");
  const [activeBottomTab, setActiveBottomTab] = useState<"input" | "output" | "submissions">("input");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(true);
  const [cheatTab, setCheatTab] = useState<"shortcuts" | "syntax">("shortcuts");
  const [copiedSnippetIdx, setCopiedSnippetIdx] = useState<{ category: string; index: number } | null>(null);
  const [copiedKeyboard, setCopiedKeyboard] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  
  // Theme Mode
  const [themeMode, setThemeMode] = useState<"vs-dark" | "vs">(() => {
    return (localStorage.getItem("ide_theme_mode") as "vs-dark" | "vs") || "vs-dark";
  });

  // Files State
  const [files, setFiles] = useState<Record<string, VirtualFile[]>>(() => {
    const saved = localStorage.getItem("ide_virtual_files");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      python: [
        { name: "main.py", content: getTemplate("python"), language: "python" },
        { name: "solution.py", content: "# Enter Python implementation details here\n", language: "python" }
      ],
      c: [
        { name: "main.c", content: getTemplate("c"), language: "c" }
      ],
      cpp: [
        { name: "main.cpp", content: getTemplate("cpp"), language: "cpp" },
        { name: "helper.hpp", content: "// Header utility functions\n", language: "cpp" }
      ],
      java: [
        { name: "Main.java", content: getTemplate("java"), language: "java" }
      ]
    };
  });

  const [activeFileIdx, setActiveFileIdx] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("ide_active_file_idx");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return { python: 0, c: 0, cpp: 0, java: 0 };
  });

  const [newFileName, setNewFileName] = useState("");
  const [showNewFileForm, setShowNewFileForm] = useState(false);
  
  // Submissions State
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(() => {
    const saved = localStorage.getItem("ide_submissions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "mock-1",
        timestamp: new Date(Date.now() - 3600000).toLocaleString(),
        language: "python",
        filename: "main.py",
        status: "Accepted",
        executionTime: 32,
        memory: 12.4,
        passed: 10,
        total: 10,
        code: "def solve():\n    print('Hello World')\n"
      },
      {
        id: "mock-2",
        timestamp: new Date(Date.now() - 7200000).toLocaleString(),
        language: "cpp",
        filename: "main.cpp",
        status: "Wrong Answer",
        executionTime: 45,
        memory: 8.2,
        passed: 7,
        total: 10,
        code: "int main() {\n    return 0;\n}"
      }
    ];
  });

  // Live compilation steps status
  const [executionSteps, setExecutionSteps] = useState<string[]>([]);

  const { runCode, submitCode, isRunning, isSubmitting, result } = useCodeExecution();

  const currentFiles = files[language] || [];
  const activeIdx = activeFileIdx[language] !== undefined ? activeFileIdx[language] : 0;
  const activeFile = currentFiles[activeIdx] || { name: `main.${language === 'python' ? 'py' : language}`, content: "" };

  // Sync state helpers
  const updateFilesState = (updated: Record<string, VirtualFile[]>) => {
    setFiles(updated);
    localStorage.setItem("ide_virtual_files", JSON.stringify(updated));
  };

  const handleCodeChange = (newVal: string) => {
    const updated = { ...files };
    const list = files[language] || [];
    updated[language] = list.map((file, idx) => 
      idx === activeIdx ? { ...file, content: newVal } : file
    );
    updateFilesState(updated);
  };

  // Keyboard Shortcuts Listener using active content
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Allow general user editing flows when typing but capture execution keys
      const activeEl = document.activeElement;
      const isInput = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA");

      // Ctrl + Enter (or Cmd + Enter): Run code
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        executeRun();
      }

      // Ctrl + Shift + Enter (or Cmd + Shift + Enter): Submit Solution 
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        executeSubmit();
      }

      // Ctrl + Alt + R : Reset editor to language template
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        handleReset();
      }

      // Ctrl + Shift + C : Copy editor code to clipboard
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        copyCode();
      }

      // Ctrl + Alt + F : Toggle Fullscreen mode
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      }

      // Ctrl + / : Toggle side Cheat Sheet Panel
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setShowCheatSheet(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => {
      window.removeEventListener("keydown", handleGlobalShortcuts);
    };
  }, [files, language, activeIdx, stdin, isFullscreen]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleReset = () => {
    const template = getTemplate(language);
    const updated = { ...files };
    const list = files[language] || [];
    updated[language] = list.map((file, idx) => 
      idx === activeIdx ? { ...file, content: template } : file
    );
    updateFilesState(updated);
  };

  const addSubmissionRecord = (
    status: string,
    time: number,
    mem: number,
    passedNum: number,
    totalNum: number,
    codeText: string
  ) => {
    const newSub: SubmissionRecord = {
      id: "sub-" + Date.now(),
      timestamp: new Date().toLocaleString(),
      language: language,
      filename: activeFile.name,
      status: status,
      executionTime: time,
      memory: mem,
      passed: passedNum,
      total: totalNum,
      code: codeText
    };
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("ide_submissions", JSON.stringify(updated));
  };

  const executeRun = async () => {
    setActiveBottomTab("output");
    setExecutionSteps([]);
    
    setExecutionSteps([`[1/3] INIT: Allocating sandbox virtual processor bounds...`]);
    await new Promise(r => setTimeout(r, 450));
    setExecutionSteps(prev => [...prev, `[2/3] COMPILE: Resolving absolute imports & compiler linking flags...`]);
    await new Promise(r => setTimeout(r, 450));
    setExecutionSteps(prev => [...prev, `[3/3] RUN: Executing current file buffer (${activeFile.name}) natively...`]);
    await new Promise(r => setTimeout(r, 300));

    await runCode(activeFile.content, language, stdin);
  };

  const executeSubmit = async () => {
    setActiveBottomTab("output");
    setExecutionSteps([]);

    setExecutionSteps([`[1/4] QUEUE: Sending script to server workspace compilers...`]);
    await new Promise(r => setTimeout(r, 350));
    setExecutionSteps(prev => [...prev, `[2/4] ANALYSIS: Auditing static execution tree warnings...`]);
    await new Promise(r => setTimeout(r, 350));
    setExecutionSteps(prev => [...prev, `[3/4] BUILD: Packing compiled byte arrays securely...`]);
    await new Promise(r => setTimeout(r, 400));
    setExecutionSteps(prev => [...prev, `[4/4] TEST: Sequential execution over 10 automated test suites...`]);
    await new Promise(r => setTimeout(r, 300));

    await submitCode(activeFile.content, language);
  };

  // Record submission changes to history on finish
  useEffect(() => {
    if (result) {
      addSubmissionRecord(
        result.status,
        result.executionTime,
        result.memory,
        result.passed,
        result.total,
        activeFile.content
      );
    }
  }, [result]);

  const copyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
  };

  const downloadCode = () => {
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    a.click();
  };

  const toggleThemeMode = () => {
    const nextTheme = themeMode === "vs-dark" ? "vs" : "vs-dark";
    setThemeMode(nextTheme);
    localStorage.setItem("ide_theme_mode", nextTheme);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    let fileName = newFileName.trim();
    const ext = language === "python" ? ".py" : language === "cpp" ? ".cpp" : language === "c" ? ".c" : ".java";
    if (!fileName.endsWith(ext)) {
      fileName += ext;
    }

    const list = files[language] || [];
    if (list.some(f => f.name.toLowerCase() === fileName.toLowerCase())) {
      alert(`File "${fileName}" already exists in the folder workspace.`);
      return;
    }

    const newFile: VirtualFile = {
      name: fileName,
      content: getTemplate(language),
      language: language
    };

    const updated = {
      ...files,
      [language]: [...list, newFile]
    };
    
    const newIdx = updated[language].length - 1;
    updateFilesState(updated);
    
    const updatedIdxs = {
      ...activeFileIdx,
      [language]: newIdx
    };
    setActiveFileIdx(updatedIdxs);
    localStorage.setItem("ide_active_file_idx", JSON.stringify(updatedIdxs));

    setNewFileName("");
    setShowNewFileForm(false);
  };

  const handleDeleteFile = (idxToDelete: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const list = files[language] || [];
    if (list.length <= 1) {
      alert("Cannot delete the last remaining workspace file tab.");
      return;
    }

    const updatedFileList = list.filter((_, idx) => idx !== idxToDelete);
    const updated = {
      ...files,
      [language]: updatedFileList
    };

    let newActiveIdx = activeIdx;
    if (newActiveIdx >= updatedFileList.length) {
      newActiveIdx = updatedFileList.length - 1;
    }

    updateFilesState(updated);
    const updatedIdxs = {
      ...activeFileIdx,
      [language]: newActiveIdx
    };
    setActiveFileIdx(updatedIdxs);
    localStorage.setItem("ide_active_file_idx", JSON.stringify(updatedIdxs));
  };

  const handleSelectFile = (idx: number) => {
    const updatedIdxs = {
      ...activeFileIdx,
      [language]: idx
    };
    setActiveFileIdx(updatedIdxs);
    localStorage.setItem("ide_active_file_idx", JSON.stringify(updatedIdxs));
  };

  const restoreSubmissionToEditor = (sub: SubmissionRecord) => {
    // Determine language file to load or create
    let languageFileList = files[sub.language] || [];
    const restoredFilename = sub.filename;

    let existingIdx = languageFileList.findIndex(f => f.name === restoredFilename);
    const updated = { ...files };
    
    if (existingIdx !== -1) {
      // Overwrite content
      updated[sub.language] = languageFileList.map((f, idx) => 
        idx === existingIdx ? { ...f, content: sub.code } : f
      );
    } else {
      // Create new file
      const newFile: VirtualFile = {
        name: restoredFilename,
        content: sub.code,
        language: sub.language
      };
      updated[sub.language] = [...languageFileList, newFile];
      existingIdx = updated[sub.language].length - 1;
    }

    updateFilesState(updated);
    
    // Switch to language and active file
    setLanguage(sub.language);
    const updatedIdxs = {
      ...activeFileIdx,
      [sub.language]: existingIdx
    };
    setActiveFileIdx(updatedIdxs);
    localStorage.setItem("ide_active_file_idx", JSON.stringify(updatedIdxs));
    
    // Switch view back to workspace
    setActiveTab("workspace");
    setActiveBottomTab("input");
  };

  return (
    <div ref={workspaceRef} className={`${isFullscreen ? 'h-screen w-screen bg-card z-50 fixed inset-0' : 'h-[calc(100vh-120px)] pt-2 pb-6'} flex flex-col font-sans`}>
      <div className={`${isFullscreen ? 'px-4 pt-4' : ''} flex justify-between items-center mb-4 border-b border-border/50 pb-4`}>
        <div className="flex flex-col gap-1">
           <h1 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
             <Code className="w-5 h-5 text-primary" />
             Practice Workspace
           </h1>
        </div>

        <div className="flex gap-4 items-center">
            {activeTab === 'workspace' && (
              <button 
                onClick={() => setShowCheatSheet(prev => !prev)} 
                className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-bold uppercase tracking-widest transition-colors ${showCheatSheet ? 'border-primary/50 bg-primary/15 text-primary hover:bg-primary/25' : 'border-border/50 text-muted-foreground hover:bg-foreground/5'}`}
                title="Toggle Keyboard Shortcuts & Language Cheat Sheet (Ctrl + /)"
              >
                <Keyboard className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline-block">Cheat Sheet</span>
              </button>
            )}
            <div className="flex bg-foreground/5 p-1 rounded-md border border-border hidden md:flex">
               <button 
                 onClick={() => setActiveTab('workspace')}
                 className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${activeTab === 'workspace' ? 'bg-primary text-black' : 'text-muted-foreground hover:text-foreground'}`}
               >
                 IDE Workspace
               </button>
               <button 
                 onClick={() => setActiveTab('overview')}
                 className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${activeTab === 'overview' ? 'bg-primary text-black' : 'text-muted-foreground hover:text-foreground'}`}
               >
                 Overview
               </button>
            </div>
            <button onClick={toggleFullscreen} className="p-2 border border-border/50 hover:bg-muted transition-colors" title="Toggle Fullscreen (Ctrl + Alt + F)"><Maximize2 className="w-4 h-4" /></button>
        </div>
      </div>

      {activeTab === 'overview' && (
         <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
            {user?.role === 'student' ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-foreground/5 border border-border p-5">
                     <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5"/> Solved Problems</h3>
                     <div className="text-3xl font-black text-foreground">42</div>
                  </div>
                  <div className="bg-foreground/5 border border-border p-5">
                     <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><Activity className="w-3.5 h-3.5"/> Submissions</h3>
                     <div className="text-3xl font-black text-foreground">128</div>
                  </div>
                  <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 p-5">
                     <h3 className="text-[#f59e0b]/70 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><Code className="w-3.5 h-3.5"/> Current Streak</h3>
                     <div className="text-3xl font-black text-[#f59e0b]">5 Days</div>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 p-5">
                     <h3 className="text-primary/70 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><BarChart className="w-3.5 h-3.5"/> Language Acc.</h3>
                     <div className="text-3xl font-black text-primary">82% <span className="text-sm font-mono text-primary/50">Python</span></div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 border border-border bg-card overflow-hidden mt-6">
                     <div className="px-5 py-4 border-b border-border">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/70">Recent Practice History</h2>
                     </div>
                     <div className="overflow-x-auto hide-scrollbar custom-scrollbar">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
                           <thead className="bg-white/[0.02] border-b border-border text-[10px] font-mono text-muted-foreground/80 uppercase">
                              <tr>
                                 <th className="px-5 py-3">Problem</th>
                                 <th className="px-5 py-3">Language</th>
                                 <th className="px-5 py-3">Status</th>
                                 <th className="px-5 py-3">Time</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5 font-mono text-xs">
                              <tr><td className="px-5 py-3 text-foreground/80">Two Sum</td><td className="px-5 py-3 text-muted-foreground">Python</td><td className="px-5 py-3 text-green-500">Accepted</td><td className="px-5 py-3 text-muted-foreground">2 mins ago</td></tr>
                              <tr><td className="px-5 py-3 text-foreground/80">Reverse Linked List</td><td className="px-5 py-3 text-muted-foreground">Java</td><td className="px-5 py-3 text-red-500">Wrong Answer</td><td className="px-5 py-3 text-muted-foreground">1 hour ago</td></tr>
                              <tr><td className="px-5 py-3 text-foreground/80">Valid Parentheses</td><td className="px-5 py-3 text-muted-foreground">C++</td><td className="px-5 py-3 text-green-500">Accepted</td><td className="px-5 py-3 text-muted-foreground">Yesterday</td></tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-foreground/5 border border-border p-5">
                     <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><Users className="w-3.5 h-3.5"/> Practicing Students</h3>
                     <div className="text-3xl font-black text-foreground">152</div>
                  </div>
                  <div className="bg-foreground/5 border border-border p-5">
                     <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><Code className="w-3.5 h-3.5"/> Today's Submissions</h3>
                     <div className="text-3xl font-black text-foreground">845</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-5">
                     <h3 className="text-green-500/70 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5"/> Pass Rate</h3>
                     <div className="text-3xl font-black text-green-500">68%</div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-5">
                     <h3 className="text-purple-500/70 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><BarChart className="w-3.5 h-3.5"/> Top Language</h3>
                     <div className="text-3xl font-black text-purple-500">Java</div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 border border-border bg-card overflow-hidden mt-6">
                     <div className="px-5 py-4 border-b border-border flex justify-between items-center">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/70">Student Submissions Live Feed</h2>
                        <span className="flex items-center gap-2 text-[10px] text-green-500 font-mono"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live WebSocket</span>
                     </div>
                     <div className="overflow-x-auto hide-scrollbar custom-scrollbar">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
                           <thead className="bg-white/[0.02] border-b border-border text-[10px] font-mono text-muted-foreground/80 uppercase">
                              <tr>
                                 <th className="px-5 py-3">Student</th>
                                 <th className="px-5 py-3">Problem</th>
                                 <th className="px-5 py-3">Status</th>
                                 <th className="px-5 py-3">Detail</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5 font-mono text-xs">
                              <tr><td className="px-5 py-3 text-foreground/80 flex items-center gap-2"><div className="w-6 h-6 bg-foreground/10 rounded-full flex items-center justify-center text-[10px]">AD</div> Alex D.</td><td className="px-5 py-3 text-muted-foreground">Two Sum</td><td className="px-5 py-3 text-green-500">Accepted</td><td className="px-5 py-3 text-muted-foreground">Python • 45ms</td></tr>
                              <tr><td className="px-5 py-3 text-foreground/80 flex items-center gap-2"><div className="w-6 h-6 bg-foreground/10 rounded-full flex items-center justify-center text-[10px]">SK</div> Sarah K.</td><td className="px-5 py-3 text-muted-foreground">Binary Search</td><td className="px-5 py-3 text-red-500">TLE</td><td className="px-5 py-3 text-muted-foreground">Java • &gt;2000ms</td></tr>
                              <tr><td className="px-5 py-3 text-foreground/80 flex items-center gap-2"><div className="w-6 h-6 bg-foreground/10 rounded-full flex items-center justify-center text-[10px]">MJ</div> Mike J.</td><td className="px-5 py-3 text-muted-foreground">Merge Vectors</td><td className="px-5 py-3 text-yellow-500">Compile Error</td><td className="px-5 py-3 text-muted-foreground">C++</td></tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )}
         </div>
      )}

      {activeTab === 'workspace' && (
      <div className="flex-1 bg-card border border-border/50 relative">
        <PanelGroup orientation="horizontal">
          <Panel defaultSize={showCheatSheet ? 70 : 100} minSize={50}>
            <PanelGroup orientation="vertical">
              <Panel defaultSize={70}>
                <div className="h-full flex flex-col pt-0">
                   <div className="flex items-center justify-between border-b border-border/50 bg-white/[0.02] px-4 py-2">
                       <div className="flex items-center gap-4 font-sans">
                          <select 
                             value={language}
                             onChange={handleLanguageChange}
                             className="bg-background border border-border text-xs font-mono px-3 py-1 text-foreground focus:outline-none focus:border-primary/50"
                          >
                            {LANGUAGES.map(lang => (
                              <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                          </select>
                          
                          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider hidden sm:inline">
                            Active File: <b className="text-muted-foreground">{activeFile.name}</b>
                          </span>
                       </div>
                       
                       <div className="flex gap-2 font-sans">
                          <button 
                             onClick={toggleThemeMode} 
                             className="p-1.5 hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1.5" 
                             title={`Switch to ${themeMode === 'vs-dark' ? 'Light Theme' : 'Dark Theme'}`}
                          >
                             {themeMode === 'vs-dark' ? <Sun className="w-4 h-4 text-green-500 animate-spin" style={{ animationDuration: '10s' }} /> : <Moon className="w-4 h-4 text-indigo-400" />}
                             <span className="text-[10px] font-mono font-bold hidden sm:inline-block uppercase tracking-wider">{themeMode === "vs-dark" ? "Light Mode" : "Dark Mode"}</span>
                          </button>
                          
                          <div className="w-[1px] bg-foreground/10 self-stretch my-1 mx-1" />

                          <button className="p-1.5 hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground" onClick={copyCode} title="Copy Code">
                             <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground" onClick={downloadCode} title="Download Code">
                             <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground" onClick={handleReset} title="Reset to Template">
                             <RotateCcw className="w-4 h-4" />
                          </button>
                       </div>
                    </div>

                    {/* File Tabs Bar */}
                    <div className="flex items-center justify-between border-b border-border/50 bg-background/40 px-4 py-1.5 overflow-x-auto hide-scrollbar font-sans">
                      <div className="flex items-center gap-1">
                        {currentFiles.map((file, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleSelectFile(idx)}
                            className={`group relative flex items-center gap-2 px-3 py-1 text-xs rounded-t-md font-mono border-t-2 border-r border-l cursor-pointer transition-all ${
                              idx === activeIdx 
                                ? 'border-primary bg-background text-primary font-bold border-l-border/50 border-r-border/50' 
                                : 'border-transparent text-muted-foreground/80 hover:text-foreground/80 hover:bg-white/[0.02] border-l-transparent border-r-transparent'
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5 mt-0.5" />
                            <span>{file.name}</span>
                            <button 
                              onClick={(e) => handleDeleteFile(idx, e)}
                              className="text-[10px] text-muted-foreground/60 hover:text-red-500 hover:bg-foreground/5 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                              title="Delete File"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        
                        {/* Add File inline toggle */}
                        {!showNewFileForm ? (
                          <button 
                            onClick={() => setShowNewFileForm(true)}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-muted-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded transition-all font-mono"
                            title="Create New File"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>New File</span>
                          </button>
                        ) : (
                          <form onSubmit={handleAddFile} className="flex items-center gap-1.5 ml-2">
                            <input 
                              type="text"
                              autoFocus
                              value={newFileName}
                              onChange={(e) => setNewFileName(e.target.value)}
                              placeholder={`filename`}
                              className="bg-background border border-border/80 text-xs font-mono text-foreground px-2 py-0.5 max-w-[130px] focus:outline-none focus:border-primary"
                            />
                            <button 
                              type="submit"
                              className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded hover:bg-foreground transition-colors uppercase"
                            >
                              Create
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                setShowNewFileForm(false);
                                setNewFileName("");
                              }}
                              className="text-muted-foreground text-[10px] hover:text-foreground px-1"
                            >
                              Cancel
                            </button>
                          </form>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground/60 font-mono hidden md:block">
                        Editing: {activeFile.name} ({activeFile.content.length} chars)
                      </div>
                    </div>
                   
                   <div className="flex-1 bg-[#1e1e1e]">
                     <Editor
                        height="100%"
                        language={language}
                        theme={themeMode}
                        value={activeFile.content}
                        onChange={(val) => handleCodeChange(val || "")}
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
                 <div className="w-8 h-0.5 bg-foreground/20 rounded-full" />
              </PanelResizeHandle>
              
              <Panel defaultSize={30}>
                 <div className="h-full bg-background flex flex-col">
                    <div className="flex justify-between items-center border-b border-border px-4 py-2 bg-white/[0.02]">
                       <div className="flex gap-4">
                          <button 
                             onClick={() => setActiveBottomTab("input")}
                             className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${activeBottomTab === 'input' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground/80 hover:text-foreground'}`}>
                             Custom Input
                          </button>
                          <button 
                             onClick={() => setActiveBottomTab("output")}
                             className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors ${activeBottomTab === 'output' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground/80 hover:text-foreground'}`}>
                             Execution Output
                          </button>
                          <button 
                             onClick={() => setActiveBottomTab("submissions")}
                             className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors flex items-center gap-1.5 ${activeBottomTab === 'submissions' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground/80 hover:text-foreground'}`}>
                             <History className="w-3.5 h-3.5 inline ml-0.5" />
                             Submissions
                          </button>
                       </div>
                       <div className="flex gap-2">
                         <button 
                            disabled={isRunning || isSubmitting}
                            onClick={executeRun}
                            className="px-4 py-1 border border-border/80 text-xs font-bold uppercase tracking-widest hover:bg-foreground/10 transition-colors flex items-center gap-2 disabled:opacity-50"
                         >
                            {isRunning ? <div className="w-3 h-3 border-2 border-border/80 border-t-white rounded-full animate-spin" /> : <Play className="w-3 h-3" />} Run
                         </button>
                         <button 
                            disabled={isRunning || isSubmitting}
                            onClick={executeSubmit}
                            className="px-4 py-1 bg-primary text-black text-xs font-bold uppercase tracking-widest hover:bg-foreground transition-colors flex items-center gap-2 disabled:opacity-50"
                         >
                            {isSubmitting ? <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <CheckCircle2 className="w-3 h-3" />} Submit
                         </button>
                       </div>
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm text-foreground/70 overflow-y-auto whitespace-pre-wrap custom-scrollbar">
                       {activeBottomTab === 'input' ? (
                          <textarea
                             value={stdin}
                             onChange={(e) => setStdin(e.target.value)}
                             placeholder="Enter custom input here..."
                             className="w-full h-full bg-transparent text-foreground/80 resize-none outline-none font-mono text-sm"
                          />
                       ) : activeBottomTab === 'output' ? (
                          <div className="flex flex-col gap-4 font-sans text-xs">
                             {/* Live execution steps and compiler logs progress status tracker */}
                             {executionSteps.length > 0 && (
                               <div className="bg-background/40 border border-border/50 p-3 rounded font-mono text-xs text-muted-foreground space-y-1.5">
                                 <div className="flex items-center gap-2 mb-1">
                                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                   <span className="text-[10px] text-foreground font-bold uppercase tracking-wider font-sans">Compiler Execution Status Feed</span>
                                 </div>
                                 {executionSteps.map((step, idx) => (
                                   <div key={idx} className="flex gap-2 items-start font-mono text-xs">
                                     <span className="text-primary select-none font-sans">❯</span>
                                     <span className={idx === executionSteps.length - 1 ? "text-primary font-bold animate-pulse font-sans" : "font-sans"}>{step}</span>
                                   </div>
                                 ))}
                               </div>
                             )}

                             {!result && !isRunning && !isSubmitting && (
                               <div className="text-muted-foreground/80 font-sans">Run or Submit code to view output.</div>
                             )}

                             {result && (
                               <div className="flex flex-col gap-4">
                                 <div className="flex items-center gap-4 border-b border-border/50 pb-3">
                                   <span className={`font-black uppercase tracking-wider text-sm ${
                                     result.status === "Accepted" 
                                       ? "text-green-500" 
                                       : result.status === "Compile Error" || result.status === "Runtime Error" 
                                         ? "text-red-500" 
                                         : "text-green-500"
                                   }`}>
                                     {result.status}
                                   </span>
                                   {result.status !== "Compile Error" && (
                                     <div className="flex gap-2.5 text-[10px] font-mono">
                                       <span className="bg-foreground/5 border border-border px-2 py-1 rounded">Time: {result.executionTime}ms</span>
                                       <span className="bg-foreground/5 border border-border px-2 py-1 rounded">Memory: {result.memory}MB</span>
                                       {result.total > 1 && <span className="bg-foreground/5 border border-border px-2 py-1 rounded">Passed: {result.passed}/{result.total}</span>}
                                     </div>
                                   )}
                                 </div>
                                 {result.stdout && (
                                   <div className="bg-foreground/5 p-3 rounded border border-border">
                                     <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-sans font-bold">Standard Output</h4>
                                     <pre className="text-xs text-foreground/80 select-text font-mono overflow-x-auto whitespace-pre">{result.stdout}</pre>
                                   </div>
                                 )}
                                 {result.stderr && (
                                   <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
                                     <h4 className="text-[10px] text-red-500/80 uppercase tracking-widest mb-1.5 font-sans font-bold">Standard Error</h4>
                                     <pre className="text-xs text-red-400 select-text font-mono overflow-x-auto whitespace-pre">{result.stderr}</pre>
                                   </div>
                                 )}
                               </div>
                             )}
                          </div>
                       ) : (
                          // Submission records table layout
                          <div className="space-y-4 font-sans text-xs">
                             <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Execution Logs & Submission Run Archives</h3>
                                <span className="font-mono text-[9px] text-muted-foreground/80 uppercase">{submissions.length} total saves</span>
                             </div>
                             {submissions.length === 0 ? (
                                <div className="text-[11px] text-muted-foreground/60 p-4 text-center">No runs or submissions recorded yet. Try running or submitting code inside the editor above.</div>
                             ) : (
                                <div className="space-y-3">
                                   {submissions.map((sub) => (
                                      <div key={sub.id} className="bg-white/[0.01] hover:bg-white/[0.03] p-3 rounded border border-border/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-colors">
                                         <div className="space-y-1">
                                            <div className="flex items-center gap-2 font-mono">
                                               <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded font-sans ${
                                                  sub.status === "Accepted" 
                                                    ? "bg-green-500/10 border border-green-500/20 text-green-500" 
                                                    : "bg-red-500/10 border border-red-500/20 text-red-500"
                                               }`}>
                                                  {sub.status}
                                               </span>
                                               <span className="text-xs font-bold text-foreground/80">
                                                  {sub.filename}
                                               </span>
                                               <span className="text-[10px] uppercase font-bold text-muted-foreground/80 px-1 py-0.5 border border-border bg-foreground/5">
                                                  {sub.language}
                                               </span>
                                            </div>
                                            <div className="text-[10px] text-muted-foreground/80 font-mono flex flex-wrap items-center gap-3">
                                               <span>Executed On: {sub.timestamp}</span>
                                               <span>Time: {sub.executionTime}ms</span>
                                               <span>Memory: {sub.memory}MB</span>
                                               {sub.total > 1 && <span>Passed: {sub.passed}/{sub.total}</span>}
                                            </div>
                                         </div>
                                         <div className="flex gap-2 font-sans shrink-0">
                                            <button 
                                               onClick={() => {
                                                  alert(`Reviewing historic solution for ${sub.filename}:\n\n${sub.code}`);
                                               }}
                                               className="px-2.5 py-1 border border-border text-[10px] font-bold uppercase hover:bg-foreground/5 transition-all text-muted-foreground flex items-center gap-1 font-sans"
                                               title="View Solution"
                                            >
                                               <Eye className="w-3 h-3" /> View Source
                                            </button>
                                            <button 
                                               onClick={() => restoreSubmissionToEditor(sub)}
                                               className="px-2.5 py-1 bg-primary text-black text-[10px] font-bold uppercase hover:bg-foreground transition-all flex items-center gap-1 font-sans"
                                               title="Restore this solution code to the active working tabs"
                                            >
                                               <RotateCcw className="w-3 h-3" /> Restore code
                                            </button>
                                         </div>
                                      </div>
                                   ))}
                                </div>
                             )}
                          </div>
                       )}
                    </div>
                 </div>
              </Panel>
            </PanelGroup>
          </Panel>

          {showCheatSheet && (
            <>
              <PanelResizeHandle className="w-2 bg-border/20 hover:bg-primary/50 transition-all flex flex-col items-center justify-center cursor-col-resize shrink-0">
                 <div className="h-8 w-0.5 bg-foreground/20 rounded-full" />
              </PanelResizeHandle>
              <Panel defaultSize={30} minSize={20}>
                 <div className="h-full bg-background/40 border-l border-border flex flex-col text-foreground font-sans overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-border bg-white/[0.01] flex flex-col gap-3">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <Command className="w-4 h-4 text-primary" />
                             <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">Developer Helper</span>
                          </div>
                          <button 
                             onClick={() => setShowCheatSheet(false)} 
                             className="text-[10px] uppercase font-bold text-muted-foreground/60 hover:text-foreground transition-colors"
                          >
                             ✕ Close
                          </button>
                       </div>
                       
                       {/* Tabs */}
                       <div className="grid grid-cols-2 bg-foreground/5 p-0.5 rounded-md border border-border text-center">
                          <button 
                             onClick={() => setCheatTab("shortcuts")}
                             className={`py-1 text-[10px] font-bold uppercase tracking-wider transition-all rounded-sm flex items-center justify-center gap-1.5 ${cheatTab === "shortcuts" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}
                          >
                             <Keyboard className="w-3.5 h-3.5" />
                             Shortcuts
                          </button>
                          <button 
                             onClick={() => setCheatTab("syntax")}
                             className={`py-1 text-[10px] font-bold uppercase tracking-wider transition-all rounded-sm flex items-center justify-center gap-1.5 ${cheatTab === "syntax" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}
                          >
                             <BookOpen className="w-3.5 h-3.5" />
                             Syntax Q-Ref
                          </button>
                       </div>
                    </div>

                    {/* Content Scroll Area */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                       {cheatTab === "shortcuts" ? (
                          <div className="space-y-3">
                             <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground/80 pb-1 border-b border-border/50">
                                <span>Action Command</span>
                                <span>Shortcut Trigger</span>
                             </div>

                             {/* Shortcut definitions */}
                             {[
                               { action: "Execute Run", keys: ["Ctrl", "Enter"], note: "Compiles code against inputs", execute: executeRun },
                               { action: "Submit Code", keys: ["Ctrl", "Shift", "Enter"], note: "Tests all production vectors", execute: executeSubmit },
                               { action: "Reset Code", keys: ["Ctrl", "Alt", "R"], note: "Revert back to starter template", execute: handleReset },
                               { action: "Copy Workspace", keys: ["Ctrl", "Shift", "C"], note: "Copy entire buffer to clipboard", execute: copyCode },
                               { action: "Toggle Fullscreen", keys: ["Ctrl", "Alt", "F"], note: "Maximize coder screen", execute: toggleFullscreen },
                               { action: "Toggle helper panel", keys: ["Ctrl", "/"], note: "Open/close sheet panel", execute: () => setShowCheatSheet(prev => !prev) }
                             ].map((ctrl) => (
                                <div key={ctrl.action} className="bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded border border-border/50 transition-colors group">
                                   <div className="flex items-center justify-between gap-2 mb-1">
                                      <span className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">{ctrl.action}</span>
                                      <div className="flex gap-1.5 items-center">
                                         {ctrl.keys.map((k, idx) => (
                                            <span key={idx} className="flex items-center scale-95">
                                               <kbd className="px-1.5 py-0.5 bg-foreground/10 rounded font-mono text-[9px] text-foreground/90 border border-white/15 shadow-sm font-black select-none">
                                                  {k}
                                               </kbd>
                                               {idx < ctrl.keys.length - 1 && <span className="text-muted-foreground/60 text-[9px] ml-1">+</span>}
                                            </span>
                                         ))}
                                      </div>
                                   </div>
                                   <div className="text-[10px] text-muted-foreground/80 flex justify-between items-center">
                                      <span>{ctrl.note}</span>
                                      <button 
                                         onClick={ctrl.execute}
                                         className="text-[9px] text-primary/40 hover:text-primary uppercase tracking-widest font-black transition-colors opacity-0 group-hover:opacity-100"
                                      >
                                         Trigger »
                                      </button>
                                   </div>
                                </div>
                             ))}
                             
                             <div className="text-[10px] text-muted-foreground/60 text-center pt-3 italic bg-foreground/5 p-3 rounded border border-border/50">
                                Pro-Tip: You can use these global hotkeys straight inside the Monaco text editor!
                             </div>
                          </div>
                       ) : (
                          <div className="space-y-4">
                             {/* Language syntax reference guide */}
                             {(() => {
                                const currentRef = LANGUAGES_CHEAT_SHEET[language] || LANGUAGES_CHEAT_SHEET["python"];
                                return (
                                   <div className="space-y-4">
                                      <div className="flex items-center justify-between">
                                         <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                                            <Lightbulb className="w-3.5 h-3.5 text-primary animate-bounce" />
                                            {currentRef.title}
                                         </h3>
                                         <span className="text-[9px] font-mono text-muted-foreground/80 bg-foreground/5 border border-white/15 px-1.5 py-0.5 rounded uppercase font-black">
                                            {language}
                                         </span>
                                      </div>

                                      {/* Subsections */}
                                      {[
                                         { title: "Inputs, Outputs & I/O", items: currentRef.basics, category: "basic" },
                                         { title: "Essential Structures & Collections", items: currentRef.structures, category: "structure" },
                                         { title: "Optimization Tricks & Sorts", items: currentRef.tricks, category: "tricks" }
                                      ].map((sec) => (
                                         <div key={sec.title} className="space-y-2">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{sec.title}</h4>
                                            {sec.items?.map((item, index) => (
                                               <div key={index} className="p-3 bg-white/[0.02] border border-border/50 rounded space-y-2 relative group hover:border-border transition-colors">
                                                  <div className="flex justify-between items-start gap-2">
                                                     <div>
                                                        <span className="text-xs font-bold text-foreground/90">{item.concept || item.name}</span>
                                                        <p className="text-[10px] text-muted-foreground/80 mt-0.5 leading-relaxed">{item.desc}</p>
                                                     </div>
                                                  </div>
                                                  
                                                  {/* Code layout block */}
                                                  <div className="relative">
                                                     <pre className="p-2.5 bg-background/60 font-mono text-[10px] text-foreground/80 border border-border rounded overflow-x-auto select-all max-h-32 custom-scrollbar">
                                                        <code>{item.code}</code>
                                                     </pre>
                                                     
                                                     {/* Absolute toolbar action triggers */}
                                                     <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                           onClick={() => {
                                                              navigator.clipboard.writeText(item.code);
                                                              setCopiedSnippetIdx({ category: sec.category, index });
                                                              setTimeout(() => setCopiedSnippetIdx(null), 2000);
                                                           }}
                                                           className="p-1.5 bg-background/80 hover:bg-background rounded border border-border text-foreground/70 hover:text-foreground transition-colors"
                                                           title="Copy snippet"
                                                        >
                                                           {copiedSnippetIdx?.category === sec.category && copiedSnippetIdx?.index === index ? (
                                                              <Check className="w-3 h-3 text-green-500" />
                                                           ) : (
                                                              <Copy className="w-3 h-3" />
                                                           )}
                                                        </button>
                                                        <button 
                                                           onClick={() => {
                                                              handleCodeChange(activeFile.content + "\n\n" + item.code);
                                                           }}
                                                           className="p-1 px-2 bg-background/80 hover:bg-background rounded border border-border text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 text-[9px] uppercase font-bold"
                                                           title="Insert snippet into Monaco view"
                                                        >
                                                           <Plus className="w-3 h-3 text-primary" />
                                                           <span>Insert</span>
                                                        </button>
                                                     </div>
                                                  </div>
                                               </div>
                                            ))}
                                         </div>
                                      ))}
                                   </div>
                                );
                             })()}
                          </div>
                       )}
                    </div>

                    {/* Footer instructions */}
                    <div className="p-4 bg-white/[0.01] border-t border-border text-center text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
                       Choose other core languages from dropdown to instantly transform your Syntax Cheat Sheet modules!
                    </div>
                 </div>
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
      )}
    </div>
  );
};
