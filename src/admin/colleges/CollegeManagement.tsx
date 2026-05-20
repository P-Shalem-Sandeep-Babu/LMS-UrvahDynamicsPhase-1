import React, { useState } from "react";
import { Plus, Search, Filter, LayoutGrid, List as ListIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CollegeTable } from "./components/CollegeTable";
import { CollegeCard } from "./components/CollegeCard";
import { CollegeStatsWidget } from "./components/CollegeStatsWidget";
import { CreateCollegeModal } from "./components/CreateCollegeModal";
import { EditCollegeModal } from "./components/EditCollegeModal";
import { DeleteCollegeModal } from "./components/DeleteCollegeModal";
import { mockColleges } from "../../data/mockColleges";
import { College } from "../../types/college";

export const CollegeManagement = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editCollege, setEditCollege] = useState<College | null>(null);
  const [deleteCollege, setDeleteCollege] = useState<College | null>(null);

  const filteredColleges = mockColleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            College Directory
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Manage Partner Institutions & Network Activity
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] items-center gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-3 h-3" /> Add College
          </Button>
        </div>
      </div>

      <CollegeStatsWidget />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-foreground/5 p-2 rounded-xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
          <Input 
            placeholder="Search colleges by name or code..." 
            className="pl-9 bg-background/20 border-border w-full font-mono text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground gap-2 border border-border bg-background/20 hidden md:flex">
            <Filter className="w-3 h-3" /> Filters
          </Button>
          <div className="flex items-center p-1 bg-background/40 border border-border rounded-lg ml-auto md:ml-0">
            <button 
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${viewMode === "table" ? "bg-foreground/10 text-foreground" : "text-muted-foreground/80 hover:text-foreground"}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-foreground/10 text-foreground" : "text-muted-foreground/80 hover:text-foreground"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <CollegeTable 
          colleges={filteredColleges} 
          onEdit={(c) => setEditCollege(c)}
          onDelete={(c) => setDeleteCollege(c)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
          {filteredColleges.length === 0 && (
            <div className="col-span-full py-12 text-center border border-border border-dashed rounded-xl">
              <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">No colleges found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CreateCollegeModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={(data) => console.log(data)}
      />
      <EditCollegeModal 
        college={editCollege} 
        isOpen={!!editCollege} 
        onClose={() => setEditCollege(null)} 
        onSubmit={(data) => console.log(data)}
      />
      <DeleteCollegeModal 
        college={deleteCollege} 
        isOpen={!!deleteCollege} 
        onClose={() => setDeleteCollege(null)} 
        onConfirm={() => console.log("deleted")}
      />
    </div>
  );
};
