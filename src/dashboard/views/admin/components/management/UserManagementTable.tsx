import { useState, useMemo } from "react";
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Edit2, AlertTriangle, UserX } from "lucide-react";

interface UserManagementTableProps {
  role: "student" | "trainer" | "faculty";
}

const mockData = {
  student: Array.from({ length: 45 }).map((_, i) => ({
    id: `STU-${1000 + i}`,
    name: `Student Name ${i}`,
    email: `student${i}@college.edu`,
    college: `Engineering College ${i % 3 + 1}`,
    batch: `Batch 202${i % 4 + 4}`,
    status: i % 7 === 0 ? "inactive" : "active",
    score: Math.floor(Math.random() * 40) + 60,
  })),
  trainer: Array.from({ length: 15 }).map((_, i) => ({
    id: `TRN-${1000 + i}`,
    name: `Trainer Name ${i}`,
    email: `trainer${i}@lms.edu`,
    college: `N/A`,
    batch: `${(i % 3) + 2} Batches`,
    status: i % 5 === 0 ? "inactive" : "active",
    score: null,
  })),
  faculty: Array.from({ length: 20 }).map((_, i) => ({
    id: `FAC-${1000 + i}`,
    name: `Faculty Member ${i}`,
    email: `faculty${i}@college.edu`,
    college: `Engineering College ${i % 3 + 1}`,
    batch: `All`,
    status: i % 8 === 0 ? "inactive" : "active",
    score: null,
  }))
};

export const UserManagementTable = ({ role }: UserManagementTableProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const data = mockData[role];

  const filteredData = useMemo(() => {
    return data.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) || 
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder={`Search ${role}s by name, ID, or email...`}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-card border border-border text-foreground text-sm font-mono px-10 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <button className="w-full md:w-auto border border-border/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
          <Filter className="w-3 h-3" /> Advanced Filters
        </button>
      </div>

      {/* Table */}
      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-white/[0.02]">
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">ID & Name</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Contact</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Affiliation</th>
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Status</th>
              {role === 'student' && <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">Score</th>}
              <th className="p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map(user => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground text-sm">{user.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground/80">{user.id}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-mono text-foreground/70">{user.email}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-foreground/80">{user.college}</span>
                      <span className="text-[10px] font-mono text-muted-foreground/80">{user.batch}</span>
                    </div>
                  </td>
                  <td className="p-4">
                     <span className={`text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-1 border ${
                       user.status === 'active' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10'
                     }`}>
                       {user.status}
                     </span>
                  </td>
                  {role === 'student' && (
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${user.score! < 65 ? 'text-red-500' : 'text-primary'}`}>
                          {user.score}%
                        </span>
                        {user.score! < 65 && <AlertTriangle className="w-3 h-3 text-red-500" />}
                      </div>
                    </td>
                  )}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-border text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors">
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <span className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest">
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 border border-border text-muted-foreground disabled:opacity-30 hover:bg-foreground/5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1 border border-border text-muted-foreground disabled:opacity-30 hover:bg-foreground/5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
