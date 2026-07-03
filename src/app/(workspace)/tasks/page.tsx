"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TaskList from "@/components/tasks/task-list"
import CreateTaskDialog from "@/components/tasks/create-task-dialog"

export default function TasksPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Tasks</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Manage and track all your team tasks.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <TaskList key={refreshKey} />
      <CreateTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={() => {
          setDialogOpen(false)
          setRefreshKey((k) => k + 1)
        }}
      />
    </div>
  )
}
