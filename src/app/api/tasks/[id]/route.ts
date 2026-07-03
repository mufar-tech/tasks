import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Task from "@/lib/models/Task"
import Activity from "@/lib/models/Activity"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const task = await Task.findById(id).populate("assignee", "name email image").populate("reporter", "name email image")
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })
    return NextResponse.json(task)
  } catch {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const existing = await Task.findById(id)
    if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 })
    if (body.status && body.status !== existing.status) {
      await Activity.create({
        user: session.user.id,
        action: `changed status to ${body.status}`,
        target: existing.title,
        type: "task",
        projectId: existing.projectId,
        taskId: existing._id,
      })
    }
    const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate("assignee", "name email image")
      .populate("reporter", "name email image")
    return NextResponse.json(task)
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const task = await Task.findByIdAndDelete(id)
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })
    return NextResponse.json({ message: "Task deleted successfully" })
  } catch {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
