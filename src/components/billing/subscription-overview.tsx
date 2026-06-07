"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const usageStats = [
  { label: "Team Members", used: 8, total: 25, unit: "" },
  { label: "Storage", used: 4.2, total: 25, unit: "GB" },
  { label: "Projects", used: 6, total: null, unit: "" },
]

export default function SubscriptionOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>You are on the Professional plan</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-mufar-text">$29</span>
                <span className="text-sm text-mufar-text-secondary">/month</span>
              </div>
              <p className="text-sm text-mufar-text-secondary mt-1">Professional plan · Annual billing</p>
            </div>

            <Separator />

            <div className="space-y-4">
              {usageStats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-mufar-text-secondary">{stat.label}</span>
                    <span className="text-sm font-medium text-mufar-text">
                      {stat.used}
                      {stat.unit ? ` ${stat.unit}` : ""}
                      {stat.total !== null ? (
                        <span className="text-mufar-text-secondary">
                          {" "}of {stat.total}{stat.unit ? ` ${stat.unit}` : ""}
                        </span>
                      ) : (
                        <span className="text-mufar-text-secondary"> (Unlimited)</span>
                      )}
                    </span>
                  </div>
                  {stat.total !== null && (
                    <Progress
                      value={(stat.used / stat.total) * 100}
                      className="h-2"
                    />
                  )}
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="text-mufar-text-secondary">Next billing date</span>
              <span className="font-medium text-mufar-text">June 1, 2026</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="h-full">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" variant="outline">
            Update Payment Method
          </Button>
          <Button className="w-full justify-start" variant="outline">
            View Invoices
          </Button>
          <Button className="w-full justify-start" variant="outline">
            Add Team Members
          </Button>
          <Button variant="outline" className="w-full justify-start text-mufar-danger hover:text-mufar-danger">
            Cancel Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
