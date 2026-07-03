"use client"

import { useEffect, useState } from "react"
import {
  Users,
  Activity,
  UserPlus,
  Calendar,
  MoreHorizontal,
  Edit2,
  UserX,
  Building2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { getTeams } from "@/lib/api"
import { cn, formatDate, getInitials } from "@/lib/utils"

interface Team {
  _id: string
  name: string
  description?: string
  members: Array<{ _id: string; name: string; email: string; image?: string }>
  createdBy: string
  createdAt: string
}

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeams()
      .then((data) => setTeams(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const allMembers = teams.flatMap((t) => t.members || [])
  const uniqueMembers = new Map(allMembers.map((m) => [m._id, m]))
  const newThisWeek = teams.filter((t) => {
    const d = new Date(t.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return d >= weekAgo
  }).length

  const stats = [
    { label: "Total Members", value: String(uniqueMembers.size), icon: Users, color: "text-mufar-primary", bg: "bg-mufar-primary/10" },
    { label: "Active Today", value: String(uniqueMembers.size), icon: Activity, color: "text-mufar-success", bg: "bg-mufar-success/10" },
    { label: "New This Week", value: String(newThisWeek), icon: UserPlus, color: "text-mufar-secondary", bg: "bg-mufar-secondary/10" },
    { label: "Pending Invites", value: "0", icon: Calendar, color: "text-mufar-warning", bg: "bg-mufar-warning/10" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-mufar-card rounded-xl border border-mufar-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-mufar-text-secondary">{stat.label}</p>
                  <p className="text-2xl font-bold text-mufar-text">{stat.value}</p>
                </div>
                <div className={cn("p-3 rounded-lg", stat.bg)}>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-mufar-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-mufar-text mb-1">No teams yet</h3>
          <p className="text-sm text-mufar-text-secondary">Create your first team to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-mufar-card rounded-xl border border-mufar-border p-5 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-mufar-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-mufar-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-mufar-text truncate">{team.name}</h3>
                  {team.description && (
                    <p className="text-sm text-mufar-text-secondary line-clamp-2 mt-0.5">{team.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-3">
                <Users className="h-3.5 w-3.5 text-mufar-text-secondary" />
                <span className="text-sm text-mufar-text-secondary">
                  {(team.members || []).length} member{(team.members || []).length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex items-center -space-x-2 mb-3">
                {(team.members || []).slice(0, 5).map((member) => (
                  <Avatar key={member._id} className="h-7 w-7 border-2 border-mufar-card">
                    {member.image ? (
                      <AvatarImage src={member.image} alt={member.name} />
                    ) : null}
                    <AvatarFallback className="text-[10px] font-semibold bg-mufar-hover text-mufar-text">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {(team.members || []).length > 5 && (
                  <span className="h-7 w-7 rounded-full bg-mufar-hover border-2 border-mufar-card flex items-center justify-center text-[10px] font-medium text-mufar-text-secondary">
                    +{team.members.length - 5}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-mufar-text-secondary">
                <Calendar className="h-3 w-3" />
                <span>Created {formatDate(team.createdAt)}</span>
              </div>

              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Team
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-mufar-danger">
                      <UserX className="h-4 w-4 mr-2" />
                      Delete Team
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
