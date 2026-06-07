"use client"

import { useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import KanbanBoard from "@/components/kanban/kanban-board"
import { projects } from "@/lib/constants"

export default function BoardsPage() {
  const [view, setView] = useState<"board" | "list">("board")
  const [projectFilter, setProjectFilter] = useState("all")

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Board</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Visualize and manage your workflow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border border-mufar-border overflow-hidden">
            <Button
              variant={view === "board" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("board")}
              className="rounded-none"
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Board
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {view === "board" ? <KanbanBoard /> : <KanbanBoard />}
      </div>
    </div>
  )
}
