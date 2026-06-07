"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectList from "@/components/projects/project-list"
import CreateProjectDialog from "@/components/projects/create-project-dialog"

export default function ProjectsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Projects</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Manage and track all your team projects.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <ProjectList />
      <CreateProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
