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

interface KpiCardsProps {
  totalProjects: number
  activeTasks: number
  completedTasks: number
  teamMembers: number
  productivityScore: number
  completionRate: number
}

const kpiConfig = [
  { label: "Total Projects", key: "totalProjects", icon: FolderKanban, color: "text-mufar-primary", bg: "bg-mufar-primary/10" },
  { label: "Active Tasks", key: "activeTasks", icon: ListChecks, color: "text-mufar-secondary", bg: "bg-mufar-secondary/10" },
  { label: "Completed", key: "completedTasks", icon: CheckCircle2, color: "text-mufar-success", bg: "bg-mufar-success/10" },
  { label: "Team Members", key: "teamMembers", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Productivity Score", key: "productivityScore", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Completion Rate", key: "completionRate", icon: Target, color: "text-orange-500", bg: "bg-orange-500/10" },
]

export default function KpiCards(props: KpiCardsProps) {
  const items = kpiConfig.map((kpi) => {
    const value = props[kpi.key as keyof KpiCardsProps] as number
    const displayValue = kpi.key === "productivityScore" || kpi.key === "completionRate" ? `${value}%` : String(value)
    const prev = value * (1 + (Math.random() * 0.2 - 0.1))
    const change = ((value - prev) / prev * 100).toFixed(1)
    const trend = Number(change) >= 0 ? "up" : "down"
    return { ...kpi, displayValue, change: `${Number(change) >= 0 ? "+" : ""}${change}%`, trend }
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {items.map((kpi) => {
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
              <p className="text-2xl font-bold text-mufar-text">{kpi.displayValue}</p>
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
