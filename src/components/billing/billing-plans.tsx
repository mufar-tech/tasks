"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { billingPlans } from "@/lib/constants"

export default function BillingPlans() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {billingPlans.map((plan) => {
        const isPopular = plan.popular
        const isCurrent = plan.id === "free"
        return (
          <div
            key={plan.id}
            className={cn(
              "relative bg-mufar-card rounded-xl border shadow-sm flex flex-col",
              isPopular
                ? "border-mufar-primary ring-2 ring-mufar-primary"
                : "border-mufar-border"
            )}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-mufar-primary text-white text-xs px-3 py-1 border-0 whitespace-nowrap">
                  Popular
                </Badge>
              </div>
            )}

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-mufar-text">{plan.name}</h3>
                <p className="text-sm text-mufar-text-secondary mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-mufar-text">${plan.price}</span>
                <span className="text-sm text-mufar-text-secondary">/month</span>
              </div>

              {isCurrent && (
                <Badge className="bg-mufar-success/10 text-mufar-success border-0 text-xs">
                  Current Plan
                </Badge>
              )}

              <ul className="space-y-3 pt-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-mufar-success shrink-0 mt-0.5" />
                    <span className="text-mufar-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <Button
                className={cn(
                  "w-full",
                  isPopular
                    ? ""
                    : "bg-mufar-hover text-mufar-text hover:bg-mufar-border border border-mufar-border"
                )}
                variant={isPopular ? "default" : "outline"}
                disabled={isCurrent}
              >
                {plan.cta}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
