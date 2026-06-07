"use client"

import { useState } from "react"
import {
  MessageSquare,
  Monitor,
  Calendar,
  Mail,
  MailOpen,
  Video,
  Webhook,
  Code2,
  Plug,
  Link2,
  Unlink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { integrations as initialIntegrations } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Integration } from "@/lib/types"

const iconMap: Record<string, React.ElementType> = {
  slack: MessageSquare,
  teams: Monitor,
  calendar: Calendar,
  gmail: Mail,
  outlook: MailOpen,
  zoom: Video,
  webhook: Webhook,
  api: Code2,
}

const categories = ["Communication", "Calendar", "Email", "Meetings", "Developer"]

export default function IntegrationsList() {
  const [integrations, setIntegrations] = useState(initialIntegrations)

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    )
  }

  const grouped = categories.map((cat) => ({
    category: cat,
    items: integrations.filter((i) => i.category === cat),
  }))

  return (
    <div className="space-y-8">
      {grouped.map(({ category, items }) =>
        items.length === 0 ? null : (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              <Plug className="h-4 w-4 text-mufar-text-secondary" />
              <h3 className="text-sm font-semibold text-mufar-text uppercase tracking-wider">
                {category}
              </h3>
              <div className="h-px flex-1 bg-mufar-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((integration) => {
                const Icon = iconMap[integration.icon] || Code2
                return (
                  <div
                    key={integration.id}
                    className={cn(
                      "bg-mufar-card rounded-xl border p-5 shadow-sm transition-all",
                      integration.connected
                        ? "border-mufar-primary/30"
                        : "border-mufar-border hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-lg bg-mufar-hover flex items-center justify-center">
                          <Icon className="h-5 w-5 text-mufar-text" />
                        </div>
                        {integration.connected && (
                          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-mufar-success border-2 border-mufar-card" />
                        )}
                      </div>
                      {integration.connected && (
                        <Badge className="bg-mufar-success/10 text-mufar-success text-xs border-0">
                          Connected
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-semibold text-mufar-text text-sm">{integration.name}</h4>
                    <p className="text-xs text-mufar-text-secondary mt-1 line-clamp-2">
                      {integration.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-mufar-border">
                      <Button
                        variant={integration.connected ? "outline" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() => toggleConnection(integration.id)}
                      >
                        {integration.connected ? (
                          <>
                            <Unlink className="h-3.5 w-3.5 mr-1.5" />
                            Disconnect
                          </>
                        ) : (
                          <>
                            <Link2 className="h-3.5 w-3.5 mr-1.5" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      )}
    </div>
  )
}
