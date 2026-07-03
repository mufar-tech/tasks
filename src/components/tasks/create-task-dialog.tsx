"use client"

import { useState, useEffect } from "react"
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
import { createTask, getTeams, getProjects } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface CreateTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  defaultProjectId?: string
}

export default function CreateTaskDialog({ open, onOpenChange, onSuccess, defaultProjectId }: CreateTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState("")
  const [priority, setPriority] = useState("medium")
  const [status, setStatus] = useState("backlog")
  const [dueDate, setDueDate] = useState("")
  const [tags, setTags] = useState("")
  const [projectId, setProjectId] = useState(defaultProjectId || "")
  const [submitting, setSubmitting] = useState(false)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loadingOptions, setLoadingOptions] = useState(false)

  useEffect(() => {
    if (open) {
      setLoadingOptions(true)
      Promise.all([
        getTeams().catch(() => []),
        getProjects().catch(() => []),
      ]).then(([teams, projs]) => {
        const members: any[] = []
        if (Array.isArray(teams)) {
          teams.forEach((t: any) => {
            if (Array.isArray(t.members)) {
              t.members.forEach((m: any) => {
                if (!members.find((x) => (x._id || x.id) === (m._id || m.id))) {
                  members.push(m)
                }
              })
            }
          })
        }
        setTeamMembers(members)
        setProjects(Array.isArray(projs) ? projs : [])
        if (!defaultProjectId && Array.isArray(projs) && projs.length > 0) {
          setProjectId(projs[0]._id || projs[0].id)
        }
      }).finally(() => setLoadingOptions(false))
    }
  }, [open, defaultProjectId])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setAssignee("")
    setPriority("medium")
    setStatus("backlog")
    setDueDate("")
    setTags("")
    setProjectId(defaultProjectId || "")
  }

  const handleSubmit = async () => {
    if (!title.trim()) return
    setSubmitting(true)
    try {
      await createTask({
        title: title.trim(),
        description,
        assignee: assignee || undefined,
        priority,
        status,
        dueDate: dueDate || undefined,
        tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        projectId,
      })
      resetForm()
      onOpenChange(false)
      onSuccess?.()
    } catch {
      // error handled silently
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Add a new task to your project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-md border border-mufar-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-mufar-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mufar-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Brief description of the task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={projectId} onValueChange={setProjectId} disabled={loadingOptions || !!defaultProjectId}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p: any) => (
                  <SelectItem key={p._id || p.id} value={p._id || p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select value={assignee} onValueChange={setAssignee} disabled={loadingOptions}>
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unassigned</SelectItem>
                  {teamMembers.map((m: any) => (
                    <SelectItem key={m._id || m.id} value={m._id || m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="to-do">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="e.g. frontend, design, urgent"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={submitting}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={submitting || !title.trim()}>
            {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
