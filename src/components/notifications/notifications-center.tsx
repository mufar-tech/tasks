"use client"

import { useEffect, useState, useCallback } from "react"
import {
  CheckCheck,
  UserCheck,
  MessageSquare,
  CalendarClock,
  AtSign,
  RefreshCw,
  BellOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { getNotifications, markNotificationsRead } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"

const notificationIcons = {
  assigned: UserCheck,
  "due-date": CalendarClock,
  comment: MessageSquare,
  mention: AtSign,
  update: RefreshCw,
}

const notificationColors = {
  assigned: "text-mufar-primary bg-mufar-primary/10",
  "due-date": "text-mufar-warning bg-mufar-warning/10",
  comment: "text-mufar-success bg-mufar-success/10",
  mention: "text-mufar-secondary bg-mufar-secondary/10",
  update: "text-blue-500 bg-blue-500/10",
}

function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification
  onMarkRead: (id: string) => void
}) {
  const Icon = notificationIcons[notification.type]
  const colorClasses = notificationColors[notification.type]

  return (
    <div
      onClick={() => onMarkRead(notification.id)}
      className={cn(
        "flex items-start gap-3 p-4 border-b border-mufar-border last:border-0 cursor-pointer transition-colors",
        !notification.read ? "bg-mufar-accent/50" : "hover:bg-mufar-hover"
      )}
    >
      <div className={cn("p-2 rounded-lg shrink-0", colorClasses)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-mufar-text">{notification.title}</p>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-mufar-primary shrink-0" />
          )}
        </div>
        <p className="text-sm text-mufar-text-secondary mt-0.5 line-clamp-1">
          {notification.description}
        </p>
        <p className="text-xs text-mufar-text-secondary mt-1">{notification.timestamp}</p>
      </div>
    </div>
  )
}

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  const fetchNotifications = useCallback(() => {
    setLoading(true)
    getNotifications()
      .then((data) => {
        setNotifications(data.notifications || [])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    try {
      await markNotificationsRead([id])
    } catch {
      fetchNotifications()
    }
  }

  const markAllAsRead = async () => {
    const ids = notifications.filter((n) => !n.read).map((n) => n.id)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    try {
      await markNotificationsRead()
    } catch {
      fetchNotifications()
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = notifications.filter((n) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.read
    if (activeTab === "mentions") return n.type === "mention"
    if (activeTab === "updates") return n.type === "update"
    return true
  })

  return (
    <div className="bg-mufar-card rounded-xl border border-mufar-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-mufar-border">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-mufar-text">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-mufar-primary text-white text-xs px-2 py-0.5 border-0">
              {unreadCount}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          disabled={unreadCount === 0 || loading}
          className="text-mufar-text-secondary"
        >
          <CheckCheck className="h-4 w-4 mr-1.5" />
          Mark all as read
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full h-10 bg-mufar-hover">
            <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 text-xs">Unread</TabsTrigger>
            <TabsTrigger value="mentions" className="flex-1 text-xs">Mentions</TabsTrigger>
            <TabsTrigger value="updates" className="flex-1 text-xs">Updates</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {loading ? (
            <div className="divide-y divide-mufar-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-4">
                  <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
                <BellOff className="h-8 w-8 text-mufar-text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-mufar-text mb-1">No notifications</h3>
              <p className="text-sm text-mufar-text-secondary">
                You&apos;re all caught up.
              </p>
            </div>
          ) : (
            <div>
              {filtered.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={markAsRead}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
