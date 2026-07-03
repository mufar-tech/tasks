"use client"

import { useSession } from "next-auth/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import SubscriptionOverview from "@/components/billing/subscription-overview"
import BillingPlans from "@/components/billing/billing-plans"
import BillingHistory from "@/components/billing/billing-history"

export default function BillingPage() {
  const { data: session } = useSession()
  const role = (session?.user as any)?.role || "member"
  const planMap: Record<string, string> = {
    owner: "enterprise",
    admin: "business",
    manager: "professional",
    member: "professional",
    guest: "free",
  }
  const currentPlanId = planMap[role] || "free"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-mufar-text">Billing</h1>
        <p className="text-sm text-mufar-text-secondary mt-1">
          Manage your subscription and billing information.
        </p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList className="h-10 bg-mufar-hover">
          <TabsTrigger value="subscription" className="text-sm">Subscription</TabsTrigger>
          <TabsTrigger value="plans" className="text-sm">Plans</TabsTrigger>
          <TabsTrigger value="history" className="text-sm">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <SubscriptionOverview />
        </TabsContent>

        <TabsContent value="plans">
          <BillingPlans currentPlanId={currentPlanId} />
        </TabsContent>

        <TabsContent value="history">
          <BillingHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
