"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { projects } from "@/lib/constants"
import { cn, formatDateShort } from "@/lib/utils"

function getHealthColor(progress: number) {
  if (progress < 30) return {
    bar: "bg-mufar-danger",
    bg: "bg-mufar-danger/10",
    text: "text-mufar-danger",
    label: "At Risk",
  }
  if (progress < 70) return {
    bar: "bg-mufar-warning",
    bg: "bg-mufar-warning/10",
    text: "text-mufar-warning",
    label: "In Progress",
  }
  return {
    bar: "bg-mufar-success",
    bg: "bg-mufar-success/10",
    text: "text-mufar-success",
    label: "On Track",
  }
}

function getDaysRemaining(endDate?: string) {
  if (!endDate) return "No deadline"
  const remaining = Math.ceil(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  if (remaining < 0) return "Overdue"
  if (remaining === 0) return "Due today"
  return `${remaining} days left`
}

export default function ProjectHealth() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Project Health</CardTitle>
        <Link
          href="/workspace/projects"
          className="text-xs font-medium text-mufar-primary hover:underline"
        >
          View All Projects
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => {
          const health = getHealthColor(project.progress)
          const daysRemaining = getDaysRemaining(project.endDate)
          return (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-sm font-medium text-mufar-text truncate">
                    {project.name}
                  </span>
                </div>
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
                  className="ml-2 shrink-0"
                >
                  {project.status === "on-hold" ? "On Hold" : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Progress value={project.progress} className="h-2" />
                </div>
                <span className={cn("text-xs font-medium shrink-0", health.text)}>
                  {project.progress}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", health.bg, health.text)}>
                  {health.label}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    daysRemaining === "Overdue"
                      ? "text-mufar-danger"
                      : daysRemaining === "Due today"
                        ? "text-mufar-warning"
                        : "text-mufar-text-secondary"
                  )}
                >
                  {daysRemaining}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
