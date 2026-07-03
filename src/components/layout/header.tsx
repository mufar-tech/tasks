"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import {
  Bell,
  CircleHelp,
  Settings,
  Search,
  User,
  Keyboard,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { cn, getInitials } from "@/lib/utils"
import { getNotifications } from "@/lib/api"

export default function Header() {
  const { data: session } = useSession()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    getNotifications()
      .then((notifications) => {
        const unread = notifications.filter((n: any) => !n.read).length
        setUnreadCount(unread)
      })
      .catch(() => {})
  }, [])

  const user = session?.user
  const initials = user?.name ? getInitials(user.name) : "?"

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-mufar-border bg-mufar-card shrink-0">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mufar-text-secondary" />
        <Input
          placeholder="Search tasks, projects..."
          className="pl-9 rounded-lg border-mufar-border bg-mufar-bg"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-mufar-text-secondary hover:text-mufar-text">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        <Button variant="ghost" size="icon" className="text-mufar-text-secondary hover:text-mufar-text">
          <CircleHelp className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-mufar-text-secondary hover:text-mufar-text">
          <Settings className="h-5 w-5" />
        </Button>

        <div className="ml-2 pl-2 border-l border-mufar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-mufar-primary text-white text-xs font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-mufar-text">{user?.name || "User"}</p>
                  <p className="text-xs text-mufar-text-secondary">{user?.email || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Workspace Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard className="mr-2 h-4 w-4" />
                  Keyboard Shortcuts
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-mufar-danger focus:text-mufar-danger">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
