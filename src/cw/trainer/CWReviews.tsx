import React, { useState } from "react";
import { BookOpen, CheckCircle2, XCircle, Search, AlertCircle, FileCode2 } from "lucide-react";

export const CWReviews = () => {
  const [selectedSub, setSelectedSub] = useState<any>(null);

  const stats = {
    pending: 45,
    reviewed: 120,
    avgScore: "8.5/10",
    topTopic: "Arrays & Pointers"
  };

  const submissions = [
    { id: "s1", student: "Alex Mercer", cwTitle: "Daily Practice: Arrays & Pointers", batch: "FS-Cohort Alpha", status: "Pending", submittedAt: "2 hours ago", score: null },
    { id: "s2", student: "Sarah Connor", cwTitle: "React Component Lifecycle", batch: "WebDev Bootcamp", status: "Reviewed", submittedAt: "1 day ago", score: "9/10" },
    { id: "s3", student: "John Smith", cwTitle: "Core Java Assessment", batch: "DS-Cohort Beta", status: "Pending", submittedAt: "3 hours ago", score: null },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center text-foreground">
        <div>
           <h1 className="text-2xl font-bold flex items-center gap-2">
             <BookOpen className="w-6 h-6 text-primary" /> CW Reviews
           </h1>
           <p className="text-sm text-muted-foreground mt-1">Review student class work and provide feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-card p-4 border border-border flex flex-col gap-1">
           <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2"><AlertCircle className="w-3 h-3 text-green-500" /> Pending Reviews</span>
           <span className="text-2xl font-bold text-foreground font-mono">{stats.pending}</span>
         </div>
         <div className="bg-card p-4 border border-border flex flex-col gap-1">
           <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Completed</span>
           <span className="text-2xl font-bold text-foreground font-mono">{stats.reviewed}</span>
         </div>
         <div className="bg-card p-4 border border-border flex flex-col gap-1">
           <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2"><BookOpen className="w-3 h-3" /> Average Score</span>
           <span className="text-2xl font-bold text-foreground font-mono">{stats.avgScore}</span>
         </div>
         <div className="bg-card p-4 border border-border flex flex-col gap-1">
           <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2"><FileCode2 className="w-3 h-3" /> Weakest Topic</span>
           <span className="text-lg font-bold text-foreground truncate mt-1">{stats.topTopic}</span>
         </div>
      </div>

      <div className="bg-card border border-border">
         <div className="p-4 border-b border-border bg-muted/10 flex justify-between items-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Recent Submissions</h2>
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search by student or CW..." className="w-full bg-background border border-border text-foreground text-sm pl-10 pr-4 py-2 focus:outline-none focus:border-primary/50" />
            </div>
         </div>
         
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/5">
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Student</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">CW Title</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Status / Score</th>
                <th className="p-4 text-xs font-mono uppercase tracking-widest text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr key={sub.id} className="border-b border-border hover:bg-muted/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-sm text-foreground">{sub.student}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-widest">{sub.batch}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground font-medium">{sub.cwTitle}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1">{sub.submittedAt}</div>
                  </td>
                  <td className="p-4">
                    {sub.status === 'Pending' ? (
                       <span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-bold uppercase tracking-widest">Pending Match</span>
                    ) : (
                       <span className="text-sm font-mono font-bold text-green-500">{sub.score}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedSub(sub)}
                      className="bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {sub.status === 'Pending' ? "Review Now" : "View Feedback"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
         </table>
      </div>

      {selectedSub && (
        <ReviewModal sub={selectedSub} onClose={() => setSelectedSub(null)} />
      )}
    </div>
  );
};

const ReviewModal = ({ sub, onClose }: { sub: any, onClose: () => void }) => {
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const mockCode = `def reverse_array(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

# Correct implementation submitted
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
       <div className="bg-card w-full max-w-4xl border border-border shadow-2xl flex flex-col max-h-[90vh]">
         <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20 shrink-0">
           <div>
             <h2 className="text-lg font-bold text-foreground">Review: {sub.student}</h2>
             <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">{sub.cwTitle}</p>
           </div>
           <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
             <XCircle className="w-5 h-5" />
           </button>
         </div>

         <div className="flex-1 flex overflow-hidden">
            <div className="w-1/2 border-r border-border p-0 flex flex-col bg-[#1e1e1e]">
               <div className="bg-[#2d2d2d] px-4 py-2 text-xs font-mono text-white/50 border-b border-[#3d3d3d] flex justify-between">
                 <span>solution.py</span>
                 <span>Python</span>
               </div>
               <pre className="p-4 text-sm font-mono text-white overflow-auto flex-1 whitespace-pre-wrap">{mockCode}</pre>
            </div>
            
            <div className="w-1/2 p-6 overflow-y-auto flex flex-col gap-6 bg-card">
               <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Automated Evaluation</h3>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-none flex items-start gap-3">
                     <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                     <p className="text-sm text-green-600 font-mono">All 5 hidden test cases passed successfully. Optimal time complexity (O(N)) detected.</p>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Provide Score (Out of 10)</label>
                 <input 
                   type="number" 
                   value={score} 
                   onChange={e => setScore(e.target.value)}
                   className="bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary/50" 
                   placeholder="e.g. 10" 
                 />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Trainer Feedback / Comments</label>
                 <textarea 
                   rows={4}
                   value={comment}
                   onChange={e => setComment(e.target.value)}
                   className="bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary/50" 
                   placeholder="Write feedback for the student..." 
                 />
               </div>

               <div className="mt-auto pt-4 border-t border-border flex justify-end gap-4">
                 <button className="border border-red-500/30 text-red-500 hover:bg-red-500/10 px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors">Mark as Failed</button>
                 <button onClick={onClose} className="bg-primary text-primary-foreground px-6 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-primary/90 transition-colors">Submit Review</button>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};
