"use client"

import { useState, useCallback } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TeamList from "@/components/teams/team-list"
import InviteMembers from "@/components/teams/invite-members"

export default function TeamsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Teams</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Manage your teams and members.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      <TeamList key={refreshKey} />
      <InviteMembers open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleSuccess} />
    </div>
  )
}
