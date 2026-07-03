import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Task from "@/lib/models/Task"
import Activity from "@/lib/models/Activity"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const assignee = searchParams.get("assignee")
    const priority = searchParams.get("priority")
    const search = searchParams.get("search")

    const filter: Record<string, unknown> = {}

    if (projectId) filter.projectId = projectId
    if (status) filter.status = status
    if (assignee) filter.assignee = assignee
    if (priority) filter.priority = priority
    if (search) filter.title = { $regex: search, $options: "i" }

    const tasks = await Task.find(filter)
      .populate("assignee", "name email image")
      .populate("reporter", "name email image")
      .sort({ createdAt: -1 })

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const body = await req.json()
    const task = await Task.create({
      ...body,
      reporter: session.user.id,
    })

    await Activity.create({
      user: session.user.id,
      action: "created task",
      target: task.title,
      type: "task",
      projectId: task.projectId,
      taskId: task._id,
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
