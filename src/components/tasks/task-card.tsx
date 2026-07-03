"use client"

import { MessageSquare, Paperclip } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Task } from "@/lib/types"
import { cn, formatDateShort, getPriorityLabel, getInitials } from "@/lib/utils"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()

  return (
    <div className="rounded-lg border border-mufar-border bg-mufar-card p-3 border-l-4 border-l-transparent shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-mufar-text truncate">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-mufar-text-secondary mt-0.5 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <Badge variant={task.priority as any} className="shrink-0 text-[10px] px-1.5 py-0">
          {getPriorityLabel(task.priority)}
        </Badge>
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[9px] px-1.5 py-0 capitalize"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                      {task.assignee.initials || getInitials(task.assignee.name)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{task.assignee.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="h-6 w-6 rounded-full bg-mufar-hover flex items-center justify-center text-[9px] font-medium text-mufar-text-secondary">
              —
            </div>
          )}
          <span className="text-xs text-mufar-text-secondary">
            {task.assignee?.name ?? "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span
              className={cn(
                "text-[11px]",
                isOverdue ? "text-mufar-danger font-medium" : "text-mufar-text-secondary"
              )}
            >
              {formatDateShort(task.dueDate)}
            </span>
          )}
          <div className="flex items-center gap-2 text-mufar-text-secondary">
            {(task as any).comments > 0 && (
              <span className="flex items-center gap-1 text-[11px]">
                <MessageSquare className="h-3 w-3" />
                {(task as any).comments}
              </span>
            )}
            {(task as any).attachments > 0 && (
              <span className="flex items-center gap-1 text-[11px]">
                <Paperclip className="h-3 w-3" />
                {(task as any).attachments}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
