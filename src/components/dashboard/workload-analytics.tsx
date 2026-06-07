"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { users } from "@/lib/constants"
import { cn } from "@/lib/utils"

const workloadData = users.slice(0, 6).map((user) => ({
  name: user.name,
  initials: user.initials,
  tasks: Math.floor(Math.random() * 15) + 5,
  completed: Math.floor(Math.random() * 10) + 2,
}))

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props
  const user = workloadData.find((u) => u.name === payload.value)
  if (!user) return null
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-160} y={-12} width={160} height={24}>
        <div className="flex items-center gap-2 justify-end h-full">
          <span className="text-xs text-mufar-text truncate">{user.name}</span>
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarFallback className="text-[10px] font-medium bg-mufar-hover text-mufar-text">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </foreignObject>
    </g>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  const user = workloadData.find((u) => u.name === label)
  return (
    <div className="bg-mufar-card border border-mufar-border rounded-lg p-3 shadow-md text-sm">
      <p className="font-medium text-mufar-text mb-1">{label}</p>
      <p className="text-mufar-text-secondary">
        Tasks: <span className="font-semibold text-mufar-text">{payload[0]?.value}</span>
      </p>
      <p className="text-mufar-text-secondary">
        Completed: <span className="font-semibold text-mufar-success">{user?.completed}</span>
      </p>
    </div>
  )
}

export default function WorkloadAnalytics() {
  const maxTasks = Math.max(...workloadData.map((d) => d.tasks))
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workload Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} layout="vertical" margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-mufar-border)"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                domain={[0, maxTasks + 5]}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={180}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-mufar-hover)" }} />
              <Bar dataKey="tasks" radius={[0, 4, 4, 0]} barSize={20}>
                {workloadData.map((entry, i) => {
                  const ratio = entry.tasks / maxTasks
                  const isHigh = ratio > 0.7
                  const isMid = ratio > 0.4
                  return (
                    <Cell
                      key={entry.name}
                      fill={
                        isHigh
                          ? "var(--color-mufar-danger)"
                          : isMid
                            ? "var(--color-mufar-warning)"
                            : "var(--color-mufar-primary)"
                      }
                      fillOpacity={0.85}
                    />
                  )
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
