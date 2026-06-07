"use client"

import { FileDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import ReportsDashboard from "@/components/reports/reports-dashboard"

export default function ReportsPage() {
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
          <Select defaultValue="last30">
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

      <ReportsDashboard />
    </div>
  )
}
