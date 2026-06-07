"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TeamList from "@/components/teams/team-list"
import InviteMembers from "@/components/teams/invite-members"

export default function TeamsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mufar-text">Teams</h1>
          <p className="text-sm text-mufar-text-secondary mt-1">
            Manage your team members and invitations.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <TeamList />
      <InviteMembers open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
