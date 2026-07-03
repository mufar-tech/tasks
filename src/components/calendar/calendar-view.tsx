"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CalendarRange,
  CalendarClock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { getTasks } from "@/lib/api"

type ViewMode = "month" | "week" | "day"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function getMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

function getWeekRange(date: Date) {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return { start, end }
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getWeekDates(date: Date) {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())
  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    dates.push(d)
  }
  return dates
}

const statusColor: Record<string, string> = {
  backlog: "border-l-gray-400 bg-mufar-badge-low text-mufar-dark",
  "to-do": "border-l-blue-400 bg-mufar-badge-medium text-blue-700",
  "in-progress": "border-l-amber-400 bg-mufar-badge-high text-amber-700",
  review: "border-l-purple-400 bg-mufar-accent text-mufar-secondary",
  completed: "border-l-emerald-400 bg-emerald-100 text-emerald-700",
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<ViewMode>("month")
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const today = new Date()

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTasks()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const navigate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const d = new Date(prev)
      if (view === "month") {
        d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1))
      } else if (view === "week") {
        d.setDate(d.getDate() + (direction === "next" ? 7 : -7))
      } else {
        d.setDate(d.getDate() + (direction === "next" ? 1 : -1))
      }
      return d
    })
  }

  const goToToday = () => setCurrentDate(new Date())

  const monthDays = useMemo(() => {
    if (view !== "month") return []
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days: (number | null)[] = Array(firstDay).fill(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }, [currentDate, view])

  const weekDates = useMemo(() => {
    if (view !== "week") return []
    return getWeekDates(currentDate)
  }, [currentDate, view])

  const getEventsForDate = (date: Date) => {
    return tasks.filter((t) => {
      if (!t.dueDate) return false
      const eventDate = new Date(t.dueDate)
      return isSameDay(eventDate, date)
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-56" />
        </div>
        <div className="rounded-lg border border-mufar-border overflow-hidden">
          <div className="grid grid-cols-7 bg-mufar-hover border-b border-mufar-border">
            {DAYS.map((day) => (
              <div key={day} className="px-3 py-2">
                <Skeleton className="h-3 w-8 mx-auto" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="min-h-[100px] border-b border-r border-mufar-border p-1.5">
                <Skeleton className="h-6 w-6 rounded-full mx-auto mb-1" />
                <Skeleton className="h-4 w-full mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
          <CalendarRange className="h-8 w-8 text-mufar-danger" />
        </div>
        <h3 className="text-lg font-semibold text-mufar-text mb-1">Failed to load calendar</h3>
        <p className="text-sm text-mufar-text-secondary mb-4">{error}</p>
        <Button variant="outline" onClick={fetchTasks}>Try again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => navigate("prev")} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("next")} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg font-semibold text-mufar-text">
            {view === "month"
              ? getMonthLabel(currentDate)
              : view === "week"
                ? `${getWeekRange(currentDate).start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${getWeekRange(currentDate).end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                : currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </h2>
        </div>

        <div className="flex rounded-lg border border-mufar-border overflow-hidden">
          <Button
            variant={view === "month" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("month")}
            className="rounded-none"
          >
            <CalendarRange className="h-4 w-4 mr-1" />
            Month
          </Button>
          <Button
            variant={view === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("week")}
            className="rounded-none"
          >
            <CalendarDays className="h-4 w-4 mr-1" />
            Week
          </Button>
          <Button
            variant={view === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("day")}
            className="rounded-none"
          >
            <CalendarClock className="h-4 w-4 mr-1" />
            Day
          </Button>
        </div>
      </div>

      {view === "month" && (
        <div className="rounded-lg border border-mufar-border overflow-hidden">
          <div className="grid grid-cols-7 bg-mufar-hover border-b border-mufar-border">
            {DAYS.map((day) => (
              <div key={day} className="px-3 py-2 text-xs font-medium text-mufar-text-secondary text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((day, i) => {
              const date = day
                ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                : null
              const isToday = date && isSameDay(date, today)
              const events = date ? getEventsForDate(date) : []

              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-[100px] border-b border-r border-mufar-border p-1.5",
                    !day && "bg-mufar-hover/30"
                  )}
                >
                  {day && (
                    <>
                      <div className="flex items-center justify-center mb-1">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center h-6 w-6 text-xs rounded-full",
                            isToday && "bg-mufar-primary text-white font-semibold"
                          )}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {events.slice(0, 3).map((event) => (
                          <div
                            key={event._id || event.id}
                            className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded border-l-2 truncate",
                              statusColor[event.status] || "border-l-gray-400 bg-gray-50 text-gray-700"
                            )}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 3 && (
                          <div className="text-[10px] text-mufar-text-secondary pl-1">
                            +{events.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="rounded-lg border border-mufar-border overflow-hidden">
          <div className="grid grid-cols-7 bg-mufar-hover border-b border-mufar-border">
            {weekDates.map((date, i) => (
              <div
                key={i}
                className={cn(
                  "px-3 py-2 text-center border-r border-mufar-border last:border-r-0",
                  isSameDay(date, today) && "bg-mufar-primary/10"
                )}
              >
                <div className="text-xs font-medium text-mufar-text-secondary">
                  {DAYS[date.getDay()]}
                </div>
                <div
                  className={cn(
                    "inline-flex items-center justify-center h-7 w-7 text-sm font-semibold rounded-full mt-1",
                    isSameDay(date, today) && "bg-mufar-primary text-white"
                  )}
                >
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {weekDates.map((date, i) => {
              const events = getEventsForDate(date)
              return (
                <div
                  key={i}
                  className="min-h-[300px] border-r border-mufar-border last:border-r-0 p-2 space-y-1.5"
                >
                  {events.map((event) => (
                    <div
                      key={event._id || event.id}
                      className={cn(
                        "text-[10px] px-2 py-1 rounded border-l-2",
                        statusColor[event.status] || "border-l-gray-400 bg-gray-50 text-gray-700"
                      )}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-[9px] opacity-75 capitalize">{event.status === "to-do" ? "To Do" : event.status === "in-progress" ? "In Progress" : event.status}</div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="rounded-lg border border-mufar-border overflow-hidden">
          <div className="bg-mufar-hover px-4 py-2 border-b border-mufar-border">
            <span className="text-sm font-medium text-mufar-text">
              {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="divide-y divide-mufar-border">
            {HOURS.map((hour) => {
              const events = tasks.filter((t) => {
                if (!t.dueDate) return false
                const d = new Date(t.dueDate)
                return isSameDay(d, currentDate) && d.getHours() === hour
              })
              return (
                <div key={hour} className="flex min-h-[48px] group">
                  <div className="w-16 shrink-0 flex items-start justify-center pt-2 border-r border-mufar-border">
                    <span className="text-[10px] text-mufar-text-secondary">
                      {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                    </span>
                  </div>
                  <div className="flex-1 px-3 py-1 space-y-1">
                    {events.map((event) => (
                      <div
                        key={event._id || event.id}
                        className={cn(
                          "text-xs px-2 py-1 rounded border-l-2",
                          statusColor[event.status] || "border-l-gray-400 bg-gray-50 text-gray-700"
                        )}
                      >
                        <span className="font-medium">{event.title}</span>
                        <span className="text-[10px] text-mufar-text-secondary ml-2 capitalize">
                          {event.status === "to-do" ? "To Do" : event.status === "in-progress" ? "In Progress" : event.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
