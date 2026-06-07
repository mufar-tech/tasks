"use client"

import { Download, DownloadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const invoices = [
  { id: "INV-001", date: "May 1, 2026", plan: "Professional", amount: "$29.00", status: "paid" as const },
  { id: "INV-002", date: "Apr 1, 2026", plan: "Professional", amount: "$29.00", status: "paid" as const },
  { id: "INV-003", date: "Mar 1, 2026", plan: "Professional", amount: "$29.00", status: "paid" as const },
  { id: "INV-004", date: "Feb 1, 2026", plan: "Professional", amount: "$29.00", status: "paid" as const },
  { id: "INV-005", date: "Jan 1, 2026", plan: "Free", amount: "$0.00", status: "paid" as const },
  { id: "INV-006", date: "Dec 1, 2025", plan: "Free", amount: "$0.00", status: "paid" as const },
  { id: "INV-007", date: "Nov 1, 2025", plan: "Free", amount: "$0.00", status: "pending" as const },
  { id: "INV-008", date: "Oct 1, 2025", plan: "Free", amount: "$0.00", status: "failed" as const },
]

const statusBadge = {
  paid: "bg-mufar-success/10 text-mufar-success border-0",
  pending: "bg-mufar-warning/10 text-mufar-warning border-0",
  failed: "bg-mufar-danger/10 text-mufar-danger border-0",
}

export default function BillingHistory() {
  return (
    <div className="bg-mufar-card rounded-xl border border-mufar-border shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-mufar-border">
        <h3 className="text-lg font-semibold text-mufar-text">Billing History</h3>
        <Button variant="outline" size="sm">
          <DownloadCloud className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <span className="text-sm text-mufar-text-secondary">{invoice.date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-mufar-text">{invoice.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-mufar-text-secondary">{invoice.plan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-mufar-text">{invoice.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-xs px-2 py-0.5", statusBadge[invoice.status])}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-mufar-text-secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
