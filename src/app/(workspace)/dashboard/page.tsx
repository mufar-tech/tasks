"use client"

import { useEffect, useState } from "react"
import KpiCards from "@/components/dashboard/kpi-cards"
import ProductivityChart from "@/components/dashboard/productivity-chart"
import WorkloadAnalytics from "@/components/dashboard/workload-analytics"
import ProjectHealth from "@/components/dashboard/project-health"
import RecentActivity from "@/components/dashboard/recent-activity"
import UpcomingDeadlines from "@/components/dashboard/upcoming-deadlines"
import { currentUser } from "@/lib/constants"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good morning")

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-mufar-text">Dashboard</h1>
        <p className="text-mufar-text-secondary text-sm mt-1">
          {greeting}, {currentUser.name.split(" ")[0]}. Here&apos;s what&apos;s happening.
        </p>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductivityChart />
        </div>
        <UpcomingDeadlines />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <WorkloadAnalytics />
        <ProjectHealth />
      </div>

      <RecentActivity />
    </div>
  )
}
