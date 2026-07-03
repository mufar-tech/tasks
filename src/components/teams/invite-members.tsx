"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { createTeam } from "@/lib/api"

interface InviteMembersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function InviteMembers({ open, onOpenChange, onSuccess }: InviteMembersProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [role, setRole] = useState("member")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!name.trim()) return
    setSaving(true)
    setError("")
    try {
      await createTeam({ name: name.trim(), description: description.trim(), members: [] })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setName("")
        setDescription("")
        setRole("member")
        onOpenChange(false)
        onSuccess?.()
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Failed to create team")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Create a new team and add members.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="h-14 w-14 rounded-full bg-mufar-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-7 w-7 text-mufar-success" />
            </div>
            <h3 className="text-lg font-semibold text-mufar-text mb-1">Team Created!</h3>
            <p className="text-sm text-mufar-text-secondary text-center">
              Your team has been created successfully.
            </p>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="Engineering, Design, Marketing..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-desc">Description (optional)</Label>
              <textarea
                id="team-desc"
                className="flex min-h-[80px] w-full rounded-md border border-mufar-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-mufar-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mufar-primary"
                placeholder="What is this team for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Default Member Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-sm text-mufar-danger">{error}</p>
            )}
          </div>
        )}

        {!success && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={saving || !name.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {saving ? "Creating..." : "Create Team"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
