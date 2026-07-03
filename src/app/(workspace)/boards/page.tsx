"use client"

import { useState, useEffect } from "react"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import KanbanBoard from "@/components/kanban/kanban-board"
import { getProjects } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function BoardsPage() {
  const [view] = useState<"board" | "list">("board")
  const [projectFilter, setProjectFilter] = useState("all")
  const [projects, setProjects] = useState<any[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false))
  }, [])

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
          <Select value={projectFilter} onValueChange={setProjectFilter} disabled={loadingProjects}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p: any) => (
                <SelectItem key={p._id || p.id} value={p._id || p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <KanbanBoard projectFilter={projectFilter} />
      </div>
    </div>
  )
}
