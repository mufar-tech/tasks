"use client"

import {
  CheckSquare,
  Briefcase,
  MessageSquare,
  Users,
  AtSign,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, getInitials } from "@/lib/utils"

const activityIcons: Record<string, any> = {
  task: CheckSquare,
  project: Briefcase,
  comment: MessageSquare,
  team: Users,
  mention: AtSign,
}

const activityColors: Record<string, string> = {
  task: "text-mufar-primary bg-mufar-primary/10",
  project: "text-mufar-secondary bg-mufar-secondary/10",
  comment: "text-mufar-success bg-mufar-success/10",
  team: "text-mufar-warning bg-mufar-warning/10",
  mention: "text-blue-500 bg-blue-500/10",
}

interface ActivityData {
  _id: string
  user: { name: string; image?: string }
  action: string
  target: string
  type: string
  createdAt: string
}

interface RecentActivityProps {
  activities: ActivityData[]
}

function timeAgo(dateStr: string) {
  const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[400px]">
          <div className="px-6 pb-4 space-y-0">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type] || activityIcons.task
              const colorClasses = activityColors[activity.type] || activityColors.task
              return (
                <div
                  key={activity._id}
                  className="flex items-start gap-3 py-3 border-b border-mufar-border last:border-0"
                >
                  <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                    <AvatarFallback className="text-[10px] font-medium bg-mufar-hover text-mufar-text">
                      {getInitials(activity.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-mufar-text">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-mufar-text-secondary">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-mufar-text-secondary mt-0.5">
                      {timeAgo(activity.createdAt)}
                    </p>
                  </div>
                  <div className={cn("p-1.5 rounded-lg shrink-0", colorClasses)}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
