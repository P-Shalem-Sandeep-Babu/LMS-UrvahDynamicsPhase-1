import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, Code, ListFilter } from "lucide-react";
import { mockAutomationConfig, mockScheduledChallenges } from "../../data/mockCodingAutomation";
import { ScheduledChallenge } from "../../types/coding-automation";
import { CodingScheduleWidget } from "./components/CodingScheduleWidget";
import { AutomationTimeline } from "./components/AutomationTimeline";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const TOPICS = ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack", "Binary Search", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Design"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const CodingAutomation = () => {
  const [config, setConfig] = useState(mockAutomationConfig);
  const [challenges, setChallenges] = useState<ScheduledChallenge[]>(mockScheduledChallenges);

  // New challenge form state
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState(TOPICS[0]);
  const [newDiff, setNewDiff] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [newDate, setNewDate] = useState("");

  const pendingCount = challenges.filter(c => c.status === "pending").length;

  const handleToggle = () => {
    setConfig(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    if (pendingCount >= config.maxQueueDays) {
      alert("Queue is full! Maximum 7 days allowed.");
      return;
    }

    const newChallenge: ScheduledChallenge = {
      id: `chal_${Date.now()}`,
      title: newTitle,
      topic: newTopic,
      difficulty: newDiff,
      scheduledDate: new Date(newDate + "T03:00:00Z").toISOString(),
      status: "pending"
    };

    setChallenges([...challenges, newChallenge]);
    setNewTitle("");
    setNewDate("");
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 pb-12 animate-in fade-in">
      <Link to="/admin-settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-xs font-mono uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Settings
      </Link>

      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground flex items-center gap-4">
             <Code className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Daily Coding Queue
           </h1>
           <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest mt-2">
             Automate scheduled daily algorithm challenges
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Automation Form & Widget */}
        <div className="space-y-8 flex flex-col">
          <CodingScheduleWidget config={config} onToggle={handleToggle} />
          
          <div className="bg-card border border-border p-6 flex flex-col">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Schedule Challenge
            </h3>
            
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Challenge Title</label>
                <Input 
                  placeholder="e.g. Valid Anagram" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="bg-foreground/5 border-border focus-visible:ring-primary/50 text-foreground rounded-none font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Difficulty</label>
                  <select 
                    value={newDiff}
                    onChange={e => setNewDiff(e.target.value as any)}
                    className="w-full flex h-10 items-center justify-between border border-border bg-foreground/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-mono"
                  >
                    {DIFFICULTIES.map(d => <option key={d} value={d} className="text-black">{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Date</label>
                  <Input 
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="bg-foreground/5 border-border focus-visible:ring-primary/50 text-foreground rounded-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Topic</label>
                <select 
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                  className="w-full flex h-10 items-center justify-between border border-border bg-foreground/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-mono"
                >
                  {TOPICS.map(t => <option key={t} value={t} className="text-black">{t}</option>)}
                </select>
              </div>

              <Button 
                type="submit" 
                disabled={pendingCount >= config.maxQueueDays}
                className="w-full mt-4 bg-primary text-black font-bold uppercase tracking-wider"
              >
                Add to Queue
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Timeline & History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border p-6">
            <AutomationTimeline challenges={challenges} />
          </div>
        </div>
        
      </div>
    </div>
  );
};
