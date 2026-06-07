"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Edit3,
  Share2,
  MoreHorizontal,
  Copy,
  Archive,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
import type { Project } from "@/lib/types"
import { formatDate, cn } from "@/lib/utils"

interface ProjectHeaderProps {
  project: Project
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/workspace/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm text-mufar-text-secondary">Back to Projects</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-1 rounded-full shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-mufar-text">{project.name}</h1>
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
                className="capitalize"
              >
                {project.status === "on-hold" ? "On Hold" : project.status}
              </Badge>
              <Badge variant={project.priority as any} className="capitalize">
                {project.priority}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit3 className="h-4 w-4 mr-1.5" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-mufar-danger focus:text-mufar-danger">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-mufar-text-secondary">Owner:</span>
          <div className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                {project.owner.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-mufar-text font-medium">{project.owner.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-mufar-text-secondary">
          <span>{formatDate(project.startDate)} — {project.endDate ? formatDate(project.endDate) : "Ongoing"}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-mufar-text-secondary">Progress</span>
          <span className="font-medium text-mufar-text">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2.5" />
      </div>
    </div>
  )
}
