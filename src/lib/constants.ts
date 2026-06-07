import type {
  User, Task, Project, TeamMember, Activity,
  Notification, CalendarEvent, BillingPlan, Integration
} from "./types"

export const currentUser: User = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex@mufartech.com",
  role: "admin",
  initials: "AM",
}

export const users: User[] = [
  currentUser,
  { id: "u2", name: "Sarah Chen", email: "sarah@mufartech.com", role: "manager", initials: "SC" },
  { id: "u3", name: "Marcus Johnson", email: "marcus@mufartech.com", role: "member", initials: "MJ" },
  { id: "u4", name: "Emily Rodriguez", email: "emily@mufartech.com", role: "member", initials: "ER" },
  { id: "u5", name: "David Kim", email: "david@mufartech.com", role: "member", initials: "DK" },
  { id: "u6", name: "Lisa Thompson", email: "lisa@mufartech.com", role: "member", initials: "LT" },
  { id: "u7", name: "James Wilson", email: "james@mufartech.com", role: "member", initials: "JW" },
  { id: "u8", name: "Nina Patel", email: "nina@mufartech.com", role: "manager", initials: "NP" },
]

export const projects: Project[] = [
  {
    id: "p1", name: "Website Redesign", description: "Complete overhaul of the company website with modern design patterns",
    owner: users[0], team: [users[1], users[2], users[3]], priority: "high", status: "active",
    startDate: "2026-05-01", endDate: "2026-07-15", progress: 65, taskCount: 24, completedTasks: 15, color: "#2563EB",
  },
  {
    id: "p2", name: "Mobile App v2", description: "Version 2 of the mobile application with new features",
    owner: users[1], team: [users[2], users[4], users[5], users[6]], priority: "critical", status: "active",
    startDate: "2026-04-15", endDate: "2026-06-30", progress: 42, taskCount: 32, completedTasks: 13, color: "#7C3AED",
  },
  {
    id: "p3", name: "API Integration Suite", description: "Build integration layer for third-party APIs",
    owner: users[0], team: [users[3], users[4]], priority: "medium", status: "active",
    startDate: "2026-05-15", endDate: "2026-07-01", progress: 28, taskCount: 18, completedTasks: 5, color: "#059669",
  },
  {
    id: "p4", name: "Data Analytics Dashboard", description: "Internal analytics dashboard for business intelligence",
    owner: users[1], team: [users[2], users[5], users[7]], priority: "high", status: "on-hold",
    startDate: "2026-03-01", endDate: "2026-05-30", progress: 78, taskCount: 20, completedTasks: 15, color: "#D97706",
  },
  {
    id: "p5", name: "Security Audit", description: "Comprehensive security audit and penetration testing",
    owner: users[0], team: [users[3], users[6]], priority: "critical", status: "completed",
    startDate: "2026-04-01", endDate: "2026-04-28", progress: 100, taskCount: 12, completedTasks: 12, color: "#DC2626",
  },
  {
    id: "p6", name: "Customer Portal", description: "Self-service customer portal for ticket management",
    owner: users[7], team: [users[1], users[2], users[5]], priority: "medium", status: "active",
    startDate: "2026-06-01", endDate: "2026-08-15", progress: 15, taskCount: 28, completedTasks: 4, color: "#0891B2",
  },
]

