"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Columns3,
  Calendar,
  Users2,
  BarChart3,
  Bell,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Box,
} from "lucide-react"
import { cn, getInitials } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Boards", href: "/boards", icon: Columns3 },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Teams", href: "/teams", icon: Users2 },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)

  const user = session?.user
  const initials = user?.name ? getInitials(user.name) : "?"

  return (
    <aside
      className={cn(
        "flex flex-col bg-mufar-sidebar text-white/70 transition-all duration-300 h-screen",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <Box className="h-7 w-7 text-mufar-primary shrink-0" />
          {!collapsed && (
            <span className="text-white font-bold text-lg whitespace-nowrap">Mufar Tasks</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-mufar-primary/80 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-white/50 text-xs truncate">{user?.email || ""}</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white shrink-0">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
        {collapsed && (
          <button className="mt-2 w-full p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white flex justify-center">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  )
}
