"use client"

import { useState } from "react"
import {
  Users,
  Activity,
  UserPlus,
  Calendar,
  CheckCircle2,
  MoreHorizontal,
  Edit2,
  UserX,
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
import { teamMembers } from "@/lib/constants"
import { cn, formatDate } from "@/lib/utils"
import type { UserRole } from "@/lib/types"

const roleBadge: Record<UserRole, { label: string; classes: string }> = {
  owner: { label: "Owner", classes: "bg-mufar-primary/10 text-mufar-primary" },
  admin: { label: "Admin", classes: "bg-mufar-secondary/10 text-mufar-secondary" },
  manager: { label: "Manager", classes: "bg-mufar-warning/10 text-mufar-warning" },
  member: { label: "Member", classes: "bg-mufar-primary/10 text-blue-600" },
  guest: { label: "Guest", classes: "bg-mufar-hover text-mufar-text-secondary" },
}

export default function TeamList() {
  const [members] = useState(teamMembers)

  const stats = [
    { label: "Total Members", value: "12", icon: Users, color: "text-mufar-primary", bg: "bg-mufar-primary/10" },
    { label: "Active Today", value: "8", icon: Activity, color: "text-mufar-success", bg: "bg-mufar-success/10" },
    { label: "New This Week", value: "3", icon: UserPlus, color: "text-mufar-secondary", bg: "bg-mufar-secondary/10" },
    { label: "Pending Invites", value: "2", icon: Calendar, color: "text-mufar-warning", bg: "bg-mufar-warning/10" },
  ]

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.map((member) => {
          const role = roleBadge[member.role]
          return (
            <div
              key={member.id}
              className="bg-mufar-card rounded-xl border border-mufar-border p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-16 w-16 mb-3">
                    {member.user.avatar ? (
                      <AvatarImage src={member.user.avatar} alt={member.user.name} />
                    ) : null}
                    <AvatarFallback className="text-lg font-semibold bg-mufar-hover text-mufar-text">
                      {member.user.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold text-mufar-text">{member.user.name}</h3>
                <p className="text-sm text-mufar-text-secondary mt-0.5">{member.user.email}</p>
                <div className="mt-2">
                  <Badge className={cn("text-xs font-medium border-0", role.classes)}>
                    {role.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-mufar-border w-full justify-center">
                  <div className="flex items-center gap-1.5 text-sm text-mufar-text-secondary">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mufar-success" />
                    <span>{member.completedCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-mufar-text-secondary">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(member.joinedAt)}</span>
                  </div>
                </div>
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
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-mufar-danger">
                      <UserX className="h-4 w-4 mr-2" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
