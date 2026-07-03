"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  FileText,
  Users2,
  MessageSquare,
  Paperclip,
  Clock,
  BarChart3,
  Send,
  UserCheck,
  UserMinus,
  ListChecks,
  CheckCircle2,
  AlertCircle,
  Loader2,
  File,
  Image,
  FileSpreadsheet,
  Download,
  ExternalLink,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getProject, getTasks } from "@/lib/api"
import { cn, formatDateShort, getInitials } from "@/lib/utils"
import ProjectHeader from "@/components/projects/project-header"
import ProjectOverview from "@/components/projects/project-overview"

const fileList = [
  { name: "Project_Requirements.pdf", size: "2.4 MB", type: "pdf", author: "Alex Morgan", date: "2026-05-10" },
  { name: "Design_Mockups.fig", size: "8.1 MB", type: "figma", author: "Marcus Johnson", date: "2026-05-12" },
  { name: "API_Specs.docx", size: "1.2 MB", type: "doc", author: "Sarah Chen", date: "2026-05-08" },
  { name: "Sprint_Planning.xlsx", size: "0.8 MB", type: "xls", author: "Emily Rodriguez", date: "2026-05-05" },
  { name: "Architecture_Diagram.png", size: "3.5 MB", type: "img", author: "David Kim", date: "2026-05-07" },
]

const discussions = [
  { id: "d1", author: { name: "Alex Morgan", initials: "AM" }, content: "I think we should use React Query for data fetching. It will simplify our state management significantly.", time: "2 hours ago", replies: 3 },
  { id: "d2", author: { name: "Marcus Johnson", initials: "MJ" }, content: "Agreed! I've been using it on the user profile components and it's working great.", time: "1 hour ago", replies: 1 },
  { id: "d3", author: { name: "Sarah Chen", initials: "SC" }, content: "Should we also consider using tRPC for the API layer? It would give us end-to-end type safety.", time: "30 min ago", replies: 0 },
]

const timelineEvents = [
  { date: "May 1, 2026", title: "Project Kickoff", description: "Initial planning and team alignment meeting" },
  { date: "May 10, 2026", title: "Design Phase Complete", description: "All mockups approved by stakeholders" },
  { date: "May 15, 2026", title: "Sprint 1 Begins", description: "Core feature development starts" },
  { date: "May 25, 2026", title: "Mid-sprint Review", description: "Progress review and adjustment" },
  { date: "Jun 5, 2026", title: "Sprint 1 Ends", description: "First iteration delivery" },
  { date: "Jun 15, 2026", title: "QA Testing Phase", description: "Quality assurance and bug fixing" },
]

