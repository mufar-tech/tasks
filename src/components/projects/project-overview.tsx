"use client"

import {
  ListChecks,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  CheckSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Project, Task } from "@/lib/types"
import { tasks, activities } from "@/lib/constants"
import { formatDateShort } from "@/lib/utils"

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const projectTasks = tasks.filter((t) => t.projectId === project.id)
  const completedTasks = projectTasks.filter((t) => t.status === "completed")
  const inProgressTasks = projectTasks.filter((t) => t.status === "in-progress")
  const overdueTasks = projectTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed"
  )
  const projectActivities = activities.filter((a) =>
    a.target.toLowerCase().includes(project.name.toLowerCase()) ||
    projectTasks.some((t) => a.target.toLowerCase().includes(t.title.toLowerCase()))
  ).slice(0, 5)

  const stats = [
    {
      label: "Total Tasks",
      value: projectTasks.length,
      icon: ListChecks,
      color: "text-mufar-primary",
      bg: "bg-mufar-primary/10",
    },
    {
      label: "Completed",
      value: completedTasks.length,
      icon: CheckCircle2,
      color: "text-mufar-success",
      bg: "bg-mufar-success/10",
    },
    {
      label: "In Progress",
      value: inProgressTasks.length,
      icon: Clock,
      color: "text-mufar-warning",
      bg: "bg-mufar-warning/10",
    },
    {
      label: "Overdue",
      value: overdueTasks.length,
      icon: AlertCircle,
      color: "text-mufar-danger",
      bg: "bg-mufar-danger/10",
    },
  ]

  const timelineItems = [
    { label: "Project Created", date: project.startDate, completed: true },
    { label: "Planning Phase", date: "", completed: project.progress > 10 },
    { label: "Development", date: "", completed: project.progress > 40 },
    { label: "Testing", date: "", completed: project.progress > 70 },
    { label: "Launch", date: project.endDate || "", completed: project.progress === 100 },
  ]

  return (
    <div className="space-y-6">
      {project.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-mufar-text leading-relaxed">{project.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={cn("p-2.5 rounded-lg", stat.bg)}>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-mufar-text">{stat.value}</p>
                  <p className="text-xs text-mufar-text-secondary">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.team.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs font-medium bg-mufar-hover text-mufar-text">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-mufar-text">{member.name}</p>
                    <p className="text-xs text-mufar-text-secondary capitalize">{member.role}</p>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize text-xs">
                  {member.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {timelineItems.map((item, i) => (
              <div key={item.label} className="relative flex gap-4 pb-6 last:pb-0">
                {i < timelineItems.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[7px] top-4 w-0.5 h-full",
                      item.completed ? "bg-mufar-primary" : "bg-mufar-border"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 mt-0.5 shrink-0",
                    item.completed
                      ? "bg-mufar-primary border-mufar-primary"
                      : "bg-mufar-card border-mufar-border"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      item.completed ? "text-mufar-text" : "text-mufar-text-secondary"
                    )}
                  >
                    {item.label}
                  </p>
                  {item.date && (
                    <p className="text-xs text-mufar-text-secondary mt-0.5">
                      {formatDateShort(item.date)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {projectActivities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {projectActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-3 border-b border-mufar-border last:border-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-[10px] font-medium bg-mufar-hover text-mufar-text">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-mufar-text">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    <span className="text-mufar-text-secondary">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-mufar-text-secondary mt-0.5">
                    {formatDateShort(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
