"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MoreHorizontal,
  Edit3,
  Copy,
  Archive,
  Trash2,
  Loader2,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { archiveProject, duplicateProject, deleteProject } from "@/lib/api"
import { getInitials } from "@/lib/utils"

interface ProjectCardProps {
  project: any
  onRefresh?: () => void
}

export default function ProjectCard({ project, onRefresh }: ProjectCardProps) {
  const projectId = project._id || project.id
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleArchive = async () => {
    setActionLoading("archive")
    try {
      await archiveProject(projectId)
      onRefresh?.()
    } catch (e) {
      console.error("Archive failed", e)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDuplicate = async () => {
    setActionLoading("duplicate")
    try {
      await duplicateProject(projectId)
      onRefresh?.()
    } catch (e) {
      console.error("Duplicate failed", e)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async () => {
    setActionLoading("delete")
    try {
      await deleteProject(projectId)
      setDeleteOpen(false)
      onRefresh?.()
    } catch (e) {
      console.error("Delete failed", e)
    } finally {
      setActionLoading(null)
    }
  }

  const owner = project.owner || {}
  const team = project.team || []

  return (
    <>
      <Link href={`/projects/${projectId}`}>
        <Card
          className="hover:shadow-md transition-all duration-200 cursor-pointer group border-l-4"
          style={{ borderLeftColor: project.color || "#2563EB" }}
        >
          <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-mufar-text truncate">
                  {project.name}
                </h3>
                <Badge
                  variant={
                    project.status === "active"
                      ? "in-progress"
                      : project.status === "completed"
                        ? "completed"
                        : project.status === "on-hold"
                          ? "outline"
                          : "backlog"
                  }
                  className="shrink-0 capitalize"
                >
                  {project.status === "on-hold" ? "On Hold" : project.status}
                </Badge>
              </div>
              <p className="text-sm text-mufar-text-secondary line-clamp-2">
                {project.description}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem disabled={!!actionLoading}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate} disabled={!!actionLoading}>
                  {actionLoading === "duplicate" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleArchive} disabled={!!actionLoading}>
                  {actionLoading === "archive" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Archive className="mr-2 h-4 w-4" />
                  )}
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-mufar-danger focus:text-mufar-danger"
                  onClick={(e) => {
                    e.preventDefault()
                    setDeleteOpen(true)
                  }}
                  disabled={!!actionLoading}
                >
                  {actionLoading === "delete" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Progress value={project.progress || 0} className="h-2" />
              </div>
              <span className="text-xs font-medium text-mufar-text-secondary shrink-0">
                {project.progress || 0}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                    {owner.initials || getInitials(owner.name || "?")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-mufar-text-secondary">{owner.name}</span>
              </div>
              <Badge
                variant={project.priority as any}
                className="capitalize text-[10px] px-1.5 py-0"
              >
                {project.priority}
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex -space-x-2">
                {team.slice(0, 4).map((member: any) => (
                  <Avatar key={member._id || member.id} className="h-7 w-7 border-2 border-mufar-card">
                    <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                      {member.initials || getInitials(member.name || "?")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {team.length > 4 && (
                  <div className="h-7 w-7 rounded-full bg-mufar-hover border-2 border-mufar-card flex items-center justify-center text-[10px] font-medium text-mufar-text-secondary">
                    +{team.length - 4}
                  </div>
                )}
              </div>
              <span className="text-xs text-mufar-text-secondary">
                <span className="text-mufar-success font-medium">{project.completedTasks || 0}</span>
                /{project.taskCount || 0} tasks
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-mufar-danger hover:bg-mufar-danger/90">
              {actionLoading === "delete" ? (
                <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Deleting...</>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
