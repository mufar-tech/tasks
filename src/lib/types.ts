export type TaskStatus = "backlog" | "to-do" | "in-progress" | "review" | "completed"
export type TaskPriority = "low" | "medium" | "high" | "critical"
export type UserRole = "owner" | "admin" | "manager" | "member" | "guest"
export type ProjectStatus = "active" | "on-hold" | "completed" | "archived"
export type PlanTier = "free" | "professional" | "business" | "enterprise"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  initials: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: User
  reporter?: User
  tags: string[]
  dueDate?: string
  attachments: number
  comments: number
  projectId: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  description?: string
  owner: User
  team: User[]
  priority: TaskPriority
  status: ProjectStatus
  startDate: string
  endDate?: string
  progress: number
  taskCount: number
  completedTasks: number
  color: string
}

export interface TeamMember {
  id: string
  user: User
  role: UserRole
  joinedAt: string
  taskCount: number
  completedCount: number
}

export interface Activity {
  id: string
  user: User
  action: string
  target: string
  timestamp: string
  type: "task" | "project" | "comment" | "team" | "mention"
}

export interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
  type: "assigned" | "due-date" | "comment" | "mention" | "update"
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: "deadline" | "milestone" | "meeting" | "task"
  projectId?: string
  color: string
}

export interface BillingPlan {
  id: PlanTier
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  cta: string
}

export interface Integration {
  id: string
  name: string
  description: string
  icon: string
  connected: boolean
  category: string
}
