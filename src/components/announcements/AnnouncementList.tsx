import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Announcement } from "../../types/announcement";
import { mockAnnouncements } from "../../data/mockAnnouncements";
import { AnnouncementCard } from "./AnnouncementCard";
import { AnnouncementModal } from "./AnnouncementModal";
import { DeleteAnnouncementModal } from "./DeleteAnnouncementModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AnnouncementListProps {
  canManage?: boolean;
}

export const AnnouncementList = ({ canManage = false }: AnnouncementListProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAnn, setEditAnn] = useState<Announcement | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteAnn, setDeleteAnn] = useState<Announcement | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filtered = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === "All" || a.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleSave = (data: Partial<Announcement>) => {
    if (editAnn) {
      setAnnouncements(announcements.map(a => a.id === editAnn.id ? { ...a, ...data } as Announcement : a));
      setIsEditOpen(false);
      setEditAnn(null);
    } else {
      const newAnn: Announcement = {
        id: `ann_${Date.now()}`,
        title: data.title || "",
        content: data.content || "",
        category: data.category || "General",
        audiences: data.audiences || [],
        createdBy: "me",
        createdAt: new Date().toISOString(),
        pinned: data.pinned || false,
        active: true
      };
      setAnnouncements([newAnn, ...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)));
      setIsAddOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    setIsDeleteOpen(false);
    setDeleteAnn(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 border border-border rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input 
              type="text" 
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border-border text-foreground pl-10 focus-visible:ring-primary/50"
            />
          </div>
          
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full flex h-10 items-center justify-between border border-border bg-card pl-10 pr-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-mono"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="Assignments">Assignments</option>
              <option value="Coding">Coding</option>
              <option value="Contests">Contests</option>
              <option value="Deadlines">Deadlines</option>
            </select>
          </div>
        </div>

        {canManage && (
          <Button onClick={() => setIsAddOpen(true)} className="bg-primary text-black font-bold text-xs uppercase tracking-wider h-9 w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" /> New Broadcast
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ann => (
          <AnnouncementCard 
            key={ann.id} 
            announcement={ann} 
            showActions={canManage} 
            onEdit={(a) => { setEditAnn(a); setIsEditOpen(true); }} 
            onDelete={(a) => { setDeleteAnn(a); setIsDeleteOpen(true); }} 
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 text-center text-muted-foreground/80 font-mono text-sm border border-border rounded-xl bg-foreground/5 border-dashed">
            No announcements found matching your criteria.
          </div>
        )}
      </div>

      {canManage && (
        <>
          <AnnouncementModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleSave} />
          <AnnouncementModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} announcement={editAnn} onSave={handleSave} />
          <DeleteAnnouncementModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} announcement={deleteAnn} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};
