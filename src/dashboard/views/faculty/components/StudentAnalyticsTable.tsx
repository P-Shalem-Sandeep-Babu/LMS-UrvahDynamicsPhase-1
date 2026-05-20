import { motion } from "motion/react";
import { Users, MoreHorizontal } from "lucide-react";

export const StudentAnalyticsTable = () => {
  const students = [
    {
      id: "S-1042",
      name: "Alex Mercer",
      cohort: "Web Dev Fall 26",
      grade: "92%",
      attendance: "98%",
      status: "Excelling",
    },
    {
      id: "S-1045",
      name: "Sarah Chen",
      cohort: "Algorithms Sprint",
      grade: "85%",
      attendance: "90%",
      status: "On Track",
    },
    {
      id: "S-1048",
      name: "Marcus Johnson",
      cohort: "Data Structures",
      grade: "64%",
      attendance: "75%",
      status: "At Risk",
    },
    {
      id: "S-1051",
      name: "Emily Wong",
      cohort: "Web Dev Fall 26",
      grade: "88%",
      attendance: "95%",
      status: "On Track",
    },
    {
      id: "S-1055",
      name: "David Kim",
      cohort: "Algorithms Sprint",
      grade: "96%",
      attendance: "100%",
      status: "Excelling",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-border bg-card p-6 relative overflow-hidden flex-1"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Users className="w-3 h-3" /> Student Roster Analytics
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="SEARCH STUDENT IDS..."
            className="bg-background border border-border text-[10px] font-mono px-3 py-1 focus:outline-none focus:border-primary/50 text-foreground w-48"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
              <th className="pb-3 font-medium px-4">ID</th>
              <th className="pb-3 font-medium px-4">Name</th>
              <th className="pb-3 font-medium px-4">Cohort</th>
              <th className="pb-3 font-medium px-4">Grade</th>
              <th className="pb-3 font-medium px-4">Attendance</th>
              <th className="pb-3 font-medium px-4">Status</th>
              <th className="pb-3 font-medium px-4"></th>
            </tr>
          </thead>
          <tbody className="text-xs font-mono text-foreground/70">
            {students.map((student, i) => (
              <tr
                key={i}
                className="border-b border-border/50 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-4">{student.id}</td>
                <td className="py-4 px-4 text-foreground font-sans font-bold text-sm">
                  {student.name}
                </td>
                <td className="py-4 px-4">{student.cohort}</td>
                <td className="py-4 px-4">{student.grade}</td>
                <td className="py-4 px-4">{student.attendance}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 text-[8px] uppercase tracking-widest font-bold border ${
                      student.status === "Excelling"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : student.status === "On Track"
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="p-1 hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
