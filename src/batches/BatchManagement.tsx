import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, LayoutGrid, List as ListIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { getStoredBatches, saveStoredBatches } from "../utils/batchState";
import { BatchTable } from "./components/BatchTable";
import { BatchCard } from "./components/BatchCard";
import { BatchStatsWidget } from "./components/BatchStatsWidget";
import { CreateBatchModal } from "./components/CreateBatchModal";
import { EditBatchModal } from "./components/EditBatchModal";
import { Batch } from "../types/batch";

export const BatchManagement = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editBatch, setEditBatch] = useState<Batch | null>(null);
  const [batches, setBatches] = useState<Batch[]>(() => getStoredBatches());

  useEffect(() => {
    const handleUpdate = () => {
      setBatches(getStoredBatches());
    };
    window.addEventListener("urvah_batches_update", handleUpdate);
    return () => {
      window.removeEventListener("urvah_batches_update", handleUpdate);
    };
  }, []);

  const filteredBatches = batches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.trainerName && b.trainerName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateBatch = (newData: any) => {
    const newBatch: Batch = {
      ...newData,
      id: `batch_${Date.now()}`,
      studentCount: 15 + Math.floor(Math.random() * 30), // initial random student counts for visuals
      codingActivity: 40 + Math.floor(Math.random() * 50),
      assignmentProgress: 30 + Math.floor(Math.random() * 60),
    };
    const updated = [...batches, newBatch];
    setBatches(updated);
    saveStoredBatches(updated);
  };

  const handleEditBatchSubmit = (updatedData: Partial<Batch>) => {
    if (!editBatch) return;
    const updated = batches.map(b => b.id === editBatch.id ? { ...b, ...updatedData } : b);
    setBatches(updated);
    saveStoredBatches(updated);
  };

  const handleDeleteBatch = (batchToDelete: Batch) => {
    if (confirm(`Are you sure you want to delete batch "${batchToDelete.name}"?`)) {
      const updated = batches.filter(b => b.id !== batchToDelete.id);
      setBatches(updated);
      saveStoredBatches(updated);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 mb-2">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-foreground">
            Batch Management
          </h1>
          <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Organize & Monitor Cohorts
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] items-center gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-3 h-3" /> Create Batch
          </Button>
        </div>
      </div>

      <BatchStatsWidget />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-foreground/5 p-2 rounded-xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
          <Input 
            placeholder="Search batches, colleges, trainers..." 
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
        <BatchTable 
          batches={filteredBatches} 
          onEdit={(b) => setEditBatch(b)}
          onDelete={handleDeleteBatch}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBatches.map(batch => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
          {filteredBatches.length === 0 && (
            <div className="col-span-full py-12 text-center border border-border border-dashed rounded-xl">
              <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">No batches found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      <CreateBatchModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={handleCreateBatch}
      />
      <EditBatchModal 
        batch={editBatch} 
        isOpen={!!editBatch} 
        onClose={() => setEditBatch(null)} 
        onSubmit={handleEditBatchSubmit}
      />
    </div>
  );
};
