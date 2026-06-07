"use client"

import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import NotificationsCenter from "@/components/notifications/notifications-center"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Notifications</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Stay updated with your team activity.
          </p>
        </div>
        <Button variant="ghost" size="icon" className="text-mufar-text-secondary">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <NotificationsCenter />
    </div>
  )
}
