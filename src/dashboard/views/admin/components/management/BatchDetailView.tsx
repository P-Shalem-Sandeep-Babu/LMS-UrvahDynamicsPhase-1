import { useState } from "react";
import { ArrowLeft, Users, Presentation, Calendar, PlaySquare, Code2, MessageSquare, BookOpen, Clock, Activity, Edit2, UserPlus, MoreHorizontal, PlusCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface BatchDetailViewProps {
  batchId: string;
  onBack: () => void;
}

const mockActivityData = [
  { day: "Mon", attendance: 85, coding: 60 },
  { day: "Tue", attendance: 88, coding: 75 },
  { day: "Wed", attendance: 92, coding: 80 },
  { day: "Thu", attendance: 90, coding: 85 },
  { day: "Fri", attendance: 85, coding: 70 },
  { day: "Sat", attendance: 40, coding: 95 },
  { day: "Sun", attendance: 35, coding: 40 },
];

const mockStudents = Array.from({ length: 15 }).map((_, i) => ({
  id: `STU-${1000 + i}`,
  name: `Student Name ${i + 1}`,
  attendance: Math.floor(Math.random() * 20) + 80,
  score: Math.floor(Math.random() * 30) + 70,
  status: i % 10 === 0 ? "at-risk" : "on-track"
}));

const mockTrainers = [
  { name: "John Doe", role: "Primary Trainer", assignments: 12, rating: 4.8 },
  { name: "Sarah Smith", role: "TA / Support", assignments: 24, rating: 4.5 },
];

export const BatchDetailView = ({ batchId, onBack }: BatchDetailViewProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "trainers" | "assignments" | "discussions">("overview");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border pb-4">
         <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 bg-foreground/5 hover:bg-foreground/10 border border-border transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div className="flex flex-col">
               <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">{batchId}</h2>
               <span className="text-xs font-mono text-muted-foreground">Full Stack Engineering • Ongoing</span>
            </div>
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-border text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors flex items-center gap-2">
               <Edit2 className="w-3 h-3" /> Edit Batch
            </button>
         </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border bg-card overflow-x-auto">
        {[
          { id: "overview", label: "Analytics & Progress", icon: Activity },
          { id: "students", label: "Student Allocation", icon: Users },
          { id: "trainers", label: "Faculty / Trainers", icon: Presentation },
          { id: "assignments", label: "Assignments & Coding", icon: Code2 },
          { id: "discussions", label: "Discussions", icon: MessageSquare },
        ].map(tab => {
           const Icon = tab.icon;
           return (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
             >
                <Icon className="w-3 h-3" /> {tab.label}
             </button>
           )
        })}
      </div>

      {/* Overview Tab content */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          {/* Performance KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Users className="w-3 h-3 text-primary" /> Enrolled Students</span>
                <span className="text-3xl font-black font-mono text-foreground">45</span>
                <span className="text-[10px] font-mono text-muted-foreground mt-2">Max Capacity: 50</span>
             </div>
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Calendar className="w-3 h-3 text-green-500" /> Avg Attendance</span>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black font-mono text-foreground">88</span>
                   <span className="text-sm font-bold text-green-500 mb-1">%</span>
                </div>
                <span className="text-[10px] font-mono text-green-500 mt-2">+2% this week</span>
             </div>
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><PlaySquare className="w-3 h-3 text-blue-500" /> Course Progress</span>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black font-mono text-foreground">42</span>
                   <span className="text-sm font-bold text-blue-500 mb-1">%</span>
                </div>
                <div className="h-1 bg-foreground/5 w-full mt-3"><div className="h-full bg-blue-500 w-[42%]"></div></div>
             </div>
             <div className="border border-border bg-card p-5 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4"><Code2 className="w-3 h-3 text-purple-500" /> Avg Assignment Score</span>
                <span className="text-3xl font-black font-mono text-foreground">78/100</span>
                <span className="text-[10px] font-mono text-muted-foreground mt-2">from 12 assessments</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 border border-border bg-card p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6 border-b border-border pb-4">Weekly Activity Trends</h3>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={mockActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                       <XAxis dataKey="day" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                       <Tooltip
                         contentStyle={{ backgroundColor: "#080808", borderColor: "#ffffff20", borderRadius: "0" }}
                         itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
                         labelStyle={{ fontSize: "12px", color: "#ffffff50", marginBottom: "4px" }}
                       />
                       <Line type="monotone" dataKey="attendance" name="Attendance %" stroke="#ffffff30" strokeWidth={2} dot={false} />
                       <Line type="monotone" dataKey="coding" name="Coding Activity" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: "var(--color-primary)", strokeWidth: 0, r: 4 }} />
                     </LineChart>
                   </ResponsiveContainer>
                </div>
             </div>
             
             <div className="border border-border bg-card p-6 flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-4">Recent Milestones</h3>
                <div className="relative border-l border-border ml-3 space-y-6 mt-2">
                   {[
                      { title: "React Query Assessment", date: "2 days ago", type: "assessment" },
                      { title: "Module 4 Completed", date: "1 week ago", type: "module" },
                      { title: "Mock Interview Round 1", date: "2 weeks ago", type: "interview" },
                   ].map((item, idx) => (
                      <div key={idx} className="relative pl-6">
                         <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${item.type === 'assessment' ? 'bg-primary' : item.type === 'module' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                         <h4 className="text-xs font-bold text-foreground mb-1">{item.title}</h4>
                         <span className="text-[10px] font-mono text-muted-foreground">{item.date}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Student Allocation Tracker</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">Manage students enrolled in this batch.</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-primary/20">
                 <UserPlus className="w-3 h-3" /> Enroll Student
              </button>
           </div>
           
           <div className="border border-border bg-card overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border bg-white/[0.02]">
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Student Name</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Attendance</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Avg Score</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Status</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {mockStudents.map(student => (
                   <tr key={student.id} className="border-b border-border/50 hover:bg-white/[0.02]">
                     <td className="p-4">
                        <div className="font-bold text-foreground text-sm">{student.name}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/80">{student.id}</div>
                     </td>
                     <td className="p-4">
                        <span className={`text-xs font-mono font-bold ${student.attendance < 75 ? 'text-red-500' : 'text-foreground'}`}>{student.attendance}%</span>
                     </td>
                     <td className="p-4"><span className="text-xs font-mono text-foreground font-bold">{student.score} / 100</span></td>
                     <td className="p-4">
                         <span className={`px-2 py-1 border text-[9px] uppercase font-mono font-bold tracking-widest ${
                           student.status === 'at-risk' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'
                         }`}>
                            {student.status}
                         </span>
                     </td>
                     <td className="p-4 text-right">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border hover:bg-foreground/5 inline-flex"><MoreHorizontal className="w-4 h-4" /></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Trainers & Faculty Tab */}
      {activeTab === "trainers" && (
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Faculty Assignment</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">Trainers and assistants assigned to this batch.</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-primary/20">
                 <PlusCircle className="w-3 h-3" /> Assign Faculty
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTrainers.map((trainer, idx) => (
                 <div key={idx} className="border border-border bg-card p-5 flex flex-col relative overflow-hidden group hover:bg-white/[0.02] transition-colors">
                    <Presentation className="w-6 h-6 text-primary mb-4" />
                    <h4 className="text-sm font-bold text-foreground mb-1">{trainer.name}</h4>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6">{trainer.role}</span>
                    
                    <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-4">
                       <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80 mb-1">Active Assignments</span>
                          <span className="text-lg font-bold text-foreground font-mono">{trainer.assignments}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground/80 mb-1">Avg Rating</span>
                          <span className="text-lg font-bold text-primary font-mono">{trainer.rating} / 5</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === "assignments" && (
         <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Assignment Tracking</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">Coding activities and assessments for this batch.</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-primary/20">
                 <PlusCircle className="w-3 h-3" /> Add Assignment
              </button>
           </div>

           <div className="border border-border bg-card overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border bg-white/[0.02]">
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Title</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Due Date</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-center">Submission Rate</th>
                   <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Avg Score</th>
                 </tr>
               </thead>
               <tbody>
                  {[
                     { title: "React Hooks Deep Dive", type: "Coding Assessment", due: "Tomorrow", rate: 45, score: "-" },
                     { title: "Custom Hooks Mini-Project", type: "Project", due: "3 days ago", rate: 95, score: "82/100" },
                     { title: "Component Lifecycle", type: "Quiz", due: "1 week ago", rate: 100, score: "91/100" },
                  ].map((assignment, idx) => (
                   <tr key={idx} className="border-b border-border/50 hover:bg-white/[0.02]">
                     <td className="p-4">
                        <div className="font-bold text-foreground text-sm">{assignment.title}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/80">{assignment.type}</div>
                     </td>
                     <td className="p-4"><span className="text-xs font-mono text-foreground/70">{assignment.due}</span></td>
                     <td className="p-4 text-center">
                        <div className="flex flex-col items-center">
                           <span className="text-xs font-mono font-bold text-foreground mb-1">{assignment.rate}%</span>
                           <div className="w-24 h-1 bg-foreground/5 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${assignment.rate}%` }}></div>
                           </div>
                        </div>
                     </td>
                     <td className="p-4"><span className="text-xs font-mono text-foreground font-bold">{assignment.score}</span></td>
                   </tr>
                  ))}
               </tbody>
             </table>
           </div>
         </div>
      )}

      {/* Discussions Tab */}
      {activeTab === "discussions" && (
         <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-card border border-border p-4">
              <div>
                 <h3 className="text-sm font-bold text-foreground mb-1">Batch Discussions</h3>
                 <p className="text-[10px] font-mono text-muted-foreground">Q&A and announcements for this batch.</p>
              </div>
           </div>
           
           <div className="flex flex-col gap-4">
              {[
                 { author: "John Doe (Trainer)", title: "Module 4 Tips & Tricks", time: "2 hours ago", replies: 12, type: "announcement" },
                 { author: "Student Name 4", title: "Error in useEffect dependency array?", time: "5 hours ago", replies: 3, type: "question" },
                 { author: "Student Name 12", title: "Cannot connect to MongoDB atlas", time: "1 day ago", replies: 8, type: "question" },
              ].map((discussion, idx) => (
                 <div key={idx} className="border border-border bg-card p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="flex gap-4 items-start">
                       <div className={`p-3 rounded-full ${discussion.type === 'announcement' ? 'bg-primary/10 text-primary' : 'bg-foreground/5 text-foreground/70'}`}>
                          {discussion.type === 'announcement' ? <BookOpen className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                       </div>
                       <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-bold text-foreground">{discussion.title}</h4>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                             <span>{discussion.author}</span>
                             <span>•</span>
                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {discussion.time}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/70 border border-border px-3 py-1 bg-foreground/5">
                       <MessageSquare className="w-3 h-3" /> {discussion.replies} Replies
                    </div>
                 </div>
              ))}
           </div>
         </div>
      )}
    </div>
  );
};
