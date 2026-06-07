"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import IntegrationsList from "@/components/integrations/integrations-list"

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Integrations</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Connect your favorite tools and services.
          </p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Integration
        </Button>
      </div>

      <IntegrationsList />
    </div>
  )
}
