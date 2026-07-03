"use client"

import { useEffect, useState } from "react"
import { FileDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import ReportsDashboard from "@/components/reports/reports-dashboard"
import { getDashboardStats } from "@/lib/api"

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("last30")

  useEffect(() => {
    setLoading(true)
    getDashboardStats()
      .then(setStats)
      .finally(() => setLoading(false))
  }, [dateRange])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64 mt-2" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[160px] rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
        <ReportsDashboard loading />
      </div>
    )
  }

  const productivityTrend = stats?.tasksByStatus
    ? [
        { week: "Week 1", productivity: stats.productivityScore || 72, tasks: stats.activeTasks || 18 },
        { week: "Week 2", productivity: Math.min(100, (stats.productivityScore || 72) + 5), tasks: (stats.activeTasks || 18) + 4 },
        { week: "Week 3", productivity: Math.min(100, (stats.productivityScore || 72) + 10), tasks: (stats.activeTasks || 18) + 8 },
        { week: "Week 4", productivity: stats.productivityScore || 85, tasks: stats.completedTasks || 30 },
      ]
    : undefined

  const taskDistribution = stats?.tasksByStatus
    ? [
        { name: "Backlog", value: (stats.tasksByStatus as any[]).find((s: any) => s.status === "backlog")?.count || 0, color: "#64748B" },
        { name: "To Do", value: (stats.tasksByStatus as any[]).find((s: any) => s.status === "to-do")?.count || 0, color: "#3B82F6" },
        { name: "In Progress", value: (stats.tasksByStatus as any[]).find((s: any) => s.status === "in-progress")?.count || 0, color: "#F59E0B" },
        { name: "Review", value: (stats.tasksByStatus as any[]).find((s: any) => s.status === "review")?.count || 0, color: "#7C3AED" },
        { name: "Completed", value: (stats.tasksByStatus as any[]).find((s: any) => s.status === "completed")?.count || 0, color: "#10B981" },
      ]
    : undefined

  const teamPerformance = stats?.workloadByMember
    ? (stats.workloadByMember as any[]).map((m: any) => ({
        name: m.name?.split(" ")[0] || m.name,
        initials: (m.initials || m.name?.charAt(0) || "?").toUpperCase(),
        completed: m.completed || 0,
        total: m.total || 0,
      }))
    : undefined

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Reports & Analytics</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Track performance and gain insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ReportsDashboard
        kpiData={{
          productivityRate: stats?.productivityScore ?? 0,
          taskCompletion: stats?.completionRate ?? 0,
          onTimeDelivery: 78,
          teamVelocity: 123,
        }}
        productivityTrend={productivityTrend}
        taskDistribution={taskDistribution}
        projects={stats?.projectHealth || undefined}
        teamPerformance={teamPerformance}
      />
    </div>
  )
}
