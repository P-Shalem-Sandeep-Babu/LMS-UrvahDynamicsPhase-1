import React, { useState, useEffect } from "react";
import { ClipboardCheck, Calendar, Check, X, Clock, HelpCircle, Save } from "lucide-react";
import { getStoredStudents, getStoredAttendance, markAttendance, AttendanceRecord } from "../../utils/batchState";
import { Student } from "../../types/student";

interface BatchAttendanceTrackerProps {
  batchId: string;
}

export const BatchAttendanceTracker: React.FC<BatchAttendanceTrackerProps> = ({ batchId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // default to today
  });
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    setStudents(getStoredStudents().filter(s => s.batchId === batchId));
    setAttendance(getStoredAttendance());
    
    const handleUpdate = () => {
      setStudents(getStoredStudents().filter(s => s.batchId === batchId));
      setAttendance(getStoredAttendance());
    };
    
    window.addEventListener("urvah_students_update", handleUpdate);
    window.addEventListener("urvah_attendance_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_students_update", handleUpdate);
      window.removeEventListener("urvah_attendance_update", handleUpdate);
    };
  }, [batchId]);

  // Current record for the selected date
  const currentRecord = attendance.find(r => r.batchId === batchId && r.date === selectedDate);

  const getStudentStatus = (studentId: string): "present" | "absent" | "late" | "unmarked" => {
    if (!currentRecord) return "unmarked";
    return currentRecord.records[studentId] || "unmarked";
  };

  const handleStatusChange = (studentId: string, status: "present" | "absent" | "late") => {
    markAttendance(batchId, selectedDate, studentId, status);
  };

  const markAll = (status: "present" | "absent" | "late") => {
    students.forEach(s => {
      markAttendance(batchId, selectedDate, s.id, status);
    });
  };

  // Calculate live statistics for this specific selected date
  const stats = (() => {
    if (students.length === 0) return { present: 0, absent: 0, late: 0, unmarked: 0, percentage: 0 };
    
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let unmarkedCount = 0;

    students.forEach(s => {
      const status = getStudentStatus(s.id);
      if (status === "present") presentCount++;
      else if (status === "absent") absentCount++;
      else if (status === "late") lateCount++;
      else unmarkedCount++;
    });

    const definedCount = presentCount + lateCount;
    const denominator = students.length - unmarkedCount;
    const percentage = denominator > 0 ? Math.round((definedCount / denominator) * 100) : 0;

    return {
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      unmarked: unmarkedCount,
      percentage
    };
  })();

  return (
    <div className="space-y-4">
      {/* Date picking and shortcuts control box */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d0d0d] p-4 border border-border/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <label className="text-[9px] uppercase font-mono text-muted-foreground/80 block">Select Class Session Date</label>
            <input 
              type="date" 
              maxLength={10}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-background/40 border border-border text-foreground font-mono text-xs p-1 focus:outline-none focus:border-primary/50 text-center" 
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground/80 uppercase">Bulk:</span>
          <button
            onClick={() => markAll("present")}
            className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded text-[9px] font-mono uppercase font-bold"
          >
            All Present
          </button>
          <button
            onClick={() => markAll("absent")}
            className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded text-[9px] font-mono uppercase font-bold"
          >
            All Absent
          </button>
        </div>
      </div>

      {/* Live Date Stats Box */}
      {students.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.02] border border-border/50 p-3 rounded-lg text-center font-mono">
          <div className="p-2 border-r border-border/50">
            <span className="text-[8px] text-muted-foreground/80 uppercase block mb-0.5">Present</span>
            <span className="text-sm font-bold text-green-400">{stats.present}</span>
          </div>
          <div className="p-2 sm:border-r border-border/50">
            <span className="text-[8px] text-muted-foreground/80 uppercase block mb-0.5">Late / Delayed</span>
            <span className="text-sm font-bold text-yellow-500">{stats.late}</span>
          </div>
          <div className="p-2 border-r border-border/50">
            <span className="text-[8px] text-muted-foreground/80 uppercase block mb-0.5">Absent</span>
            <span className="text-sm font-bold text-red-400">{stats.absent}</span>
          </div>
          <div className="p-2">
            <span className="text-[8px] text-muted-foreground/80 uppercase block mb-0.5">Ratio</span>
            <span className="text-sm font-bold text-foreground">{stats.percentage}%</span>
          </div>
        </div>
      )}

      {/* Student Attendance List */}
      <div className="border border-border/50 rounded-lg overflow-hidden bg-background/20">
        <div className="divide-y divide-white/5 font-mono">
          {students.map((student) => {
            const status = getStudentStatus(student.id);
            return (
              <div key={student.id} className="flex justify-between items-center p-3 hover:bg-white/[0.01] transition-colors gap-4">
                <div>
                  <h5 className="text-xs font-bold text-foreground">{student.name}</h5>
                  <p className="text-[9px] text-muted-foreground/80 uppercase mt-0.5">roll: {student.rollNo}</p>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleStatusChange(student.id, "present")}
                    className={`p-2 border rounded-none transition-all flex items-center justify-center ${
                      status === "present"
                        ? "bg-green-500/20 text-green-400 border-green-500/40"
                        : "bg-background/10 text-muted-foreground/60 border-border hover:border-border/80 hover:text-foreground"
                    }`}
                    title="Mark Present"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, "late")}
                    className={`p-2 border rounded-none transition-all flex items-center justify-center ${
                      status === "late"
                        ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/40"
                        : "bg-background/10 text-muted-foreground/60 border-border hover:border-border/80 hover:text-foreground"
                    }`}
                    title="Mark Late"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, "absent")}
                    className={`p-2 border rounded-none transition-all flex items-center justify-center ${
                      status === "absent"
                        ? "bg-red-500/20 text-red-500 border-red-500/40"
                        : "bg-background/10 text-muted-foreground/60 border-border hover:border-border/80 hover:text-foreground"
                    }`}
                    title="Mark Absent"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {students.length === 0 && (
            <div className="p-8 text-center text-muted-foreground/60 italic text-xs">
              Add students to this batch first to enable attendance recording.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
