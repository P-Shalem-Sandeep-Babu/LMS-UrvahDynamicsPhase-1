import React, { useState, useEffect } from "react";
import { BookOpen, Clock, CheckCircle2, Play, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MyCW = () => {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cws = [
    { 
      id: "cw-1", 
      title: "Daily Practice: Arrays & Pointers", 
      type: "Coding", 
      questions: 3, 
      deadline: new Date(now.getTime() + 1000 * 60 * 60 * 5), // 5 hours from now
      status: "Active",
      subject: "Data Structures",
      score: null
    },
    { 
      id: "cw-2", 
      title: "Weekly Check-in: React Hooks", 
      type: "MCQ", 
      questions: 10, 
      deadline: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "Closed",
      subject: "Web Dev",
      score: "8/10"
    },
    { 
      id: "cw-3", 
      title: "Core Java Assessment", 
      type: "Mixed", 
      questions: 5, 
      deadline: new Date(now.getTime() + 1000 * 60 * 60 * 24), // tomorrow
      status: "Pending",
      subject: "Java",
      score: null
    }
  ];

  const formatTimeLeft = (deadline: Date) => {
    const diff = deadline.getTime() - now.getTime();
    if (diff <= 0) return "Closed";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-card glass-panel p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            My Class Work
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Complete your assignments before 23:59 everyday.</p>
        </div>
        <div className="flex gap-4">
           {/* Summary badges */}
           <div className="bg-background border border-border px-4 py-2 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm font-bold font-mono">1 Active</span>
           </div>
           <div className="bg-background border border-border px-4 py-2 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
             <span className="text-sm font-bold font-mono">1 Pending</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cws.map((cw) => {
          const isClosed = cw.deadline.getTime() <= now.getTime();
          
          return (
            <div key={cw.id} className={`bg-card glass-panel border ${isClosed ? 'border-border opacity-75' : 'border-primary/20'} flex flex-col relative overflow-hidden transition-all hover:shadow-lg`}>
              {isOpen(cw.deadline, now) && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 font-mono">
                  Active
                </div>
              )}
              {isClosed && (
                <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 font-mono">
                  Closed
                </div>
              )}
              
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{cw.subject} &bull; {cw.type}</span>
                  <h3 className="text-lg font-bold text-foreground">{cw.title}</h3>
                </div>
                
                <div className="flex items-center gap-4 text-sm font-mono mt-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="w-4 h-4" /> {cw.questions} Qs
                  </div>
                  <div className={`flex items-center gap-1.5 ${isClosed ? 'text-red-500' : 'text-primary animate-pulse'}`}>
                    <Clock className="w-4 h-4" /> 
                    <span>{formatTimeLeft(cw.deadline)}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  {cw.score ? (
                    <div className="text-sm font-bold text-foreground flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                       Score: <span className="text-green-500 font-mono">{cw.score}</span>
                    </div>
                  ) : isClosed ? (
                    <div className="text-sm font-bold text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Missed
                    </div>
                  ) : (
                    <div className="text-sm font-mono text-muted-foreground">Not attempted</div>
                  )}
                  
                  {!isClosed && !cw.score && (
                    <button 
                      onClick={() => navigate(`/student/cw/${cw.id}`)}
                      className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                      <Play className="w-3 h-3 fill-current" /> Start CW
                    </button>
                  )}
                  {cw.score && (
                    <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      View Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper
function isOpen(deadline: Date, now: Date) {
  return deadline.getTime() > now.getTime();
}
