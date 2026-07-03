"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import {
  Search,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Paperclip,
  ListTodo,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getTasks, deleteTask } from "@/lib/api"
import { cn, formatDateShort, getPriorityLabel, getInitials } from "@/lib/utils"
import type { TaskStatus, TaskPriority } from "@/lib/types"

const statusFilters: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Backlog", value: "backlog" },
  { label: "To Do", value: "to-do" },
  { label: "In Progress", value: "in-progress" },
  { label: "Review", value: "review" },
  { label: "Completed", value: "completed" },
]

interface TaskListProps {
  projectId?: string
}

export default function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [sort, setSort] = useState("createdAt")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params: Record<string, string> = {}
      if (projectId) params.projectId = projectId
      const data = await getTasks(params)
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteTask(deleteId)
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== deleteId))
    } catch {
      // handled silently
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => {
        const matchesSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          (t.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
        const matchesStatus = statusFilter === "all" || t.status === statusFilter
        const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter
        const matchesAssignee =
          assigneeFilter === "all" || (t.assignee?._id || t.assignee?.id) === assigneeFilter
        return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      })
      .sort((a, b) => {
        if (sort === "dueDate") {
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        }
        if (sort === "priority") {
          const order: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
          return order[a.priority] - order[b.priority]
        }
        if (sort === "status") {
          const order: Record<string, number> = { backlog: 0, "to-do": 1, "in-progress": 2, review: 3, completed: 4 }
          return order[a.status] - order[b.status]
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [search, statusFilter, priorityFilter, assigneeFilter, sort, tasks])

  const assigneeOptions = useMemo(() => {
    const map = new Map<string, any>()
    tasks.forEach((t) => {
      if (t.assignee) {
        const id = t.assignee._id || t.assignee.id
        if (!map.has(id)) map.set(id, t.assignee)
      }
    })
    return Array.from(map.values())
  }, [tasks])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Skeleton className="h-9 flex-1" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-9 w-20" />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-mufar-border overflow-hidden">
          <div className="divide-y divide-mufar-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
          <ListTodo className="h-8 w-8 text-mufar-danger" />
        </div>
        <h3 className="text-lg font-semibold text-mufar-text mb-1">Failed to load tasks</h3>
        <p className="text-sm text-mufar-text-secondary mb-4">{error}</p>
        <Button variant="outline" onClick={fetchTasks}>Try again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mufar-text-secondary" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((f) => (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(f.value)}
              className="shrink-0"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as TaskPriority | "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            {assigneeOptions.map((u: any) => {
              const id = u._id || u.id
              return (
                <SelectItem key={id} value={id}>{u.name}</SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Newest</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-mufar-hover flex items-center justify-center mb-4">
            <ListTodo className="h-8 w-8 text-mufar-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-mufar-text mb-1">No tasks found</h3>
          <p className="text-sm text-mufar-text-secondary">
            {search || statusFilter !== "all" || priorityFilter !== "all" || assigneeFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Create your first task to get started."}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-mufar-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[240px]">Task</TableHead>
                <TableHead className="w-[140px]">Assignee</TableHead>
                <TableHead className="w-[100px]">Priority</TableHead>
                <TableHead className="w-[110px]">Status</TableHead>
                <TableHead className="w-[110px]">Due Date</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((task) => {
                const id = task._id || task.id
                const isExpanded = expandedRows.has(id)
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()

                return (
                  <TableRow key={id} className="group">
                    <TableCell>
                      <button
                        onClick={() => toggleRow(id)}
                        className="flex items-center gap-2 text-left w-full"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-mufar-text-secondary" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-mufar-text-secondary" />
                        )}
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-mufar-text">
                            {task.title}
                          </span>
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex items-center gap-2 mt-0.5">
                              {task.tags.map((tag: string) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-[9px] px-1.5 py-0 capitalize"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              <div className="flex items-center gap-2 text-mufar-text-secondary">
                                {task.comments > 0 && (
                                  <span className="flex items-center gap-1 text-[10px]">
                                    <MessageSquare className="h-3 w-3" />
                                    {task.comments}
                                  </span>
                                )}
                                {task.attachments > 0 && (
                                  <span className="flex items-center gap-1 text-[10px]">
                                    <Paperclip className="h-3 w-3" />
                                    {task.attachments}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                      {isExpanded && task.description && (
                        <div className="mt-2 ml-6 pl-2 border-l-2 border-mufar-border">
                          <p className="text-xs text-mufar-text-secondary leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {task.assignee ? (
                          <>
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                                {task.assignee.initials || getInitials(task.assignee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-mufar-text-secondary truncate max-w-[80px]">
                              {task.assignee.name?.split(" ")[0]}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-mufar-text-secondary">—</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.priority as any} className="text-[10px] px-1.5 py-0 capitalize">
                        {getPriorityLabel(task.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.status as any} className="text-[10px] px-1.5 py-0 capitalize">
                        {task.status === "to-do" ? "To Do" : task.status === "in-progress" ? "In Progress" : task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.dueDate ? (
                        <span
                          className={cn(
                            "text-xs",
                            isOverdue
                              ? "text-mufar-danger font-medium"
                              : "text-mufar-text-secondary"
                          )}
                        >
                          {formatDateShort(task.dueDate)}
                        </span>
                      ) : (
                        <span className="text-xs text-mufar-text-secondary">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog open={deleteId === id} onOpenChange={(open) => !open && setDeleteId(null)}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-mufar-danger"
                              onClick={() => setDeleteId(id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Task</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &ldquo;{task.title}&rdquo;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                disabled={deleting}
                                className="bg-mufar-danger hover:bg-mufar-danger/90"
                              >
                                {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
