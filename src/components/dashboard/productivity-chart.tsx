"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const data = [
  { day: "Mon", completed: 12, productivity: 72 },
  { day: "Tue", completed: 18, productivity: 85 },
  { day: "Wed", completed: 14, productivity: 78 },
  { day: "Thu", completed: 22, productivity: 91 },
  { day: "Fri", completed: 16, productivity: 80 },
  { day: "Sat", completed: 8, productivity: 65 },
  { day: "Sun", completed: 5, productivity: 55 },
]

export default function ProductivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Overview</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mufar-border)" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mufar-text-secondary)", fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-mufar-card)",
                  border: "1px solid var(--color-mufar-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              />
              <Bar
                yAxisId="left"
                dataKey="completed"
                name="Tasks Completed"
                fill="var(--color-mufar-primary)"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="productivity"
                name="Productivity"
                stroke="var(--color-mufar-secondary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-mufar-secondary)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
