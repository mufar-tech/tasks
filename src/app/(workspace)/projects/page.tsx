"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectList from "@/components/projects/project-list"
import CreateProjectDialog from "@/components/projects/create-project-dialog"
import { getProjects } from "@/lib/api"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProjects()
      setProjects(Array.isArray(data) ? data : data.projects || [])
    } catch (e: any) {
      setError(e.message || "Failed to load projects")
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

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

      {error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-mufar-danger/10 flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-mufar-danger" />
          </div>
          <h3 className="text-lg font-semibold text-mufar-text mb-1">Failed to load projects</h3>
          <p className="text-sm text-mufar-text-secondary mb-4">{error}</p>
          <Button variant="outline" onClick={fetchProjects}>
            <Loader2 className="h-4 w-4 mr-1.5" />
            Retry
          </Button>
        </div>
      ) : (
        <ProjectList projects={projects} loading={loading} onRefresh={fetchProjects} />
      )}

      <CreateProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={fetchProjects}
      />
    </div>
  )
}
