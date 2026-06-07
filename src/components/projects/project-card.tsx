"use client"

import Link from "next/link"
import {
  MoreHorizontal,
  Edit3,
  Copy,
  Archive,
  Trash2,
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
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/workspace/projects/${project.id}`}>
      <Card
        className={cn(
          "hover:shadow-md transition-all duration-200 cursor-pointer group",
          "border-l-4"
        )}
        style={{ borderLeftColor: project.color }}
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
              <DropdownMenuItem>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-mufar-danger focus:text-mufar-danger">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Progress value={project.progress} className="h-2" />
            </div>
            <span className="text-xs font-medium text-mufar-text-secondary shrink-0">
              {project.progress}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                  {project.owner.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-mufar-text-secondary">{project.owner.name}</span>
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
              {project.team.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="h-7 w-7 border-2 border-mufar-card">
                  <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 4 && (
                <div className="h-7 w-7 rounded-full bg-mufar-hover border-2 border-mufar-card flex items-center justify-center text-[10px] font-medium text-mufar-text-secondary">
                  +{project.team.length - 4}
                </div>
              )}
            </div>
            <span className="text-xs text-mufar-text-secondary">
              <span className="text-mufar-success font-medium">{project.completedTasks}</span>
              /{project.taskCount} tasks
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
