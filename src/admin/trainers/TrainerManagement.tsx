import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Plus, LayoutGrid, List } from "lucide-react";
import { getStoredTrainers, saveStoredTrainers } from "../../services/trainerService";
import { TrainerTable } from "./components/TrainerTable";
import { TrainerCard } from "./components/TrainerCard";
import { Trainer } from "../../types/trainer";
import { Button } from "../../components/ui/button";
import { TrainerAnalyticsWidget } from "./components/TrainerAnalyticsWidget";
import { CreateTrainerModal } from "./components/CreateTrainerModal";
import { EditTrainerModal } from "./components/EditTrainerModal";
import { DeleteTrainerModal } from "./components/DeleteTrainerModal";
import { TrainerAssignmentModal } from "./components/TrainerAssignmentModal";

export const TrainerManagement = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [trainers, setTrainers] = useState<Trainer[]>(() => getStoredTrainers());

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTrainer, setEditTrainer] = useState<Trainer | null>(null);
  const [deleteTrainer, setDeleteTrainer] = useState<Trainer | null>(null);
  const [assignTrainer, setAssignTrainer] = useState<Trainer | null>(null);

  const refreshTrainers = () => {
    setTrainers(getStoredTrainers());
  };

  useEffect(() => {
    window.addEventListener("storage_trainers_updated", refreshTrainers);
    return () => {
      window.removeEventListener("storage_trainers_updated", refreshTrainers);
    };
  }, []);

  const handleCreateTrainer = (data: Partial<Trainer>) => {
    const newTrainer: Trainer = {
      id: `trn_${Date.now()}`,
      name: data.name || "Unnamed Trainer",
      email: data.email || "unknown@urvah.edu",
      phone: data.phone || "",
      assignedColleges: [],
      assignedBatches: [],
      activeStudents: 0,
      codingEngagement: 75,
      assignmentCompletion: 68,
      weeklyActivity: 30,
      status: "active"
    };

    const updated = [...trainers, newTrainer];
    saveStoredTrainers(updated);
    setTrainers(updated);
  };

  const handleEditTrainer = (data: Partial<Trainer>) => {
    if (!data.id) return;
    const updated = trainers.map(t => t.id === data.id ? { ...t, ...data } as Trainer : t);
    saveStoredTrainers(updated);
    setTrainers(updated);
  };

  const handleDeleteTrainerConfirm = () => {
    if (!deleteTrainer) return;
    const updated = trainers.filter(t => t.id !== deleteTrainer.id);
    saveStoredTrainers(updated);
    setTrainers(updated);
    setDeleteTrainer(null);
  };

  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(search.toLowerCase()) || 
    trainer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Trainer Directory
          </h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">Manage and assign {trainers.length} trainers.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="bg-primary text-black font-bold text-xs uppercase tracking-wider h-9"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Trainer
          </Button>
        </div>
      </div>

      <TrainerAnalyticsWidget trainers={trainers} />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border border-border bg-card p-2 rounded-lg">
        <div className="flex items-center gap-2 w-full md:w-auto flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-foreground text-sm font-mono px-10 py-2 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 border-l border-border pl-4">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md" onClick={() => setView("grid")}>
            <LayoutGrid className={`w-4 h-4 ${view === "grid" ? "text-primary" : "text-muted-foreground/80"}`} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md" onClick={() => setView("list")}>
            <List className={`w-4 h-4 ${view === "list" ? "text-primary" : "text-muted-foreground/80"}`} />
          </Button>
          <div className="w-px h-4 bg-foreground/10 mx-2" />
          <Button variant="outline" size="sm" className="border-border text-xs font-mono h-8">
            <Filter className="w-3 h-3 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTrainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      ) : (
        <TrainerTable 
          trainers={filteredTrainers} 
          onEdit={setEditTrainer}
          onDelete={setDeleteTrainer}
          onAssign={setAssignTrainer}
        />
      )}

      <CreateTrainerModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={handleCreateTrainer}
      />

      <EditTrainerModal 
        trainer={editTrainer} 
        isOpen={!!editTrainer} 
        onClose={() => setEditTrainer(null)} 
        onSubmit={handleEditTrainer}
      />

      <TrainerAssignmentModal 
        trainer={assignTrainer} 
        isOpen={!!assignTrainer} 
        onClose={() => setAssignTrainer(null)} 
        onSuccess={refreshTrainers}
      />

      <DeleteTrainerModal 
        trainer={deleteTrainer} 
        isOpen={!!deleteTrainer} 
        onClose={() => setDeleteTrainer(null)} 
        onConfirm={handleDeleteTrainerConfirm}
      />
    </div>
  );
};
