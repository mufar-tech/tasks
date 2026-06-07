"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import CalendarView from "@/components/calendar/calendar-view"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Calendar</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Track deadlines, milestones, and events.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <CalendarView />
    </div>
  )
}
