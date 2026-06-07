"use client"

import { useState } from "react"
import type { Task, TaskStatus } from "@/lib/types"
import { tasks as initialTasks } from "@/lib/constants"
import KanbanColumn from "./kanban-column"

const columns: { title: string; status: TaskStatus }[] = [
  { title: "Backlog", status: "backlog" },
  { title: "To Do", status: "to-do" },
  { title: "In Progress", status: "in-progress" },
  { title: "Review", status: "review" },
  { title: "Completed", status: "completed" },
]

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

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

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")
    if (!taskId) return

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
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
