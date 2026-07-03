"use client"

import { useState, useMemo } from "react"
import { Search, FolderOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import type { ProjectStatus } from "@/lib/types"
import ProjectCard from "./project-card"

interface ProjectListProps {
  projects: any[]
  loading?: boolean
  onRefresh?: () => void
}

const filters: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "On Hold", value: "on-hold" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archived" },
]

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-mufar-border bg-mufar-card p-5 space-y-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-5 w-2/3 rounded bg-mufar-hover" />
          <div className="h-3 w-full rounded bg-mufar-hover" />
        </div>
        <div className="h-8 w-8 rounded bg-mufar-hover" />
      </div>
      <div className="h-2 w-full rounded bg-mufar-hover" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-mufar-hover" />
          <div className="h-3 w-16 rounded bg-mufar-hover" />
        </div>
        <div className="h-5 w-14 rounded bg-mufar-hover" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-7 w-7 rounded-full border-2 border-mufar-card bg-mufar-hover" />
          ))}
        </div>
        <div className="h-3 w-20 rounded bg-mufar-hover" />
      </div>
    </div>
  )
}

export default function ProjectList({ projects, loading, onRefresh }: ProjectListProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all")
  const [sort, setSort] = useState("name")

  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesSearch =
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === "all" || p.status === statusFilter
        return matchesSearch && matchesStatus
      })
      .sort((a: any, b: any) => {
        if (sort === "name") return (a.name || "").localeCompare(b.name || "")
        if (sort === "progress") return (b.progress || 0) - (a.progress || 0)
        if (sort === "tasks") return (b.taskCount || 0) - (a.taskCount || 0)
        return 0
      })
  }, [projects, search, statusFilter, sort])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mufar-text-secondary" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(f.value)}
              className="shrink-0"
            >
              {f.label}
            </Button>
          ))}
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="tasks">Task Count</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-mufar-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-mufar-text mb-1">No projects found</h3>
          <p className="text-sm text-mufar-text-secondary">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project: any) => (
            <ProjectCard key={project._id || project.id} project={project} onRefresh={onRefresh} />
          ))}
        </div>
      )}
    </div>
  )
}
