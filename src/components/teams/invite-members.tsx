"use client"

import { useState } from "react"
import { Mail, Send, CheckCircle2, X } from "lucide-react"
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
import { cn } from "@/lib/utils"

interface InviteMembersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function InviteMembers({ open, onOpenChange }: InviteMembersProps) {
  const [emails, setEmails] = useState("")
  const [role, setRole] = useState("member")
  const [success, setSuccess] = useState(false)

  const handleSend = () => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setEmails("")
      setRole("member")
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            Send invitations to new team members.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="h-14 w-14 rounded-full bg-mufar-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-7 w-7 text-mufar-success" />
            </div>
            <h3 className="text-lg font-semibold text-mufar-text mb-1">Invitations Sent!</h3>
            <p className="text-sm text-mufar-text-secondary text-center">
              Invitations have been sent successfully.
            </p>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="single-email">Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="single-email"
                  type="email"
                  placeholder="colleague@company.com"
                  className="flex-1"
                />
                <Button size="sm" variant="outline">Add</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-mufar-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-mufar-card px-2 text-mufar-text-secondary">Or</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="multi-email">Multiple Emails</Label>
              <textarea
                id="multi-email"
                className={cn(
                  "flex min-h-[100px] w-full rounded-md border border-mufar-border bg-transparent px-3 py-2 text-sm shadow-sm",
                  "placeholder:text-mufar-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mufar-primary"
                )}
                placeholder="Enter email addresses separated by commas or new lines"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
              <p className="text-xs text-mufar-text-secondary">
                Separate multiple emails with commas or new lines.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
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
          </div>
        )}

        {!success && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
