"use client"

import { useMemo } from "react"
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { projects, teamMembers } from "@/lib/constants"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Productivity Rate", value: "87%", change: "+5.4%", icon: TrendingUp, color: "text-mufar-primary", bg: "bg-mufar-primary/10" },
  { label: "Task Completion", value: "94%", change: "+8.2%", icon: CheckCircle2, color: "text-mufar-success", bg: "bg-mufar-success/10" },
  { label: "On-Time Delivery", value: "78%", change: "-2.1%", icon: Clock, color: "text-mufar-warning", bg: "bg-mufar-warning/10" },
  { label: "Team Velocity", value: "123 pts", change: "+12 pts", icon: Zap, color: "text-mufar-secondary", bg: "bg-mufar-secondary/10" },
]

const productivityTrend = [
  { week: "Week 1", productivity: 72, tasks: 18 },
  { week: "Week 2", productivity: 78, tasks: 22 },
  { week: "Week 3", productivity: 85, tasks: 26 },
  { week: "Week 4", productivity: 91, tasks: 30 },
]

const taskDistribution = [
  { name: "Backlog", value: 3, color: "#64748B" },
  { name: "To Do", value: 3, color: "#3B82F6" },
  { name: "In Progress", value: 4, color: "#F59E0B" },
  { name: "Review", value: 1, color: "#7C3AED" },
  { name: "Completed", value: 3, color: "#10B981" },
]

const teamPerformance = teamMembers.map((m) => ({
  name: m.user.name.split(" ")[0],
  initials: m.user.initials,
  completed: m.completedCount,
  total: m.taskCount,
}))

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div className="bg-mufar-card border border-mufar-border rounded-lg p-3 shadow-md text-sm">
      <p className="font-medium text-mufar-text mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-mufar-text-secondary">
          {p.name}: <span className="font-semibold text-mufar-text" style={{ color: p.color }}>{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function ReportsDashboard() {
  const projectRows = useMemo(() => {
    return projects.filter((p) => p.status !== "archived")
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-mufar-card rounded-xl border border-mufar-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-mufar-text-secondary">{kpi.label}</p>
                  <p className="text-2xl font-bold text-mufar-text">{kpi.value}</p>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      kpi.change.startsWith("+") ? "text-mufar-success" : "text-mufar-danger"
                    )}
                  >
                    {kpi.change}
                  </span>
                </div>
                <div className={cn("p-3 rounded-lg", kpi.bg)}>
                  <Icon className={cn("h-5 w-5", kpi.color)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Trend</CardTitle>
            <CardDescription>Weekly productivity over the last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mufar-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="productivity"
                    name="Productivity %"
                    stroke="var(--color-mufar-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-mufar-primary)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tasks"
                    name="Tasks"
                    stroke="var(--color-mufar-secondary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-mufar-secondary)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Tasks by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {taskDistribution.map((entry, i) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                    formatter={(value) => (
                      <span className="text-mufar-text-secondary">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Overview of all active projects</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectRows.map((project) => {
                const daysRemaining = project.endDate
                  ? Math.max(0, Math.ceil((new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                  : "—"
                const statusColor = {
                  active: "bg-mufar-success/10 text-mufar-success",
                  "on-hold": "bg-mufar-warning/10 text-mufar-warning",
                  completed: "bg-mufar-primary/10 text-mufar-primary",
                  archived: "bg-mufar-hover text-mufar-text-secondary",
                }
                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="font-medium text-sm text-mufar-text">{project.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <div className="flex items-center gap-3">
                        <Progress value={project.progress} className="h-2 w-28" />
                        <span className="text-xs text-mufar-text-secondary font-medium">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-mufar-text-secondary">
                        {project.completedTasks}/{project.taskCount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-mufar-text-secondary">{daysRemaining}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", statusColor[project.status])}>
                        {project.status === "on-hold" ? "On Hold" : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Tasks completed per team member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={teamPerformance}
                layout="vertical"
                margin={{ left: 0, right: 8, top: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mufar-border)" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tick={{ fill: "var(--color-mufar-text)", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-mufar-hover)" }} />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="var(--color-mufar-primary)"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="total"
                  name="Total Tasks"
                  fill="var(--color-mufar-secondary)"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
