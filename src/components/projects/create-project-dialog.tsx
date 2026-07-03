"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { createProject, getTeams } from "@/lib/api"
import { useSession } from "next-auth/react"
import { cn, getInitials } from "@/lib/utils"

const colorOptions = [
  { value: "#2563EB", label: "Blue" },
  { value: "#7C3AED", label: "Purple" },
  { value: "#059669", label: "Emerald" },
  { value: "#D97706", label: "Amber" },
  { value: "#DC2626", label: "Red" },
  { value: "#0891B2", label: "Cyan" },
  { value: "#DB2777", label: "Pink" },
  { value: "#65A30D", label: "Lime" },
]

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function CreateProjectDialog({ open, onOpenChange, onSuccess }: CreateProjectDialogProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [teamsLoading, setTeamsLoading] = useState(false)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const [form, setForm] = useState({
    name: "",
    description: "",
    priority: "medium",
    status: "active" as string,
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    if (open) {
      setTeamsLoading(true)
      getTeams()
        .then((teams: any[]) => {
          const members = teams.flatMap((t: any) =>
            (t.members || t.team || []).map((m: any) => ({
              _id: m._id || m.id || m.user?._id || m.user?.id,
              name: m.name || m.user?.name,
              email: m.email || m.user?.email,
              initials: m.initials || getInitials(m.name || m.user?.name || ""),
              role: m.role || m.user?.role,
            }))
          )
          const unique = members.filter(
            (m: any, i: number, a: any[]) => a.findIndex((x: any) => x._id === m._id) === i
          )
          setTeamMembers(unique.length > 0 ? unique : [])
        })
        .catch(() => setTeamMembers([]))
        .finally(() => setTeamsLoading(false))
    }
  }, [open])

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) return
    setLoading(true)
    try {
      await createProject({
        name: form.name,
        description: form.description,
        priority: form.priority,
        status: form.status,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        color: selectedColor,
        team: selectedMembers,
        owner: session?.user?.id,
      })
      setForm({ name: "", description: "", priority: "medium", status: "active", startDate: "", endDate: "" })
      setSelectedMembers([])
      setSelectedColor(colorOptions[0].value)
      onOpenChange(false)
      onSuccess?.()
    } catch (e) {
      console.error("Create project failed", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Set up a new project for your team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-md border border-mufar-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-mufar-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mufar-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Brief description of the project"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Color</Label>
              <div className="flex gap-2 pt-1">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      "h-7 w-7 rounded-full transition-all",
                      selectedColor === color.value && "ring-2 ring-offset-2 ring-mufar-primary"
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="border border-mufar-border rounded-lg p-3 space-y-2 max-h-[160px] overflow-y-auto">
              {teamsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-mufar-text-secondary" />
                </div>
              ) : teamMembers.length === 0 ? (
                <p className="text-sm text-mufar-text-secondary text-center py-2">
                  No team members available
                </p>
              ) : (
                teamMembers.map((member: any) => (
                  <label
                    key={member._id}
                    className="flex items-center gap-2 cursor-pointer py-1"
                  >
                    <Checkbox
                      checked={selectedMembers.includes(member._id)}
                      onCheckedChange={() => toggleMember(member._id)}
                    />
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-mufar-hover flex items-center justify-center text-[10px] font-medium text-mufar-text">
                        {member.initials}
                      </div>
                      <span className="text-sm text-mufar-text">{member.name}</span>
                    </div>
                    <span className="text-xs text-mufar-text-secondary ml-auto capitalize">
                      {member.role}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading || !form.name.trim()}>
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Creating...</>
            ) : (
              "Create Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
