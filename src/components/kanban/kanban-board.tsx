"use client"

import { useState, useEffect, useCallback } from "react"
import { LayoutGrid } from "lucide-react"
import type { Task, TaskStatus } from "@/lib/types"
import { getTasks, batchUpdateTasks } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import KanbanColumn from "./kanban-column"

const columns: { title: string; status: TaskStatus }[] = [
  { title: "Backlog", status: "backlog" },
  { title: "To Do", status: "to-do" },
  { title: "In Progress", status: "in-progress" },
  { title: "Review", status: "review" },
  { title: "Completed", status: "completed" },
]

interface KanbanBoardProps {
  projectFilter?: string
}

export default function KanbanBoard({ projectFilter }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params: Record<string, string> = {}
      if (projectFilter && projectFilter !== "all") params.projectId = projectFilter
      const data = await getTasks(params)
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }, [projectFilter])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const getColumnTasks = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status)

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = async (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")
    if (!taskId) return

    const task = tasks.find((t) => (t as any)._id === taskId || t.id === taskId)
    if (!task || task.status === targetStatus) return

    setTasks((prev) =>
      prev.map((t) => {
        const id = (t as any)._id || t.id
        return id === taskId ? { ...t, status: targetStatus } : t
      })
    )

    try {
      await batchUpdateTasks([{ id: taskId, status: targetStatus }])
    } catch {
      setTasks((prev) =>
        prev.map((t) => {
          const id = (t as any)._id || t.id
          return id === taskId ? { ...t, status: task.status } : t
        })
      )
    }
  }

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {columns.map((col) => (
          <div key={col.status} className="flex flex-col min-w-[280px] w-[280px] sm:w-72 rounded-lg border border-mufar-border bg-mufar-card/50 border-t-4 border-t-mufar-border">
            <div className="flex items-center justify-between px-4 py-3 border-b border-mufar-border">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>
            <div className="p-3 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
          <LayoutGrid className="h-8 w-8 text-mufar-danger" />
        </div>
        <h3 className="text-lg font-semibold text-mufar-text mb-1">Failed to load board</h3>
        <p className="text-sm text-mufar-text-secondary mb-4">{error}</p>
        <button onClick={fetchTasks} className="text-sm text-mufar-primary hover:underline">
          Try again
        </button>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
          <LayoutGrid className="h-8 w-8 text-mufar-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-mufar-text mb-1">No tasks yet</h3>
        <p className="text-sm text-mufar-text-secondary">
          Create your first task to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full snap-x snap-mandatory">
      {columns.map((col) => (
        <KanbanColumn
          key={col.status}
          title={col.title}
          status={col.status}
          tasks={getColumnTasks(col.status)}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
        />
      ))}
    </div>
  )
}
