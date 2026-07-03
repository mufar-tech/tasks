import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Project from "@/lib/models/Project"
import Task from "@/lib/models/Task"
import Activity from "@/lib/models/Activity"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const project = await Project.findById(id)
      .populate("owner", "name email image")
      .populate("team", "name email image")
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate("owner", "name email image")
      .populate("team", "name email image")
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const project = await Project.findByIdAndDelete(id)
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })
    await Task.deleteMany({ projectId: id })
    await Activity.deleteMany({ projectId: id })
    return NextResponse.json({ message: "Project deleted successfully" })
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const { action } = await req.json()

    if (action === "archive") {
      const project = await Project.findByIdAndUpdate(id, { status: "archived" }, { new: true })
      if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })
      return NextResponse.json(project)
    }

    if (action === "duplicate") {
      const original = await Project.findById(id)
      if (!original) return NextResponse.json({ error: "Project not found" }, { status: 404 })
      const duplicate = await Project.create({
        name: original.name + " (Copy)",
        description: original.description,
        owner: session.user.id,
        team: original.team,
        priority: original.priority,
        status: "active",
        startDate: original.startDate,
        endDate: original.endDate,
        color: original.color,
      })
      return NextResponse.json(duplicate, { status: 201 })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
