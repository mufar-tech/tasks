"use client"

import {
  FolderKanban,
  ListChecks,
  CheckCircle2,
  Users,
  TrendingUp,
  Target,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const kpis = [
  {
    label: "Total Projects",
    value: "24",
    change: "+12.5%",
    icon: FolderKanban,
    trend: "up",
    color: "text-mufar-primary",
    bg: "bg-mufar-primary/10",
  },
  {
    label: "Active Tasks",
    value: "142",
    change: "+8.3%",
    icon: ListChecks,
    trend: "up",
    color: "text-mufar-secondary",
    bg: "bg-mufar-secondary/10",
  },
  {
    label: "Completed",
    value: "89",
    change: "+15.2%",
    icon: CheckCircle2,
    trend: "up",
    color: "text-mufar-success",
    bg: "bg-mufar-success/10",
  },
  {
    label: "Team Members",
    value: "12",
    change: "+2 new",
    icon: Users,
    trend: "up",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Productivity Score",
    value: "87%",
    change: "+5.4%",
    icon: TrendingUp,
    trend: "up",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Completion Rate",
    value: "72%",
    change: "-3.1%",
    icon: Target,
    trend: "down",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
]

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown
        return (
          <div
            key={kpi.label}
            className="bg-mufar-card rounded-xl border border-mufar-border p-5 shadow-sm relative overflow-hidden"
          >
            <div className={cn("absolute top-3 right-3 p-2 rounded-lg", kpi.bg)}>
              <Icon className={cn("h-5 w-5", kpi.color)} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-mufar-text-secondary">{kpi.label}</p>
              <p className="text-2xl font-bold text-mufar-text">{kpi.value}</p>
              <div className="flex items-center gap-1 pt-1">
                <TrendIcon
                  className={cn(
                    "h-3.5 w-3.5",
                    kpi.trend === "up" ? "text-mufar-success" : "text-mufar-danger"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    kpi.trend === "up" ? "text-mufar-success" : "text-mufar-danger"
                  )}
                >
                  {kpi.change}
                </span>
                <span className="text-xs text-mufar-text-secondary">vs last month</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
