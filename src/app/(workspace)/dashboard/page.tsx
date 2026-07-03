"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import KpiCards from "@/components/dashboard/kpi-cards"
import ProductivityChart from "@/components/dashboard/productivity-chart"
import WorkloadAnalytics from "@/components/dashboard/workload-analytics"
import ProjectHealth from "@/components/dashboard/project-health"
import RecentActivity from "@/components/dashboard/recent-activity"
import UpcomingDeadlines from "@/components/dashboard/upcoming-deadlines"
import { getDashboardStats } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [greeting, setGreeting] = useState("Good morning")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setGreeting(getGreeting())
    getDashboardStats().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-72 mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Skeleton className="h-[350px] rounded-xl" />
          </div>
          <Skeleton className="h-[350px] rounded-xl" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Skeleton className="h-[350px] rounded-xl" />
          <Skeleton className="h-[350px] rounded-xl" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-mufar-text-secondary">No dashboard data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-mufar-text">Dashboard</h1>
        <p className="text-mufar-text-secondary text-sm mt-1">
          {greeting}, {session?.user?.name?.split(" ")[0] || "there"}. Here&apos;s what&apos;s happening.
        </p>
      </div>

      <KpiCards
        totalProjects={data.totalProjects}
        activeTasks={data.activeTasks}
        completedTasks={data.completedTasks}
        teamMembers={data.teamMembers}
        productivityScore={data.productivityScore}
        completionRate={data.completionRate}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductivityChart tasksByStatus={data.tasksByStatus || []} tasksByPriority={data.tasksByPriority || []} />
        </div>
        <UpcomingDeadlines tasks={data.upcomingDeadlines || []} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <WorkloadAnalytics workloadByMember={data.workloadByMember || []} />
        <ProjectHealth projects={data.projectHealth || []} />
      </div>

      <RecentActivity activities={data.recentActivities || []} />
    </div>
  )
}
