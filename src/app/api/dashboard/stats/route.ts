import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Project from "@/lib/models/Project"
import Task from "@/lib/models/Task"
import Activity from "@/lib/models/Activity"
import Team from "@/lib/models/Team"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const userId = session.user.id

    const userProjects = await Project.find({
      $or: [{ owner: userId }, { team: userId }],
    })
    const projectIds = userProjects.map((p) => p._id)

    const allTasks = await Task.find({ projectId: { $in: projectIds } })
    const activeTasks = allTasks.filter((t) => t.status !== "completed")
    const completedTasksCount = allTasks.filter((t) => t.status === "completed").length

    const teams = await Team.find({ members: userId })
    const teamMemberIds = new Set<string>()
    for (const team of teams) {
      for (const member of team.members) {
        teamMemberIds.add(member.toString())
      }
    }

    const totalTasks = allTasks.length
    const productivityScore = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0
    const completionRate = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0

    const recentActivities = await Activity.find({ projectId: { $in: projectIds } })
      .populate("user", "name email image")
      .sort({ createdAt: -1 })
      .limit(10)

    const now = new Date()
    const upcomingDeadlines = await Task.find({
      projectId: { $in: projectIds },
      status: { $ne: "completed" },
      dueDate: { $gte: now },
    })
      .sort({ dueDate: 1 })
      .limit(10)

    const statusCounts = ["backlog", "to-do", "in-progress", "review", "completed"]
      .map((status) => ({
        status,
        count: allTasks.filter((t) => t.status === status).length,
      }))

    const priorityCounts = ["low", "medium", "high", "critical"]
      .map((priority) => ({
        priority,
        count: allTasks.filter((t) => t.priority === priority).length,
      }))

    const projectHealth = userProjects.map((p) => ({
      id: p._id,
      name: p.name,
      progress: p.progress,
      status: p.status,
      color: p.color,
    }))

    const workloadMap = new Map<string, number>()
    for (const task of allTasks) {
      if (task.assignee) {
        const key = task.assignee.toString()
        workloadMap.set(key, (workloadMap.get(key) || 0) + 1)
      }
    }
    const workloadByMember = Array.from(workloadMap.entries()).map(([userId, taskCount]) => ({
      user: userId,
      taskCount,
    }))

    return NextResponse.json({
      totalProjects: userProjects.length,
      activeTasks: activeTasks.length,
      completedTasks: completedTasksCount,
      teamMembers: teamMemberIds.size,
      productivityScore,
      completionRate,
      recentActivities,
      upcomingDeadlines,
      tasksByStatus: statusCounts,
      tasksByPriority: priorityCounts,
      projectHealth,
      workloadByMember,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
