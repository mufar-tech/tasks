"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "@/lib/types"
import KanbanCard from "./kanban-card"

const statusConfig: Record<TaskStatus, { label: string; border: string; bg: string }> = {
  backlog: { label: "Backlog", border: "border-t-gray-400", bg: "bg-gray-500" },
  "to-do": { label: "To Do", border: "border-t-blue-400", bg: "bg-blue-500" },
  "in-progress": { label: "In Progress", border: "border-t-amber-400", bg: "bg-amber-500" },
  review: { label: "Review", border: "border-t-purple-400", bg: "bg-purple-500" },
  completed: { label: "Completed", border: "border-t-emerald-400", bg: "bg-emerald-500" },
}

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  status: TaskStatus
  onDrop: (e: React.DragEvent, status: TaskStatus) => void
  onDragStart: (e: React.DragEvent, taskId: string) => void
  onDragOver: (e: React.DragEvent) => void
}

export default function KanbanColumn({
  title,
  tasks,
  status,
  onDrop,
  onDragStart,
  onDragOver,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const config = statusConfig[status]

  return (
    <div
      className={cn(
        "flex flex-col min-w-[300px] flex-1 rounded-lg border border-mufar-border bg-mufar-card/50 border-t-4",
        config.border
      )}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(e)
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
        onDrop(e, status)
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-mufar-border">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", config.bg)} />
          <h3 className="text-sm font-semibold text-mufar-text">{title}</h3>
        </div>
        <span className="inline-flex items-center justify-center h-5 min-w-[20px] rounded-full bg-mufar-hover text-[10px] font-medium text-mufar-text-secondary px-1.5">
          {tasks.length}
        </span>
      </div>

      <div
        className={cn(
          "flex-1 p-3 space-y-3 overflow-y-auto transition-colors min-h-[200px]",
          isDragOver && "bg-mufar-hover/50 rounded-b-lg"
        )}
      >
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 text-xs text-mufar-text-secondary">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}
