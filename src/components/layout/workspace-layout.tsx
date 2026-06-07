"use client"

import Sidebar from "./sidebar"
import Header from "./header"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <ScrollArea className="flex-1">
          <main className="p-6">{children}</main>
        </ScrollArea>
      </div>
    </div>
  )
}