export const tasks: Task[] = [
  { id: "t1", title: "Design home page mockups", status: "completed", priority: "high",
    assignee: users[2], reporter: users[0], tags: ["design", "frontend"], dueDate: "2026-05-10",
    attachments: 3, comments: 5, projectId: "p1", createdAt: "2026-05-01",
    description: "Create high-fidelity mockups for the new homepage layout focusing on conversion optimization." },
  { id: "t2", title: "Implement authentication flow", status: "in-progress", priority: "critical",
    assignee: users[3], reporter: users[0], tags: ["backend", "auth"], dueDate: "2026-05-20",
    attachments: 1, comments: 8, projectId: "p1", createdAt: "2026-05-03",
    description: "Implement OAuth2.0 with support for Google and GitHub login providers." },
  { id: "t3", title: "Set up CI/CD pipeline", status: "in-progress", priority: "high",
    assignee: users[4], reporter: users[1], tags: ["devops", "infrastructure"], dueDate: "2026-06-01",
    attachments: 0, comments: 3, projectId: "p2", createdAt: "2026-05-05",
    description: "Configure GitHub Actions for automated testing and deployment." },
  { id: "t4", title: "Create API documentation", status: "to-do", priority: "medium",
    assignee: users[5], reporter: users[1], tags: ["docs", "api"], dueDate: "2026-06-10",
    attachments: 0, comments: 1, projectId: "p2", createdAt: "2026-05-07",
    description: "Write comprehensive API documentation using OpenAPI specifications." },
  { id: "t5", title: "User onboarding flow", status: "to-do", priority: "medium",
    assignee: users[2], reporter: users[0], tags: ["design", "ux"], dueDate: "2026-05-25",
    attachments: 2, comments: 4, projectId: "p1", createdAt: "2026-05-02",
    description: "Design and implement the user onboarding experience with tooltips." },
  { id: "t6", title: "Database optimization", status: "backlog", priority: "high",
    assignee: users[4], reporter: users[1], tags: ["backend", "database"], dueDate: "2026-06-15",
    attachments: 0, comments: 2, projectId: "p2", createdAt: "2026-05-08",
    description: "Optimize slow queries and add proper indexing for improved performance." },
  { id: "t7", title: "Payment integration", status: "review", priority: "critical",
    assignee: users[6], reporter: users[0], tags: ["backend", "payments"], dueDate: "2026-05-18",
    attachments: 1, comments: 6, projectId: "p3", createdAt: "2026-05-04",
    description: "Integrate Stripe payment gateway with webhook handling." },
  { id: "t8", title: "Notification system", status: "backlog", priority: "low",
    assignee: users[3], reporter: users[0], tags: ["backend", "notifications"], dueDate: "2026-07-01",
    attachments: 0, comments: 0, projectId: "p3", createdAt: "2026-05-09",
    description: "Build real-time notification system using WebSockets." },
  { id: "t9", title: "Dashboard widgets", status: "in-progress", priority: "high",
    assignee: users[2], reporter: users[1], tags: ["frontend", "dashboard"], dueDate: "2026-05-22",
    attachments: 2, comments: 7, projectId: "p4", createdAt: "2026-05-06",
    description: "Create interactive dashboard widgets with real-time data updates." },
  { id: "t10", title: "Security penetration tests", status: "completed", priority: "critical",
    assignee: users[6], reporter: users[0], tags: ["security", "testing"], dueDate: "2026-04-25",
    attachments: 4, comments: 3, projectId: "p5", createdAt: "2026-04-01",
    description: "Run comprehensive penetration testing on all endpoints." },
  { id: "t11", title: "Mobile responsive layout", status: "to-do", priority: "medium",
    assignee: users[5], reporter: users[0], tags: ["frontend", "responsive"], dueDate: "2026-06-05",
    attachments: 0, comments: 2, projectId: "p1", createdAt: "2026-05-10",
    description: "Ensure all pages are fully responsive across mobile and tablet." },
  { id: "t12", title: "Unit test coverage", status: "in-progress", priority: "medium",
    assignee: users[4], reporter: users[1], tags: ["testing", "quality"], dueDate: "2026-05-30",
    attachments: 0, comments: 4, projectId: "p2", createdAt: "2026-05-11",
    description: "Achieve 80% unit test coverage across all modules." },
]

export const teamMembers: TeamMember[] = users.map((u, i) => ({
  id: `m${i}`,
  user: u,
  role: u.role,
  joinedAt: "2026-01-15",
  taskCount: Math.floor(Math.random() * 10) + 5,
  completedCount: Math.floor(Math.random() * 8) + 2,
}))

export const activities: Activity[] = [
  { id: "a1", user: users[1], action: "completed", target: "Homepage design", timestamp: "2026-05-15T09:30:00", type: "task" },
  { id: "a2", user: users[2], action: "commented on", target: "Auth flow PR", timestamp: "2026-05-15T08:45:00", type: "comment" },
  { id: "a3", user: users[3], action: "moved", target: "API docs task", timestamp: "2026-05-15T08:00:00", type: "task" },
  { id: "a4", user: users[0], action: "created", target: "Customer Portal project", timestamp: "2026-05-14T16:30:00", type: "project" },
  { id: "a5", user: users[4], action: "assigned", target: "Database optimization", timestamp: "2026-05-14T15:00:00", type: "task" },
  { id: "a6", user: users[5], action: "joined", target: "Engineering team", timestamp: "2026-05-14T14:00:00", type: "team" },
  { id: "a7", user: users[7], action: "updated", target: "Analytics dashboard", timestamp: "2026-05-14T13:20:00", type: "project" },
  { id: "a8", user: users[2], action: "mentioned", target: "Alex in design review", timestamp: "2026-05-14T12:00:00", type: "mention" },
]