const fileIcons: Record<string, any> = {
  pdf: FileText,
  figma: File,
  doc: FileText,
  xls: FileSpreadsheet,
  img: Image,
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [project, setProject] = useState<any | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comment, setComment] = useState("")

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [projectData, tasksData] = await Promise.all([
        getProject(id),
        getTasks({ projectId: id }),
      ])
      setProject(projectData)
      setTasks(Array.isArray(tasksData) ? tasksData : tasksData.tasks || [])
    } catch (e: any) {
      setError(e.message || "Failed to load project")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-mufar-hover" />
          <div className="h-4 w-24 rounded bg-mufar-hover" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-1 rounded-full bg-mufar-hover" />
          <div className="h-8 w-48 rounded bg-mufar-hover" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded bg-mufar-hover" />
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-mufar-card border border-mufar-border" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 rounded-xl bg-mufar-card border border-mufar-border" />
          <div className="h-64 rounded-xl bg-mufar-card border border-mufar-border" />
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-mufar-danger mb-4" />
        <h2 className="text-lg font-semibold text-mufar-text mb-1">Project not found</h2>
        <p className="text-sm text-mufar-text-secondary mb-4">
          {error || "The project you're looking for doesn't exist."}
        </p>
        <Button onClick={() => router.push("/projects")}>Back to Projects</Button>
      </div>
    )
  }

  const projectTasks = tasks
  const team = project.team || []

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} onRefresh={fetchData} />

      <Tabs defaultValue="overview" className="space-y-5">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview project={project} />
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Project Tasks</CardTitle>
              <CardDescription>{projectTasks.length} total tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {projectTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ListChecks className="h-10 w-10 text-mufar-text-secondary mb-3" />
                  <p className="text-sm text-mufar-text-secondary">No tasks yet for this project.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectTasks.map((task: any) => {
                      const assignee = task.assignee || {}
                      return (
                        <TableRow key={task._id || task.id}>
                          <TableCell className="font-medium text-mufar-text max-w-[220px] truncate">
                            {task.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant={task.status as any} className="capitalize">
                              {task.status === "in-progress" ? "In Progress" : task.status === "to-do" ? "To Do" : task.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={task.priority as any} className="capitalize">
                              {task.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                                  {assignee.initials || getInitials(assignee.name || "")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-mufar-text">{assignee.name || "Unassigned"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-mufar-text-secondary text-sm">
                            {task.dueDate ? formatDateShort(task.dueDate) : "—"}
                          </TableCell>
                          <TableCell className="text-right text-mufar-text-secondary text-sm">
                            {task.comments || 0}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>{team.length} members on this project</CardDescription>
            </CardHeader>
            <CardContent>
              {team.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users2 className="h-10 w-10 text-mufar-text-secondary mb-3" />
                  <p className="text-sm text-mufar-text-secondary">No team members assigned.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {team.map((member: any) => (
                    <div
                      key={member._id || member.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-mufar-border hover:bg-mufar-hover transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-sm font-medium bg-mufar-hover text-mufar-text">
                          {member.initials || getInitials(member.name || "?")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-mufar-text">{member.name}</p>
                        <p className="text-xs text-mufar-text-secondary capitalize">{member.role}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-mufar-text-secondary">
                          <span className="flex items-center gap-1">
                            <ListChecks className="h-3 w-3" />
                            {tasks.filter((t: any) => {
                              const a = t.assignee || {}
                              return (a._id || a.id) === (member._id || member.id)
                            }).length} tasks
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-mufar-text-secondary">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-mufar-text-secondary">
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Files & Documents</CardTitle>
              <CardDescription>Shared project resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {fileList.map((file) => {
                  const FileIcon = fileIcons[file.type] || FileText
                  return (
                    <div
                      key={file.name}
                      className="flex items-center gap-4 p-3 rounded-lg border border-mufar-border hover:bg-mufar-hover transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-mufar-hover">
                        <FileIcon className="h-5 w-5 text-mufar-text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-mufar-text truncate">{file.name}</p>
                        <p className="text-xs text-mufar-text-secondary">
                          {file.size} &bull; Uploaded by {file.author} on {formatDateShort(file.date)}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-mufar-text-secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-mufar-text-secondary">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions">
          <Card>
            <CardHeader>
              <CardTitle>Discussions</CardTitle>
              <CardDescription>Team conversations about this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-4">
                {discussions.map((d) => (
                  <div key={d.id} className="flex gap-3 pb-4 border-b border-mufar-border last:border-0">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs font-medium bg-mufar-hover text-mufar-text">
                        {d.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-mufar-text">{d.author.name}</span>
                        <span className="text-xs text-mufar-text-secondary">{d.time}</span>
                      </div>
                      <p className="text-sm text-mufar-text leading-relaxed">{d.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-mufar-text-secondary">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          Reply ({d.replies})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs font-medium bg-mufar-hover text-mufar-text">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon" className="h-9 w-9 shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Key milestones and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-0">
                {timelineEvents.map((event, i) => (
                  <div key={event.title} className="relative pb-8 last:pb-0">
                    {i < timelineEvents.length - 1 && (
                      <div className="absolute left-[3px] top-4 w-0.5 h-full bg-mufar-border" />
                    )}
                    <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-mufar-primary ring-4 ring-mufar-card" />
                    <div>
                      <p className="text-xs text-mufar-text-secondary font-medium mb-0.5">{event.date}</p>
                      <h4 className="text-sm font-semibold text-mufar-text">{event.title}</h4>
                      <p className="text-sm text-mufar-text-secondary mt-0.5">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mufar-text-secondary">Total Tasks</span>
                  <span className="text-lg font-bold text-mufar-text">{projectTasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mufar-text-secondary">Completed</span>
                  <span className="text-lg font-bold text-mufar-success">
                    {projectTasks.filter((t: any) => t.status === "completed").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mufar-text-secondary">In Progress</span>
                  <span className="text-lg font-bold text-mufar-warning">
                    {projectTasks.filter((t: any) => t.status === "in-progress").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mufar-text-secondary">Overdue</span>
                  <span className="text-lg font-bold text-mufar-danger">
                    {projectTasks.filter((t: any) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed").length}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-mufar-text-secondary">Progress</span>
                    <span className="font-medium">{project.progress || 0}%</span>
                  </div>
                  <Progress value={project.progress || 0} className="h-2.5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(["critical", "high", "medium", "low"] as const).map((priority) => {
                  const count = projectTasks.filter((t: any) => t.priority === priority).length
                  const pct = projectTasks.length > 0 ? Math.round((count / projectTasks.length) * 100) : 0
                  const colors = {
                    critical: "bg-mufar-danger text-mufar-danger",
                    high: "bg-mufar-warning/10 text-mufar-warning",
                    medium: "bg-mufar-primary/10 text-mufar-primary",
                    low: "bg-mufar-hover text-mufar-text-secondary",
                  }
                  return (
                    <div key={priority} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize text-mufar-text font-medium">{priority}</span>
                        <span className="text-mufar-text-secondary">{count} tasks</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={pct} className="h-2 flex-1" />
                        <span className={cn("text-xs font-medium w-8 text-right", colors[priority].split(" ").pop())}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {team.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <BarChart3 className="h-10 w-10 text-mufar-text-secondary mb-3" />
                    <p className="text-sm text-mufar-text-secondary">No team data available.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>In Progress</TableHead>
                        <TableHead>Completion Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {team.map((member: any) => {
                        const assigned = projectTasks.filter((t: any) => {
                          const a = t.assignee || {}
                          return (a._id || a.id) === (member._id || member.id)
                        })
                        const done = assigned.filter((t: any) => t.status === "completed")
                        const inProg = assigned.filter((t: any) => t.status === "in-progress")
                        const rate = assigned.length > 0 ? Math.round((done.length / assigned.length) * 100) : 0
                        return (
                          <TableRow key={member._id || member.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="text-[9px] font-medium bg-mufar-hover text-mufar-text">
                                    {member.initials || getInitials(member.name || "?")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-mufar-text">{member.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-mufar-text">{assigned.length}</TableCell>
                            <TableCell className="text-mufar-success">{done.length}</TableCell>
                            <TableCell className="text-mufar-warning">{inProg.length}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={rate} className="h-2 w-20" />
                                <span className="text-xs text-mufar-text-secondary">{rate}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
