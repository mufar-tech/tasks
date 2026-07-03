"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface StatusItem {
  status: string
  count: number
}

interface PriorityItem {
  priority: string
  count: number
}

interface ProductivityChartProps {
  tasksByStatus: StatusItem[]
  tasksByPriority: PriorityItem[]
}

const statusOrder: Record<string, number> = { "to-do": 0, "in-progress": 1, review: 2, completed: 3, backlog: 4 }
const priorityOrder: Record<string, number> = { low: 0, medium: 1, high: 2, critical: 3 }

export default function ProductivityChart({ tasksByStatus, tasksByPriority }: ProductivityChartProps) {
  const statusData = [...tasksByStatus].sort((a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99))
  const priorityData = [...tasksByPriority].sort((a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Overview</CardTitle>
        <CardDescription>Tasks by status and priority</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[280px] overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mufar-border)" vertical={false} />
                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-mufar-card)",
                    border: "1px solid var(--color-mufar-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Bar
                  dataKey="count"
                  name="Tasks"
                  fill="var(--color-mufar-primary)"
                  radius={[4, 4, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[280px] overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mufar-border)" vertical={false} />
                <XAxis
                  dataKey="priority"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-mufar-card)",
                    border: "1px solid var(--color-mufar-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Bar
                  dataKey="count"
                  name="Tasks"
                  fill="var(--color-mufar-secondary)"
                  radius={[4, 4, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