export const notifications: Notification[] = [
  { id: "n1", title: "Task Assigned", description: "Sarah Chen assigned you to 'Auth flow implementation'", timestamp: "1 hour ago", read: false, type: "assigned" },
  { id: "n2", title: "Due Date Reminder", description: "'API documentation' is due in 2 days", timestamp: "2 hours ago", read: false, type: "due-date" },
  { id: "n3", title: "New Comment", description: "Marcus commented on 'Dashboard widgets'", timestamp: "3 hours ago", read: true, type: "comment" },
  { id: "n4", title: "Mention", description: "Emily mentioned you in 'Security audit'", timestamp: "5 hours ago", read: true, type: "mention" },
  { id: "n5", title: "Project Update", description: "Website Redesign progress updated to 65%", timestamp: "1 day ago", read: true, type: "update" },
  { id: "n6", title: "Task Completed", description: "David completed 'Homepage mockups'", timestamp: "1 day ago", read: false, type: "update" },
]

export const calendarEvents: CalendarEvent[] = [
  { id: "c1", title: "Website Redesign Launch", date: "2026-07-15", type: "milestone", color: "#2563EB" },
  { id: "c2", title: "Mobile App v2 Release", date: "2026-06-30", type: "milestone", color: "#7C3AED" },
  { id: "c3", title: "Sprint Review", date: "2026-05-20", type: "meeting", color: "#059669" },
  { id: "c4", title: "Design Review", date: "2026-05-18", type: "meeting", color: "#D97706" },
  { id: "c5", title: "Auth Implementation Due", date: "2026-05-20", type: "deadline", color: "#DC2626" },
  { id: "c6", title: "Payment Integration Due", date: "2026-05-18", type: "deadline", color: "#DC2626" },
  { id: "c7", title: "UI Component Audit", date: "2026-05-22", type: "task", color: "#0891B2" },
]

export const billingPlans: BillingPlan[] = [
  { id: "free", name: "Free", price: 0, description: "Perfect for getting started", features: ["Up to 5 team members", "10 projects", "1GB storage", "Basic reports", "Community support"], cta: "Current Plan" },
  { id: "professional", name: "Professional", price: 29, description: "For growing teams", features: ["Up to 25 team members", "Unlimited projects", "25GB storage", "Advanced reports", "Priority support", "API access", "Integrations"], popular: true, cta: "Upgrade Now" },
  { id: "business", name: "Business", price: 79, description: "For scaling organizations", features: ["Up to 100 team members", "Unlimited projects", "100GB storage", "Custom reports", "Dedicated support", "Advanced permissions", "Audit logs", "SSO"], cta: "Contact Sales" },
  { id: "enterprise", name: "Enterprise", price: 249, description: "For large enterprises", features: ["Unlimited team members", "Unlimited projects", "Unlimited storage", "Custom reporting", "24/7 support", "Advanced security", "Custom integrations", "SLA guarantee"], cta: "Contact Sales" },
]

export const integrations: Integration[] = [
  { id: "i1", name: "Slack", description: "Send notifications and updates to Slack channels", icon: "slack", connected: true, category: "Communication" },
  { id: "i2", name: "Microsoft Teams", description: "Collaborate with Teams and sync tasks", icon: "teams", connected: false, category: "Communication" },
  { id: "i3", name: "Google Calendar", description: "Sync deadlines and milestones with Google Calendar", icon: "calendar", connected: true, category: "Calendar" },
  { id: "i4", name: "Gmail", description: "Create tasks from emails and get notifications", icon: "gmail", connected: false, category: "Email" },
  { id: "i5", name: "Outlook", description: "Sync with Outlook calendar and email", icon: "outlook", connected: false, category: "Email" },
  { id: "i6", name: "Zoom", description: "Schedule and join meetings directly from tasks", icon: "zoom", connected: true, category: "Meetings" },
  { id: "i7", name: "Webhooks", description: "Send real-time events to your endpoints", icon: "webhook", connected: true, category: "Developer" },
  { id: "i8", name: "REST API", description: "Full REST API access for custom integrations", icon: "api", connected: false, category: "Developer" },
]
