"use client"

import { MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Task } from "@/lib/types"
import { cn, formatDateShort, getInitials } from "@/lib/utils"

const priorityDot: Record<string, string> = {
  low: "bg-slate-400",
  medium: "bg-blue-400",
  high: "bg-orange-400",
  critical: "bg-red-400",
}

interface KanbanCardProps {
  task: Task
  onDragStart: (e: React.DragEvent, taskId: string) => void
}

export default function KanbanCard({ task, onDragStart }: KanbanCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, (task as any)._id || task.id)}
      className="rounded-lg border border-mufar-border bg-mufar-card p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-2">
        <div
          className={cn("mt-1 h-2 w-2 rounded-full shrink-0", priorityDot[task.priority])}
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-mufar-text leading-snug">
            {task.title}
          </h4>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[8px] font-medium bg-mufar-hover text-mufar-text">
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
            <div className="h-5 w-5 rounded-full bg-mufar-hover flex items-center justify-center text-[8px] font-medium text-mufar-text-secondary">
              —
            </div>
          )}
          {task.dueDate && (
            <span
              className={cn(
                "text-[10px]",
                isOverdue ? "text-mufar-danger font-medium" : "text-mufar-text-secondary"
              )}
            >
              {formatDateShort(task.dueDate)}
            </span>
          )}
        </div>

        {(task as any).comments > 0 && (
          <div className="flex items-center gap-1 text-mufar-text-secondary">
            <MessageSquare className="h-3 w-3" />
            <span className="text-[10px]">{(task as any).comments}</span>
          </div>
        )}
      </div>
    </div>
  )
}
