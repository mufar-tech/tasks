"use client"

import { Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { tasks } from "@/lib/constants"
import { formatDateShort, cn } from "@/lib/utils"

function getDaysUntil(dueDate: string) {
  const remaining = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  return remaining
}

export default function UpcomingDeadlines() {
  const sorted = [...tasks]
    .filter((t) => t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((task) => {
          const days = getDaysUntil(task.dueDate!)
          const isUrgent = days <= 2 && days >= 0
          const isOverdue = days < 0
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-mufar-border bg-mufar-card hover:bg-mufar-hover transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-mufar-text truncate">
                    {task.title}
                  </span>
                  <Badge
                    variant={task.priority as any}
                    className="shrink-0 capitalize"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-mufar-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[8px] font-medium bg-mufar-hover text-mufar-text">
                        {task.assignee?.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{task.assignee?.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDateShort(task.dueDate!)}</span>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 shrink-0 text-xs font-medium px-2.5 py-1 rounded-full",
                  isOverdue
                    ? "bg-mufar-danger/10 text-mufar-danger"
                    : isUrgent
                      ? "bg-mufar-warning/10 text-mufar-warning"
                      : "bg-mufar-success/10 text-mufar-success"
                )}
              >
                <AlertCircle className="h-3 w-3" />
                <span>
                  {isOverdue
                    ? `${Math.abs(days)}d overdue`
                    : days === 0
                      ? "Due today"
                      : `${days}d left`}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
