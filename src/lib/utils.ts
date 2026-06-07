import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    backlog: "bg-gray-500",
    "to-do": "bg-blue-500",
    "in-progress": "bg-amber-500",
    review: "bg-purple-500",
    completed: "bg-emerald-500",
  }
  return map[status.toLowerCase()] || "bg-gray-500"
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    low: "bg-slate-500",
    medium: "bg-blue-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  }
  return map[priority.toLowerCase()] || "bg-slate-500"
}

export function getPriorityLabel(priority: string): string {
  const map: Record<string, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  }
  return map[priority.toLowerCase()] || priority
}
