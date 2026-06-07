"use client"

import { useState } from "react"
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
import { cn } from "@/lib/utils"
import { users } from "@/lib/constants"

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
}

export default function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
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
            <Input id="name" placeholder="Enter project name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-md border border-mufar-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-mufar-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mufar-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Brief description of the project"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
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
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="border border-mufar-border rounded-lg p-3 space-y-2 max-h-[160px] overflow-y-auto">
              {users.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2 cursor-pointer py-1"
                >
                  <Checkbox
                    checked={selectedMembers.includes(user.id)}
                    onCheckedChange={() => toggleMember(user.id)}
                  />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-mufar-hover flex items-center justify-center text-[10px] font-medium text-mufar-text">
                      {user.initials}
                    </div>
                    <span className="text-sm text-mufar-text">{user.name}</span>
                  </div>
                  <span className="text-xs text-mufar-text-secondary ml-auto capitalize">
                    {user.role}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
